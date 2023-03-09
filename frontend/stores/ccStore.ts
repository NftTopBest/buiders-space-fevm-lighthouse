import { v4 as uuidv4 } from 'uuid'
import CyberConnect, {
  Env,
} from '@cyberlab/cyberconnect-v2'

import { gql_CC_createSubscribeTypedData } from './../gql/CyberConnect/gql_CC_createSubscribeTypedData'
// import { ccProfileNFT } from '~/abis/ccProfileNFT.json'
import { gql_CC_getSubscribersByProfile } from '~/gql/CyberConnect/gql_CC_getSubscribersByProfile'
import { gql_CC_getProfileByHandle } from '~/gql/CyberConnect/gql_CC_getProfileByHandle'
// import { gql_CC_createCreateProfileTypedData } from '~/gql/CyberConnect/gql_CC_createCreateProfileTypedData'
import { gql_CC_createCollectEssenceTypedData } from '~/gql/CyberConnect/gql_CC_createCollectEssenceTypedData'
import { gql_CC_createRegisterEssenceTypedData } from '~/gql/CyberConnect/gql_CC_createRegisterEssenceTypedData'
import { gql_CC_loginGetMessage } from '~/gql/CyberConnect/gql_CC_loginGetMessage'
import { gql_CC_loginVerify } from '~/gql/CyberConnect/gql_CC_loginVerify'
import { gql_CC_relay } from '~/gql/CyberConnect/gql_CC_relay'
import { gql_CC_accounts } from '~/gql/CyberConnect/gql_CC_accounts'
import { gql_CC_getFollowersByHandle } from '~/gql/CyberConnect/gql_CC_getFollowersByHandle'
import { gql_CC_essenceByFilter } from '~/gql/CyberConnect/gql_CC_essenceByFilter'
import { gql_CC_post } from '~/gql/CyberConnect/gql_CC_post'
import { gql_CC_relayActionStatus } from '~/gql/CyberConnect/gql_CC_relayActionStatus'

const domain = 'cyberconnect.me'
export const ccStore = defineStore('ccStore', () => {
  const { payTokenAddress } = $(appStore())
  const { walletAddress, signer, userData, storeJson, rawProvider, initContract, contractRead, getTxUrl } = $(web3AuthStore())
  const { getIpfsUrl } = $(useNFTStorage())
  const createProfileForm = $ref({
    handle: 'buidlersspace3',
    displayName: 'Buidlers.Space',
  })
  const accessToken = $ref(getItem('cc_accessToken', ''))
  const profileID = $ref(0)
  let cyberConnectApiInstance = $ref(null)
  const userCCInfo = reactive({
    handle: '',
    profileId: '',
  })
  let primaryHandle = $ref('')
  let ccPostItems = $ref([])
  let isLoadingCCPostItems = $ref(false)

  const doGetUserCCInfo = async(address) => {
    const profileId = await contractRead('ccProfileNFT', 'getPrimaryProfile', address)
    const handle = await contractRead('ccProfileNFT', 'getHandleByProfileId', profileId)
    userCCInfo.handle = handle
    userCCInfo.profileId = profileId.toString()
    primaryHandle = handle
  }

  const doGetPrimaryHandleProfileIdWithCache = async(address) => {
    const cacheKey = `cc_primary_handle_profileId_${address}`
    let handle = getItem(cacheKey, false)
    if (handle)
      return handle

    let profileId = await contractRead('ccProfileNFT', 'getPrimaryProfile', address)
    profileId = profileId.toString()
    handle = await contractRead('ccProfileNFT', 'getHandleByProfileId', profileId)
    setItem(cacheKey, { handle, profileId })
    return { handle, profileId }
  }

  const doUpdatePrimaryProfile = async(profileId) => {
    const contract = await initContract('ccProfileNFT', true)
    const tx = await contract.setPrimaryProfile(profileId)
    await tx.wait()
    console.log('====> tx :', tx)
  }

  const callCCApiMethod = async(methodName, ...params) => {
    if (!cyberConnectApiInstance) {
      cyberConnectApiInstance = new CyberConnect({
        namespace: 'Buidlers.Space',
        env: Env.STAGING,
        provider: rawProvider,
        signingMessageEntity: 'Buidlers.Space',
      })
    }

    return cyberConnectApiInstance[methodName](...params)
  }

  const ccQl = async(ql, rzPath, opts) => {
    const rz = await useMutation(ql).execute(opts)
    return get(rz.data, rzPath)
  }

  const ccQlRelay = async(ql, rzPath, opts) => {
    const typedData = await ccQl(ql, rzPath, opts)
    const message = typedData.data
    const typedDataID = typedData.id
    const params = [walletAddress, message]
    const method = 'eth_signTypedData_v4'
    const signature = await signer.provider.send(method, params)

    const relayActionId = await ccQl(gql_CC_relay, 'relay.relayActionId', {
      input: {
        typedDataID,
        signature,
      },
    })
    return relayActionId
  }

  const ccQlRelayWithResult = async(ql, rzPath, opts, relayActionId = '') => {
    if (!relayActionId)
      relayActionId = await ccQlRelay(ql, rzPath, opts)

    const rz = await ccQl(gql_CC_relayActionStatus, 'relayActionStatus', { relayActionId })
    if (rz.txStatus === 'SUCCESS')
      return rz.returnData
    // have error
    if (rz.reason) {
      return {
        err: rz.reason,
        txHash: rz.lastKnownTxHash,
      }
    }

    await new Promise(resolve => setTimeout(resolve, 3000))
    return ccQlRelayWithResult(ql, rzPath, opts, relayActionId)
  }

  const doQueryProfileByHandle = async(handle) => {
    const cacheKey = `ccProfile_${handle}`
    let profile = getItem(cacheKey, '')
    if (profile) return profile

    profile = await ccQl(gql_CC_getProfileByHandle, 'profileByHandle', { handle })
    setItem(cacheKey, profile)
    return profile
  }

  const doQueryPostItems = async(address) => {
    isLoadingCCPostItems = true
    ccPostItems = await ccQl(gql_CC_post, 'address.wallet.primaryProfile.posts.edges', { address })
    isLoadingCCPostItems = false
    return ccPostItems
  }

  const doCreatePost = async(body, address) => {
    await callCCApiMethod('createPost', { body, author: userCCInfo.handle })
    doQueryPostItems(address)
  }

  const getFollowersByHandle = async(handle, _walletAddress = '') => {
    if (!_walletAddress)
      _walletAddress = walletAddress
    const rz = await ccQl(gql_CC_getFollowersByHandle, 'profileByHandle', { handle, me: _walletAddress })
    return rz
  }

  const getSubscribersByAddress = async(address, _walletAddress) => {
    if (!_walletAddress)
      _walletAddress = walletAddress
    const rz = await ccQl(gql_CC_getSubscribersByProfile, 'profileByHandle', { address, me: _walletAddress })
    return rz
  }

  const doSubscribeToProfileGasless = async(profileId) => {
    const rz = await ccQlRelay(gql_CC_createSubscribeTypedData, 'createSubscribeTypedData.typedData', {
      input: {
        profileIDs: [profileId],
      },
    })
    return rz
  }

  const doCheckHandleExist = async(handle) => {
    const contract = await initContract('ccProfileNFT', true)
    const isExist = await contract.getProfileIdByHandle(handle)
    if (isExist.toString() !== '0')
      return true

    return false
  }

  const doGetAccounts = async() => {
    const rz = await ccQl(gql_CC_accounts, 'address.wallet.profiles', { address: walletAddress })
    console.log('====> rz :', rz)
  }

  const doCollectEssenceGasless = async({ essenceID, profileID, collector = '' }) => {
    if (!collector)
      collector = walletAddress

    const rz = await ccQlRelayWithResult(gql_CC_createCollectEssenceTypedData, 'createCollectEssenceTypedData.typedData', {
      input: {
        collector,
        profileID,
        essenceID,
      },
    })
    // TODO: make cache, then call ccQlRelayWithResult with actionId to update the status later then.
    return rz
  }

  const doGetEssenceCollectors = async(metadataID, me = '') => {
    if (!me)
      me = walletAddress

    const rz = await ccQl(gql_CC_essenceByFilter, 'essenceByFilter.collectedBy.edges', { metadataID, me })
    console.log('====> rz :', rz)
    return rz
  }

  const doCreateProfile = async({ handle, displayName, bio, avatar, banner }) => {
    avatar = getIpfsUrl(avatar)
    banner = getIpfsUrl(banner)
    const contract = await initContract('ccProfileNFT', true)
    const metadata = await storeJson({
      handle,
      display_name: displayName,
      bio,
      avatar,
      cover_image: banner,
      attributes: [],
      version: '1.0.0',
    })
    const params = {
      to: walletAddress,
      handle,
      avatar,
      metadata,
      operator: '0x85AAc6211aC91E92594C01F8c9557026797493AE',
    }
    const tx = await contract.createProfile(params, '0x', '0x')
    const rc = await tx.wait()
    return getTxUrl(tx.hash)
  }

  const doGetPrimaryProfile = async() => {
    const profileId = await contractRead('ccProfileNFT', 'getPrimaryProfile', walletAddress)
    const handle = await contractRead('ccProfileNFT', 'getHandleByProfileId', profileId)
    createProfileForm.profileId = profileId.toString()
    createProfileForm.handle = handle
    return { handle, profileId: profileId.toString() }
  }

  const doRegisterEssence = async() => {
    // https://docs.cyberconnect.me/how-to/build-badge-app/create-a-badge#metadata-schema
    const essenceTokenURI = await storeJson({
      metadata_id: uuidv4(),
      version: '1.0.0',
      app_id: 'cyberconnect',
      lang: 'en',
      issue_date: new Date().toISOString(),
      content: '',
      media: [],
      tags: [],
      image: userData.avatar,
      image_data: '',
      name: `@${createProfileForm.handle}'s event`,
      description: `@${createProfileForm.handle}'s event on CyberConnect Badge app`,
      animation_url: '',
      external_url: '',
      attributes: [
        {
          display_type: 'string',
          trait_type: 'title',
          value: `@${createProfileForm.handle}'s title`,
        },
        {
          display_type: 'date',
          trait_type: 'date',
          value: Date.now(),
        },
        {
          display_type: 'string',
          trait_type: 'venue',
          value: `@${createProfileForm.handle}'s venue`,
        },
      ],
    })
    const contract = await initContract('ccProfileNFT', true)
    const tx = await contract.registerEssence(
      {
        profileId: createProfileForm.profileId,
        name: createProfileForm.badgeName || 'badge name',
        symbol: createProfileForm.badgeSymbol || 'BS',
        essenceTokenURI,
        essenceMw: '0x0000000000000000000000000000000000000000',
        transferable: false,
        deployAtRegister: true,
      },
      0x0,
    )
    const rc = await tx.wait()
    const event = rc.events.find(item => item.event === 'RegisterEssence')
    console.log('====> event :', event)
    const { essenceId } = event.args
    createProfileForm.essenceId = essenceId
  }
  const doCreateBadge = async() => {
    //
  }

  const doCollectBadge = async() => {
    const contract = await initContract('ccProfileNFT', true)
    const tx = await contract.collect(
      {
        collector: walletAddress,
        profileId: createProfileForm.profileId,
        essenceId: createProfileForm.essenceId,
      },
      0x0,
      0x0,
    )
    const rc = await tx.wait()
    console.log('====> rc :', rc)
  }
  const doForceGetAccessToken = async() => {
    const isExist = getItem('cc_accessToken')
    if (isExist)
      return isExist

    const sign = await ccQl(gql_CC_loginGetMessage, 'loginGetMessage.message', {
      domain,
      address: walletAddress,
    })
    const signature = await signer.signMessage(sign)
    const accessToken = await ccQl(gql_CC_loginVerify, 'loginVerify.accessToken', {
      input: {
        address: walletAddress,
        domain,
        signature,
      },
    })
    setItem('cc_accessToken', accessToken)
  }

  const doCreateProfileGasless = async() => {
    console.log('====> doCreateProfileGasless')
  }

  const doCreateEssenceNFTGasless = async({ title, description, handle, image, theSymbol, totalSupply, amount }) => {
    const profile = await doQueryProfileByHandle(handle)
    const profileID = profile?.profileID
    const currency = payTokenAddress
    const name = title
    const metadata = {
      name,
      metadata_id: uuidv4(),
      version: '1.0.0',
      app_id: 'Builders.Space',
      lang: 'en',
      issue_date: new Date().toISOString(),
      content: '',
      media: [],
      tags: [],
      image,
      image_data: '',
      description,
      animation_url: '',
      external_url: '',
      attributes: [
        // {
        //   display_type: 'string',
        //   trait_type: 'title',
        //   value: title,
        // },
        // {
        //   display_type: 'date',
        //   trait_type: 'date',
        //   value: Date.now(),
        // },
        // {
        //   display_type: 'string',
        //   trait_type: 'venue',
        //   value: 'Web3',
        // },
      ],
    }

    const tokenURI = await storeJson(metadata)
    // const tokenURI = 'ipfs://bafkreiamsxz66dstaxdedtxpfafc53vpdc2llvtxd64tjxdz3qfwwgrocy'
    const rz = await ccQlRelayWithResult(gql_CC_createRegisterEssenceTypedData, 'createRegisterEssenceTypedData.typedData', {
      input: {
        /* The profile id under which the Essence is registered */
        profileID,
        /* Name of the Essence */
        name,
        /* Symbol of the Essence */
        symbol: theSymbol,
        /* URL for the json object containing data about content and the Essence NFT */
        tokenURI,
        /* Middleware that allows users to collect the Essence NFT for free */
        middleware: {
          collectFree: true,
          // collectPaid: {
          //   /* Address that will receive the amount */
          //   recipient: walletAddress,
          //   /* Number of times the Essence can be collected */
          //   totalSupply,
          //   /* Amount that needs to be paid to collect essence */
          //   amount,
          //   /* The currency for the  amount. Chainlink token contract on Goerli */
          //   currency,
          //   /* If it require that the collector is also subscribed */
          //   subscribeRequired: false,
          // },
        },
        /* Set if the Essence should be transferable or not */
        /* SBTs are non-transferable */
        transferable: false,
      },
    })

    return {
      ...rz,
      metadataID: metadata.metadata_id,
    }
  }

  watchEffect(async() => {
    if (!walletAddress) return

    await doForceGetAccessToken()
  })

  return $$({
    profileID,
    createProfileForm,
    userCCInfo,
    isLoadingCCPostItems,
    ccPostItems,
    primaryHandle,
    ccQl,
    doCreatePost,
    doCreateEssenceNFTGasless,
    doQueryPostItems,
    doGetUserCCInfo,
    getFollowersByHandle,
    callCCApiMethod,
    doCheckHandleExist,
    doRegisterEssence,
    doGetPrimaryProfile,
    doCollectBadge,
    doCreateBadge,
    doGetAccounts,
    doForceGetAccessToken,
    doCreateProfile,
    doCreateProfileGasless,
    doSubscribeToProfileGasless,
    doCollectEssenceGasless,
    doUpdatePrimaryProfile,
    doQueryProfileByHandle,
    ccQlRelayWithResult,
    doGetEssenceCollectors,
    doGetPrimaryHandleProfileIdWithCache,
    getSubscribersByAddress,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(ccStore, import.meta.hot))
