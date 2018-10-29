<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import 'babel-polyfill';
  import FastClick from 'fastclick';

  FastClick.attach(document.body);
  export default {
    name: 'app',
    created () {
      if (this.$route.query.token) {
        this.$store.commit('BASE_LOGIN', {user_token: this.$route.query.token})
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
