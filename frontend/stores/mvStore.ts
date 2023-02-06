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
import lighthouse from '@lighthouse-web3/sdk'
import { CID } from 'multiformats/cid'
import { base16 } from 'multiformats/bases/base16'
import { getItem, setItem } from '~/helpers/ls'
const tokenIdArr = []
const tagsKeyByType = {}

export const mvStore = defineStore('mvStore', () => {
  const { initContract, walletAddress, addSuccess, signer, userData, getContractAddress, contractRead } = $(web3AuthStore())
  const { getJson, getStatus, storeJson } = $(useNFTStorage())
  const route = useRoute()
  const chainName = $computed(() => route?.params.chainName)
  const typeSlug = $computed(() => route?.params.type)
  let product = $ref({})
  const postModal = $ref({
    post: {},
  })
  let posts = $ref([])
  const form = $ref({
    isShow: false,
    isLoading: false,
    title: '',
    tokenId: '',
    image: '',
    itemAccessNFTCount: 0,
    excerpt: '',
    description: '',
    statusText: 'Submitting, pls wait!',
  })

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
  const updateListFromChain = async() => {
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
    await Promise.all(tokenURIArr.map(async(tokenURI, index) => {
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

  const getTokenDataFromChain = async(tokenId) => {
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
    product = {
      ...tokenData,
      tokenOwner,
      totalSupply,
      maxSupply,
      items,
      metas,
    }
  }

  const doBuyOrSell = async(item, actionName) => {
    if (item.isLoading) return
    item.isLoading = true

    const contract = await initContract('BuidlerProtocol', true)
    const tx = await contract[actionName](item.itemId)
    const rc = await tx.wait()
    addSuccess(`${actionName} Success!`)
    item.isListed = false
    item.isLoading = false
  }

  const updateTokenPosts = async(tokenId) => {
    let thePosts = await contractRead('BuidlerProtocol', 'getItems', tokenId, 0, 100, 'Post')
    thePosts = await Promise.all(thePosts.map(async(cid) => {
      const data = await getJson(cid)
      const status = await getStatus(cid)
      return {
        ...data,
        created: status.created,
      }
    }))
    posts = thePosts
  }

  const encryptionSignature = async() => {
    const publicKey = await signer.getAddress()
    const messageRequested = (await lighthouse.getAuthMessage(publicKey)).data.message
    const signedMessage = await signer.signMessage(messageRequested)
    return ({
      signedMessage,
      publicKey,
    })
  }

  const showPostModal = (post) => {
    postModal.isLoading = false
    postModal.isShow = true
    postModal.post = post
    postModal.statusText = ''
  }

  const doDecryptPostInModal = async() => {
    if (postModal.isLoading) return
    postModal.isLoading = true

    postModal.statusText = 'fetchEncryptionKey from lighthouse'
    const sig = await encryptionSignature()

    const cid = postModal.post.content.hash
    try {
      const keyObject = await lighthouse.fetchEncryptionKey(
        cid,
        sig.publicKey,
        sig.signedMessage,
      )
      const fileType = 'text/plain'
      const decrypted = await lighthouse.decryptFile(cid, keyObject.data.key, fileType)
      postModal.post.decrypted = await decrypted.text()
    }
    catch (err) {
      postModal.statusText = err.message
    }
    postModal.isLoading = false
  }

  const doSubmitCreateItem = async() => {
    if (form.isLoading) return
    form.isLoading = true

    const progressCallback = (progressData) => {
      const percentageDone
        = 100 - (progressData?.total / progressData?.uploaded)?.toFixed(2)
      console.log(`progress ${percentageDone}`)
    }

    form.statusText = 'Upload content to lighthouse'

    const parts = [
      new Blob([form.description], {
        type: 'text/plain',
      }),
    ]
    const file = new File(parts, 'description.md', {
      lastModified: Date.now(),
      type: 'text/plain',
    })

    const event = {
      persist: () => {},
      target: {
        files: [file],
      },
    }
    let sig = await encryptionSignature()
    const rzUpload = await lighthouse.uploadEncrypted(event,
      sig.publicKey,
      import.meta.env.VITE_LIGHTHOUSE_API_KEY,
      sig.signedMessage,
      progressCallback)
    const hash = get(rzUpload, 'data.Hash')
    const size = get(rzUpload, 'data.Size')

    form.statusText = 'add access condition'

    sig = await encryptionSignature()
    // Hyperspace
    const decryptConditions = [
      {
        id: 1,
        chain: 'mumbai',
        // id: '1',
        // chain: 'Hyperspace',
        method: 'balanceOf',
        standardContractType: 'ERC1155',
        contractAddress: getContractAddress('BuidlerProtocol'),
        returnValueTest: { comparator: '>=', value: form.itemAccessNFTCount },
        parameters: [':userAddress', parseInt(form.tokenId)],
      },
    ]
    const aggregator = '([1])'
    let rzAddAc = ''
    try {
      rzAddAc = await lighthouse.accessCondition(
        sig.publicKey,
        hash,
        sig.signedMessage,
        decryptConditions,
        aggregator,
      )
    }
    catch (err) {
      const errMsg = get(err, 'error.message', err)
      console.log('====> errMsg, err :', errMsg, err)
      return
    }

    const content = {
      sdk: 'lighthouse',
      hash,
      itemAccessNFTCount: form.itemAccessNFTCount,
      size,
    }

    form.statusText = 'store posts meta data'

    const cid = await storeJson({
      userData,
      title: form.title,
      image: form.image,
      excerpt: form.excerpt,
      content,
    })

    form.statusText = 'add posts cid on chain with $FIL to pay for storage provider'

    const itemType = 'Post'
    const contract = await initContract('BuidlerProtocol', true)
    const value = parseEther('0.001').mul(size)
    const cidHexRaw = CID.parse(cid.replace('ipfs://', '')).toString(base16).substring(1)
    const cidRaw = `0x00${cidHexRaw}`

    const tx = await contract.addItem(itemType, form.tokenId, cid, cidRaw, size, { value })
    const rc = await tx.wait()

    await updateTokenPosts(form.tokenId)
    addSuccess('Success!')

    form.isLoading = false
    form.isShow = false
    form.statusText = 'Submitting, pls wait!'
  }

  watchEffect(async() => {
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
    posts,
    postModal,
    doBuyOrSell,
    getTokenDataFromChain,
    updateListFromChain,
    doSubmitCreateItem,
    updateTokenPosts,
    showPostModal,
    doDecryptPostInModal,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(mvStore, import.meta.hot))
