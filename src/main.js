import Vue from 'vue'
import App from './App.vue'
import '@babel/polyfill'
import router from './router'
import store from './store/index'
import './common/infiniteScroll' // 无限滚动指令
import './common/directive' // 自定义的指令
import './common/filter' // 自定义的过滤器
import device from './common/device.js'
import { H5postmsg } from './common/postmsg'

device(store)
Vue.config.devtools = process.env.NODE_ENV !== 'production' || !!localStorage.getItem('devtools')
Vue.config.productionTip = false

window.addEventListener('message', function (event) {
  if (H5postmsg.post && event.source === window.parent) {
    H5postmsg.post = false
    H5postmsg.isH5 = location.href.indexOf('ish5=true') !== -1
    H5postmsg.origin = event.origin
    H5postmsg.source = event.source
    H5postmsg.source.postMessage(JSON.stringify({ response: -1 }), H5postmsg.origin)
  }
}, false)

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
