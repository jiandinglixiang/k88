<template>
  <table>
    <tr>
      <th>场次</th>
      <th>主队vs客队</th>
      <th v-if="lotteryId==='903'">即时比分</th>
      <th>投注内容/出票赔率</th>
      <th>彩果</th>
    </tr>
    <tr :key="index" v-for="(item,index) in list">
      <td>
        <p>{{item.round_no}}</p>
      </td>
      <td>
        <p>{{item.home}}</p>
        <p>VS</p>
        <p>{{item.guest}}</p>
      </td>
      <td v-if="item.lottery_id==='903'">
        <p>即时比分 <br>{{item.bet_score}}</p>
      </td>
      <td>
        <p
          :class="{'state-0': oddText(item,item.lottery_id ).status===3,'state-1': oddText(item,item.lottery_id).status===1}"
          v-html="BetContent (oddText(item,item.lottery_id), item)"></p>
      </td>
      <td>
        <p v-html="Fruit(item, status)"></p>
      </td>
    </tr>
  </table>
</template>

<script>//
import { betOddText } from '../../../store/order'

export default {
  name: 'OrderTable',
  props: ['list', 'status', 'lotteryId'],
  computed: {},
  methods: {
    oddText (item, id) {
      return betOddText(item, id)
    },
    Fruit (n, status) {
      let _html = ``
      let finalArr = n.schedule_final_score.split(':')
      if (status === 4 || status === 5) {
        _html = `<p>最终</p><p>${finalArr[0]}-${finalArr[1]}</p>`
      } else if (status === 11) {
        _html = `<p class="text-primary">取消</p>`
      } else {
        _html = ``
      }
      return _html
    },
    BetContent (oddtxt, n) {
      let _html = ``
      let big = oddtxt.key.charAt(oddtxt.key.length - 1) === '1' // 1 大球/主队
      if (n.lottery_id === '903') {
        if (big) {
          _html = `<span>让球 <br> ${n.home}<br>(${oddtxt.text}) ${oddtxt.odd}</span>`
        } else {
          _html = `<span>让球 <br> ${n.guest}<br>(${oddtxt.text}) ${oddtxt.odd}</span>`
        }
      } else if (n.lottery_id === '904') {
        if (big) {
          _html = `<span>大<br>(${oddtxt.text}) ${oddtxt.odd}</span>`
        } else {
          _html = `<span>小<br>(${oddtxt.text}) ${oddtxt.odd}</span>`
        }
      } else {
        _html = ``
      }
      return _html
    }
  }
}
</script>

<style scoped lang="scss">
  table {
    width: 100%;
    background: $c313131;
    border-collapse: collapse;
    color: $c999999;

    th {
      color: $cCccCCc
    }

    th, td {
      padding: 9px 0;
      border-top: 1px solid #494949;
      border-right: 1px solid #494949;
      text-align: center;
    }

    > tr > th {
      border-top: none
    }

    > tr > td:last-child,
    > tr > th:last-child {
      border-right: none;
    }

    .state-0 {
      color: $cffC63A;

      &:after {
        content: '';
        display: inline-block;
        width: 12px;
        height: 9px;
        background-image: url(../../../../assets/icon/gold_check.png);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    .state-1 {
      color: #3698fb;

      &:after {
        content: '';
        display: inline-block;
        width: 12px;
        height: 9px;
        background-image: url(../../../../assets/icon/blue_check.png);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
</style>
