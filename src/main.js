// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import './common/infiniteScroll' // 无限滚动指令
import './common/directive' // 自定义的指令
import './common/filter' // 自定义的过滤器
import { H5postmsg } from './common/postmsg'
// if (process.env.NODE_ENV === 'production') {
//   let targetProtocol = 'https:';
//   if (window.location.protocol !== targetProtocol) {
//     window.location.href = targetProtocol +
//       window.location.href.substring(window.location.protocol.length);
//   }
// }
Vue.config.devtools = true;
Vue.config.productionTip = false
// 动画暂时不用
// import 'vueg/css/transition-min.css'
// import vueg from 'vueg';
// Vue.use(vueg, router, {
//   forwardAnim: 'fadeInRight',
//   duration: 0.2
// });
window.addEventListener('message', function (event) {
  if (H5postmsg.post && event.source === window.parent) {
    H5postmsg.post = false
    H5postmsg.isH5 = location.href.indexOf('ish5=true') !== -1
    H5postmsg.origin = event.origin
    H5postmsg.source = event.source
    H5postmsg.source.postMessage(JSON.stringify({ response: -1 }), H5postmsg.origin)
  }
}, false)
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

