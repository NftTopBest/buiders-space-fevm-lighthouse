import {
  ChatBubbleBottomCenterIcon,
  RocketLaunchIcon,
  UserGroupIcon,
} from '@heroicons/vue/24/outline'
import { RocketLaunchIcon } from '@heroicons/vue/24/solid'

export const appStore = defineStore('appStore', () => {
  const { contractRead, walletAddress, getContractAddress, contractReadWithAddress } = $(web3AuthStore())

  const allowanceModal = $ref({
    isShow: false,
    tokenContractName: '',
    appContractName: '',
    amount: '0',
    doClose: () => {},
  })
  let createTokenCost = $ref(parseEther('0'))
  const payTokenName = $ref('Negentropy')
  let payTokenAddress = $ref('')
  const appContractName = $ref('BuidlerProtocol')

  let currentAllowance = $ref(0)
  const queryAllowance = async() => {
    const appContractAddress = getContractAddress(appContractName)
    currentAllowance = await contractReadWithAddress(payTokenName, payTokenAddress, 'allowance', walletAddress, appContractAddress)
  }
  const showAllowanceModal = (params) => {
    const { amount, doClose, tokenContractName } = params
    allowanceModal.isShow = true
    allowanceModal.tokenContractName = tokenContractName || payTokenName
    allowanceModal.appContractName = params.appContractName || appContractName
    allowanceModal.amount = amount
    allowanceModal.doClose = doClose
  }

  let platformCommission = $ref('')
  let currentNav = $ref('')
  const route = useRoute()
  watchEffect(() => {
    const pathArr = route.path.split('/')
    currentNav = `/${pathArr[1] || ''}`
  })

  const navigation = $computed(() => {
    return [
      { name: 'Verse', href: '/verse', icon: UserGroupIcon, current: currentNav === '/verse' },
      { name: 'Chat', href: '/chat/messages', icon: ChatBubbleBottomCenterIcon, current: currentNav === '/chat' },
      { name: 'Buidlers', href: '/buidlers/Recently', icon: RocketLaunchIcon, current: currentNav === '/buidlers' },
    ]
  })

  const mobileMenuOpen = $ref(false)

  const getAppConfig = async() => {
    const rz = await contractRead('BuidlerProtocol', 'getAppConfig')
    createTokenCost = rz.createTokenCost
    payTokenAddress = rz.payTokenAddress
    platformCommission = rz.platformCommission
    // console.log('====> rz :', rz)
  }

  onMounted(async() => {
    await getAppConfig()
  })
  watchEffect(async() => {
    if (!walletAddress) return
    await getAppConfig()
    await queryAllowance()
  })

  return $$({
    currentAllowance,
    allowanceModal,
    createTokenCost,
    payTokenName,
    payTokenAddress,
    appContractName,
    platformCommission,
    mobileMenuOpen,
    navigation,
    queryAllowance,
    showAllowanceModal,
  })
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(appStore, import.meta.hot))
