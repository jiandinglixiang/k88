import store from 'store'

let user = {
  token: null,
  setToken (token) {
    this.token = token
    store.set('user', { token: token })
    return this.token
  },
  getToken () {
    if (this.token) {
      return this.token
    }
    this.token = store.get('user') && store.get('user')['token']
    return this.token
  },
  clearToken () {
    this.token = null
    store.remove('user')
    return this.token
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
