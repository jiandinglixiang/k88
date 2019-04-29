<template>
  <div id="app">
    <div style="width: 100%;max-width: 640px;">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  function getArgs (url) {
    let args = {}
    let query = url.substr(url.indexOf('?') + 1)
    let pairs = query.split('&')
    for (let i = 0; i < pairs.length; i++) {
      let pos = pairs[i].indexOf('=')
      if (pos === -1) continue
      let argname = pairs[i].substring(0, pos)
      let value = pairs[i].substring(pos + 1)
      value = decodeURIComponent(value)
      args[argname] = value
    }
    return args
  }
  export default {
    name: 'app',
    created () {
      const args = getArgs(window.location.href)
      if (args.token) {
        if (args.token.lastIndexOf('#/') !== -1) args.token = args.token.substring(0, args.token.lastIndexOf('#/'))
        this.$store.commit('BASE_LOGIN', {user_token: args.token})
        this.$store.dispatch('MINE_INFO')
      }
    },
    mounted () {
      this.$nextTick(function () {
        setTimeout(function () {
          import('fastclick').then(FastClick => {
            FastClick.attach(document.body)
          })
        }, 100)
      })
    }
  }
</script>

<style lang="scss">
  @import "style/common.scss";
  @import "style/animate.scss";

  #app {
    width: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>
