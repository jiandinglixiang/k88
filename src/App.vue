<template>
  <div :height="Device.height"
       :width="Device.width"
       id="app"
       style="position: relative;min-height: 100vh;max-width: 640px;margin: 0 auto;background-color: #131313;">
    <router-view></router-view>
  </div>
</template>

<script>//
import Vue from 'vue'
import VHead from './components/VHead.vue'
import { mapState } from 'vuex'
import { user } from './common/store'

Vue.component('v-head', VHead)
export default {
  name: 'app',
  computed: {
    ...mapState({
      Device: state => ({
        height: state.home.Device.height,
        width: state.home.Device.width > 640 ? 640 : state.home.Device.width
      })
    })
  },
  created () {
    const token = user.getToken()
    token && this.$store.commit('LOGIN', { 'user_token': token })
  }
  // mounted () {
  //   this.$nextTick(function () {
  //     setTimeout(function () {
  //       import('fastclick').then(FastClick => {
  //         FastClick.attach(document.body)
  //       })
  //     }, 100)
  //   })
  // }
}
</script>
