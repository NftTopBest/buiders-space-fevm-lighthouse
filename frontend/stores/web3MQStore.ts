import { Client } from '@web3mq/client'
export const web3MQStore = defineStore('web3MQStore', () => {
  const { walletAddress } = $(web3AuthStore())

  const password = $ref(getItem('web3MQ.password', ''))
  let mainPublicKey = $ref(getItem('web3MQ.mainPublicKey', ''))
  let mainPrivateKey = $ref(getItem('web3MQ.mainPrivateKey', ''))
  let tempPrivateKey = $ref(getItem('web3MQ.tempPrivateKey', ''))
  let tempPublicKey = $ref(getItem('web3MQ.tempPublicKey', ''))
  const isLogin = $computed(() => tempPublicKey && tempPrivateKey)
  let client = $ref('')

  const groupMemberListMap = $ref({})
  const messageListMap = $ref({})
  let currentNFTChannelId = $ref(getItem('web3MQ.currentNFTChannelId', ''))
  const currentNFTChannelMessageList = $computed(() => messageListMap[currentNFTChannelId] || [])

  const didType = $ref('eth')
  const nickname = $ref('')
  const msgBottomRef = $ref(null)

  let isInited = $ref(false)
  let userId = $ref('')
  let isUserExist = $ref(false)
  let createUserState = $ref('createUserForm')
  let loginUserState = $ref('loginUserForm')
  // let loginUserState = $ref('loginSuccess')
  let loginError = $ref('')
  // let createUserState = $ref('waitingForSignature')
  const { chainName } = $(mvStore())
  let channelList = $ref([])
  const msgLink = $computed(() => {
    let groupId = currentNFTChannelId
    if (groupId === '')
      groupId = channelList[0]?.chatid

    return `/${chainName}/msg/${groupId}`
  })

  const currentChannelInfo = $computed(() => find(channelList, item => item.chatid === currentNFTChannelId) || {})
  const eventCBMap = {
    'message.getList': async() => {
      messageListMap[currentNFTChannelId] = client.message.messageList
      // msgBottomRef.scrollIntoView({ behavior: 'smooth' })
      // console.log('====> client.message.messageList[0] :', client.message.messageList)
    },
    'channel.getList': async() => {
      channelList = client.channel.channelList
      const chatidArr = channelList.map(item => item.chatid)
      console.log('====> chatidArr :', chatidArr)
    },
    'message.delivered': async(event) => {
      // console.log('====> event :', event)
      await getMessageList(currentNFTChannelId)
      // msgBottomRef?.scrollIntoView({ behavior: 'smooth' })
    },
    'message.send': async(event) => {
      console.log('====> event :', event)
    },
    'channel.updated': async(event) => {
      console.log('====> event :', event)
    },
    'channel.activeChange': async(event) => {
      console.log('====> event :', event)
    },
  }

  const initClient = async() => {
    const connectUrl = getItem('web3MQ.connectUrl', '')
    let opts = {
      connectUrl,
      app_key: 'WdSoUYuEHxHFjBRI',
    }
    if (tempPublicKey !== '') {
      opts = {
        ...opts,
        didKey: `${didType}:${walletAddress}`,
        tempPubkey: tempPublicKey,
      }
    }

    const bestConnectUrl = await Client.init(opts)
    setItem('web3MQ.connectUrl', bestConnectUrl)
  }

  const checkUserExist = async() => {
    const rz = await Client.register.getUserInfo({
      did_value: walletAddress,
      did_type: didType,
    })
    userId = rz.userid
    isUserExist = rz.userExist
    isInited = true
  }

  const doGetMainKeypair = async() => {
    const rz = await Client.register.getMainKeypair({
      password,
      did_value: walletAddress,
      did_type: didType,
    })

    mainPublicKey = rz.publicKey
    mainPrivateKey = rz.secretKey

    setItem('web3MQ.mainPublicKey', mainPublicKey)
    setItem('web3MQ.mainPrivateKey', mainPrivateKey)
  }

  const doLogin = async() => {
    loginError = ''
    loginUserState = 'waitingForSignature'
    await doGetMainKeypair()
    try {
      const rz = await Client.register.login({
        password,
        mainPublicKey,
        mainPrivateKey,
        userid: userId,
        didType,
        didValue: walletAddress,
      })
      loginUserState = 'loginSuccess'
      tempPrivateKey = rz.tempPrivateKey
      tempPublicKey = rz.tempPublicKey
      setItem('web3MQ.tempPrivateKey', tempPrivateKey)
      setItem('web3MQ.tempPublicKey', tempPublicKey)
      console.log('====> doLogin.rz :', rz)
    }
    catch (err) {
      loginUserState = 'loginUserForm'
      loginError = { message: 'Password not correct' }
      console.log('====> err :', err)
    }
  }

  const doCreateUser = async() => {
    createUserState = 'waitingForSignature'

    await doGetMainKeypair()

    const { signContent } = await Client.register.getRegisterSignContent({
      userid: userId,
      mainPublicKey,
      didType,
      didValue: walletAddress,
    })

    const signRz = await Client.register.sign(signContent, walletAddress, didType)
    const params = {
      userid: userId,
      didValue: walletAddress,
      mainPublicKey,
      did_pubkey: signRz.publicKey,
      didType,
      nickname,
      avatar_url: `https://cdn.stamp.fyi/avatar/${walletAddress}?s=300`,
      signature: signRz.sign,
    }
    const registerRes = await Client.register.register(params)
    console.log('====> registerRes :', registerRes)
    await checkUserExist()
    if (isUserExist) {
      setItem('web3MQ.password', password)
      await doLogin()
    }
  }

  const tryGetClientInstance = async() => {
    if (!tempPrivateKey || !tempPublicKey || !userId) return
    const keys = {
      PrivateKey: tempPrivateKey,
      PublicKey: tempPublicKey,
      userid: userId,
    }
    client = Client.getInstance(keys)
    const handleEvent = async(event: any) => {
      if (!eventCBMap[event.type]) {
        console.log('====> no callback function for event.type :', event.type)
        return
      }
      await eventCBMap[event.type](event)
    }

    client.on('channel.activeChange', handleEvent)
    client.on('channel.created', handleEvent)
    client.on('message.delivered', handleEvent)
    client.on('channel.getList', handleEvent)
    client.on('channel.updated', handleEvent)
    // message event
    client.on('message.getList', handleEvent)
    client.on('message.delivered', handleEvent)
    client.on('message.send', handleEvent)
  }

  const getMessageList = async(groupId) => {
    await client?.message?.getMessageList({
      page: 1,
      size: 20,
    }, groupId)
  }

  const activeChannel = async(groupId) => {
    currentNFTChannelId = groupId
    await client?.channel?.setActiveChannel(currentChannelInfo)
    await getMessageList(groupId)
    if (groupId.startsWith('group:')) {
      const rz = await client.channel.getGroupMemberList({
        page: 1,
        size: 100,
      })
      groupMemberListMap[groupId] = get(rz, 'data.result', [])
    }
  }

  const doSendMessage = async(content, targetId) => {
    await client.message.sendMessage(content, targetId)
  }
  watchEffect(async() => {
    if (!currentNFTChannelId || !client.message) return
    if (messageListMap[currentNFTChannelId]) return
    await getMessageList(currentNFTChannelId)
  })

  const queryChannels = async() => {
    client.channel.queryChannels({
      page: 1,
      size: 20,
    })
  }

  const getMyProfile = async() => {
    const data = await client.user.getMyProfile()
    console.log('====> data :', data)
  }
  const createNewGroup = async(group_name, avatar_url) => {
    await client.channel.createRoom({
      group_name,
      avatar_url,
      permissions: {
        'group:join': { type: 'enum', value: 'public' },
      },
    })
    return client.channel.channelList[0].chatid
  }

  const isMe = _userId => _userId === userId

  watchEffect(async() => {
    if (!walletAddress) return

    await initClient()
    await checkUserExist()
    await tryGetClientInstance()
    await queryChannels()
    // await getMyProfile()

    // setTimeout(async() => {
    //   await test()
    // }, 1000)
    // await getMessageList()
    // await test()
  })

  return $$({
    isInited,
    password,
    client,
    nickname,
    isUserExist,
    createUserState,
    msgBottomRef,
    loginUserState,
    loginError,
    isLogin,
    channelList,
    msgLink,
    currentNFTChannelId,
    currentChannelInfo,
    currentNFTChannelMessageList,
    isMe,
    doLogin,
    doCreateUser,
    createNewGroup,
    activeChannel,
    doSendMessage,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(web3MQStore, import.meta.hot))
