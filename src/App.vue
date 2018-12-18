<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import 'babel-polyfill';
  import FastClick from 'fastclick';

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

  FastClick.attach(document.body);
  export default {
    name: 'app',
    created () {
      const args = getArgs(window.location.href)
      if (args.token) {
        if (args.token.lastIndexOf('#/') !== -1) args.token = args.token.substring(0, args.token.lastIndexOf('#/'))
        this.$store.commit('BASE_LOGIN', {user_token: args.token})
        this.$store.dispatch('MINE_INFO')
      }
    }
  }
</script>

<style lang="scss">
  @import "style/common.scss";
  @import "style/animate.scss";

  #app {
    height: 100%;
  }
</style>
