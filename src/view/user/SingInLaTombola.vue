<template>
  <div class="sing-in-container">
    <v-head self-adaption="SingInLaTombola" title="签到成功"></v-head>
    <div class="one">
      <img alt="" src="../../assets/icon/money_integral.png">
      <span>积分+{{ signInData.sign_point }}</span>
    </div>
    <div class="two-time">
      <div :class="classShow(i)" :key="index" v-for="(i,index) in computedDate">
        <div class="integration">+{{ i.point }}</div>
        <div class="time">{{ i.show }}</div>
      </div>
    </div>
    <!--    <div class="three-hint-content">{{ signInData.is_get_gift? signInData.gift_name:'恭喜您获得一次抽奖机会' }}</div>-->
    <!--    <div class="La-tombola-area">-->
    <!--      <div>-->
    <!--        <div id="Scanvas" ref="Scanvas">-->
    <!--          <img :src="signInData.gift_url" alt="" class="awards" v-if="showImg">-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <article-purchase-heat/>-->
  </div>
</template>

<script>//
// import ArticlePurchaseHeat from '../../components/ArticlePurchaseHeat.vue'
import { mapActions, mapState } from 'vuex'
import { SIGN_IN_ACCEPT_THE_PRIZE } from '../../store/user/types'

export default {
  name: 'SingInLaTombola',
  data () {
    return {
      showImg: false
    }
  },
  mounted () {
    const th$is = this
    // let execute = true
    if (th$is.signInData.is_get_gift) {
      th$is.showImg = true
    } else {
      // loading.show()
      // import('../../assets/js/wScratchPad.min.js').then(jQuery => {
      //   loading.hide()
      //   jQuery.default(th$is.$refs.Scanvas).wScratchPad({
      //     size: 60,
      //     bg: (th$is.signInData && th$is.signInData.gift_url) || '#ff6271',
      //     fg: require('../../assets/La_tombola_mask.png'),
      //     realtime: true,
      //     scratchDown: function (event, percent) {
      //       if (execute && th$is.signInData) {
      //         execute = false
      //         th$is.acceptThePrize(th$is.signInData.gift_id)
      //       }
      //     },
      //     cursor: 'pointer'
      //   })
      // })
    }
  },
  methods: {
    classShow (item) {
      if (item.lastOne) {
        if (item.isSingIn) {
          return { 'two-time-end-item': true, 'now-integral': true }
        }
        return { 'two-time-end-item': true }
      } else {
        if (item.isSingIn) {
          return { 'two-time-item': true, 'now-integral': true }
        }
        return { 'two-time-item': true }
      }
    },
    ...mapActions({
      acceptThePrize: SIGN_IN_ACCEPT_THE_PRIZE
    })
  },
  computed: {
    ...mapState({
      signInData: state => state.user.signIn
    }),
    computedDate () {
      let isSingIn = true// 在今天和之前都是true
      if (this.signInData.sign_list && this.signInData.sign_list.length) {
        return this.signInData.sign_list.map((item, index, tg) => {
          const lastOne = tg.length === (index + 1) // 最后一个
          const nowDate1 = new Date()
          const nowDate2 = [nowDate1.getMonth(), nowDate1.getDate()]
          const itemDate1 = new Date(item.date * 1000)
          const itemDate2 = [itemDate1.getMonth(), itemDate1.getDate()]
          if (isSingIn && nowDate2[0] === itemDate2[0] && nowDate2[1] === itemDate2[1]) {
            isSingIn = false
            return { ...item, show: '今天', isSingIn: true, lastOne }
          } else if (nowDate2[0] === itemDate2[0] && (nowDate2[1] + 1) === itemDate2[1]) {
            return { ...item, show: '明天', isSingIn, lastOne }
          } else {
            itemDate2[0] += 1
            return { ...item, show: itemDate2.join('.'), isSingIn, lastOne }
          }
        })
      }
      return []
    }
  }
  // components: {
  //   ArticlePurchaseHeat
  // }
}
</script>

<style scoped>
  .sing-in-container {
    /*background-color: #e73f40;*/
    padding-bottom: 30px;
    min-height: 100vh;
  }

  .sing-in-container .head {
    background-color: transparent;
    color: white;
  }

  .sing-in-container .one {
    margin: 30px 0 0 0;
    color: white;
    font-size: .47rem;
    line-height: 1;
    text-align: center;
    height: 2em;
  }

  .sing-in-container .one img {
    width: 2em;
    height: 2em;
    vertical-align: middle;
  }

  .two-time {
    position: relative;
    width: 73%;
    margin: 50px auto 20px auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .two-time-item {
    position: relative;
    width: 16.6%;
    margin-right: 5%;
    color: #FF9C37;
    text-align: center;
  }

  .two-time-item:after {
    position: absolute;
    right: -31.22%;
    top: .58rem;
    content: '';
    width: 31.22%;
    height: 2px;
    background-color: #FF9C37;
  }

  .two-time-end-item .integration, .two-time-item .integration {
    height: 1.17rem;
    line-height: 1.17rem;
    border: 2px #FF9C37 solid;
    border-radius: 100%;
    font-size: .43rem;
  }

  .two-time-end-item .time, .two-time-item .time {
    font-size: .37rem;
    margin-top: 5px;
  }

  .two-time-end-item {
    position: relative;
    width: 16.6%;
    color: #FF9C37;
    text-align: center;
  }

  .two-time-end-item.now-integral .integration, .two-time-item.now-integral .integration {
    position: relative;
    border-color: #FF9C37;
    background-color: #FBC63A;
    color: #131313;
  }

  .two-time-end-item.now-integral .integration:after, .two-time-item.now-integral .integration:after {
    content: '';
    position: absolute;
    bottom: -0.09rem;
    right: -0.06rem;
    width: .31rem;
    height: .31rem;
    background: url("../../assets/icon/white_check.png") no-repeat;
    background-color: #FF9C37;
    background-size: 100%;
    border-radius: 100%;
  }

  .three-hint-content {
    color: white;
    font-size: .42rem;
    text-align: center;
    margin-bottom: 20px;
  }

  .La-tombola-area {
    width: 90%;
    margin: 0 auto;
    height: 3.75rem;
    background: url('../../assets/la_tombola-area.png') repeat-y left top, url('../../assets/la_tombola-area.png') repeat-y right top;
    background-size: 14px 20px;
    padding: 0 7px;
  }

  .La-tombola-area > div {
    background-color: white;
    width: 100%;
    height: 100%;
    padding: 7px 7px;
  }

  #Scanvas {
    position: relative;
    background-image: url("../../assets/La_tombola_mask.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    overflow: hidden;
  }

  .awards {
    width: 100%;
    height: 100%;
  }
</style>
<style>
  #Scanvas > img {
    z-index: 0;
  }

  #Scanvas > canvas {
    z-index: 2;
  }
</style>
