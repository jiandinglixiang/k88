/**
 * Created by weishuwen on 2017/3/30.
 */
import Vuex from 'vuex'
import Vue from 'vue'
import user from './user/index'
import scheme from './scheme/index'
import payment from './payment/index'
import betting from './betting/index'
import home from './home/index'
import prize from './prize/index'
import score from './score/index'
import information from './information/index'

Vue.use(Vuex)
// 保存数据结构留作初始化使用
sessionStorage.setItem('vue-x', JSON.stringify({
  home: home.state,
  user: user.state,
  scheme: scheme.state,
  payment: payment.state,
  betting: betting.state,
  prize: prize.state,
  information: information.state,
  score: score.state
}))
const modules = {
  home,
  user,
  scheme,
  payment,
  betting,
  prize,
  information,
  score
}
export default new Vuex.Store({ modules })
