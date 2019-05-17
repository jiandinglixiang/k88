<template>
  <div :class="{'collapse': item.collapse}" class="table-container">
    <div @click="switchCollapse" class="table-header row text-center">
      <div class="col col-30 col-center text-ml">{{item.company_name}}</div>
      <div class="col col-20 text-light">
        <div>初盘</div>
        <div>即时</div>
      </div>
      <template v-if="isFootball">
        <div class="col col-10 text-sm">
          <div>{{item.origin_odds.win|currency}}</div>
          <div :class="returnColor(item.current_odds.win, item.origin_odds.win)">{{item.current_odds.win|currency}}
          </div>
        </div>
        <div class="col col-20 text-sm">
          <div class="ellipsis">{{centerText(item.origin_odds)}}</div>
          <div class="ellipsis">{{centerText(item.current_odds)}}</div>
        </div>
        <div class="col col-10 text-sm">
          <div>{{item.origin_odds.lose|currency}}</div>
          <div :class="returnColor(item.current_odds.lose, item.origin_odds.lose)">{{item.current_odds.lose|currency}}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="col col-10 text-sm">
          <div>{{(item.origin_odds.lose || item.origin_odds.high)|currency}}</div>
          <div
            :class="returnColor(item.current_odds.lose || item.current_odds.high, item.origin_odds.lose || item.origin_odds.high)">
            {{(item.current_odds.lose || item.current_odds.high)|currency}}
          </div>
        </div>
        <div class="col col-20 text-sm">
          <div class="ellipsis">
            <span :class="{'bg-blue': type == 2, 'bg-green': type == 0}">
              {{item.origin_odds.equal || item.origin_odds.condition}}
            </span>
          </div>
          <div class="ellipsis">
            <span :class="{'bg-blue': type == 2, 'bg-green': type == 0}">
              {{item.current_odds.equal || item.current_odds.condition}}
              {{returnDirection(item.current_odds.condition, item.origin_odds.condition)}}
            </span>
          </div>
        </div>
        <div class="col col-10 text-sm">
          <div>{{(item.origin_odds.win || item.origin_odds.low)|currency}}</div>
          <div
            :class="returnColor(item.current_odds.win || item.current_odds.low, item.origin_odds.win || item.origin_odds.low)">
            {{(item.current_odds.win || item.current_odds.low)|currency}}
          </div>
        </div>
      </template>
      <div class="col col-10 col-center">
        <span :class="{'rotate': !item.collapse}" class="odds_down"></span>
      </div>
    </div>
    <div class="list">
      <div class="row list-header">
        <div class="col col-30">时间</div>
        <div class="col col-70">赔率变化</div>
      </div>
      <div class="row list-item" v-for="(record, index) in list">
        <div class="col col-center col-30 text-light">{{record.time | dateFormat('MM-dd hh:mm')}}</div>
        <div class="col col-center col-20"></div>
        <template v-if="isFootball">
          <template v-if="index < list.length - 1">
            <div :class="returnColor(list[index].current_odds.win, list[index+1].current_odds.win)"
                 class="col col-center col-10">
              {{record.current_odds.win|currency}}
            </div>
            <div class="col col-center col-20" style="color: #999999">{{centerText(item.current_odds)}}</div>
            <div :class="returnColor(list[index].current_odds.lose, list[index+1].current_odds.lose)"
                 class="col col-center col-10">
              {{record.current_odds.lose|currency}}
            </div>
          </template>
          <template v-else>
            <div class="col col-center col-10">{{(record.current_odds.win)|currency}}</div>
            <div class="col col-center col-20">{{centerText(item.current_odds)}}</div>
            <div class="col col-center col-10">{{(record.current_odds.lose)|currency}}</div>
          </template>
        </template>
        <template v-else>
          <template v-if="index < list.length - 1">
            <div
              :class="returnColor(list[index].current_odds.lose || list[index].current_odds.high, list[index+1].current_odds.lose || list[index+1].current_odds.high)"
              class="col col-center col-10">
              {{(record.current_odds.lose || item.current_odds.high)|currency}}
            </div>
            <div class="col col-center col-20">
              <span :class="{'bg-blue': type == 2, 'bg-green': type == 0}">
                {{record.current_odds.equal || record.current_odds.condition}}
                {{returnDirection(list[index].current_odds.condition, list[index+1].current_odds.condition)}}
              </span>
            </div>
            <div
              :class="returnColor(list[index].current_odds.win || list[index].current_odds.low, list[index+1].current_odds.win || list[index+1].current_odds.low)"
              class="col col-center col-10">
              {{(record.current_odds.win || item.current_odds.low)|currency}}
            </div>
          </template>
          <template v-else>
            <div class="col col-center col-10">{{(record.current_odds.lose || item.current_odds.high)|currency}}</div>
            <div class="col col-center col-20">
              <span :class="{'bg-blue': type == 2, 'bg-green': type == 0}">{{record.current_odds.equal || record.current_odds.condition}}</span>
            </div>
            <div class="col col-center col-10">{{(record.current_odds.win || item.current_odds.low)|currency}}</div>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script>//
import { INFORMATION_ODDS_CHANGE, INFORMATION_SWITCH_ODDS_COLLAPSE } from '../../../store/information/types'

export default {
  name: 'plateTable',
  props: ['item', 'index', 'type'],
  computed: {
    list () {
      return this.$store.state.information.changeOdds[this.type]
    },
    isFootball () {
      return String(this.$store.state.information.lottery) === '6'
    }
  },
  methods: {
    switchCollapse () {
      // 集中加载数据
      if (this.item.collapse) {
        this.$store.dispatch(INFORMATION_ODDS_CHANGE, { type: this.type, id: this.item.company_id })
      }
      this.$store.commit(INFORMATION_SWITCH_ODDS_COLLAPSE, { type: this.type, index: this.index })
    },
    returnColor (a, b) {
      return a > b ? 'yellow' : a < b ? 'green' : ''
    },
    returnDirection (a, b) {
      if (parseInt(this.type) === 2 || parseInt(this.type) === 0) {
        return a > b ? '↑' : a < b ? '↓' : ''
      } else {
        return ''
      }
    },
    centerText (odds) {
      if (odds.equal) {
        return parseFloat(odds.equal).toFixed(2)
      } else {
        return odds.condition
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-container {
    font-size: 14px;
    @if($lotteryIg) {
      border-bottom: 1px solid #ddd;
    } @else {
      border-bottom: 1px solid $c313131;
    }
  }

  .table-container .table-header {
    background: $c1c1c1c;
    padding: 5px 0;
    @if($lotteryIg) {
      color: $cgray;
    } @else {
      color: $cFFfFFF;
    }
  }

  .table-container .col div {
    height: 25px;
    line-height: 25px;
  }

  .table-container .arrow-bottom-icon {
    width: 25px;
    height: 15px;
    display: inline-block;
  }

  .table-container .arrow-bottom-icon.rotate {
    transform: rotate(180deg);
  }

  .table-container .list {
    text-align: center;
    @if($lotteryIg) {
      background: $cEbebeb;
    } @else {
      background-color: $c313131;
    }
  }

  .table-container .list .list-header {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #999;
    @if($lotteryIg) {
      background: $c131313;
    }
  }

  .table-container .list .list-item {
    padding: 5px 0;
    margin-top: 0;
    font-size: 12px;
    @if($lotteryIg) {
      border-top: 1px dotted #ddd;
      color: $c999999;
    } @else {
      border-top: 1px solid $c494949;
      color: $cFFfFFF;
    }
  }

  .table-container.collapse .list {
    display: none;
  }

  .table-container .odds_down {
    width: 20px;
    height: 16px;
    background: url("../../../assets/information/odds_down.png") no-repeat center;
    background-size: 100% 100%;
    transition: all 0.5s;
    display: inline-block;
  }

  .table-container .odds_down.rotate {
    transform: rotate(180deg);
  }

  .table-container span.bg-blue {
    background: #3F86E7;
    color: white;
    padding: 0px 5px;
    border-radius: 15px;
    line-height: 20px;
  }

  .table-container span.bg-green {
    background: #41B43B;
    color: white;
    padding: 0px 5px;
    border-radius: 15px;
    line-height: 20px;
  }
</style>
