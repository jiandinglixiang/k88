<template>
  <div class="head">
    <span @click="goBack" class="back-icon" v-if="!hideBack"></span>
    <div>{{title}}</div>
    <span @click="goEleSport" class="order-icon" v-if="hideOrder"></span>
    <span class="right">
      <slot name="right"></slot>
    </span>
  </div>
</template>

<script>//
import { H5postmsg } from '../common/postmsg'

export default {
  name: 'head',
  props: ['title', 'hideBack', 'goApp', 'hideOrder'],
  methods: {
    goBack () {
      if (this.goApp) {
        console.log(H5postmsg)
        if (H5postmsg.isH5) {
          //  h5
          window.parent.postMessage(JSON.stringify({ response: 4 }), '*')
        } else {
          location.href = 'goAppIndex'
        }
      } else {
        this.$router.back()
      }
    },
    goEleSport () {
      // 电竞订单
      window.parent.postMessage(JSON.stringify({ response: 7 }), '*')
    }
  }
}
</script>
<style lang="scss">
  .head {
    position: relative;
    padding: 0 20px;
    height: 40px;
    font-size: 18px;
    text-align: center;
    line-height: 40px;
    margin-bottom: 1px;
    @if ($lotteryIg) {
      background: #1A1003;
      color: #fff;
    } @else {
      background: $c131313;
      color: $cFFfFFF;
    }
    .order-icon {
      position: absolute;
      right: 10px;
      top: 2px;
      width: 36px;
      height: 36px;
      background: url("../assets/icon/icon_electronic_sports.png") no-repeat center;
      -webkit-background-size: cover;
      background-size: cover;
    }
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
