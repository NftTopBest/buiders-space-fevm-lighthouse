import {
  BookOpenIcon,
  ChartBarIcon,
  CursorArrowRaysIcon,
  MicrophoneIcon,
  MusicalNoteIcon,
  NewspaperIcon,
  TruckIcon,
  WalletIcon,
} from '@heroicons/vue/24/outline'
import { CID } from 'multiformats/cid'
import { base16 } from 'multiformats/bases/base16'
import { doCreateStream } from '~/composables/useLivepeer'

const tokenIdArr = []
const tagsKeyByType = {}

export const mvStore = defineStore('mvStore', () => {
  const { initContract, walletAddress, signer, addSuccess, addWarning, userData, getContractAddress, contractRead } = $(web3AuthStore())
  const { callCCApiMethod, doCreateEssenceNFTGasless } = $(ccStore())
  const { getJson, getStatus, storeJson } = $(useNFTStorage())
  const route = useRoute()
  const router = useRouter()
  const chain = CHAIN_NAME
  const litNodeClient = inject('litNodeClient')
  const chainName = $computed(() => route?.params.chainName || CHAIN_NAME || 'mumbai')

  const typeList = $ref([
    {
      name: 'Digital Product',
      description: 'Any set of files to download or stream.',
      href: `/${chainName}/buidlers/digital-product`,
      icon: ChartBarIcon,
    },
    {
      name: 'Course or tutorial',
      description: 'Sell a single lesson or teach a whole cohort of students.',
      href: `/${chainName}/buidlers/course-or-tutorial`,
      icon: CursorArrowRaysIcon,
    },
    {
      name: 'E-book',
      description: 'Offer a book or comic in PDF, ePub, and Mobi formats.',
      href: `/${chainName}/buidlers/e-book`,
      icon: BookOpenIcon,
    },
    {
      name: 'Newsletter',
      description: 'Deliver recurring content through DeMessager.',
      href: `/${chainName}/buidlers/newsletter`,
      icon: NewspaperIcon,
    },
    {
      name: 'Membership',
      description: 'Start a membership business around your fans.',
      href: `/${chainName}/buidlers/membership`,
      icon: WalletIcon,
    },
    {
      name: 'Podcast',
      description: 'Make episodes available for streaming and direct downloads.',
      href: `/${chainName}/buidlers/podcast`,
      icon: MicrophoneIcon,
    },
    {
      name: 'Audiobook',
      description: 'Let customers listen to your audio content.',
      href: `/${chainName}/buidlers/audiobook`,
      icon: MusicalNoteIcon,
    },
    {
      name: 'Physical Good',
      description: 'Sell anything that requires shipping something.',
      href: `/${chainName}/buidlers/physical-good`,
      icon: TruckIcon,
    },
  ])

  const typeSlug = $computed(() => route?.params.type)
  let product = $ref({})
  const author = $computed(() => get(product, 'author', {}))

  const theType = $computed(() => get(product, 'properties.tags.type', ''))
  const theTypeLink = $computed(() => {
    const _type = typeList.find(item => item.name === theType)
    return _type?.href
  })

  const ccProfileHandle = $computed(() => get(product, 'properties.ccProfileHandle', ''))

  const postModal = $ref({
    post: {},
  })
  let posts = $ref([])
  const form = $ref({
    isShow: false,
    description: '',
    isLoading: false,
    title: '',
    tokenId: '',
    image: '',
    totalSupply: '',
    theSymbol: '',
    price: '',
    itemAccessNFTCount: '1',
    totalRewardBst: 0.1,
    pkpPublicKey: '0x040213a759d6bfa236e4904d44b4c40c28a10330edfa1ecd8eeed4310508f4015fdc165199ec411672638b13d120ab6ba5f808d75ecbecf1ed230c25a6e7ae5044',
    pkpEthAddress: '0xeD42Fb0c79Dbed86e7f6308d0fbD1740F5EC0326',
    excerpt: '',
    statusText: 'Submitting, pls wait!',
    type: 'article',
  })

  const items = $ref([])

  const currentType = $computed(() => {
    const _type = typeList.find((item) => {
      const slug = item.href.split('/').pop()
      return slug === typeSlug
    })

    return _type || { name: '' }
  })

  const currentTypeItems = $computed(() => {
    return items.filter(item => item.tokenType === currentType?.name)
  })

  const getBuidlerInfo = async (address) => {
    const authorCid = await contractRead('BuidlerProtocol', 'getBuidler', address)
    return getJson(authorCid)
  }
  const updateListFromChain = async () => {
    const contractReader = await initContract('BuidlerProtocol')
    const start = 0
    const limit = 100
    const rz = await contractReader.getTokenList(start, limit)

    const {
      tokenURIArr,
      totalSupplyArr,
      maxSupplyArr,
      itemsCountArr,
      metaCountArr,
    } = rz
    await Promise.all(tokenURIArr.map(async (tokenURI, index) => {
      const tokenId = start + index
      if (tokenIdArr.includes(tokenId))
        return
      const tokenData = await getJson(tokenURI)
      if (tokenIdArr.includes(tokenId))
        return

      const tokenType = get(tokenData, 'properties.tags.type')
      const tags = get(tokenData, 'properties.tags')
      Object.keys(tags).forEach((key) => {
        if (key === 'type') return
        if (!tagsKeyByType[tokenType])
          tagsKeyByType[tokenType] = {}
        if (!tagsKeyByType[tokenType][key])
          tagsKeyByType[tokenType][key] = []

        tagsKeyByType[tokenType][key].push(tags[key])
        tagsKeyByType[tokenType][key] = uniq(tagsKeyByType[tokenType][key])
      })

      const totalSupply = totalSupplyArr[index]
      const maxSupply = maxSupplyArr[index]
      const itemsCount = itemsCountArr[index]
      const metaCount = metaCountArr[index]

      const item = {
        ...tokenData,
        tokenId,
        tokenType,
        totalSupply,
        maxSupply,
        itemsCount,
        metaCount,
      }
      tokenIdArr.push(tokenId)
      items.push(item)
    }))
  }

  const getUserProfileLink = (address, dataType = 'feed') => {
    return `/${chainName}/buidlers/user/${address}/${dataType}`
  }

  const getTokenDataFromChain = async (tokenId) => {
    const contractReader = await initContract('BuidlerProtocol')
    const rz = await contractReader.getToken(tokenId, '', '')

    const {
      tokenURI,
      tokenOwner,
      totalSupply,
      maxSupply,
      items,
      metas,
    } = rz
    const tokenData = await getJson(tokenURI)
    const createdBy = get(tokenData, 'properties.createdBy')
    let author = {}
    if (createdBy)
      author = await getBuidlerInfo(createdBy)

    product = {
      ...tokenData,
      author,
      tokenOwner,
      totalSupply,
      maxSupply,
      items,
      metas,
      tokenURI,
    }
    // console.log('====> product :', product)
  }

  const doBuyOrSell = async (item, actionName) => {
    if (item.isLoading) return
    item.isLoading = true
    let theError = false
    const contract = await initContract('BuidlerProtocol', true)
    try {
      const tx = await contract[actionName](item.itemId)
      const rc = await tx.wait()
    }
    catch (err) {
      theError = err
    }

    if (theError) {
      console.log('====> theError :', theError)
      actionName === 'buy' && addWarning('Insufficient balance of $BST')
      actionName === 'sell' && addWarning(`Insufficient balance of token #${item.tokenId}`)
    }
    else {
      addSuccess(`${actionName} Success!`)
    }
    item.isListed = false
    item.isLoading = false
  }

  const updateTokenPosts = async (tokenId) => {
    let thePosts = await contractRead('BuidlerProtocol', 'getItems', tokenId, 0, 100, 'Post')
    thePosts = await Promise.all(thePosts.map(async (cid) => {
      const data = await getJson(cid)
      const status = await getStatus(cid)
      return {
        ...data,
        created: status.created,
      }
    }))
    posts = thePosts
  }

  const getTokenPost = async (tokenId, index) => {
    let thePosts = await contractRead('BuidlerProtocol', 'getItems', tokenId, index, 1, 'Post')
    thePosts = await Promise.all(thePosts.map(async (cid) => {
      const data = await getJson(cid)
      const status = await getStatus(cid)
      return {
        ...data,
        cid,
        created: status.created,
      }
    }))
    return thePosts[0]
  }

  const showPostModal = (post) => {
    postModal.isLoading = false
    postModal.isShow = true
    postModal.post = post
    postModal.statusText = ''
  }

  const doDecryptPostInModal = async () => {
    if (postModal.isLoading) return
    postModal.isLoading = true

    postModal.statusText = 'Trying to decrypt the locked content'

    const { encryptedSymmetricKey, encryptedString, accessControlConditions } = postModal.post.content
    const { doDecryptString } = await litHelper({ chain, litNodeClient })
    const { decryptedString, err } = await doDecryptString(encryptedSymmetricKey, encryptedString, accessControlConditions)
    // console.log('====={decryptedString, err, encryptedSymmetricKey, encryptedString, accessControlConditions}')
    // console.table({ decryptedString, err, encryptedSymmetricKey, encryptedString, accessControlConditions })
    postModal.post.decrypted = decryptedString
    postModal.statusText = ''

    postModal.isLoading = false
    if (err)
      postModal.statusText = err
  }

  const doDecryptPost = async ({ encryptedSymmetricKey = '', encryptedString = '', accessControlConditions = [] }) => {
    const { doDecryptString } = await litHelper({ chain, litNodeClient })
    const { decryptedString, err } = await doDecryptString(encryptedSymmetricKey, encryptedString, accessControlConditions)
    // console.log('====={decryptedString, err, encryptedSymmetricKey, encryptedString, accessControlConditions}')
    // console.table({ decryptedString, err, encryptedSymmetricKey, encryptedString, accessControlConditions })

    if (err)
      console.error(err)
    return decryptedString
  }

  const doSubmitCreateItem = async () => {
    if (form.isLoading) return
    form.isLoading = true
    const title = form.title
    const excerpt = form.excerpt
    const image = form.image
    const theSymbol = form.theSymbol
    const totalSupply = form.totalSupply
    const amount = parseEther(form.price).toString()

    let ccPost = {}
    let handle = ''
    let createSBTRz = {}
    if (CHAIN_NAME === 'bscTestnet') {
      ccPost = await callCCApiMethod('createPost', {
        title: `tokenId:${form.tokenId}-postId:${posts.length}`,
        body: excerpt,
        author: ccProfileHandle,
      })

      handle = get(product, 'properties.ccProfileHandle', '')
      createSBTRz = await doCreateEssenceNFTGasless({
        title,
        description: form.excerpt,
        handle,
        image,
        theSymbol,
        totalSupply,
        amount,
      })
      if (createSBTRz.err) {
        addWarning(createSBTRz.err)
        return
      }
    }

    if (form.type === 'liveroom') {
      const { playbackId, streamKey } = await doCreateStream({ name: 'liveroom' })
      form.description = playbackId
      form.streamKey = streamKey
      // if (form.totalRewardBst > 0)
      //   form.statusText = `Sending ${form.totalRewardBst} matic to pkp address: ${form.pkpEthAddress}`
      //   await new Promise(resolve => setTimeout(resolve, 3000))
      // await Promise
      // const tx = await signer.sendTransaction({
      //   to: form.pkpEthAddress,
      //   value: parseEther(form.totalRewardBst),
      // })
      // await tx.wait()
    }
    let content = form.description

    if (form.itemAccessNFTCount > 0) {
      form.statusText = 'Add access condition'
      const { doEncryptedString, generateCondition } = await litHelper({ chain, litNodeClient })

      const accessControlConditions = generateCondition({
        contractAddress: getContractAddress('BuidlerProtocol'),
        walletAddress,
        tokenId: form.tokenId,
        unlockAmount: form.itemAccessNFTCount,
      })

      const {
        encryptedString,
        encryptedSymmetricKey,
      } = await doEncryptedString(content, accessControlConditions)

      content = {
        encryptedString,
        encryptedSymmetricKey,
        accessControlConditions,
        itemAccessNFTCount: form.itemAccessNFTCount,
      }

      form.statusText = 'Upload encrypted content to IPFS'
    }

    const cid = await storeJson({
      userData,
      title,
      image,
      excerpt,
      type: form.type,
      streamKey: form.type === 'liveroom' ? form.streamKey : undefined,
      content,
      ccPost,
      totalRewardBst: form.totalRewardBst,
      pkpPublicKey: form.pkpPublicKey,
      pkpEthAddress: form.pkpEthAddress,
      ccProfileHandle,
      ccSBT: {
        ...createSBTRz,
        price: form.price,
        totalSupply,
      },
    })
    // const { size } = await getStatus(cid)

    form.statusText = 'Add posts cid on chain to pay for storage provider'

    const itemType = 'Post'
    const contract = await initContract('BuidlerProtocol', true)
    // const value = parseEther('0.0000000000001').mul(size)
    // const cidHexRaw = CID.parse(cid.replace('ipfs://', '')).toString(base16).substring(1)
    // const cidRaw = `0x00${cidHexRaw}`

    // const tx = await contract.addItem(itemType, form.tokenId, cid, cidRaw, size, { value })
    const tx = await contract.addItem(itemType, form.tokenId, cid)
    const rc = await tx.wait()

    await updateTokenPosts(form.tokenId)
    addSuccess('Success!')

    form.isLoading = false
    form.statusText = 'Submitting, pls wait!'
    router.replace(`/${chainName}/buidlers/build/${route.params.id}`)
  }

  let isUserItemsLoading = $ref(false)
  const userOwnedMap = $ref({})
  const getUserOwned = async (address) => {
    if (userOwnedMap[address]?.length > 0) return userOwnedMap[address]
    isUserItemsLoading = true
    const rz = await contractRead('BuidlerProtocol', 'balanceOfTokensUserAllOwned', address)
    const items = await Promise.all(rz.tokenIdArr.map(async (tokenId, index) => {
      const tokenURI = rz.tokenURIArr[index]
      const data = await getJson(tokenURI)
      const tokenBalance = rz.tokenBalanceArr[index]
      return {
        ...data,
        tokenURI,
        tokenBalance,
        tokenId,
      }
    }))
    userOwnedMap[address] = items
    isUserItemsLoading = false
    return items
  }

  const userItems = $ref({})
  const userItemsFuncNameMap = {
    ask: 'getAskByOwner',
    bid: 'getBidByOwner',
    creation: 'getTokenListByOwner',
  }
  const getUserItems = async (dataType, address) => {
    let items = get(userItems, `${dataType}.${address}`, [])
    if (items.length > 0) return items

    isUserItemsLoading = true
    const rz = await contractRead('BuidlerProtocol', userItemsFuncNameMap[dataType], address, 0, 100)
    switch (dataType) {
      case 'ask':
      case 'bid':
        items = await Promise.all(rz.items.map(async (item, index) => {
          const tokenURI = rz.tokenURIs[index]
          const tokenInfo = await getJson(tokenURI)
          return {
            ...item,
            ...tokenInfo,
          }
        }))
        break
      case 'creation':
        items = await Promise.all(rz.tokenURIArr.map(async (tokenURI, index) => {
          const tokenInfo = await getJson(tokenURI)
          const tokenId = rz.tokenIdArr[index]
          const totalSupply = rz.totalSupplyArr[index]
          const maxSupply = rz.maxSupplyArr[index]
          return {
            ...tokenInfo,
            tokenId,
            totalSupply,
            maxSupply,
          }
        }))
        break
    }

    if (!userItems[dataType])
      userItems[dataType] = {}
    userItems[dataType][address] = items
    isUserItemsLoading = false

    return items
  }

  watchEffect(async () => {
    if (!walletAddress) return
    await updateListFromChain()
  })

  return $$({
    chainName,
    tagsKeyByType,
    typeList,
    currentType,
    items,
    currentTypeItems,
    form,
    product,
    isUserItemsLoading,
    posts,
    postModal,
    ccProfileHandle,
    theType,
    author,
    theTypeLink,
    getBuidlerInfo,
    doBuyOrSell,
    getUserProfileLink,
    getTokenDataFromChain,
    updateListFromChain,
    doSubmitCreateItem,
    updateTokenPosts,
    getTokenPost,
    showPostModal,
    doDecryptPostInModal,
    doDecryptPost,
    getUserItems,
    getUserOwned,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(mvStore, import.meta.hot))
