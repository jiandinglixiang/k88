<template>
  <div class="order-scheme">
    <v-head title="方案明细"></v-head>
    <div class="padding text-dark">
      <span class="order-content-icon"></span> 投注内容
    </div>
    <div v-if="detail.jc_info">
      <order-table :list="detail.jc_info"></order-table>
    </div>
    <div v-else-if="detail.tickets">
      <!--数字彩 -->
      <table cellpadding="0" cellspacing="0" class="betting-content">
        <tbody>
        <tr :key="i" v-for="(ticket, i) in detail.tickets">
          <!--十一选五 快3 福彩3D-->
          <template v-if="ticket.lotteryType == 'syxw' || ticket.lotteryType == 'k3' || ticket.lotteryType == 'fc3d'">
            <td class="text-center" v-if="i === 0" v-rowspan="detail.tickets.length" width="20%">投注内容</td>
            <td :width="ticket.lotteryType == 'k3'?'30%':'20%'" class="text-center">{{ticket.playTypeText}}</td>
            <td :width="ticket.lotteryType == 'k3'?'50%':'60%'" class="text-sm">
                <span :key="k" v-for="(r, k) in ticket.result">
                  <span v-if="k > 0">|</span>
                  <template v-if="r.pre">
                    <span>(</span>
                    <span :class="{'margin-left-3': t > 0, 'text-primary': p.checked}" :key="t" v-for="(p, t) in r.pre">{{p.text}}</span>
                    <span>)</span>
                  </template>
                  <span :class="{'text-primary': i.checked}" :key="kk"
                        class="margin-right-3" v-for="(i,kk) in r.next">{{i.text}}</span>
                </span>
            </td>
          </template>
          <!--双色球和大乐透- -->
          <template v-else>
            <td class="text-center" v-if="i === 0" v-rowspan="detail.tickets.length" width="20%">投注内容</td>
            <td class="text-center" v-if="i === 0" v-rowspan="detail.tickets.length" width="15%">
              {{ticket.playTypeText}}
            </td>
            <td class="text-sm" width="45%">
              <template v-if="ticket.result[0].pre">
                <span>(</span>
                <span :class="{'margin-left-3': t > 0, 'text-primary': p.checked}"
                      :key="t" v-for="(p, t) in ticket.result[0].pre">{{p.text}}</span>
                <span>)</span>
              </template>
              <span :class="{'text-primary': i.checked}" :key="`02${index02}`" class="margin-right-3"
                    v-for="(i,index02) in ticket.result[0].next">{{i.text}}</span>
            </td>
            <td class="text-sm" width="20%">
              <template v-if="ticket.result[1].pre">
                <span>(</span>
                <span :class="{'margin-left-3': t > 0, 'text-primary': p.checked}"
                      :key="t" v-for="(p, t) in ticket.result[1].pre">{{p.text}}</span>
                <span>)</span>
              </template>
              <span :class="{'text-primary': i.checked}" :key="`01${index01}`" class="margin-right-3"
                    v-for="(i,index01) in ticket.result[1].next">{{i.text}}</span>
            </td>
          </template>
        </tr>
        <tr>
          <td class="text-center" colspan="2">彩果</td>
          <template v-if="detail.tickets && detail.tickets[0].lotteryType === 'k3'">
            <td>
              <span :class="'k3-' + ball + '-icon'" :key="`8${index8}`" class="k3-item"
                    v-for="(ball,index8) in (detail.prizeResult && detail.prizeResult[0])"></span>
            </td>
          </template>
          <template v-else>
            <td class="text-sm">
              <span :key="`9${index9}`" class="bg-red-ball margin-right-3"
                    v-for="(r,index9) in (detail.prizeResult && detail.prizeResult[0])">{{r}}</span>
            </td>
            <td v-if="detail.tickets[0].lotteryType !== 'syxw'">
              <span :key="`10${index10}`" class="bg-blue-ball margin-right-3"
                    v-for="(r,index10) in (detail.prizeResult && detail.prizeResult[1])">{{r}}</span>
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="padding text-dark">
      <span class="order-scheme-icon"></span> 方案明细
    </div>
    <table cellpadding="0" cellspacing="0" class="text-sm text-center table-scheme" width="100%">
      <thead class="text-light">
      <tr>
        <td :width="detail.tickets && detail.tickets[0].lotteryType === 'k3'?'35%':'45%'">方案拆分</td>
        <td :width="detail.tickets && detail.tickets[0].lotteryType === 'k3'?'20%':'10%'">玩法</td>
        <td width="15%">金额</td>
        <td width="15%">奖金</td>
        <td width="15%">出票</td>
      </tr>
      </thead>
      <tbody>
      <tr :key="`5${index5}`" v-for="(item,index5) in scheme.tickets">
        <td style="padding-left: 3px">
          <div :key="`6${i6}`" v-for="(jc,i6) in item.jc_info">
            <!--显示足彩和篮彩-->
            <span v-if="jc.showCheck">
              <div :key="`7${i}`" v-for="(bet, i) in jc.betting">
                <span :class="{'text-primary': bet.checked,'blue-color':bet.status*1===1}" class="round-no">{{i === 0 ? jc.round_no : ''}}</span>
                <span :class="{'text-primary': bet.checked,'blue-color':bet.status*1===1}"
                      style="display: inline-block; padding-left: 5px; min-width:80px;">
                  {{bet.text}}
                  <template v-if="jc.team && jc.team.letPointText">({{jc.team.letPointText}})</template>
                  <template v-if="jc.team && jc.team.basePointText">({{jc.team.basePointText}})</template>
                  <template v-if="bet.value">{{`(${toDecimal(bet.value)})`}}</template>
                                     <span class="red-check-icon" v-if="bet.checked"></span>
                <span class="check-active" v-if="bet.status*1===1"></span>
                </span>
              </div>
            </span>
            <!--胜负彩和任选九-->
            <span v-else>
              <span class="round-no">{{jc.round_no}}</span>
              <span :key="`4${i}`" v-for="(bet, i) in jc.betting">
                <span :class="{'text-primary': bet.checked}">{{bet.text}}</span><span
                v-if="i < jc.betting.length -1">|</span>
              </span>
              <br>
            </span>
          </div>
          <div :key="`1${k}`" v-for="(r, k) in item.result">
            <span class="pull-left"
                  v-if="k > 0">{{item.lotteryType === 'syxw' || item.lotteryType === 'fc3d'?'|':':'}}</span>
            <template v-if="r.pre">
              <span class="pull-left">（</span>
              <span :class="{'margin-left-3': t > 0, 'text-primary': p.checked}" class="pull-left"
                    :key="`2${t}`" v-for="(p, t) in r.pre">{{p.text}}</span>
              <span class="pull-left">）</span>
            </template>
            <template v-if="detail.tickets && detail.tickets[0].lotteryType === 'k3'">
              <span :class="{'text-primary': i.checked}" :key="`3${index3}`" class="margin-right-3"
                    v-for="(i,index3) in r.next">{{i.text}}</span>
            </template>
            <template v-else>
              <span :class="{'text-primary': i.checked}" :key="`4${index4}`" class="margin-right-3 pull-left"
                    v-for="(i,index4) in r.next">{{i.text}}</span>
            </template>
          </div>
        </td>
        <td>
          <span v-if="item.seriesText">{{item.seriesText}}<br/></span>
          <span v-if="item.playTypeText">{{item.playTypeText}}<br/></span>
          <p class="nowrap" v-if="item.lottery_id=='901'">全场让球</p>
          <p class="nowrap" v-else-if="item.lottery_id=='902'">全场大/小球</p>
          <span v-else>{{item.multiple}}倍</span>
        </td>
        <td>{{item.ticket_amount | currency}}</td>
        <td :class="{'text-primary': item.ticket_winnings > 0}">{{item.prizeText}}</td>
        <td>{{item.statusText}} <br><span v-if="item.ticket_status > 0 && item.printout_time > 0">{{item.printout_time | dateFormat('hh:mm:ss')}}</span>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="line">
      <img alt="line" src="../../assets/scheme_line1.png">
    </div>
    <div class="row text-center bg-darken text-sm padding text-light">
      <div class="col">出票成功：{{scheme.success_amount | currency}}元</div>
      <div class="col">出票失败：{{scheme.failure_amount | currency}}元</div>
      <div class="col text-primary">奖金：<span :class="{'text-primary': scheme.winnings_bonus > 0}">{{scheme.winnings_bonus | currency}}</span>元
      </div>
    </div>
  </div>
</template>

<script>//
import OrderTable from '../../components/OrderTable'
import { mapActions, mapState } from 'vuex'
import { ORDER_SCHEME_REQUEST } from '../../store/user/types'

export default {
  name: 'orderScheme',
  computed: {
    ...mapState({
      detail: state => state.user.orders.detail,
      scheme: state => state.user.orders.scheme
    })
  },
  methods: {
    ...mapActions({
      getOrderScheme: ORDER_SCHEME_REQUEST
    }),
    toDecimal (odds) {
      if (this.detail.lottery_id * 1 === 901 || this.detail.lottery_id * 1 === 902) {
        let f = (odds * 1)
        let value = f.toString()
        let rs = value.indexOf('.')
        if (rs < 0) {
          rs = value.length
          value += '.'
        }
        if (value.length > rs + 3) {
          let st = value.length - (rs + 3)
          value = value.substring(0, value.length - st)
        }
        while (value.length <= rs + 2) {
          value += '0'
        }
        return value
      } else {
        return odds
      }
    }
  },
  created () {
    this.getOrderScheme(this.$route.params.id)
  },
  components: {
    OrderTable
  }
}
</script>

<style lang="scss">
  .nowrap {
    white-space: nowrap;
  }

  .blue-color {
    color: #3692fb;
  }

  .check-active {
    display: inline-block;
    width: 5px;
    height: 2px;
    background: #3692fb;
    line-height: 0;
    font-size: 0;
    vertical-align: middle;
    -webkit-transform: rotate(45deg);
  }

  .check-active:after {
    content: '/';
    display: block;
    width: 10px;
    height: 2px;
    background: #3692fb;
    -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
  }

  .text-primary {
    color: $cffC63A;
  }

  .bg-darken {
    @if ($lotteryIg) {
      background: $cFFfFFF;
    } @else {
      background: #313131;
    }
  }

  .order-scheme .order-content-icon,
  .order-scheme .order-scheme-icon {
    display: inline-block;
    vertical-align: top;
    margin-top: 1px;
  }

  .order-scheme .red-check-icon {
    margin-left: 0;
    margin-top: 5px;
    position: absolute;
  }

  .order-scheme .table-scheme {
    border-collapse: collapse;
  }

  .order-scheme .table-scheme tr {
    @if ($lotteryIg) {
      border-top: 1px solid #fff;
      background: $cFFfFFF;
    } @else {
      border-top: 1px solid #1c1c1c;
      background: #313131;
    }
  }

  .order-scheme .table-scheme td {
    @if ($lotteryIg) {
      border: 1px solid #ddd;
    } @else {
      border: 1px solid #494949;
    }
  }

  .order-scheme .table-scheme thead td {
    padding: 5px 0;
    @if ($lotteryIg) {
      border-top: 1px solid $cFFfFFF;
    } @else {
      border-top: 1px solid #313131;
    }
  }

  .order-scheme .table-scheme tbody td {
    padding: 10px 0;
    color: $c999999;

    &.text-primary {
      color: $cffC63A;
    }
  }

  .order-scheme .table-scheme tbody tr:last-child td {
    border-bottom: 0;
  }

  .order-scheme .line {
    line-height: 0;
  }

  .order-scheme .line img {
    width: 100%;
  }

  .order-scheme .round-no {
    width: 60px;
    display: inline-block;
    padding-left: 10px;
    vertical-align: middle;
  }

  .order-scheme .betting-content {
    font-size: 14px;
    background: white;
    width: 100%;
  }

  .order-scheme .betting-content td {
    border-top: 1px solid #f2f2f2;
    border-left: 1px solid #f2f2f2;
    padding: 5px 5px;
  }

  @media screen and (max-width: 350px) {
    .order-scheme .table-scheme {
      font-size: 10px;
    }
  }

  .order-scheme .k3-item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
  }
</style>
