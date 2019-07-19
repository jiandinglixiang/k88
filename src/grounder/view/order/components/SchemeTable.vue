<template>
  <div>
    <table>
      <tr>
        <th>方案拆分</th>
        <th>玩法</th>
        <th>金额</th>
        <th>奖金</th>
        <th>出票</th>
      </tr>
      <tr :key="index1" v-for="(ticket, index1) in scheme.tickets">
        <td>
          <p class="state-0" :key="index2" v-for="(jc, index2) in ticket.jc_info">{{jc.round_no}} </p>
        </td>
        <td>
          <p v-html="GameName(ticket.lottery_id)"></p>
        </td>
        <td>
          <p>{{ticket.ticket_amount}}</p>
        </td>
        <td>
          <p :class="{'status-2':ticket.ticket_winnings_status*1===0}">
            {{SetTicketStatus(ticket.ticket_winnings_status, ticket.ticket_winnings)}}</p>
        </td>
        <td>
          <p>{{TicketStatusTxt(ticket.ticket_status)}}</p>
        </td>
      </tr>
    </table>
    <div class="row table-bottom">
      <div class="col">出票成功：{{scheme.success_amount}}元</div>
      <div class="col text-primary">奖金：{{scheme.winnings_bonus}}元</div>
    </div>
  </div>
</template>

<script>//
export default {
  name: 'SchemeTable',
  props: ['scheme'],
  methods: {
    GameName (lotteryid) {
      let _html = ``
      if (lotteryid === '903') {
        _html = `<p>滚盘<br>全场让球</p>`
      } else if (lotteryid === '904') {
        _html = `<p>滚盘<br>全场大小球</p>`
      } else {
        _html = ``
      }
      return _html
    },
    TicketStatusTxt (status) {
      // 出票状态: 0待出票 1出票成功 2出票失败
      switch (parseInt(status)) {
        case 0:
          return '待出票'
        case 1:
          return '成功'
        case 2:
          return '失败'
        default:
          return ''
      }
    },
    SetTicketStatus (status, winnings) {
      const winstatus = parseInt(status)
      const prizeText = winstatus === -1 ? '未中奖' : winstatus === 0 ? '待开奖' : winnings
      return prizeText
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

    .status-2 {
      color: $cFFfFFF;
    }
  }

  .table-bottom {
    padding: 8px 0;
    background: $c313131;;
    border-top: 8px dotted $c131313;
    text-align: center;
    color: $c999999;
  }
</style>
