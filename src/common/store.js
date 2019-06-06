import store from 'store'
import vuex from '../store/index'

const user = {
  token: null,
  setToken (token) {
    user.token = token
    setTimeout(function () {
      const time = Math.floor(new Date().getTime() / 1000)
      store.set('user', { token, time })
    }, 10)
    return token
  },
  getToken () {
    if (user.token) return user.token
    const storeObj = store.get('user')
    const nowTime = Math.floor(new Date().getTime() / 1000)
    if (storeObj && storeObj.time && storeObj.token && storeObj.time > nowTime - 259200/* 3天 */) {
      user.token = storeObj.token
      return user.token
    }
    return user.clearToken(true)
  },
  clearToken (x) {
    user.token = null
    store.clearAll()
    if (x) return null
    const vx = sessionStorage.getItem('vue-x')
    vx && vuex.replaceState(JSON.parse(vx))
    return null
  }
}
let pageJump = {
  fromSet (key, router) {
    const params = {
      path: router.path, query: router.query
    }
    return store.set('from_' + key, params)
  },
  fromGet (key) {
    let router = store.get('from_' + key)
    return router
  }
}
let recommendIssue = {
  set (obj) {
    return store.set('recommend_issue', obj)
  },
  get () {
    return store.get('recommend_issue')
  },
  clear () {
    return store.remove('recommend_issue')
  }
}
export {
  user, pageJump, recommendIssue
}
