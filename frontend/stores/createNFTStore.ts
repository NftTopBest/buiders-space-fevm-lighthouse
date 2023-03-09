import { ccStore } from './ccStore'
export const createNFTStore = defineStore('createNFTStore', () => {
  const { walletAddress, initContract, contractRead } = $(web3AuthStore())
  const { createNewGroup } = $(web3MQStore())
  const { callCCApiMethod } = $(ccStore())
  const { storeJson } = $(useNFTStorage())
  const { addSuccess } = $(notificationStore())
  const router = useRouter()

  const { typeList, updateListFromChain } = $(mvStore())
  let theType = $ref(typeList[0])

  const setTheType = (item: any) => {
    theType = item
  }

  const {
    createTokenCost,
    allowanceModal,
    currentAllowance,
    showAllowanceModal,
    queryAllowance,
  } = $(appStore())

  // complete  current  upcoming
  const steps = $ref([
    { id: '01', name: 'NFT Type', href: '#', status: 'complete' },
    { id: '02', name: 'Base Info', href: '#', status: 'current' },
    { id: '03', name: 'Images', href: '#', status: 'upcoming' },
    { id: '04', name: 'Tags && Extra', href: '#', status: 'upcoming' },
    { id: '05', name: 'CyberConnect', href: '#', status: 'upcoming' },
  ])

  const name = $ref('')
  const description = $ref('')
  const basicPrice = $ref('200')
  const maxSupply = $ref('10000')
  const inviteCommission = $ref(1)
  const ccProfileHandle = $ref('')

  const image = $ref('')
  const projectDetail = $ref('')
  const gallery = $ref([
  ])

  const tags = $ref([
    { label: 'tagName', value: 'tagValue' },
  ])

  const addItem = () => {
    tags.push({ label: '', value: '' })
  }

  const removeItem = (index: number) => {
    if (tags.length <= 1) return
    tags.splice(index, 1)
  }

  const currentStepIndex = $computed(() => steps.findIndex(i => i.status === 'current'))
  const stepLen = $computed(() => steps.length)

  const doNextStep = () => {
    if (currentStepIndex + 1 === stepLen) return
    steps[currentStepIndex + 1].status = 'current'
    steps[currentStepIndex].status = 'complete'
  }

  const doPreStep = () => {
    if (currentStepIndex === 0) return
    steps[currentStepIndex - 1].status = 'current'
    steps[currentStepIndex + 1].status = 'upcoming'
  }

  const initSteps = () => {
    for (const step of steps) {
      if (step.id === '01')
        step.status = 'current'
      else
        step.status = 'upcoming'
    }
  }

  let isLoading = $ref(false)
  const doSubmit = async() => {
    if (currentAllowance.lt(createTokenCost)) {
      showAllowanceModal({
        amount: createTokenCost.toString(),
        doClose: async() => {
          await queryAllowance()
          allowanceModal.isShow = false
          if (!currentAllowance.lt(createTokenCost))
            await doSubmit()
        },
      })

      return
    }
    if (isLoading) return
    isLoading = true

    const _inviteCommission = inviteCommission * 100
    const _tags = {}
    tags.forEach(({ label, value }) => {
      if (!label || !value) return
      _tags[label] = value
    })

    _tags.type = theType.name
    const web3MQChannelId = await createNewGroup(name, image)

    const ccPost = await callCCApiMethod('createPost', {
      title: '',
      body: description,
      author: ccProfileHandle,
    })

    const properties = {
      createdBy: walletAddress,
      tags: _tags,
      from: 'Buidlers.Space',
      basicPrice,
      gallery,
      maxSupply,
      inviteCommission: _inviteCommission,
      projectDetail,
      web3MQChannelId,
      ccProfileHandle,
      ccPost,
    }

    const metadata = {
      name,
      description,
      image,
      properties,
    }
    const metadataCID = await storeJson(metadata)
    // const metadataCID = 'ipfs://bafkreidktss36q3fhxwof6lwpedtpjwk5ao6xkq54claptj7g54kozasyy'
    const contractWriter = await initContract('BuidlerProtocol', true)
    let tokenId = $ref('')
    try {
      const tokenType = theType.name
      // console.log('====> tokenType, parseEther(basicPrice), _inviteCommission, maxSupply, metadataCID :', tokenType, basicPrice, _inviteCommission, maxSupply, metadataCID)
      const tx = await contractWriter.addToken(tokenType, parseEther(basicPrice), _inviteCommission, maxSupply, metadataCID)
      const rc = await tx.wait()
      const event = rc.events.find(event => event.event === 'AddToken')
      const rz = event.args
      tokenId = rz.tokenId.toString()
      // update post title to connect to the nft token
      await callCCApiMethod('updatePost', ccPost.contentID, {
        title: `tokenId:${tokenId}`,
        body: description,
        author: ccProfileHandle,
      })
    }
    catch (err) {
      isLoading = false
      console.log('====> err :', err)
      return
    }

    isLoading = false
    await updateListFromChain()
    addSuccess('Submit success')
    router.push(`${theType.href}`)
    console.log('====> tokenId :', tokenId)
  }

  let isShowLackBSTModal = $ref(false)

  const checkIsLackBST = async() => {
    const balance = await contractRead('BuidlerStableToken', 'balanceOf', walletAddress)
    if (balance.lt(createTokenCost)) {
      isShowLackBSTModal = true
      return
    }
    isShowLackBSTModal = false
  }

  watchEffect(async() => {
    if (!walletAddress) return
    // do some init stuff
  })

  return $$({
    steps,
    currentStepIndex,
    isLoading,
    name,
    description,
    basicPrice,
    maxSupply,
    inviteCommission,
    theType,
    image,
    gallery,
    stepLen,
    tags,
    projectDetail,
    isShowLackBSTModal,
    ccProfileHandle,
    checkIsLackBST,
    doNextStep,
    doPreStep,
    initSteps,
    setTheType,
    removeItem,
    addItem,
    doSubmit,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(createNFTStore, import.meta.hot))
