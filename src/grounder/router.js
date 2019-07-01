const orderDetial = () => import('./view/order/OrderDetail.vue')
const orderDetailScheme = () => import('./view/order/OrderDetailScheme.vue')

const routes = [
  {
    path: '/orderDetial/:id',
    name: 'OrderDetail1',
    component: orderDetial
  },
  {
    path: '/OrderDetailScheme',
    name: 'OrderDetailScheme',
    component: orderDetailScheme
  }
]
export default routes
