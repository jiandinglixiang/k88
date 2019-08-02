<template>
  <div class="box-init">
    <v-head title="红包购买"/>
    <div style="position: relative;overflow-x: hidden">
      <template v-for="n in redList">
        <red-item :key="n.id" :propsData="n" :theme="true" @tap="payAffirm"/>
      </template>
    </div>
    <v-dialog @close="hied = false" style="background-color: white" title="购买确认" v-show="hied">
      <div class="text-md margin-top-5">
        <div class="alert-msg">您将使用 <span>{{ purchase.price }}</span>元购买</div>
        <div class="alert-red-conversion">
          <div>¥{{ purchase.value }}</div>
          <div>{{ purchase.diaplay_name }}</div>
        </div>
      </div>
      <div class="padding margin-top-10">
        <a @click="onCloseDialog" class="btn" href="javascript:">购买</a>
      </div>
    </v-dialog>
  </div>
</template>

<style scoped>
  .alert-red-conversion {
    position: relative;
    max-width: 90%;
    margin: 0 auto;
    padding: 16.92% 0;
    background-image: url("../../../assets/red_packet_back_2.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    text-align: left;
    color: white;
  }

  .alert-red-conversion > div:nth-child(1) {
    position: absolute;
    top: 18.9%;
    left: 0;
    max-width: 81%;
    width: 81%;
    height: .7rem;
    line-height: .7rem;
    padding-left: 18.3%;
    background-image: url("../../../assets/icon/red_item_icon.png");
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: 7% 0;
    font-size: .56rem;
    font-weight: bold;
    overflow: hidden;
  }

  .alert-red-conversion > div:nth-child(2) {
    position: absolute;
    width: 81%;
    bottom: 11.58%;
    line-height: 1;
    left: 0;
    padding-left: 7%;
    font-size: .37rem;
    filter: alpha(opacity=70);
    -moz-opacity: 0.7;
    -khtml-opacity: 0.7;
    opacity: 0.7;
  }

  .alert-msg {
    max-width: 90%;
    margin: 0.25em auto;
    color: #666666;
  }

  .alert-msg > span {
    color: #e73f40;
  }
</style>

<script>//
import VDialog from '../../../components/VDialog.vue'
import redItem from './component/redItem.vue'
import Http from '../../../store/Http.js'
import loading from '../../../common/loading'
import Toast from '../../../common/toast'

export default {
  name: 'redPurchase',
  data () {
    return {
      hied: false,
      purchase: {},
      redList: []
    }
  },
  mounted () {
    this.getCouponList()
  },
  methods: {
    getCouponList () {
      loading.show()
      Http.get('/Coupon/getCouponList').then(data => {
        if (data && data.list) {
          this.redList = data.list
        }
        loading.hide()
      })
    },
    onCloseDialog () {
      this.hied = false
      loading.show()
      Http.get('/Coupon/buyCoupon', { coupon_id: this.purchase.id })
        .then(data => {
          loading.hide()
          Toast('红包购买成功')
        })
        .catch(err => {
          let money = 100
          if (err.code === 10006) {
            if (err.data && err.data.money) {
              money = err.data.money
            }
            this.$router.push({ name: 'Payment', query: { lack: money } })
          }
        })
    },
    payAffirm (data) {
      this.purchase = { ...data }
      this.hied = true
    }
  },
  components: { redItem, VDialog }
}
</script>
