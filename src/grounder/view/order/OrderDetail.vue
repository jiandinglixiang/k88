<template>
  <div class="order-detail">
    <v-head title="投注详情"></v-head>
    <!--0中奖1未中奖2退款-->
    <div class="order-info" :class="StatusClass(details.status)">
      <img class="thumb" :src="details.lottery_image" alt="" width="40" height="40">
      <div class="info">
        <div class="tit text-md">{{details.lottery_name}}</div>
        <p>投注金额：<span>{{details.total_amount}}</span></p>
        <p class="status">中奖金额：<span>{{details.winnings_bonus}}</span></p>
      </div>
    </div>
    <div class="card order-status">
      <div class="title">订单状态：<span class="text-primary">{{StatusTxt(details.status)}}</span></div>
    </div>
    <div class="card order-content">
      <div class="title">投注内容：<span>1注,1场,滚盘</span></div>
      <order-table :list="details.jc_info" :status="details.status" :lottery-id="details.lottery_id"></order-table>
      <div class="title">投注时间：<span>{{time(details.buying_time)}}</span></div>
      <div class="title">方案编号：<span>{{details.sku}}</span></div>
    </div>
    <router-link class="card scheme" :to="{path:'/OrderDetailScheme',query:{id:this.$route.params.id}}">方案明细
    </router-link>
  </div>
</template>

<script>//
import VHead from '../../../components/VHead'
import OrderTable from './components/OrderTable'
import http from '../../http'

export default {
  name: 'OrderDetail',
  data () {
    return {
      details: {
        jc_info: []
      }
    }
  },
  methods: {
    StatusClass (val) {
      // 5中奖 4未中奖 //8退款
      switch (parseInt(val)) {
        case 5:
          return 'status-0'
        case 4:
          return 'status-1'
        case 8:
          return 'status-2'
        default:
          return ''
      }
    },
    StatusTxt (status) {
      // 订单状态: 1未支付 2出票失败 3待开奖 4未中奖 5已中奖 6等待派奖 7出票中 8出票失败 9部分中奖 10未开始 11已取消
      switch (parseInt(status)) {
        case 1:
          return '未支付'
        case 2:
          return '出票失败'
        case 3:
          return '待开奖'
        case 4:
          return '未中奖'
        case 5:
          return '已中奖'
        case 6:
          return '等待派奖'
        case 7:
          return '出票中'
        case 8:
          return '出票失败'
        case 9:
          return '部分中奖'
        case 10:
          return '未开始'
        case 11:
          return '已取消'
        default:
          return ''
      }
    },
    time (time) {
      function timeFormat (value, format) {
        let time = new Date(value * 1000)
        const date = {
          'M+': time.getMonth() + 1, // 月
          'd+': time.getDate(), // 日
          'h+': time.getHours(), // 小时
          'm+': time.getMinutes(), // 分
          's+': time.getSeconds(), // 秒
          'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
          'S+': time.getMilliseconds() // 毫秒
        }
        if (/(y+)/i.test(format)) {
          format = format.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (var k in date) {
          if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length === 1
              ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
          }
        }
        return format
      }

      let value = timeFormat(time, 'yyyy-MM-dd hh:mm')
      return value
    }
  },
  created () {
    http.getOrderDetail(this.$route.params.id).then(val => {
      if (val) {
        this.details = val
      }
    })
  },
  filters: {},
  components: {
    VHead,
    OrderTable
  }
}
</script>

<style scoped lang="scss">
  .order-info {
    position: relative;
    padding: 10px 80px 20px 77px;
    background-color: $c1c1c1c;

    .status {
      span {
        color: $cffC63A;
      }
    }

    &:before,
    &:after {
      position: absolute;
      content: '';
    }

    &:before {
      right: 0;
      width: 70px;
      -webkit-background-size: cover;
      background-size: cover;
    }

    &:after {
      left: 0;
      bottom: -4px;
      width: 100%;
      height: 0;
      border-bottom: dotted 8px $c131313;
    }

    &.status-0 {
      &:before {
        top: 0;
        height: 37px;
        background-image: url("../../../assets/icon/win.png");
      }
    }

    &.status-1 {
      &:before {
        top: 12px;
        height: 26px;
        background-image: url("../../../assets/icon/no_win.png");
      }
    }

    &.status-2 {
      &:before {
        top: 35px;
        right: 14px;
        width: 51px;
        height: 45px;
        background-image: url("../../../assets/icon/refund.png");
      }
    }

    .thumb {
      position: absolute;
      left: 15px;
      top: 50%;
      margin-top: -20px;
    }

    .info {
      .tit {
        margin-bottom: 10px;
        color: $cFFfFFF;
      }

      p {
        margin-top: 5px;
        color: $c999999;
      }
    }
  }

  .card {
    margin-top: 10px;
    background-color: $c1c1c1c;

    .title {
      padding: 8px 15px;
      color: $c999999;
    }
  }

  .scheme {
    display: block;
    padding: 10px 15px;
    position: relative;
    font-size: 16px;
    color: $c999999;

    &:after {
      position: absolute;
      content: '';
      top: 50%;
      right: 10px;
      margin-top: -6px;
      width: 7px;
      height: 12px;
      background-image: url(../../../assets/icon/arrow_right.png);
      -webkit-background-size: cover;
      background-size: cover;
    }
  }
</style>
