<template>
  <div class="sports-confirm">
    <v-head :title="title"></v-head>
    <div class="sports-confirm-container">
      <div class="operate-wrap">
        <a @click="addBetting" href="javascript:"><span class="plus-icon"></span>编辑/添加投注</a>
        <a @click="clearBettingList" href="javascript:"><span class="clear-icon"></span>清空</a>
      </div>
      <!--<scheme-box>-->
      <div style="padding: 2.3% 2.3% 0 2.3%;">
        <div
          :class="{'has-sure': betting.mode === 2,
          'padding': stylepadding,
          'stylehidden': stylehidden}"
          :key="betting.id"
          class="scheme-box-item"
          v-for="(betting, key) in bettingList">
          <template v-if="betting.lotteryId === 601">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <football-s-p-f-lottery :isConfirm="true" :schedule="betting"
                                    @onOptionSelected="onOptionSelected"></football-s-p-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 602">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <football-r-q-s-p-f-lottery :isConfirm="true" :schedule="betting"
                                        @onOptionSelected="onOptionSelected"></football-r-q-s-p-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 603">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <football-b-f-lottery :isConfirm="true" :schedule="betting"
                                  @onOptionSelected="onOptionSelected"></football-b-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 604">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <football-z-j-q-lottery :isConfirm="true" :schedule="betting"
                                    @onOptionSelected="onOptionSelected"></football-z-j-q-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 605">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <football-b-q-c-lottery :isConfirm="true" :schedule="betting"
                                    @onOptionSelected="onOptionSelected"></football-b-q-c-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 606">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <football-h-h-lottery :isConfirm="true" :schedule="betting"
                                  @onOptionSelected="onOptionSelected"></football-h-h-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 701">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <basketball-s-f-lottery :isConfirm="true" :schedule="betting"
                                    @onOptionSelected="onOptionSelected"></basketball-s-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 702">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <basketball-r-f-s-f-lottery :isConfirm="true" :schedule="betting"
                                        @onOptionSelected="onOptionSelected"></basketball-r-f-s-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 703">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <basketball-s-f-c-lottery :isConfirm="true" :schedule="betting"
                                      @onOptionSelected="onOptionSelected"></basketball-s-f-c-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 704">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <basketball-d-x-f-lottery :isConfirm="true" :schedule="betting"
                                      @onOptionSelected="onOptionSelected"></basketball-d-x-f-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 705">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <basketball-h-h-lottery :isConfirm="true" :schedule="betting"
                                    @onOptionSelected="onOptionSelected"></basketball-h-h-lottery>
          </template>
          <template v-else-if="betting.lotteryId === 901">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <ah-qc-r-q-lottery :amountMax="mine.amount_max" :amountMin="mine.amount_min" :bonusLimit="bonusLimit"
                               :inputValue.sync="inputValue[betting.id]" :isConfirm="true"
                               :schedule="betting"
                               @onOptionSelected="onOptionSelected"/>
          </template>
          <template v-else-if="betting.lotteryId === 902">
            <span @click="deleteBetting(key)" class="scheme-delete-icon"></span>
            <ah-qc-d-x-q-lottery :amountMax="mine.amount_max" :amountMin="mine.amount_min" :bonusLimit="bonusLimit"
                                 :inputValue.sync="inputValue[betting.id]" :isConfirm="true"
                                 :schedule="betting"
                                 @onOptionSelected="onOptionSelected"></ah-qc-d-x-q-lottery>
          </template>
          <span :class="{selected: betting.isSure}"
                @click="addSure(betting)"
                class="sure"
                v-if="!(betting.lotteryId === 901 || betting.lotteryId === 902)">胆</span>
        </div>
      </div>
      <!--</scheme-box>-->
      <!--      <service-agreement></service-agreement>-->
    </div>
    <div class="bottom-fixed ahfootball-bottom-fixed" v-if="lotteryId === 901||lotteryId === 902">
      <div class="summary" v-if="currentMode === 1">
        <div class="text">
          <span>
            {{ stakeCount1 }}注 1倍
            <span>共{{ textSum }}元</span>
          </span>
          <div class="pull-right text-light ellipsis text-right" style="width: 50%">预计奖金:{{ bonusCount }}元</div>
        </div>
        <div class="row">
          <div class="col">
            <a @click="confirmPaymentYp" class="btn text-center" href="javascript:">付款</a>
          </div>
        </div>
      </div>
      <template v-else-if="bettingList.length>=0">
        <div class="top show">
          <div :key="index" class="row control text-normal" v-for="(item, index) in popupArray"
               v-show="popupInputIndex?  `${bettingList.length}01`===item.text :true">
            <div class="col col-60 padding-right-10">
              <div class="row margin-bottom-7">
                <div class="col col-70">
                  <span>{{ item.value }}</span>
                </div>
                <div class="col text-right">
                  <span class="">{{ item.stake }}注</span>
                </div>
              </div>
              <div class="row">
                <div class="col col-70">投注上限 <span>{{ item.upperLimit }}</span>
                </div>
                <div class="col text-right">投注金额</div>
              </div>
            </div>
            <div class="col">
              <div class="input-text text-center">
                <input placeholder="请输入投注金额"
                       type="number"
                       v-model="ManyValue[item.text]">
              </div>
            </div>
          </div>
        </div>
        <!--控制显示-->
        <div @click="popupInputIndex = !popupInputIndex" class="btn-more text-center text-light">
          <span class="down-up"></span>{{popupInputIndex ?`点击选择更多串关投注种类`:`收起列表`}}
        </div>
        <!--投注总额-->
        <div class="row">
          <div class="col col-60 padding-left-10 padding-right-10 text-normal">
            <div class="row margin-bottom-7">
              <div class="col col-60">
                <span>总投注金额</span>
              </div>
              <div class="col text-right c-blue">
                <span>{{  totalMoney }}</span>元
              </div>
            </div>
            <div class="row">
              <div class="col col-60">
                <span>预计奖金</span>
              </div>
              <div class="col text-right text-primary">
                <expected-bonus :ManyValue="ManyValue" :tempBetting="tempBetting"></expected-bonus>
              </div>
            </div>
          </div>
          <div class="col">
            <a @click="confirmPaymentYp" class="btn text-center" href="javascript:">付款</a>
          </div>
        </div>
      </template>
    </div>
    <template v-else>
      <div class="bottom-fixed">
        <div class="row top">
          <div @click="onPopupVisible" class="col col-50 col-center">
          <span class="text-normal ellipsis"
                style="width: 80%; display: inline-block;color: white;vertical-align: middle">{{seriesText}}</span><span
            class="down-up"></span>
          </div>
          <div class="col">
            <custom-select-box :confirmdata="confirm" :seriesdata="seriesText" :totalmoney="totalMoney"
                               :value="confirm.multiple"
                               @change="multipleChange" class="pull-right"
                               label="倍数"></custom-select-box>
          </div>
        </div>
        <div class="summary">
          <div class="text">
          <span>
            {{confirm.stakeCount}}注 {{confirm.multiple}}倍
            <span>共{{totalMoney}}元</span>
          </span>
            <div class="pull-right text-light ellipsis" style="width: 50%">
              预计奖金:{{confirm.bonus.min * confirm.multiple | currency}} ~ {{confirm.bonus.max * confirm.multiple |
              currency}}元
            </div>
          </div>
          <div class="row">
            <!--<div class="col col-40">-->
            <!--<a href="javascript:;" class="btn btn-out-line text-center" @click="confirmOptimize">奖金优化</a>-->
            <!--</div>-->
            <!--<div class="col padding-left-10">-->
            <!--<a href="javascript:;" class="btn text-center" @click="confirmPayment">付款</a>-->
            <!--</div>-->
            <div class="col">
              <a @click="confirmPayment" class="btn text-center" href="javascript:">付款</a>
            </div>
          </div>
        </div>
      </div>
      <mt-popup
        class="series-mt-popup"
        position="bottom" v-model="popupVisible">
        <div class="series-select-popup">
          <div class="header-nav clear">
            <a :class="{active: popupNavIndex === 0}" @click="popupNavChange(0)" href="javascript:">自由过关</a>
            <a :class="{active: popupNavIndex === 1}" @click="popupNavChange(1)" href="javascript:">多串过关</a>
          </div>
          <div class="select-content clear" v-if="popupNavIndex === 0">
          <span :class="{selected: popupIsSelected(item)}"
                :key="index"
                @click="popupItemSelected(item, 0)" class="item"
                v-for="(item,index) in popupList[0]">
            {{item.value}}</span>
          </div>
          <div class="select-content clear" v-else>
          <span :class="{selected: popupIsSelected(item)}"
                :key="index"
                @click="popupItemSelected(item, 1)"
                class="item"
                v-for="(item,index) in popupList[1]">
            {{item.value}}</span>
          </div>
          <div class="btn-wrap row">
            <div class="col col-50"><a @click="hidePopupVisible" class="btn" href="javascript:">取消</a></div>
            <div class="col col-50"><a @click="confirmPopup" class="btn" href="javascript:">确认</a></div>
          </div>
        </div>
      </mt-popup>
    </template>
    <div class="modal" id="modal-recharge" v-show="isShow">
      <div class="panel">
        <div class="tit">
          <h1>余额不足，无法下注，</h1>
          <h1>请先充值！</h1>
        </div>
        <div class="btns">
          <div @click="toggle()" class="btn-cancel">取消</div>
          <div @click="recharge()" class="btn-sure btn-recharge">充值</div>
        </div>
      </div>
    </div>
    <div class="modal" id="modal-error" v-show="oddsChange">
      <div class="panel">
        <div class="tit">
          <h1>赔率发生变动是否接受</h1>
        </div>
        <div class="btns">
          <div @click="refresh" class="btn-cancel">取消</div>
          <div @click="confirmPaymentYp" class="btn-sure">接受并付款</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>//
// import ServiceAgreement from '../../components/ServiceAgreement.vue'
import CustomSelectBox from '../../components/CustomSelectBox.vue'
import {
  CURRENT_SPORT_PLAY_TYPE_SELECT_UPDATE,
  SPORTS_BONUS_CHANGE,
  SPORTS_CONFIRM_BET,
  SPORTS_CONFIRM_CLEAR_TICKETS,
  SPORTS_CONFIRM_DELETE_TICKET,
  SPORTS_CONFIRM_OPTIMIZE,
  SPORTS_CONFIRM_PAYMENT,
  SPORTS_CONFIRM_PAYMENT_PREBETYP,
  SPORTS_CONFIRM_SERIES_CLEAR,
  SPORTS_CONFIRM_SERIES_SET,
  SPORTS_MULTIPLE_CHANGE
} from '../../store/betting/types'
import FootballSPFLottery from './child/FootballSPFLottery.vue'
import FootballRQSPFLottery from './child/FootballRQSPFLottery.vue'
import FootballBFLottery from './child/FootballBFLottery.vue'
import FootballZJQLottery from './child/FootballZJQLottery.vue'
import FootballBQCLottery from './child/FootballBQCLottery.vue'
import FootballHHLottery from './child/FootballHHLottery.vue'
import BasketballSFLottery from './child/BasketballSFLottery.vue'
import BasketballSFCLottery from './child/BasketballSFCLottery.vue'
import BasketballRFSFLottery from './child/BasketballRFSFLottery.vue'
import BasketballDXFLottery from './child/BasketballDXFLottery.vue'
import BasketballHHLottery from './child/BasketballHHLottery.vue'
import AhQcRQLottery from './child/AhQcRQLottery.vue'
import AhQcDXQLottery from './child/AhQcDXQLottery.vue'
import ExpectedBonus from '../../components/ExpectedBonus.vue'
import { mapActions, mapState } from 'vuex'
import Vue from 'vue'
import { Popup } from 'mint-ui'
import Series from '../../model/common/Series'
import SportsCalculate from '../../model/sports/SportsCalculate'
import Lottery from '../../model/common/Lottery'
import Toast from '../../common/toast'
import { MINE_INFO } from '../../store/user/types'

Vue.component(Popup.name, Popup)
let calculate
export default {
  name: 'sportsConfirm',
  data () {
    return {
      time: 0,
      popupVisible: false,
      popupNavIndex: 0,
      popupList: [[], []],
      series: [],
      popupSelected: [],
      isMulti: false,
      sure: 0,
      isShow: false,
      oddsChange: false,
      isShowBottom: true,
      ManyValue: {}, // 输入金额值列表
      popupInputIndex: true, // 显示单个输入框
      inputValue: {},
      updateOdds: {}
    }
  },
  computed: {
    ...mapState({
      mine: state => state.user.mine,
      confirm: state => state.betting.sportConfirm,
      lotteryId: state => state.betting.lottery,
      currentMode: state => state.betting[state.betting.lottery].mode,
      bonusLimit: state => state.user.mine.bonus_limit || 0,
      currentType: state => state.betting[state.betting.lottery].playType || { value: '' }
    }),
    seriesText () {
      let textArr = this.series.map(v => v.value)
      return textArr.join(',') || '投注方式'
    },
    totalMoney () {
      if (!Lottery.isAHFootBall(this.lotteryId) || this.confirm.mode !== 2) {
        return parseInt(this.confirm.ticketPrice * this.confirm.stakeCount * this.confirm.multiple)
      }
      let value = 0
      for (let i in this.popupArray) {
        if (/^\d+$/.test(this.ManyValue[this.popupArray[i].text]) && this.ManyValue[this.popupArray[i].text] >= 1) {
          value += this.ManyValue[this.popupArray[i].text] * this.popupArray[i].stake
        }
      }
      return value.toFixed(2)
    },
    title () {
      if (Lottery.isFootBall(this.lotteryId)) {
        return '竞彩足球'
      } else if (Lottery.isBasketBall(this.lotteryId)) {
        return '竞彩篮球'
      } else if (Lottery.isAHFootBall(this.lotteryId)) {
        return '足球亚盘'
      } else {
        return ''
      }
    },
    bettingList () {
      return this.confirm.bettingList.filter(value => {
        return value.selected.length > 0
      })
    },
    tempBetting () {
      // 返回n串1可能性
      const data = {
        '201': [],
        '301': [],
        '401': [],
        '501': [],
        '601': [],
        '701': [],
        '801': []
      }
      if (!Lottery.isAHFootBall(this.lotteryId) || this.confirm.mode !== 2) return data
      const list = this.getGroup(JSON.parse(JSON.stringify(this.bettingList)))
      list.forEach(value => {
        if (Array.isArray(value)) {
          data[`${value.length}01`].push(value)
        }
      })
      return data
    },
    popupArray () {
      // 亚盘投注列表
      if (!Lottery.isAHFootBall(this.lotteryId) || this.confirm.mode !== 2) return []
      // 返回投注金额列表
      const list = this.getPopupList()
      return list.map((value) => {
        let data = null
        const isAll = value.text === 'nCn' // n串n
        if (isAll) {
          data = this.upperLimit(isAll, this.tempBetting, this.mine.bonus_limit, this.mine.amount_max, this.mine.amount_min)
        } else {
          data = this.upperLimit(isAll, this.tempBetting[value.text], this.mine.bonus_limit, this.mine.amount_max, this.mine.amount_min)
        }
        return { ...value, stake: data.stake, upperLimit: data.upperLimit }
      })
    },
    textSum () {
      //  亚盘单关 投注总金额
      let sum = 0
      for (let i in this.inputValue) {
        for (let j in this.inputValue[i]) {
          sum += (this.inputValue[i][j].total * 1)
        }
      }
      return sum.toFixed(2)
    },
    stakeCount1 () {
      // 亚盘单关 投注注数
      let stake = 0
      let nullStake = 0
      for (let i in this.inputValue) {
        stake += this.inputValue[i].length
      }
      for (let i in this.inputValue) {
        for (let j in this.inputValue[i]) {
          if (this.inputValue[i][j].total === '') {
            nullStake += 1
          }
        }
      }
      if (nullStake > 0 && stake >= nullStake) {
        stake = stake - nullStake
      }
      return stake
    },
    bonusCount () {
      // 亚盘单关 奖金预计
      let count = 0
      for (let i in this.inputValue) {
        for (let j of this.inputValue[i]) {
          count += (j.total * (j.value * 1).toFixed(2))
        }
      }
      return count.toFixed(2)
    },
    stylepadding () {
      if (this.currentMode === 2 && (this.lotteryId === 901 || this.lotteryId === 902)) {
        return true
      }
      return false
    },
    stylehidden () {
      if (this.currentMode === 1 && (this.lotteryId === 901 || this.lotteryId === 902)) {
        return true
      }
      return false
    }
  },
  methods: {
    ...mapActions({
      getMineInfo: MINE_INFO
    }),
    getGroup (data, index = 0, group = []) {
      // 返回n串1可能性
      const need = [data[index]]
      for (let i = 0; i < group.length; i++) {
        if (Array.isArray(group[i])) {
          need.push(group[i].concat([data[index]]))
        } else {
          need.push([group[i], data[index]])
        }
      }
      group.push.apply(group, need)
      if (index + 1 >= data.length) {
        return group
      } else {
        return this.getGroup(data, index + 1, group)
      }
    },
    upperLimit (isAll, arr, limit, max, min) {
      // 计算投注上限
      let [upperLimit, stake] = [0, 0] // 上限金额 投注注数
      if (isAll) {
        for (let o in arr) { // 201
          for (let i in arr[o]) {
            upperLimit += f1(arr[o][i])
            stake++ // 注数+1
          }
        }
      } else {
        // 只计算当前串
        for (let i in arr) {
          upperLimit += f1(arr[i])
          stake++ // 注数+1
        }
      }

      function f1 (arr) {
        // 返回单注的赔率
        let s = 1
        for (let i in arr) {
          const val = arr[i].selected[0].value.replace(/([0-9]+\.[0-9]{2})[0-9]*/, '$1')
          s *= val
        }
        return String(s).replace(/([0-9]+\.[0-9]{2})[0-9]*/, '$1') * 1
      }

      upperLimit = upperLimit / stake // 平均单注赔率
      upperLimit = (limit || 0) / stake / upperLimit // 可投注总额
      if (max && upperLimit > max) {
        upperLimit = max
      }
      if (min && upperLimit < min) {
        upperLimit = min
      }
      return { upperLimit: Math.floor(upperLimit), stake }
    },
    addBetting () {
      this.$router.back()
    },
    toggle () {
      this.isShow = !this.isShow
    },
    toggleModel () {
      this.oddsChange = !this.oddsChange
    },
    recharge (lack) {
      this.$router.push({
        name: 'Payment',
        query: { lack: this.totalMoney - this.mine.balance }
      })
      // this.isShow = !this.isShow;
    },
    clearBettingList () {
      this.inputValue = []// 亚盘金额初始化
      this.$store.commit(SPORTS_CONFIRM_CLEAR_TICKETS)
      this.clearSeries()
      this.setProjectBonus()
    },
    deleteBetting (index) {
      // 删除
      this.$store.commit(SPORTS_CONFIRM_DELETE_TICKET, index)
      this.clearSeries()
      this.setProjectBonus()
    },
    clearSeries () {
      if (this.confirm.mode === 2) {
        if (this.bettingList.length <= 1) {
          this.isShowBottom = false
        }
        const list = this.getPopupList()
        if (list && list[0] && list[0][0]) {
          let arr = []
          for (let i = 0; i < this.series.length; i++) {
            list.map(value => {
              value.map(v => {
                if (v.key === this.series[i].key) {
                  arr.push(this.series[i])
                }
              })
            })
          }
          this.series = arr
        } else {
          this.series = []
        }
      }
    },
    multipleChange (v) {
      this.$store.commit(SPORTS_MULTIPLE_CHANGE, v)
    },
    confirmPayment () {
      if (this.series.length <= 0) {
        Toast('请选择投注方式')
        return
      }
      if (this.confirm.multiple < 1) {
        Toast('倍数不能小于1')
        return
      }

      let seriesArr = []
      this.series.map(v => seriesArr.push(v.key))
      const result = {
        multiple: this.confirm.multiple,
        lottery_id: this.lotteryId,
        coupon_id: 0,
        series: seriesArr.join(','),
        play_type: this.confirm.mode,
        stake_count: this.confirm.stakeCount,
        total_amount: this.confirm.stakeCount * this.confirm.multiple * 2,
        schedule_orders: this.bettingList.map(value => {
          return {
            bet_number: value.getBetNumber(),
            schedule_id: value.id,
            is_sure: value.isSure ? 1 : 0,
            guest: value.guest,
            round_no: value.round_no,
            home: value.home,
            match_round_id: value.match_round_id
          }
        })
      }
      this.$store.dispatch(SPORTS_CONFIRM_PAYMENT, result).then(() => {
        if (this.confirm.id) {
          if (this.mine.balance < (this.confirm.stakeCount * this.confirm.multiple * 2)) {
            Toast('您的账户余额不足，请先充值！')
            this.$router.push({
              name: 'Payment',
              query: { lack: (this.confirm.stakeCount * this.confirm.multiple * 2 - this.mine.balance).toFixed(2) }
            })
            // this.toggle()
          } else {
            this.$router.push({
              name: 'PaymentOrder',
              query: { id: this.confirm.id, sign: this.confirm.sign, product_name: 'LHCP' }
            })
          }
        } else {
          this.$router.push({ name: 'Login', query: { redirect: this.$router.currentRoute.path } })
          Toast('无订单id,登录已过期,请重新登录!')
        }
      })
    },
    confirmPaymentYp () {
      // 亚盘下单
      const result = {}
      if (this.confirm.mode === 2) {
        // 过关
        let msg = '请输入正确的投注金额'
        let inputArray = []
        for (let i in this.ManyValue) {
          if (/^\d+$/.test(this.ManyValue[i]) && this.ManyValue[i] > 0) {
            inputArray.push({
              text: i, Value: this.ManyValue[i]
            })
          } else {
            msg = '投注金额必须是整数'
            break
          }
        }
        if (inputArray.length <= 0) {
          Toast(msg)
          return
        } else {
          const postArray = []
          for (let i in this.popupArray) {
            for (let j in inputArray) {
              if (this.popupArray[i].text.toLowerCase() === inputArray[j].text.toLowerCase()) {
                postArray.push({
                  key: this.popupArray[i].key,
                  value: this.popupArray[i].value,
                  text: this.popupArray[i].text,
                  stake: this.popupArray[i].stake,
                  upperLimit: this.popupArray[i].upperLimit,
                  total: inputArray[j].Value
                })
              }
            }
          }
          let stats = true
          for (let i in postArray) {
            if (postArray[i].total > postArray[i].upperLimit) {
              Toast(postArray[i].value + '超过投注上限,请重新输入')
              stats = false
              break
            }
          }
          if (stats === true) {
            if (JSON.stringify(this.updateOdds) === '{}') {
              result.Orders = postArray.map((v) => {
                return {
                  series: v.key,
                  lottery_id: this.lotteryId,
                  play_type: this.confirm.mode,
                  stake_count: v.stake,
                  total_amount: v.total,
                  schedule_orders: this.bettingList.map(value => {
                    return {
                      bet_number: value.selected[0].key,
                      schedule_id: value.id,
                      is_sure: value.isSure ? 1 : 0,
                      odds: value.selected[0].value
                    }
                  })
                }
              })
            } else {
              const updateOddsArray = []
              for (let i in this.updateOdds) {
                for (let j in this.updateOdds[i]) {
                  updateOddsArray.push({
                    schedule_id: i,
                    new_odds: this.updateOdds[i][j],
                    key: j
                  })
                }
              }
              result.Orders = postArray.map((v) => {
                return {
                  series: v.key,
                  lottery_id: this.lotteryId,
                  play_type: this.confirm.mode,
                  stake_count: v.stake,
                  total_amount: v.total,
                  schedule_orders: this.bettingList.map(value => {
                    for (let i in updateOddsArray) {
                      if (value.id === updateOddsArray[i].schedule_id) {
                        return {
                          bet_number: value.selected[0].key,
                          schedule_id: value.id,
                          is_sure: value.isSure ? 1 : 0,
                          odds: updateOddsArray[i].new_odds
                        }
                      }
                    }
                  })
                }
              })
            }
          } else {
            return
          }
        }
      } else {
        // 单关
        let selectedCount = 0 // 选中个数
        let inputValueCount = 0 // 输入个数
        for (let i in this.bettingList) {
          selectedCount += this.bettingList[i].selected.length
        }
        for (let i in this.inputValue) {
          inputValueCount += this.inputValue[i].length
        }
        if (inputValueCount <= 0 || inputValueCount < selectedCount) {
          Toast('请输入投注金额')
          return
        } else {
          let msg = '请输入投注金额'
          let postArray = []
          Object.keys(this.inputValue).find(key => !!Object.keys(this.inputValue[key]).find(key2 => {
            const val2 = this.inputValue[key][key2]
            if (/^\d+$/.test(val2.total) && val2.total > 0) {
              if (val2.total > val2.upperLimit) {
                msg = '超过投注上限,请重新输入'
                postArray = []
                return true
              }
              postArray.push(val2)
              return false
            }
            msg = '投注金额必须是整数'
            postArray = []
            return true
          }))
          if (postArray.length === 0) {
            Toast(msg)
            return
          }
          if (JSON.stringify(this.updateOdds) === '{}') {
            result.Orders = postArray.map(v => {
              return {
                series: '101',
                lottery_id: this.lotteryId,
                play_type: this.confirm.mode,
                stake_count: '1',
                total_amount: v.total,
                schedule_orders: [{
                  bet_number: v.key,
                  schedule_id: v.id,
                  is_sure: '0',
                  odds: v.value
                }]
              }
            })
          } else {
            const updateOddsArray = []
            for (let i in this.updateOdds) {
              for (let j in this.updateOdds[i]) {
                updateOddsArray.push({
                  schedule_id: i,
                  new_odds: this.updateOdds[i][j],
                  key: j
                })
              }
            }
            result.Orders = postArray.map((v) => {
              for (let i in updateOddsArray) {
                if (v.id === updateOddsArray[i].schedule_id && v.key === updateOddsArray[i].key) {
                  return {
                    series: '101',
                    lottery_id: this.lotteryId,
                    play_type: this.confirm.mode,
                    stake_count: '1',
                    total_amount: v.total,
                    schedule_orders: [{
                      bet_number: v.key,
                      schedule_id: v.id,
                      is_sure: '0',
                      odds: updateOddsArray[i].new_odds
                    }]
                  }
                }
              }
            })
          }
        }
      }
      this.$store.dispatch(SPORTS_CONFIRM_PAYMENT_PREBETYP, result).then((data) => {
        if (data.update_odds) {
          this.toggleModel()
          this.updateOdds = data.update_odds
        } else if (this.confirm.id) {
          if (this.mine.balance < this.totalMoney || this.mine.balance < this.textSum) {
            this.toggle()
          } else {
            this.$router.push({
              name: 'PaymentOrder',
              query: { id: this.confirm.id, sign: this.confirm.sign, product_name: 'LHCP' }
            })
          }
        } else {
          Toast('无订单id,登录已过期,请重新登录!')
        }
      })
    },
    getPopupList () {
      return Series.getSeriesList(this.lotteryId, this.bettingList, this.sure)
    },
    onPopupVisible () {
      if (this.confirm.mode === 2) {
        this.isMulti = this.confirm.isMulti
        this.popupList = this.getPopupList()
        this.popupSelected = this.series
        this.popupVisible = true
      }
    },
    hidePopupVisible () {
      this.popupVisible = false
    },
    confirmPopup () {
      this.series = this.popupSelected
      this.$store.commit(SPORTS_CONFIRM_SERIES_SET, {
        series: this.series, isMulti: this.isMulti
      })
      this.setProjectBonus()
      this.hidePopupVisible()
    },
    popupNavChange (index) {
      if (this.popupNavIndex !== index) {
        this.popupNavIndex = index
      }
    },
    popupIsSelected (item) {
      return this.popupSelected.indexOf(item) !== -1
    },
    popupItemSelected (item) {
      if (this.popupNavIndex === 0) {
        if (this.isMulti) {
          this.popupSelected = [item]
          this.isMulti = false
        } else {
          const i = this.popupSelected.indexOf(item)
          i === -1 ? this.popupSelected.push(item) : this.popupSelected.splice(i, 1)
        }
      } else {
        this.isMulti = true
        this.popupSelected = [item]
      }
    },
    addSure (betting) {
      if (this.isMulti) {
        return
      }
      if (betting.isSure) {
        this.sure-- // 是否会不一致
        betting.isSure = false
        this.setProjectBonus()
      } else {
        const canSure = Series.sureCount(this.series)
        if (canSure + 1 < this.bettingList.length) {
          this.sure++
          betting.isSure = true
          if (this.sure > canSure) {
            this.clearSeries()
            if (Series.sureCount(this.series) + 1 === this.bettingList.length) {
              this.clearSeries()
              this.sure = 0
              this.bettingList = this.bettingList.map(v => {
                v.isSure = false
                return v
              })
            }
          }
          this.setProjectBonus()
        }
      }
    },
    setProjectBonus () {
      if (!calculate) {
        calculate = new SportsCalculate(this.lotteryId)
      }
      calculate.setPlayType(this.lotteryId)
      if (this.series.length > 0) {
        calculate.setProjectBonus(this.series, this.bettingList, this.confirm.multiple).then((value) => {
          console.log(value)
          if (value.count) {
            calculate.tickets = value.betlist
            this.$store.commit(SPORTS_BONUS_CHANGE, value)
          } else {
            Toast('预计奖金计算出错，请重新选择')
            this.$store.commit(SPORTS_BONUS_CHANGE, { min: 0, max: 0, count: 0 })
          }
        })
      } else {
        this.$store.commit(SPORTS_BONUS_CHANGE, { min: 0, max: 0, count: 0 })
      }
    },
    onOptionSelected () {
      this.clearSeries()
      this.setProjectBonus()
      this.overstep()
    },
    confirmOptimize () {
      if (this.isMulti) {
        Toast('奖金优化不支持复杂玩法！')
        return
      }
      if (this.confirm.stakeCount > 99) {
        Toast('奖金优化只支持单注100倍以下！')
        return
      }
      this.$store.commit(SPORTS_CONFIRM_OPTIMIZE, calculate.getSportTickets(this.bettingList))
      this.$router.push({ name: 'SportsOptimize' })
    },
    overstep () {
      if (Lottery.isAHFootBall(this.lotteryId) && this.bettingList.selected.length > 8) {
        Toast('超出')
      }
    },
    refresh () {
      clearTimeout(this.time)
      this.$store.dispatch(CURRENT_SPORT_PLAY_TYPE_SELECT_UPDATE, this.currentType).then(() => {
        return this.$store.commit(SPORTS_CONFIRM_BET)
      }).finally(this.fifteenTimeUpdate)
      this.toggleModel()
    },
    fifteenTimeUpdate () {
      // 亚盘更新
      this.time = setTimeout(() => {
        this.$store.dispatch(CURRENT_SPORT_PLAY_TYPE_SELECT_UPDATE, this.currentType).then(() => {
          return this.$store.commit(SPORTS_CONFIRM_BET)
        }).finally(this.fifteenTimeUpdate)
      }, 15000)
    }
  },
  created () {
    if (this.bettingList.length === 0) {
      this.$store.commit(SPORTS_CONFIRM_SERIES_CLEAR)
      this.$router.back()
    } else {
      if (this.confirm.mode === 1) {
        this.series = [{ value: '单关', key: '101' }]
      } else {
        if (this.confirm.series.length > 0) {
          this.series = this.confirm.series
          this.isMulti = this.confirm.isMulti
        } else {
          const list = this.getPopupList()
          if (list && list[0] && list[0][0]) {
            this.series = [list[0][list[0].length - 1]]
            this.bettingList = this.bettingList.map(v => {
              v.isSure = false
              return v
            })
            this.$store.commit(SPORTS_CONFIRM_SERIES_SET, {
              series: this.series, isMulti: this.isMulti
            })
          }
        }
      }
      if (Lottery.isAHFootBall(this.lotteryId)) {
        clearTimeout(this.time)
        // 亚盘每15秒更新次
        this.fifteenTimeUpdate()
      } else {
        this.setProjectBonus()
      }
      this.getMineInfo()
    }
  },
  components: {
    // ServiceAgreement,
    CustomSelectBox,
    FootballSPFLottery,
    FootballRQSPFLottery,
    FootballBFLottery,
    FootballZJQLottery,
    FootballBQCLottery,
    FootballHHLottery,
    BasketballSFLottery,
    BasketballRFSFLottery,
    BasketballSFCLottery,
    BasketballDXFLottery,
    BasketballHHLottery,
    AhQcRQLottery,
    AhQcDXQLottery,
    ExpectedBonus
  },
  beforeDestroy () {
    clearTimeout(this.time)
    console.log('销毁')
  }
}
</script>

<style lang="scss">
  .sports-confirm {
    padding-bottom: 135px;
    height: 100%;
    position: relative;
    overflow: hidden;
  }

  .sports-confirm-container {
    padding: 45px 10px 40px 10px;
    height: 100%;
    overflow-y: auto;
  }

  .sports-confirm-container .operate-wrap {
    position: absolute;
    width: 100%;
    top: 40px;
    left: 0;
    padding: 5px 5px 0 5px;
    z-index: 2;
    background: $c131313;
  }

  .sports-confirm-container .operate-wrap a {
    border-radius: 5px;
    background: $c131313;
    text-align: center;
    width: 48%;
    margin: 5px 1%;
    float: left;
    color: $c999999;
    padding: 5px;
    font-size: 14px;
    @if ($lotteryIg) {
      border: 1px solid $c999999;
    } @else {
      border: 1px solid $cffC63A;
    }
  }

  .sports-confirm .bottom-fixed {
    position: fixed;
    bottom: 0;
    max-width: 640px;
    width: 100%;
    height: 130px;
    margin: 0 auto;
    @if ($lotteryIg) {
      background: $cFFfFFF;
    } @else {
      background: $c131313;
    }
  }

  .sports-confirm .bottom-fixed .top {
    padding: 10px;
    @if ($lotteryIg) {
      border-top: 1px solid $cEbebeb;
      border-bottom: 1px solid $cEbebeb;
      > .col.col-50.col-center .text-normal {
        color: $cgray !important;
      }
    } @else {
      border-top: 1px solid $c313131;
      border-bottom: 1px solid $c313131;
    }
  }

  .sports-confirm .bottom-fixed .down-up {
    @if ($lotteryIg) {
      background: url("../../assets/igdj/down_out.png") no-repeat;
    } @else {
      background: url("../../assets/betting/down_out.png") no-repeat;
    }
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 5px;
  }

  .sports-confirm .bottom-fixed .summary {
    padding: 5px 10px;
    font-size: 14px;
    color: $c999999;
  }

  .sports-confirm .bottom-fixed .summary .text {
    padding-bottom: 5px;

    > span:first-child {
      @if ($lotteryIg) {
        color: $cgray;
      } @else {
        color: $cFFfFFF;
      }

      span {
        color: #FF3333;
      }
    }
  }

  .sports-confirm .bottom-fixed .summary .add-to {
    margin-left: 30px;
    margin-right: 5px;
    vertical-align: middle;
    margin-top: -2px;
    color: red;
    border: 1px solid #ddd;
  }

  .sports-confirm .scheme-delete-icon {
    background: url("../../assets/betting/scheme_delete.png") no-repeat;
    background-size: 100% 100%;
    width: 25px;
    height: 25px;
  }

  .sports-confirm .scheme-box-item {
    padding: 10px 5px 10px 30px;
    position: relative;
    background: $c1c1c1c;
    border-top: 5px dotted $c131313;
  }

  .sports-confirm .scheme-box-item.has-sure {
    padding-right: 40px;
  }

  .sports-confirm .scheme-box-item.has-sure .sure {
    display: block;
  }

  .sports-confirm .scheme-box-item.has-sure.padding {
    padding: 10px 5px 5px 30px;

  }

  .sports-confirm .scheme-box-item .sure {
    position: absolute;
    width: 30px;
    height: 30px;
    line-height: 30px;
    right: 5px;
    bottom: 13px;
    text-align: center;
    border-radius: 5px;
    display: none;
    @if ($lotteryIg) {
      background: #ddd;
      color: $cgray;
    } @else {
      background: #dddddd;
      color: $c131313;
    }
  }

  .sports-confirm .scheme-box-item .sure.selected {
    background: $cffC63A;
  }

  .sports-confirm .scheme-box-item .scheme-delete-icon {
    position: absolute;
    left: 5px;
    bottom: 18px;

    &.poa-m {
      bottom: 48px;
    }
  }

  .sports-confirm .scheme-box-item:first-child {
    border-top: 0;
  }

  .sports-confirm-container .plus-icon {
    background: url("../../assets/betting/confirm_plus.png") no-repeat;
    background-size: 100% 100%;
    width: 12px;
    height: 12px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    margin-top: -2px;
  }

  .sports-confirm-container .clear-icon {
    background: url("../../assets/betting/confirm_clear.png") no-repeat;
    background-size: 100% 100%;
    width: 12px;
    height: 12px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
    margin-top: -2px;
  }

  .sports-confirm .mint-popup {
    width: 100%;
  }

  .sports-confirm .series-mt-popup {
    max-width: 640px;
    margin: 0 auto;
  }

  .sports-confirm .series-select-popup {
    width: 100%;
    position: relative;
  }

  .sports-confirm .series-select-popup .header-nav a {
    width: 50%;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: $c999999;
    display: block;
    float: left;
    font-size: 14px;
    @if ($lotteryIg) {
      background: #F2F2F2;
    } @else {
      background: $c313131;
    }
  }

  .sports-confirm .series-select-popup .header-nav a.active {
    color: $cffC63A;
    background: $c131313;
  }

  .sports-confirm .series-select-popup .btn-wrap {
    @if ($lotteryIg) {
      border-top: 1px solid #DDDDDD;
    } @else {
      border-top: 1px solid $c313131;
    }
  }

  .sports-confirm .series-select-popup .btn-wrap a {
    border-radius: 0;
    border: 0;
    background: $c131313;
    color: $c999999;
  }

  .sports-confirm .series-select-popup .btn-wrap .col:last-child a {
    color: $cffC63A;
    @if ($lotteryIg) {
      border-left: 1px solid #DDDDDD;
    } @else {
      border-left: 1px solid $c313131;
    }
  }

  .sports-confirm .series-select-popup .select-content {
    padding: 4px 0;
    background-color: $c131313;
  }

  .sports-confirm .series-select-popup .select-content .item {
    width: 23%;
    margin: 2px 1%;
    height: 28px;
    line-height: 24px;
    text-align: center;
    font-size: 12px;
    display: block;
    float: left;
    border: 1px solid $c999999;
    border-radius: 5px;
    color: $c999999;
  }

  .sports-confirm .series-select-popup .select-content .item.selected {
    border: 1px solid $cffC63A;
    background: url("../../assets/betting/selected.png") right bottom no-repeat;
    background-size: auto 60%;
    color: $cffC63A;
  }

  .sports-confirm .arrow-right {
    @if ($lotteryIg) {
      background: url("../../assets/igdj/arrow-right.png") no-repeat;
    } @else {
      background: url("../../assets/betting/arrow-right.png") no-repeat;
    }
    background-size: 100% 100%;
    width: 7px;
    height: 12px;
  }

  .modal {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    zoom: 1;
  }

  .panel {
    max-width: 640px;
    margin: 250px auto 0;
    padding: 20px 15px 15px;
    width: 70%;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    text-align: center;
  }

  .tit {
    margin-bottom: 20px;
  }

  .tit h1 {
    font-weight: normal;
    font-size: 18px;
    color: #333;
  }

  .panel .btns {
    overflow: hidden;
  }

  .panel .btns div {
    display: inline-block;
    height: 34px;
    line-height: 34px;
    border-radius: 4px;
    font-size: 16px;
    width: 46%;
  }

  .panel .btns .btn-cancel {
    float: left;
    background-color: #ddd;
    color: $c999999;
  }

  .panel .btns .btn-sure {
    float: right;
    background-color: $cffC63A;
    color: $c131313;
  }

  .sports-confirm .ahfootball-bottom-fixed {
    height: auto;
    color: $cFFfFFF;

    .top {
      overflow: hidden;
      padding: 0;
      height: 52px;
      background-color: #313131;
      border-top: 0;
      border-top-left-radius: 14px;
      border-top-right-radius: 14px;

      &.show {
        display: block;
        height: 100%;
        max-height: 260px;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .control {
        margin: 0;
        padding: 6px 10px;
        border-top: 1px solid #494949;

        &:first-child {
          border-top: 0;
        }
      }
    }

    .summary {
      border-top: 1px solid $c1c1c1c;

      .btn {
        border-radius: 4px;
      }
    }

    .margin-bottom-7 {
      margin-bottom: 7px;
    }

    .btn-more {
      height: 22px;
      line-height: 21px;
      background-color: $c1c1c1c;

      .down-up {
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-bottom: 2px;
        margin-right: 5px;
      }
    }

    .btn {
      border-radius: 0;
    }

    .c-blue {
      color: #3393ff;
    }
  }

  .input-text {
    overflow: hidden;
    background-color: #494949;
    border-radius: 4px;

    input {
      background: transparent;
      border: none;
      text-align: center;
      color: $cFFfFFF;
    }
  }

  .sports-confirm .scheme-box-item.stylehidden {
    padding: 0;

    > .scheme-delete-icon {
      display: none;
    }
  }
</style>
