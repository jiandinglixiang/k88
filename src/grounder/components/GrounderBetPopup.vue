<template>
  <div id="g-grounder-betting" @click.stop @touchmove.stop.prevent>
    <p class="g-vs-team">
      <span>{{itemData.home}}</span>
      <span>VS</span>
      <span>{{itemData.guest}}</span>
    </p>
    <div class="g-betting-odds">
      <p><span>{{itemData.BET_gameName}}</span><span>{{itemData.BET_teamName}}</span></p>
      <p><span>{{ itemData.BET_text}} @</span><span class="odds"
                                                    :class="itemData.BET_oddStatus">{{itemData.BET_odds}}</span></p>
      <div class="g-odds-refresh" @click="$emit('fifteenUpdate')"></div>
    </div>
    <div class="g-remind" v-show="changeMsg"><img src="../assets/remind_001.png" alt=""><span>{{changeMsg}}</span></div>
    <div class="g-input-number">
      <div class="g-input-top">
        <div>投注金额</div>
        <p>账户余额 {{mine.balance}}元</p>
      </div>
      <input
        type="number"
        placeholder="输入投注金额"
        :disabled="disabledInput"
        v-model="money"
        maxlength="6"
      >
      <div class="g-disabled" v-show="!disabledInput"></div>
      <div class="g-input-bottom">
        <div>预计奖金 <span style="color: #3393FF">{{expectBonuses}}</span></div>
        <p>投注上限 {{itemData.BET_maxMoney}}</p>
      </div>
    </div>
    <red-employ
      :lottery-id="itemData.BET_lotteryId"
      :update-data="maskShow"
      :red-obj.sync="redObj"
    />
    <div class="g-submit-button">
      <button :disabled="disabledPayment" @click="payment">{{antiShake}}</button>
    </div>
  </div>
</template>

<script>// 投注弹窗
import RedEmploy from './RedEmploy.vue'
import { mapState } from 'vuex'
import { LotteryId } from '../../store/constants.js'
import { copy, floor } from '../../common/util.js'
import { MINE_INFO } from '../../store/user/types.js'
import { oddDiscern } from '../store/betting'
import HTTP from '../http.js'
import { Toast } from '../../common/toast.js'
import { MessageBox } from 'mint-ui'

export default {
  name: 'GrounderBetPopup',
  components: { RedEmploy },
  props: {
    maskShow: Boolean
  },
  data () {
    return {
      antiShake: '付款',
      money: '', // 输入金额
      redObj: null // 红包
    }
  },
  computed: {
    ...mapState({
      mine: state => state.user.mine,
      itemData (state) {
        const betItem = state.grounder.betItem
        if (!betItem) return {}
        const lottery = state.grounder[betItem.lotteryId]
        const sizeBall = betItem.lotteryId === 904 // 大小球
        const letBall = betItem.lotteryId === 903
        const objKey = (letBall && 'betting_score_letball') || (sizeBall && 'betting_score_sizeball')
        const bonusLimit = state.user.mine.run_bonus_limit || 0
        let betObj = {}
        const noBet = lottery.some(v => {
          const isEq = v.id * 1 === betItem.Id[0] * 1
          return isEq && v.schedules.some(value => {
            const isEq2 = value.id * 1 === betItem.Id[1] * 1
            if (isEq2) betObj = copy(value)
            return isEq2
          })
        })
        if (!noBet) return {}
        betObj.BET_gameName = LotteryId[betItem.lotteryId]
        betObj.BET_teamName = betItem.key.startsWith('1', betItem.key.length - 1) ? betObj.home : betObj.guest
        const oddss = betObj.betting_score_odds && betObj.betting_score_odds[objKey] && betObj.betting_score_odds[objKey][betItem.key]
        const odd = oddss ? oddDiscern(oddss) : {}
        betObj.BET_key = betItem.key
        betObj.BET_oddStatus = odd.oddStatus
        betObj.BET_odds = odd.odd
        betObj.BET_text = betItem.text
        betObj.BET_lotteryId = betItem.lotteryId
        betObj.BET_maxMoney = Math.floor(bonusLimit / (odd.odd || 1))
        return betObj
      }
    }),
    expectBonuses () {
      if (!(/^\d+(\.\d+)?$/.test(this.money))) return this.itemData.BET_odds
      return floor(this.money * this.itemData.BET_odds || 1)
    },
    changeMsg () {
      if (!this.itemData.BET_odds) {
        return '投注比赛失效'
      }
      if (this.itemData.is_lock) {
        return '投注已暂停'
      }
      if (this.itemData.BET_oddStatus) {
        return '赔率已发生变化'
      }
      // '赔率已发生变化'
      return ''
    },
    disabledPayment () {
      if (this.antiShake !== '付款') return true
      if (!this.itemData.BET_odds) return true
      if (this.itemData.is_lock * 1) return true
      return !this.money
    },
    disabledInput () {
      if (this.itemData.BET_odds) {
        return false
      }
      return !!this.itemData.is_lock * 1
    }
  },
  methods: {
    async getMineInfo () {
      const data = await HTTP.getUserInfo()
      this.$store.commit(MINE_INFO, data)
    },
    async payment () {
      let balance = this.mine.balance
      let redCo = {}
      let action = ''
      if (!this.itemData.BET_odds) {
        return Toast('投注比赛消失')
      }
      if (this.itemData.is_lock) {
        return Toast('投注已暂停')
      }
      if (!(/^\d+$/.test(this.money))) {
        return Toast('金额必须是整数')
      }
      if (this.money < 10) {
        return Toast('最低投注额为10元!')
      }
      if (this.money > this.itemData.BET_maxMoney) {
        return Toast(`超出投注上限(${this.money - this.itemData.BET_maxMoney}.00元)`)
      }
      if (this.redObj) {
        // 红包校验
        // const type = this.redObj.type * 1
        // if (type === 1) {
        balance += (this.redObj.balance * 1)
        redCo = copy(this.redObj)
        // } else if (type === 2) {
        // 满减红包
        // }
      }
      if (this.money > balance) {
        action = await MessageBox({
          title: '提示',
          message: '余额不足,请充值!',
          showCancelButton: true,
          confirmButtonText: '去充值',
          confirmButtonClass: 'order-message-box',
          closeOnClickModal: false
        })
        if (action !== 'confirm') return
        return this.$router.push({
          name: 'Payment',
          query: { lack: (Math.floor((this.money - balance) / 100) * 100 + 300).toFixed(2) }
        })
      }
      this.antiShake = '付款中...'
      const data = await this.postOrder().catch((err) => {
        if (err !== 'cancel') Toast('下单失败')
        console.log(err)
        this.antiShake = '付款'
        return Promise.reject(err)
      })
      this.playSubmit(redCo.id, data.id, data.sign).catch(err => {
        this.antiShake = '付款'
        Toast('支付失败')
        console.log(err)
      })
    },
    async postOrder (odds) {
      if (odds) {
        const action = await MessageBox({
          title: '提示',
          message: '赔率发生变动是否接受?',
          showCancelButton: true,
          confirmButtonText: '接受付款',
          confirmButtonClass: 'order-message-box',
          closeOnClickModal: false
        })
        if (action !== 'confirm') return Promise.reject(action)
      }
      const postData = {
        series: '101',
        lottery_id: this.itemData.BET_lotteryId,
        play_type: '1', // 1单关2过关
        stake_count: '1',
        total_amount: this.money,
        schedule_orders: [{
          bet_number: this.itemData.BET_key,
          schedule_id: this.itemData.id,
          is_sure: '0', // 胆
          odds: odds || this.itemData.BET_odds
        }]
      }
      return HTTP.postWebBetPreBetYp(postData).then(data => {
        if (!data.update_odds) return data
        if (!odds && data.update_odds[postData.schedule_orders[0].schedule_id] && data.update_odds[postData.schedule_orders[0].schedule_id][postData.schedule_orders[0].bet_number]) {
          return this.postOrder(floor(data.update_odds[postData.schedule_orders[0].schedule_id][postData.schedule_orders[0].bet_number]))
        }
        return Promise.reject(data)
      })
    },
    playSubmit (red, id, sign) {
      if (!id || !sign) return Promise.reject(new Error('参数错误'))
      return HTTP.postBetSubmitPay(red || 0, id, sign).then(async ok => {
        // console.log(ok)
        // Toast('下单成功');
        this.$emit('update:mask-show', false)
        const action = await MessageBox({
          title: ` `,
          message: '下单成功',
          showCancelButton: true,
          confirmButtonText: '查看订单',
          confirmButtonClass: 'order-message-box',
          closeOnClickModal: false
        })
        if (action !== 'confirm') return (this.antiShake = '付款')
        return this.$router.push({ name: 'GrounderOrderDetail', params: { id: ok.order_id } })
      })
    }
  },
  created () {
    this.getMineInfo()
  },
  watch: {
    async maskShow (val) {
      if (val) {
        this.money = ''
        this.redObj = null
        this.getMineInfo()
      }
    }
  }
}
</script>

<style scoped lang="scss">
  button.order-message-box {
    background-color: $cffC63A;
    color: $c131313;
  }

  #g-grounder-betting {
    max-width: 300px;
    margin: 0 auto;
    align-self: center;
    background-color: white;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;

    > .g-vs-team {
      color: #131313;
      font-weight: bold;
      font-size: 14px;
      margin: 10px 10px 0 10px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      > span {
        max-width: 45%;
      }

      > span:nth-child(2) {
        margin: 0 5px;
      }
    }

    > .g-betting-odds {
      margin: 0 10px;
      background-color: #fbf7f0;
      position: relative;
      border-radius: 4px;

      > p {
        line-height: 25px;
        text-align: center;
        color: #FFC63A;
        font-weight: bold;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;

        .up::after, .down::after {
          display: none;
          content: '';
          vertical-align: middle;
          margin-left: 5px;
          width: 0;
          height: 0;
          border-width: 4px;
          border-style: solid dashed dashed dashed;
        }

        .up {
          color: #1ac456;

          &::after {
            display: inline-block;
            margin-bottom: 6px;
            border-color: transparent transparent #1ac456 transparent;
          }
        }

        .down {
          color: #f33;

          &::after {
            display: inline-block;
            border-color: #f33 transparent transparent transparent;
          }
        }

        span:first-child {
          margin-right: 5px;
        }
      }

      > .g-odds-refresh {
        position: absolute;
        right: -10px;
        top: -10px;
        width: 40px;
        height: 40px;
        /*background-color: linear-gradient(0deg, rgba(255, 136, 8, 1), rgba(255, 67, 91, 1));*/
        background: url("../assets/h5.gif") no-repeat center center;
        background-size: 20px 20px;
      }
    }

    > .g-remind {
      margin-top: 10px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      color: #FF3333;
      font-weight: 500;

      img {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }

    > .g-input-number {
      position: relative;
      margin: 10px 0;
      padding: 10px;
      background-color: #F4F4F4;

      > input[type="number"] {
        background-color: #ddd;
        border: 0;
        text-align: center;
        color: #999999;
        font-weight: bold;
        height: 34px;
        margin: 5px 0;
      }

      > input[disabled='disabled'] {
        &::placeholder {
          color: #ddd;
        }
      }

      > input[disabled='disabled'] ~ .g-disabled {
        // 禁止提示
        width: 34px;
        height: 34px;
        background: url("../assets/ic_selclose.png") no-repeat center center;
        background-size: 15px 20px;
        transform: translate(-50%, -50%);
        position: absolute;
        color: #999999;
        left: 50%;
        top: 50%;
      }

      .g-input-top, .g-input-bottom {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        font-weight: 500;
      }

      .g-input-top {
        > div {
          font-size: 13px;
          color: #131313;
          font-weight: bold;
        }

        > p {
          color: #999999;
          max-width: 80%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .g-input-bottom {
        color: #999;
        height: 17px;

        > div {
          max-width: 60%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    > .g-submit-button {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      height: 45px;

      button {
        width: 80%;
        height: 40px;
        background: linear-gradient(90deg, rgba(255, 167, 13, 1), rgba(255, 198, 58, 1));
        box-shadow: 0 0 3px 0 rgba(83, 10, 10, 0.14);
        border-radius: 17px;
        font-size: 14px;
        font-weight: bold;
        color: #131313;
      }

      button[disabled='disabled'] {
        background: linear-gradient(90deg, rgba(153, 153, 153, 1), rgba(204, 204, 204, 1));
        box-shadow: 0 0 3px 0 rgba(83, 10, 10, 0.14);
        color: white;
      }
    }
  }
</style>
