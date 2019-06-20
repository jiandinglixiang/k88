<template>
  <div :class="{'collapse': collapse}" class="table-container">
    <div @click="switchCollapse" class="table-header">
      {{title}}
      <div class="switch-arrow">
        <span :class="{'rotate': collapse}" class="arrow-bottom-icon"></span>
      </div>
    </div>
    <template v-for="(item, index5) in data">
      <div :key="`1${index5}`" class="table-title" v-html="titleText(item, index5)"></div>
      <table :key="`2${index5}`" border="0" cellpadding="0" cellspacing="0">
        <thead>
        <tr>
          <td width="20%">赛事</td>
          <td width="20%">日期</td>
          <template v-if="isFuture">
            <td width="45%">
              <div class="row">
                <span class="col">主队</span>
                <span class="col"></span>
                <span class="col">客队</span>
              </div>
            </td>
            <td width="15%">相隔</td>
          </template>
          <template v-else>
            <td width="60%">
              <div class="row">
                <span class="col">主队</span>
                <span class="col"></span>
                <span class="col">客队</span>
                <span class="col">胜负</span>
              </div>
            </td>
          </template>
        </tr>
        </thead>
        <tbody>
        <tr :key="index3" v-for="(record,index3) in item.list">
          <td width="20%">{{record.league}}</td>
          <td width="20%">{{record.date | dateFormat('yyyy-MM-dd')}}</td>
          <template v-if="isFuture">
            <td width="45%">
              <div class="row">
                <span class="col col-center">{{record.home_team}}</span>
                <span class="col col-center">VS</span>
                <span class="col col-center">{{record.guest_team}}</span>
              </div>
            </td>
            <td width="15%">{{record.date_interval}}天</td>
          </template>
          <template v-else>
            <td width="60%">
              <div class="row">
                <span :class="returnTextColor(item, record.home_team_id, record)" class="col col-center">{{record.home_team}}</span>
                <span class="col col-center">{{record.score}}</span>
                <span :class="returnTextColor(item, record.guest_team_id, record)" class="col col-center">{{record.guest_team}}</span>
                <span :class="returnColor(item, record)" class="col col-center">{{returnResult(item, record)}}</span>
              </div>
            </td>
          </template>
        </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>//
export default {
  name: 'recordTable',
  props: ['isFuture', 'title', 'data'],
  data () {
    return {
      collapse: false
    }
  },
  methods: {
    switchCollapse () {
      this.collapse = !this.collapse
    },
    titleText (item, index) {
      if (item && item.history_fight) {
        return '近{0}场，主队<span class="red">{1}胜</span><span class="green">{2}平</span><span class="blue">{3}负</span>'
          .format(item.history_fight.games_count, item.history_fight.win, item.history_fight.equal, item.history_fight.lose)
      } else if (item.latest_record) {
        let preText = '近{0}场，{1}<span class="red">{2}胜</span><span class="green">{3}平</span><span class="blue">{4}负</span>'
          .format(item.latest_record.games_count, item.name, item.latest_record.win, item.latest_record.equal, item.latest_record.lose)
        let records = item.list.filter(v => parseInt(index === 1 ? v.guest_team_id : v.home_team_id) === parseInt(item.team_id))
        let s1 = 0
        let s2 = 0
        let s3 = 0
        records.map(v => {
          let score = v.score.split(':').map(v => parseInt(v))
          if (score[0] === score[1]) {
            s2++
          } else if (score[0] > score[1]) {
            index === 0 ? s1++ : s3++
          } else {
            index === 0 ? s3++ : s1++
          }
        })
        let nextText = ', {0}<span class="red">{1}胜</span><span class="green">{2}平</span><span class="blue">{3}负</span>'
          .format(index === 1 ? '客场' : '主场', s1, s2, s3)
        return preText + nextText
      } else {
        return item.name
      }
    },
    returnColor (item, record) {
      if (record.score) {
        let score = record.score.split(':').map(v => parseInt(v))
        if (parseInt(item.team_id) === parseInt(record.home_team_id)) {
          return score[0] > score[1] ? 'yellow' : score[0] < score[1] ? 'green' : 'blue'
        } else {
          return score[0] < score[1] ? 'yellow' : score[0] > score[1] ? 'green' : 'blue'
        }
      }
    },
    returnResult (item, record) {
      if (record.score) {
        let score = record.score.split(':').map(v => parseInt(v))
        if (parseInt(item.team_id) === parseInt(record.home_team_id)) {
          return score[0] > score[1] ? '胜' : score[0] < score[1] ? '负' : '平'
        } else {
          return score[0] < score[1] ? '胜' : score[0] > score[1] ? '负' : '平'
        }
      }
    },
    returnTextColor (item, id, record) {
      if (parseInt(item.team_id) === parseInt(id)) {
        return this.returnColor(item, record)
      }
      return ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .table-container {
    font-size: 14px;
    @if ($lotteryIg) {
      background: #F2F2F2;
    } @else {
      background: $c1c1c1c;
    }
  }

  .table-container .table-header {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    position: relative;
    @if ($lotteryIg) {
      color: $cgray;
      border-bottom: 1px solid $c131313;
      background: $cFFfFFF;
    } @else {
      border-bottom: 1px solid $c313131;
      color: $cFFfFFF;
    }
  }

  .table-container .switch-arrow {
    height: 16px;
    width: 16px;
    border-radius: 20px;
    margin-left: 5px;
    vertical-align: middle;
    position: absolute;
    right: 10px;
    top: 12px;
    @if ($lotteryIg) {
      border: 1px solid $c999999;
    } @else {
      border: 1px solid #ddd;
    }
  }

  .table-container .arrow-bottom-icon {
    display: inline-block;
    vertical-align: top;
    @if ($lotteryIg) {
      margin-left: 0;
      margin-top: 4px;
    } @else {
      margin-left: 1px;
      margin-top: 3px;
    }
  }

  .table-container .arrow-bottom-icon.rotate {
    transform: rotate(180deg);
  }

  .table-container .table-title {
    height: 20px;
    margin: 5px 10px;
    border-left: 3px solid $cffC63A;
    padding-left: 5px;
    color: $cFFfFFF;
    @if ($lotteryIg) {
      color: $cgray;
    } @else {
      color: $cFFfFFF;
    }
  }

  .table-container table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border: none;
  }

  .table-container table thead {
    color: #B4B4B4;
    @if ($lotteryIg) {
      background: $cEbebeb;
    }
  }

  .table-container table tbody {
    font-size: 12px;
    @if ($lotteryIg) {
      background: $cFFfFFF;
      color: $cgray;
    } @else {
      background-color: $c313131;
      color: $cFFfFFF;
    }

  }

  .table-container td {
    padding: 5px 0;
    @if ($lotteryIg) {
      border: 1px solid #ddd;
    } @else {
      border: 1px solid $c494949;
    }
  }

  .table-container.collapse .table-title,
  .table-container.collapse table {
    display: none;
  }
</style>
