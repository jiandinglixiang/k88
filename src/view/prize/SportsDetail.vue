<template>
  <div class="prize-sports-detail">
    <v-head :title="title">
      <div slot="right">
        <span @click="openPicker" class="dates"></span>
      </div>
    </v-head>
    <template v-for="(holder, key) in detail.list">
      <sports-prize-panel :holder="holder" :key="key"></sports-prize-panel>
    </template>
    <div class="bottom-fixed">
      <a @click="goBetting" class="btn" href="javascript:" v-if="detail.status*1 === 1">{{title}}投注</a>
      <a class="btn disabled" href="javascript:" v-else>暂停销售</a>
    </div>
    <mt-datetime-picker
      @confirm="selectedDate"
      ref="picker"
      type="date"
      v-model="pickerValue">
    </mt-datetime-picker>
  </div>
</template>

<script>//
import VHead from '../../components/VHead.vue'
import { GET_PRIZE_SPORTS_DETAIL, PRIZE_SPORT_DATE_SELECT, PRIZE_SPORT_RESET } from '../../store/prize/types'
import Lottery from '../../model/common/Lottery'
import SportsPrizePanel from './child/SportsPrizePanel.vue'
import { DatetimePicker } from 'mint-ui'
import Vue from 'vue'

Vue.component(DatetimePicker.name, DatetimePicker)
let lotteryId = 0
export default {
  name: 'prizeSportsDetail',
  data () {
    const date = this.$route.params.date ? new Date(this.$route.params.date * 1000) : Date.now()
    return {
      pickerValue: date
    }
  },
  computed: {
    detail () {
      return this.$store.state.prize.sportsDetail
    },
    title () {
      if (Lottery.isBasketBall(lotteryId)) {
        return '竞彩篮球'
      } else if (Lottery.isFootBall(lotteryId)) {
        return '竞彩足球'
      } else {
        return ''
      }
    }
  },
  methods: {
    goBetting () {
      this.$router.push({
        name: this.title === '竞彩篮球' ? 'BasketballBetting' : 'FootballBetting'
      })
    },
    openPicker () {
      this.$refs.picker.open()
    },
    selectedDate (date) {
      this.$store.commit(PRIZE_SPORT_DATE_SELECT, date.getTime() / 1000)
      this.$store.dispatch(GET_PRIZE_SPORTS_DETAIL, lotteryId)
    }
  },
  created () {
    lotteryId = this.$router.currentRoute.params.lottery
    if (lotteryId) {
      this.$store.commit(PRIZE_SPORT_RESET, this.$route.params.date)
      this.$store.dispatch(GET_PRIZE_SPORTS_DETAIL, lotteryId)
    } else {
      this.$router.back()
    }
  },
  components: { VHead, SportsPrizePanel }
}
</script>

<style lang="scss">
  .prize-sports-detail {
    height: 100%;
    overflow-y: auto;
    padding-bottom: 60px;
  }

  .prize-sports-detail .bottom-fixed {
    position: fixed;
    width: 100%;
    /*height: 52px;*/
    left: 0;
    bottom: 0;
    background: $cffC63A;
    /*padding: 8px 10px;*/
    /*border-top: 1px solid #ddd;*/
  }

  .prize-sports-detail .bottom-fixed .btn {
    height: 35px;
    line-height: 35px;
  }

  .prize-sports-detail .head .dates {
    background: url("../../assets/dates.png") no-repeat;
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
    display: inline-block;
    margin-top: 5px;
  }
  .mint-datetime-action {
     @if($lotteryIg) {
       color: $c999999;
    }
    &.mint-datetime-confirm {
      @if($lotteryIg) {
        color: $cffC63A;
      }
    }
  }
</style>
