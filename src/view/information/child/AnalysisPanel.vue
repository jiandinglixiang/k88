<template>
  <div class="analysis-panel">
    <basket-panel-container title="球队数据">
      <template v-if="teams">
        <basket-team-table :key="n4" :team="team" v-for="(team,n4) in teams"></basket-team-table>
      </template>
    </basket-panel-container>
    <basket-panel-container title="近期交锋">
      <basket-record-table :first="true" :id="detail.home_id" :list="historyRecord.list"
                           :name="detail.home"></basket-record-table>
    </basket-panel-container>
    <basket-panel-container title="客队战绩">
      <basket-record-table :id="detail.guest_id" :list="latestRecord[1].list"
                           :name="detail.guest"></basket-record-table>
    </basket-panel-container>
    <basket-panel-container title="主队战绩">
      <basket-record-table :id="detail.home_id" :list="latestRecord[0].list" :name="detail.home"></basket-record-table>
    </basket-panel-container>
    <basket-panel-container title="未来比赛">
      <template v-for="(record, index) in reverse(futureRecord)">
        <template v-if="record">
          <p :key="`1`+index" class="panel-title-head">
          <img :src="index === 0 ? detail.guest_logo : detail.home_logo" alt="">
          {{record.name}}
          </p>
          <table :key="'2'+index" class="border-bottom-solid">
          <tbody>
          <tr class="bg-gray">
            <td>赛事</td>
            <td>日期</td>
            <td>主队</td>
            <td></td>
            <td>客队</td>
            <td>相隔</td>
          </tr>
          <tr :key="q6" v-for="(item,q6) in record.list">
            <td>{{item.league}}</td>
            <td style="color: #999999">{{item.date | dateFormat('yyyy-MM-dd')}}</td>
            <td>{{item.guest_team}}</td>
            <td>VS</td>
            <td>{{item.home_team}}</td>
            <td>{{item.date_interval}}天</td>
          </tr>
          </tbody>
        </table>
        </template>
      </template>
    </basket-panel-container>
  </div>
</template>

<script>//
import { mapState } from 'vuex'
import BasketRecordTable from './BasketRecordTable.vue'
import BasketTeamTable from './BasketTeamTable.vue'
import BasketPanelContainer from './BasketPanelContainer.vue'

export default {
  name: 'analysisPanel',
  methods: {
    handleChange (index) {
      console.log(index)
    },
    reverse (arr) {
      return [...arr].reverse()
    }
  },
  computed: {
    ...mapState({
      teams: state => state.information.teams,
      historyRecord: state => state.information.historyRecord,
      detail: state => state.information.detail,
      latestRecord: state => state.information.latestRecord,
      futureRecord: state => state.information.futureRecord
    })
  },
  components: { BasketRecordTable, BasketTeamTable, BasketPanelContainer }
}
</script>

<style lang="scss">
  .football-information .panel-title {
    @if($lotteryIg) {
      background: #F2F2F2 url("../../../assets/igdj/football_live_title_bg.png") no-repeat bottom;
    } @else {
      background: $c131313 url("../../../assets/information/football_live_title_bg.png") no-repeat bottom;
    }
    background-size: 100% 75%;
    height: 35px;
    line-height: 25px;
    font-style: italic;
    color: white;
    padding-top: 10px;
    font-size: 14px;
    padding-left: 5px;
  }

  .football-information .all-icon-tip {
    padding: 5px 0 5px 5px;
  }

  .football-information .all-icon-tip span {
    display: inline-block;
    font-size: 12px;
    vertical-align: middle;
  }

  .football-information .block {

  }

  .football-information .item {
    margin: 0;
    /*border-bottom: 1px solid #ddd;*/
    font-size: 14px;
    color: $cFFfFFF;
  }

  .football-information .item .item-center {
    background: #4FAF50;
    width: 50px;
  }

  .football-information .item .item-left,
  .football-information .item .item-right {
    padding: 5px;
  }

  .football-information table {
    font-size: 12px;
    text-align: center;
    width: 100%;
    /*background: white;*/
    border-collapse: collapse;
    @if($lotteryIg) {
      background: $cFFfFFF;
      color: $cgray;
    }
  }

  .football-information table tr.bg-f6 th {
    @if($lotteryIg) {
      background-color: $c131313;
    } @else {
      background-color: $c1c1c1c;
    }
  }

  .football-information table th {
    color: #999999;
    font-weight: normal;
    padding: 8px 0;
  }

  .football-information table td {
    padding: 5px 0;
  }

  .football-information .border-bottom-solid {
    /*border-bottom: 1px solid #dddddd;*/
    @if($lotteryIg) {
      color: $cgray;
    } @else {
      color: $cFFfFFF;
    }
  }

  .football-information .panel-title span {
    float: right;
    color: #999999;
    font-size: 12px;
    padding: 0 10px;
    width: auto;
  }

  .football-information .panel-title span:before {
    display: inline-block;
    content: "";
    width: 5px;
    height: 5px;
    border-radius: 50px;
    background-color: #FF3333;
    left: 2px;
    top: 10px;
    position: absolute;
  }

  .football-information .col span {
    display: inline-block;
    padding: 5px 0;
  }

  .football-information .active {
    color: $cFFfFFF;
  }

  .football-information .active span {
    @if($lotteryIg) {
      border-bottom: 2px solid #f00;
    } @else {
      border-bottom: 2px solid #3393FF;
    }
  }

  .football-information .panel-title-head {
    padding: 10px;
    @if($lotteryIg) {
      color: $cgray;
    } @else {
      color: $cFFfFFF;
    }
  }

  .football-information .panel-title-head img {
    vertical-align: middle;
    margin-top: -3px;
    width: 20px;
    height: 20px;
  }

  .football-information .bg-gray {
    color: $c999999;
    @if($lotteryIg) {
      background: #F2F2F2;
    } @else {
      background: $c1c1c1c;
    }
  }
</style>
