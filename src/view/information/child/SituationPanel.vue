<template>
  <div class="situation-panel">
    <div class="block">
      <div class="panel-title">赛事事件</div>
      <div :key="index1" class="row item" v-for="(event,index1) in events">
        <template v-if="event.event_type === 8 || event.event_type === 10 || event.event_type === 9">
          <div class="col item-left"></div>
          <div class="col col-10 item-center"><span class="football-ic-start"></span></div>
          <div class="col item-right">{{event.content}}</div>
        </template>
        <template v-else>
          <div class="col item-left">
            <template v-if="event.team === 1 || event.team === '1'">
              {{event.content}}
              <event-icon :type="event.event_type"></event-icon>
            </template>
          </div>
          <div class="col col-10 item-center">{{event.time + '\''}}</div>
          <div class="col item-right">
            <template v-if="event.team === 0 || event.team === '0'">
              <event-icon :type="event.event_type"></event-icon>
              {{event.content}}
            </template>
          </div>
        </template>
      </div>
      <div class="all-icon-tip">
        <span class="football-ic-icon"></span>
        <span>进球</span>
        <span class="football-penalty-icon"></span>
        <span>点球</span>
        <span class="football-oolong-icon"></span>
        <span>乌龙</span>
        <span class="football-yellow-red-icon"></span>
        <span>两黄变一红</span>
        <span class="football-ic-decline-icon"></span>
        <span>换上</span>
        <span class="football-ic-rise-icon"></span>
        <span>换下</span>
        <span class="football-assist-icon"></span>
        <span>助攻</span>
      </div>
    </div>
    <div class="block">
      <div class="panel-title">赛事统计</div>
      <template v-if="techs && techs.length > 0">
        <table>
          <tbody>
          <tr :key="index2" v-for="(tech,index2) in techs">
            <td width="13%">{{tech.home_count}}</td>
            <td width="27%">
              <total-percentage :percent="tech.home_rate" direction="left"></total-percentage>
            </td>
            <td width="20%">{{tech.name}}</td>
            <td width="27%">
              <total-percentage :percent="tech.guest_rate" direction="right"></total-percentage>
            </td>
            <td width="13%">{{tech.guest_count}}</td>
          </tr>
          </tbody>
        </table>
      </template>
      <template v-else>
        <div class="block">
          <img alt="暂无数据" class="no-situation-data" src="../../../assets/information/no_situation_data.png">
          <p class="text-center text-light">暂无数据</p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>//
import TotalPercentage from './TotalPercentage.vue'
import EventIcon from './SituationEventIcon.vue'

export default {
  name: 'situationPanel',
  computed: {
    events () {
      const t$is = this
      return t$is.$store.state.information.events.reverse()
    },
    techs () {
      return this.$store.state.information.techDetail.list
    }
  },
  components: { TotalPercentage, EventIcon }
}
</script>

<style lang="scss">
  .situation-panel .panel-title {
    background: $c131313 url("../../../assets/information/football_live_title_bg.png") no-repeat;
    background-size: 100% 100%;
    height: 25px;
    line-height: 25px;
    font-style: italic;
    color: white;
    margin-top: 10px;
    font-size: 14px;
    padding-left: 5px;
  }

  .situation-panel .all-icon-tip {
    background-color: $c1c1c1c;
    padding: 5px 0 5px 5px;
  }

  .situation-panel .all-icon-tip span {
    display: inline-block;
    font-size: 12px;
    vertical-align: middle;
    color: $cFFfFFF;
  }

  .situation-panel .block {
    @if ($lotteryIg) {
      background: $cFFfFFF;
    } @else {
      background: $c313131;
    }
  }

  .situation-panel .item {
    margin: 0;
    border-bottom: 1px solid $c494949;
    font-size: 14px;
    color: white;
  }

  .situation-panel .item .item-center {
    background: #4C9C30;
    width: 50px;
    color: white;
    padding-top: 5px;
    text-align: center;
    font-size: 12px;
  }

  .situation-panel .item .item-left,
  .situation-panel .item .item-right {
    padding: 5px;
  }

  .situation-panel .item .item-left {
    text-align: right;
  }

  .situation-panel .item .item-right {
    text-align: left;
  }

  .situation-panel table {
    font-size: 12px;
    text-align: center;
    width: 100%;
    color: $cFFfFFF;
  }

  .situation-panel table td {
    padding: 5px 0;
  }

  .football-information .no-situation,
  .football-information .no-situation-data {
    width: 100px;
    margin: 0 auto;
    display: block;
  }

  .football-information .no-situation-data {
    width: 70px;
  }

  .football-information .football-ic-start {
    width: 20px;
    height: 20px;
    background: url("../../../assets/information/start.png") no-repeat;
    background-size: 100% 100%;
    display: inline-block;
  }

  .football-information .yellow-card {
    width: 10px;
    height: 15px;
    display: inline-block;
    background: #f4d811;
  }

  .football-information .red-card {
    width: 10px;
    height: 15px;
    display: inline-block;
    background: #e73f40;
  }
</style>
