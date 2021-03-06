<template>
  <div class="payment-confirm" v-cloak>
    <v-head title="支付"></v-head>
    <div class="text-center top">
      <h3 class="text-primary">￥{{confirm.pay_money}}</h3>
      <p class="text-light text-normal">{{confirm.bet_desc}}</p>
    </div>
    <div class="content text-muted text-normal margin-top-20 clear">
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
          <div :class="{'active': redPackTitleId === index}" :key="index"
               @click="changeRedPackTitleId(index)"
               class="col" v-for="(coupon, index) in confirm.coupon_list">
            {{coupon.group_name}}({{coupon.list.length}})
          </div>
        </div>
        <div :key="index" v-for="(coupon, index) in confirm.coupon_list">
          <div class="list" v-show="redPackTitleId === index">
            <div :class="{'checked': item.id === confirm.currentRedPack.id}" :key="item.id"
                 @click="selectRedPack(item)" class="red-pack" v-for="item in coupon.list">
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
        还需支付 <span class="pull-right">{{lackMoney | currency}}元</span>
      </div>
    </div>
    <div class="padding margin-top-20">
      <a @click="submit" class="btn" href="javascript:">支付</a>
    </div>
  </div>
</template>

<script>//
import Util from '../../common/util'
import { mapActions, mapMutations, mapState } from 'vuex'
import { PAYMENT_ORDER, PAYMENT_ORDER_COMPLETE, SELECT_ORDER_RED_PACK } from '../../store/payment/types'
import { MessageBox } from 'mint-ui'

let search = {}
export default {
  name: 'orderPayment',
  data () {
    return {
      redPackShow: false,
      redPackTitleId: 0
    }
  },
  computed: {
    ...mapState({
      confirm: state => state.payment.order,
      orderId: state => state.payment.orderId
    }),
    lackMoney () {
      if (this.confirm.currentRedPack && this.confirm.currentRedPack.id) {
        const sum = this.confirm.balance * 1 + this.confirm.currentRedPack.balance * 1
        return this.confirm.pay_money > sum ? this.confirm.pay_money - sum : 0
      }
      return this.confirm.pay_money > this.confirm.balance ? this.confirm.pay_money - this.confirm.balance : 0
    }
  },
  methods: {
    ...mapActions({
      payment: PAYMENT_ORDER_COMPLETE,
      paymentOrder: PAYMENT_ORDER
    }),
    ...mapMutations({
      selectRedPack: SELECT_ORDER_RED_PACK
    }),
    async submit () {
      let sum = this.confirm.balance * 1
      if (this.confirm.currentRedPack && this.confirm.currentRedPack.type * 1 === 1 && this.confirm.currentRedPack.id) {
        sum += this.confirm.currentRedPack.balance * 1
      }
      if (this.confirm.pay_money > sum) {
        const action = await MessageBox({
          title: '',
          message: '余额不足,请充值',
          showCancelButton: true,
          confirmButtonText: '去充值',
          confirmButtonClass: 'order-message-box'
        })
        if (action === 'confirm') {
          return this.$router.push({
            name: 'Payment',
            query: { lack: (Math.floor((this.confirm.pay_money - sum) / 100) * 100 + 300).toFixed(2) }
          })
        }
        return action
      }
      this.payment({
        coupon_id: (this.confirm.currentRedPack && this.confirm.currentRedPack.id) || 0,
        id: search['id'],
        sign: search['sign'],
        product_name: search['product_name'] || 'LHCP'
      })
    },
    changeRedPackPanel () {
      this.redPackShow = !this.redPackShow
    },
    changeRedPackTitleId (index) {
      if (this.redPackTitleId !== index) {
        this.redPackTitleId = index
      }
    }
  },
  created () {
    search = Util.urlSearch()
    if (search['id']) {
      this.paymentOrder(search)
    }
  }
}
</script>

<style lang="scss">
  button.order-message-box {
    background-color: $cffC63A;
    color: $c131313;
  }
  .payment-confirm .top {
    padding: 10px;
  }

  .payment-confirm .top h3 {
    font-weight: normal;
    line-height: 40px;
    font-size: 22px;
  }

  .payment-confirm .content {
    padding: 0 10px;
  }

  .payment-confirm .content .item {
    padding: 10px;
    border-bottom: 1px solid $c313131;
    color: $cFFfFFF;
    @if ($lotteryIg) {
      color: $cgray;
      span {
        color: $c999999;
      }
    }
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
    border: 1px solid $c313131;
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
</style>
