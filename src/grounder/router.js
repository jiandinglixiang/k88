import { GrounderBetting } from '../model/common/Lottery'
import GrounderMatch from './view/betting/GrounderMatch'

const orderDetial = () => import('./view/order/OrderDetail.vue')
const orderDetailScheme = () => import('./view/order/OrderDetailScheme.vue')

const routes = [
  {
    path: '/orderDetial/:id',
    name: 'GrounderOrderDetail',
    component: orderDetial
  },
  {
    path: '/OrderDetailScheme',
    name: 'OrderDetailScheme',
    component: orderDetailScheme
  },
  {
    path: '/grounder_betting',
    name: GrounderBetting,
    component: GrounderMatch
  },
  {
    path: '/PaymentNoticeSubmitted',
    name: 'PaymentNoticeSubmitted',
    component: () => import(`./view/payment/PaymentNoticeSubmitted.vue`)
  }
]
export default routes
