<template>
  <div class="payment">
    <v-head :fn="goBack" title="充值"></v-head>
    <div class="text-xn padding">
      <p class="text-light">充值账号：<span>{{mine.username}}</span></p>
      <p class="text-light margin-top-5">
        当前余额：<span>{{mine.balance}}元</span>
        <!--<span class="text-primary pull-right">首冲20送20>></span>-->
      </p>
      <div class="margin-top-10">
        <input class="input-txt" placeholder="充值金额" type="text" v-model="number">
      </div>
      <div class="money-box">
        <div class="row">
          <div :key="item" class="col" v-for="item in [300, 500, 1000]">
            <span :class="{active: item === formatNumber}" @click="selectMoney(item)">{{item}}元</span>
          </div>
        </div>
        <div class="row margin-top-10">
          <div :key="item" class="col" v-for="item in [2000, 3000, 5000]">
            <span :class="{active: item === formatNumber}" @click="selectMoney(item)">{{item}}元</span>
          </div>
        </div>
      </div>
      <div class="text-right text-light margin-top-10">
        充值后余额： {{ afterAmount | currency }}元
      </div>
    </div>
    <div class="bank-list margin-top-5">
      <div :key="item.id" @click="changeRechargeTypeId(item.id)" class="item" v-for="item in list">
        <img :src="item.image" alt="">
        <div class="main">{{item.name}}</div>
        <div class="desc text-light">{{item.description||'......'}}</div>
        <checkbox :checked="checkId === item.id"></checkbox>
      </div>
    </div>
    <div class="padding margin-top-20">
      <a :class="{'disabled': list.length === 0}" @click="submit" class="btn" href="javascript:">立即支付</a>
    </div>
  </div>
</template>

<script>//
import Checkbox from '../../components/Checkbox'
import { mapActions, mapMutations, mapState } from 'vuex'
import { CHANGE_RECHARGE_TYPE, RECHARGE, RECHARGE_INFO, RECHARGE_LIST } from '../../store/payment/types'
import { MINE_INFO } from '../../store/user/types'
import Toast from '../../common/toast'
import Util from '../../common/util'

export default {
  name: 'payment',
  data () {
    return {
      number: Util.urlSearch()['lack'] || 300
    }
  },
  computed: {
    afterAmount () {
      return this.number ? this.formatNumber + this.mine.balance : this.mine.balance
    },
    formatNumber () {
      return parseFloat(this.number)
    },
    ...mapState({
      list: state => state.payment.rechargeList,
      checkId: state => state.payment.rechargeTypeId,
      mine: state => state.user.mine
    })
  },
  methods: {
    selectMoney (money) {
      this.number = money
    },
    submit () {
      if (this.number > 0) {
        this.recharge({
          recharge_channel_id: this.checkId,
          money: this.number
        })
      } else {
        Toast('请输入正确的金额!')
      }
    },
    ...mapActions({
      getRechargeList: RECHARGE_LIST,
      recharge: RECHARGE,
      rechargeInfo: RECHARGE_INFO,
      getMineInfo: MINE_INFO
    }),
    ...mapMutations({
      changeRechargeTypeId: CHANGE_RECHARGE_TYPE
    }),
    goBack (path) {
      const query = this.$route.query
      // 重定向路径
      if (query.redirect) {
        const redirect = query.redirect
        delete query.redirect
        delete query.lack
        this.$router.replace({ path: redirect, query })
        // 返回重定向页面,带参数
      } else {
        this.$router.back()
        // 返回根页
      }
    }
  },
  created () {
    this.getMineInfo()
    this.getRechargeList()
    const id = Util.urlSearch()['recharge_sku']
    if (id) {
      this.rechargeInfo({ recharge_sku: id })
    }
  },
  components: { Checkbox }
}
</script>
<style lang="scss" scoped>
  .payment {
  }
</style>
<style>
  .payment .money-box .row .col {
    padding-right: 15px;
    margin-top: 10px;
  }

  .payment .money-box .row .col:last-child {
    padding-right: 0;
  }

  .payment .money-box .row .col span {
    border: 1px solid #ddd;
    height: 33px;
    line-height: 33px;
    display: block;
    text-align: center;
    background: white;
    border-radius: 5px;
  }

  .payment .money-box .row .col span.active {
    border: 1px solid #FFC63A;
    background: #FFC63A;
    color: white;
  }

  .payment .bank-list .item {
    padding: 8px 10px 8px 50px;
    background: #1C1C1C;
    border-bottom: 1px solid #313131;
    position: relative;
  }

  .payment .bank-list .item:last-child {
    border-bottom: none;
  }

  .payment .bank-list .item img {
    position: absolute;
    width: 30px;
    height: 30px;
    left: 10px;
    top: 13px;
  }

  .payment .bank-list .item .main {
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color: white;
  }

  .payment .bank-list .item .desc {
    height: 18px;
    line-height: 18px;
    font-size: 12px;
    color: #999999;
  }

  .payment .checkbox {
    position: absolute;
    right: 10px;
    top: 18px;
  }

  a.btn.disabled {
    pointer-events: none;
    background: #dddddd;
    color: #999999;
  }
</style>
