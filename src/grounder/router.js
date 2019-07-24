import { GrounderBetting } from '../model/common/Lottery'
import GrounderMatch from '@/grounder/view/betting/GrounderMatch'

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
  }
]
export default routes
