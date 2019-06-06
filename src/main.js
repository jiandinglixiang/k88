import Vue from 'vue'
import App from './App.vue'
import '@babel/polyfill'
import router from './router'
import store from './store/index'
import './common/infiniteScroll' // 无限滚动指令
import './common/directive' // 自定义的指令
import './common/filter' // 自定义的过滤器
import device from './common/device.js'
import './style/icon.scss'
import './style/common.scss'

device(store)
Vue.config.devtools = process.env.NODE_ENV !== 'production' || !!localStorage.getItem('devtools')
Vue.config.productionTip = false

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
