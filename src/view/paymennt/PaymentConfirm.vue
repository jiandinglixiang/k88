<template>
  <div class="payment-confirm" v-cloak>
    <v-head title="支付"></v-head>
    <div class="bg-white text-center top">
      <h3 class="text-primary">￥{{confirm.pay_money}}</h3>
      <p class="text-light text-normal">{{confirm.bet_desc}}</p>
    </div>
    <div class="content bg-white text-muted text-normal margin-top-20 clear">
      <div class="item">
        红包抵扣
        <span class="pull-right">{{(confirm.currentRedPack && confirm.currentRedPack.balance) || 0}}元</span>
        <div class="margin-top-5 clear" v-if="confirm.currentRedPack">
          <span @click="changeRedPackPanel" class="pull-right text-sm">
            切换红包
            <span class="switch-arrow">
              <span :class="{'rotate': redPackShow}" class="arrow-bottom-icon"></span>
            </span>
          </span>
        </div>
      </div>
      <div class="item clear red-pack-container" v-show="redPackShow">
        <div class="title row text-center">
          <div :class="{'active': redPackTitleId === index}" @click="changeRedPackTitleId(index)"
               :key="index"
               class="col"
               v-for="(coupon, index) in confirm.coupon_list">
            {{coupon.group_name}}({{coupon.list.length}})
          </div>
        </div>
        <div :key="index" v-for="(coupon, index) in confirm.coupon_list">
          <div class="list" v-show="redPackTitleId === index">
            <div :class="{'checked': item.id === confirm.currentRedPack.id}" @click="selectRedPack(item)"
                 :key="item.id "
                 class="red-pack" v-for="item in coupon.list">
              <h4 class="value">￥{{item.balance}}</h4>
              <h5 class="type">{{item.condition}} <span class="pull-right">{{item.end_time | getEndTime}}</span></h5>
              <span class="red-pack-check-icon"></span>
            </div>
          </div>
        </div>
      </div>
      <div class="item">
        账号余额 <span class="pull-right">{{confirm.balance | currency}}元</span>
      </div>
      <div class="item">
        还需支付 <span class="pull-right">{{confirm.lack_money | currency}}元</span>
      </div>
    </div>
    <div class="padding margin-top-20">
      <a @click="submit" class="btn" href="javascript:">支付</a>
    </div>
  </div>
</template>

<script>//
import { mapActions, mapMutations, mapState } from 'vuex'
import { PAYMENT, SELECT_CURRENT_RED_PACK } from '../../store/payment/types'

export default {
  name: 'paymentConfirm',
  data () {
    return {
      redPackShow: false,
      redPackTitleId: 0
    }
  },
  computed: {
    ...mapState({
      confirm: state => state.payment.confirm,
      schemeConfirm: state => state.scheme.confirm
    })
  },
  methods: {
    ...mapActions({
      payment: PAYMENT
    }),
    ...mapMutations({
      selectRedPack: SELECT_CURRENT_RED_PACK
    }),
    submit () {
      this.payment({
        coupon_id: (this.confirm.currentRedPack && this.confirm.currentRedPack.id) || 0,
        id: this.schemeConfirm.id,
        sign: this.schemeConfirm.sign,
        product_name: this.schemeConfirm.productName
      })
    },
    changeRedPackPanel () {
      this.redPackShow = !this.redPackShow
    },
    changeRedPackTitleId (id) {
      if (this.redPackTitleId !== id) {
        this.redPackTitleId = id
      }
    }
  },
  created () {
    if (!this.schemeConfirm.id) {
      history.back()
    }
  }
}
</script>

<style lang="scss">
  @if ($lotteryIg) {
    .head {
      margin-bottom: 0;
    }
  }

  .payment-confirm .top {
    padding: 10px;
    @if ($lotteryIg) {
      background-color: #1A1003;
    }
  }

  .payment-confirm .top h3 {
    font-weight: normal;
    line-height: 40px;
    font-size: 22px;
  }

  .payment-confirm .content {
    padding: 0 10px;
    @if ($lotteryIg) {
      background-color: $cFFfFFF;
    }
  }

  .payment-confirm .content .item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  .payment-confirm .content .item:last-child {
    border: 0;
  }

  .payment-confirm .red-pack-container {
    max-height: 200px;
    overflow-y: auto;
  }

  .payment-confirm .red-pack-container .title .col {
    padding-bottom: 5px;
  }

  .payment-confirm .red-pack-container .title .col.active {
    border-bottom: 1px solid #e73f40;
    color: #e73f40;
  }

  .payment-confirm .red-pack {
    background: url("../../assets/icon/redpack_bg.png") no-repeat;
    background-size: 100% 100%;
    height: 70px;
    width: 46%;
    margin: 5px 2%;
    float: left;
    position: relative;
  }

  .payment-confirm .red-pack h4 {
    height: 50px;
    padding: 10px 30px 10px 10px;
    color: white;
    font-weight: 100;
    font-size: 18px;
  }

  .payment-confirm .red-pack h5 {
    font-size: 12px;
    padding-right: 10px;
    padding-left: 10px;
    color: white;
    font-weight: 100;
    line-height: 20px;
  }

  .payment-confirm .red-pack.checked .red-pack-check-icon {
    display: block;
  }

  .payment-confirm .red-pack .red-pack-check-icon {
    position: absolute;
    right: 10px;
    top: 10px;
    display: none;
  }

  .payment-confirm .switch-arrow {
    border: 1px solid #ddd;
    height: 16px;
    width: 16px;
    border-radius: 20px;
    margin-left: 5px;
    display: inline-block;
    vertical-align: middle;
  }

  .payment-confirm .arrow-bottom-icon {
    display: inline-block;
    margin-left: 1px;
    vertical-align: top;
    margin-top: 3px;
  }

  .payment-confirm .arrow-bottom-icon.rotate {
    transform: rotate(180deg);
  }

  .payment-confirm .btn {
    @if ($lotteryIg) {
      color: $cgray;
    }
  }
</style>
