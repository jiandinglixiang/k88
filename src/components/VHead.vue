<template>
  <div class="head">
    <span class="back-icon" @click="goBack" v-if="!hideBack"></span>
    <div>{{title}}</div>
    <span class="right">
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>
  import router from '../router/index'
  import { H5postmsg } from '../common/postmsg'

  export default {
    name: 'head',
    props: ['title', 'hideBack', 'goApp'],
    methods: {
      goBack () {
        if (this.goApp) {
          console.log(H5postmsg)
          if (H5postmsg.isH5) {
            //  h5
            window.parent.postMessage(JSON.stringify({response: 4}), '*');
          } else {
            location.href = 'goAppIndex';
          }
        } else {
          router.go(-1);
        }
      }
    }
  }
</script>
<style>
  @import "../style/icon.css";
</style>
<style lang="scss">
  .head {
    position: relative;
    padding: 0 20px;
    height: 40px;
    background: $c131313;
    font-size: 18px;
    color: $cFFfFFF;
    text-align: center;
    line-height: 40px;
    margin-bottom: 1px;
  }

  .head .back-icon {
    position: absolute;
    left: 5px;
    top: 0;
    background: url("../assets/icon/white_back_icon.png") no-repeat center;
    background-size: 50% 50%;
    height: 40px;
    width: 25px;
  }

  .head .right {
    position: absolute;
    right: 10px;
    font-size: 14px;
    color: $cFFfFFF;
    top: 0;
  }
</style>
