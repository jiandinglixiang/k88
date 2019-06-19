import Vue from 'vue'
import Router from 'vue-router'
import Login from './view/user/Login'
import Register from './view/user/Register'
import Orders from './view/user/Orders'
import OrderDetail from './view/user/OrderDetail'
import OrderDetailScheme from './view/user/OrderDetailScheme'
import Mine from './view/user/Mine.vue'
import ForgotPassword from './view/user/ForgotPassword.vue'
import UserInfo from './view/user/UserInfo.vue'
import IDCard from './view/user/IDCard.vue'
import BankCard from './view/user/BankCard.vue'
import Cash from './view/user/Cash.vue'
import CashDetail from './view/user/CashDetail.vue'
import Football from './view/scheme/Football.vue'
import FootballConfirm from './view/scheme/FootballConfirm'
import PaymentConfirm from './view/paymennt/PaymentConfirm.vue'
import PaymentComplete from './view/paymennt/PayComplete.vue'
import Payment from './view/paymennt/Payment.vue'
import PaymentOrder from './view/paymennt/PaymentOrder.vue'
import NewRegister from './view/user/NewRegister.vue'
import FootballBetting from './view/betting/FootballBetting.vue'
import BasketballBetting from './view/betting/BasketballBetting.vue'
import SportsConfirm from './view/betting/SportsConfirm.vue'
import SportsOptimize from './view/betting/SportsOptimize.vue'
import FootballInformation from './view/information/FootballInformation.vue'
import BasketballInformation from './view/information/BasketballInformation.vue'
import Home from './view/home/Home.vue'
import More from './view/home/More.vue'
import SYXWBetting from './view/betting/SYXWBetting.vue'
import SSQBetting from './view/betting/SSQBetting.vue'
import K3Betting from './view/betting/K3Betting.vue'
import FC3DBetting from './view/betting/FC3DBetting.vue'
import SFCBetting from './view/betting/SFCBetting.vue'
import DigitalConfirm from './view/betting/DigitalConfirm.vue'
import SFCConfirm from './view/betting/SFCConfirm.vue'
import WebPage from './view/WebPage.vue'
import PromotionElevenPickFive from './view/promotion/ElevenPickFive.vue'
import PromotionTest from './view/promotion/Test.vue'
import PrizeList from './view/prize/List.vue'
import PrizeDetail from './view/prize/Detail.vue'
import PrizeSportsDetail from './view/prize/SportsDetail.vue'
import { pageJump, user } from './common/store'
import Score from './view/score/score.vue' // -我的
import AHFooter from './view/asianHandicap/AHFooter.vue'
import Index from './view/Index.vue'
// 合买与跟单
// const BuyTogether = () => import('./view/buyTogether/BuyTogether.vue')// 开始合买
// const buyTogetherLobby = () => import('./view/buyTogether/buyTogetherLobby.vue')// 合买大厅
// const BuyTogetherOrderDetail = () => import('./view/user/Order/OrderDetail/BuyTogetherOrderDetail.vue')// 合买订单详情
// const Standings = () => import('./view/buyTogether/Standings.vue')// 合买战绩
// const SubscribeList = () => import('./view/buyTogether/SubscribeList.vue')// 已购列表
// const MerchandiserLobby = () => import('./view/merchandiser/MerchandiserLobby.vue')// 跟单大厅
// const Crunchies = () => import('./view/merchandiser/Crunchies.vue')// 榜单
// const RecommendDetails = () => import('./view/merchandiser/RecommendDetails.vue')// 榜单
// const ChaseNumberDetail = () => import('./view/user/Order/OrderDetail/ChaseNumberDetail.vue')// 榜单
// const PaymentCompound = () => import('./view/paymennt/PaymentCompound.vue')// 支付合买,推荐跟单
import grounder from './grounder/router' // 滚球路由模块
// import Hello from '../components/Hello.vue';
const SingInLaTombola = () => import('./view/user/SingInLaTombola.vue')// 签到刮奖
const redManage = () => import('./view/user/redPacket/redManage.vue')// 红包管理st
const redPurchase = () => import('./view/user/redPacket/redPurchase.vue')// 红包购买
const exchangeRed = () => import('./view/user/redPacket/exchangeRed.vue')// 红包兑换end
const integralStore = () => import('./view/user/redPacket/integralStore.vue')// 积分兑换st
const integralDetails = () => import('./view/user/redPacket/integralDetails.vue')// 积分详情
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '',
          name: 'Home',
          component: Home
        },
        {
          path: 'prize/list',
          name: 'PrizeList',
          component: PrizeList
        },
        {
          path: 'Score',
          name: 'Score',
          component: Score
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requireAuth: true }
        },
        {
          path: 'mine',
          name: 'Mine',
          component: Mine,
          meta: { requireAuth: true }
        }
      ]
    },
    {
      path: '/more',
      name: 'More',
      component: More
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forgot_password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/user_info',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/id_card',
      name: 'IDCard',
      component: IDCard
    },
    {
      path: '/bank_card',
      name: 'BankCard',
      component: BankCard
    },
    {
      path: '/cash',
      name: 'Cash',
      component: Cash
    },
    {
      path: '/cash_detail',
      name: 'CashDetail',
      component: CashDetail
    },
    {
      path: '/orders/:id',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: { requireAuth: true }
    },
    {
      path: '/orders/:id/scheme',
      name: 'OrderScheme',
      component: OrderDetailScheme,
      meta: { requireAuth: true }
    },
    {
      path: '/scheme/football',
      name: 'Football',
      component: Football
    },
    {
      path: '/scheme/football/confirm',
      name: 'FootballConfirm',
      component: FootballConfirm
    },
    {
      path: '/payment/confirm',
      name: 'PaymentConfirm',
      component: PaymentConfirm,
      meta: { requireAuth: true }
    },
    {
      path: '/payment/order',
      name: 'PaymentOrder',
      component: PaymentOrder,
      meta: { requireAuth: true }
    },
    {
      path: '/payment/complete',
      name: 'PaymentComplete',
      component: PaymentComplete,
      meta: { requireAuth: true }
    },
    {
      path: '/payment',
      name: 'Payment',
      component: Payment,
      beforeEnter (to, from, next) {
        from.name && pageJump.fromSet('Payment', from)
        next()
      }
    },
    {
      path: '/information/football/:id',
      name: 'FootballInformation',
      component: FootballInformation
    },
    {
      path: '/information/basketball/:id',
      name: 'BasketballInformation',
      component: BasketballInformation
    },
    {
      path: '/xincai_register',
      name: 'NewRegister',
      component: NewRegister,
      meta: { title: 'K88体育' }
    },
    {
      path: '/betting/football',
      name: 'FootballBetting',
      component: FootballBetting
    },
    {
      path: '/betting/basketball',
      name: 'BasketballBetting',
      component: BasketballBetting
    },
    {
      path: '/betting/syxw/:id',
      name: 'SYXWBetting',
      component: SYXWBetting
    },
    {
      path: '/betting/k3/:id',
      name: 'K3Betting',
      component: K3Betting
    },
    {
      path: '/betting/sfc/:id',
      name: 'SFCBetting',
      component: SFCBetting
    },
    {
      path: '/betting/fc3d/:id',
      name: 'FC3DBetting',
      component: FC3DBetting
    },
    {
      path: '/betting/confirm',
      name: 'DigitalConfirm',
      component: DigitalConfirm,
      meta: { requireAuth: true }
    },
    {
      path: '/betting/sports_confirm',
      name: 'SportsConfirm',
      component: SportsConfirm,
      meta: { requireAuth: true, query: { back: true } }
    },
    {
      path: '/betting/sfc_confirm',
      name: 'SFCConfirm',
      component: SFCConfirm
    },
    {
      path: '/betting/sports_optimize',
      name: 'SportsOptimize',
      component: SportsOptimize
    },
    {
      path: '/betting/digital/:id',
      name: 'SSQBetting',
      component: SSQBetting
    },
    {
      path: '/web',
      name: 'WebPage',
      component: WebPage
    },
    {
      path: '/prize/detail/:lottery',
      name: 'PrizeDetail',
      component: PrizeDetail
    },
    {
      path: '/prize/sports_detail/:lottery/:date',
      name: 'PrizeSportsDetail',
      component: PrizeSportsDetail
    },
    {
      path: '/promotion/elevenPickFive',
      name: 'PromotionElevenPickFive',
      component: PromotionElevenPickFive
    },
    {
      path: '/promotion/test',
      name: 'PromotionTest',
      component: PromotionTest
    },
    {
      path: '/asianHandicap/ah_footer',
      name: 'AHFooter',
      component: AHFooter
    },
    {
      path: '/redManage',
      name: 'redManage',
      component: redManage,
      meta: { requireAuth: true }
    },
    {
      path: '/exchangeRed',
      name: 'exchangeRed',
      component: exchangeRed,
      meta: { requireAuth: true }
    },
    {
      path: '/integralStore',
      name: 'integralStore',
      component: integralStore,
      meta: { requireAuth: true }
    },
    {
      path: '/integralDetails',
      name: 'integralDetails',
      component: integralDetails,
      meta: { requireAuth: true }
    },
    {
      path: '/redPurchase',
      name: 'redPurchase',
      component: redPurchase,
      meta: { requireAuth: true }
    },
    {
      path: '/SingInLaTombola',
      name: 'SingInLaTombola',
      component: SingInLaTombola,
      meta: { requireAuth: true }
    },
    ...grounder
  ]
})

// 全局导航钩子
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    localStorage.setItem('document_title', document.title)
    document.title = to.meta.title
  } else {
    document.title = localStorage.getItem('document_title') || process.env.APP_NAME || ''
  }
  // 判断该路由是否需要登录权限
  if (to.meta.requireAuth) {
    if (user.getToken()) {
      next()
    } else {
      next({ path: '/login', query: to.meta.query })
      // 将跳转的路由path作为参数，登录成功后跳转到该路由
    }
  } else {
    next()
  }
})

export default router
