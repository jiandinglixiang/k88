<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import 'babel-polyfill';
  import FastClick from 'fastclick';
  import Util from './common/util';

  FastClick.attach(document.body);
  export default {
    name: 'app',
    created () {
      const data = Util.urlSearch();
      if (data.token) {
        this.$store.commit('BASE_LOGIN', {user_token: data.token})
        this.$store.dispatch('MINE_INFO')
      }
    }
  }
</script>

<style>
  @import "style/common.css";
  @import "style/animate.css";

  #app {
    height: 100%;
  }
</style>
