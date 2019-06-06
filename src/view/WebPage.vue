<template>
  <div class="web-page">
    <v-head :title="title" v-show="showHead"/>
    <iframe :src="url" @error="hide" @load="OnLoad" frameborder="0" ref="content" scrolling="auto"></iframe>
  </div>
</template>

<script>//
import loading from '../common/loading'
import { Toast } from 'mint-ui'

export default {
  name: 'webPage',
  data () {
    return {
      showHead: true,
      title: '加载中...',
      url: '',
      post: false // 是否监听message事件
    }
  },
  methods: {
    receiveMessage (event) {
      // console.log('Parent', event)
      if (event.data && typeof event.data === 'string') {
        const data = JSON.parse(event.data)
        if (data.response >= 0) {
          const path = {}
          if (data.response === 2) {
            path.path = '/competition'
          } else if (data.response === 1) {
            path.path = '/addressList'
          } else if (data.response === 3) {
            path.path = '/recharge'
          } else if (data.response === 4) {
            this.$router.replace({ path: '/' })
            return
          } else if (data.response === 6) {
            this.$router.back()
            return
          } else if (data.response === 7) {
            path.path = '/store'
          }
          path.path && this.$router.push(path)
        } else if (data.response === -1) {
          console.log('ok', event)
        }
      }
    },
    goLogin () {
      Toast('请登录')
      this.$router.replace({
        path: '/login',
        query: { ...(this.$route.query), back: false, redirect: this.$route.path }
      })
    },
    OnLoad () {
      this.hide()
      this.$refs.content.style.minHeight = (window.innerHeight - (this.showHead ? 41 : 0)) + 'px'
      this.post && this.$refs.content.contentWindow.postMessage('token.Token' || '', `*`)
    },
    hide () {
      loading.hide()
    }
  },
  created () {
    loading.show()
    const query = this.$route.query
    query.title && (this.title = query.title)
    query.showHead === 'false' && (this.showHead = false)
    if (query.post) {
      this.post = true
      this.url = query.url
      window.addEventListener('message', this.receiveMessage, false)
    } else {
      this.url = query.url
    }
  },
  beforeDestroy () {
    this.post && window.removeEventListener('message', this.receiveMessage, false)
  }
}
</script>

<style>
  .web-page {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 640px;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .web-page iframe {
    width: 100%;
    /*height: 100%;*/
    z-index: 0;
  }
</style>
