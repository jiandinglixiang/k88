<template>
  <div @click="goVip" class="progress">
    <div></div>
    <div class="progress-grade">
      <div class="progress-title"><span class="left">{{ userData.user_level_name|| 'vip*' }}</span><span>{{ nextData.next_level_name||'vip*' }}</span>
      </div>
      <div class="container">
        <div :style="{width:(userData.user_exp/nextData.next_level_exp*100)+'%'}" class="body"></div>
      </div>
    </div>
    <div class="progress-bottom"><span>{{  userData.user_exp}}</span>/{{ nextData.next_level_exp }}</div>
    <!--    <div @click="goVip" class="sign-button"><span>VIP中心<div class="mine-white-back-icon"></div></span></div>-->
  </div>
</template>

<script>//
export default {
  name: 'PProgress',
  props: {
    userData: { type: Object },
    nextData: { type: Object }
  },
  methods: {
    goVip () {
      // if (process.env.NODE_ENV === 'production') {
      //   this.$router.push({
      //     name: 'WebPage',
      //     query: {
      //       title: 'VIP中心',
      //       url: `https://phone-api.tigercai.com/index.php?s=/Integral/User/vipCenter`
      //     }
      //   })
      // } else {
      //   this.$router.push({
      //     name: 'WebPage',
      //     query: {
      //       title: 'VIP中心',
      //       url: `//test.h5.phone.t.ebao123.com/Integral/User/vipCenter`
      //     }
      //   })
      // }
    }
  }
}
</script>

<style scoped>
  .progress {
    position: relative;
    /*padding-right: 25%;*/
  }

  .progress-grade {
    width: 100%;
  }

  .sign-button {
    position: absolute;
    right: 0;
    top: 0;
    width: 25%;
    height: 100%;
    color: white;
    font-weight: bold;
    font-size: 14px;
    line-height: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .sign-button .mine-white-back-icon {
    display: inline-block;
    vertical-align: bottom;
  }

  .progress-title {
    position: relative;
    width: 100%;
    overflow: hidden;
    text-align: right;
    color: white;
    font-weight: bold;
  }

  .progress-title .left {
    max-width: 50%;
    float: left;
  }

  .progress-grade .container {
    width: 100%;
    background-color: #313131;
    overflow: hidden;
    border-radius: 3px;
    height: 8px;
    margin: 2% 0;
  }

  .progress-grade .body {
    height: 100%;
    background-color: #FFC63A;
  }

  .progress-bottom {
    width: 100%;
    text-align: center;
    color: #fff;
  }

  .progress-bottom span {
    color: #FFC63A;
  }
</style>
