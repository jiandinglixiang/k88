<template>
  <div class="basket-record-table">
    <mt-swipe :auto="0" style="height: 110px;padding: 0 10px; background: #131313;color: white">
      <mt-swipe-item>
        <div class="padding text-center">近{{length}}场胜负</div>
        <div>
          <div class="clear">
            <span class="pull-left">胜{{record[0]}}场</span>
            <span class="pull-right">负{{length - record[0]}}场</span>
          </div>
          <total-percentage :percent="(length-record[0])/length" class="margin-top-10"
                            direction="center"></total-percentage>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div>
          <div class="padding text-center">近{{length}}场大小分</div>
          <div>
            <div class="clear">
              <span class="pull-left">大分{{record[2]}}场</span>
              <span class="pull-right">小分{{length - record[2]}}场</span>
            </div>
            <total-percentage :percent="(length-record[2])/length" class="margin-top-10"
                              direction="center"></total-percentage>
          </div>
        </div>
      </mt-swipe-item>
      <mt-swipe-item>
        <div>
          <div class="padding text-center">近{{length}}场输赢盘</div>
          <div>
            <div class="clear">
              <span class="pull-left">赢{{record[1]}}场</span>
              <span class="pull-right">输{{length - record[1]}}场</span>
            </div>
            <total-percentage :percent="(length-record[1])/length" class="margin-top-10"
                              direction="center"></total-percentage>
          </div>
        </div>
      </mt-swipe-item>
    </mt-swipe>
    <table>
      <tbody>
      <tr class="bg-gray padding-20 text-light">
        <td>赛事</td>
        <td>客队</td>
        <td></td>
        <td>主队</td>
        <td>让分盘</td>
        <td>大小盘</td>
      </tr>
      <template v-for="(item, index) in list">
        <tr :key="`1${index}`" class="basket-record-table" v-if="!first || index > 0">
          <td>{{item.league}}<br><span class="text-light">{{item.date | dateFormat('yy-MM-dd')}}</span></td>
          <td :class="returnTextColor(item.guest_team_id, item.score, 'left')">{{item.guest_team}}</td>
          <td>{{scoreText(item.score)}}</td>
          <td :class="returnTextColor(item.home_team_id, item.score, 'right')">{{item.home_team}}</td>
          <td>{{item.let_point}}<span :class="letPointColor(item)" class="pull-right"> {{letPointText(item)}}</span>
          </td>
          <td>{{item.base_point}} <span :class="basePointColor(item.score, item.base_point)"
                                        class="pull-right padding-right-10">{{basePointText(item.score, item.base_point)}}</span>
          </td>
        </tr>
        <tr :key="`2${index}`" class="bg-blue basket-record-table" v-else>
          <td>本场</td>
          <td>{{item.guest_team}}</td>
          <td>VS</td>
          <td>{{item.home_team}}</td>
          <td>{{item.let_point}}</td>
          <td>{{item.base_point}}</td>
        </tr>
      </template>
      </tbody>
    </table>
  </div>
</template>

<script>//
import TotalPercentage from './TotalPercentage.vue'

export default {
  name: 'basketRecordTable',
  props: ['list', 'first', 'name', 'id'],
  methods: {
    scoreText (score) {
      let texts = score.split(':')
      texts.reverse()
      return texts.join(':')
    },
    letPointText (item) {
      if (item.score && item.let_point) {
        let texts = item.score.split(':').map(v => parseInt(v))
        if (parseInt(this.id) === parseInt(item.home_team_id)) {
          return (texts[1] - parseFloat(item.let_point)) < texts[0] ? '赢' : '输'
        } else {
          return (texts[1] - parseFloat(item.let_point)) > texts[0] ? '赢' : '输'
        }
      }
    },
    letPointColor (item) {
      if (item.score && item.let_point) {
        let texts = item.score.split(':').map(v => parseInt(v))
        if (parseInt(this.id) === parseInt(item.home_team_id)) {
          return (texts[1] - parseFloat(item.let_point)) < texts[0] ? 'red' : 'blue'
        } else {
          return (texts[1] - parseFloat(item.let_point)) > texts[0] ? 'red' : 'blue'
        }
      }
    },
    basePointText (score, point) {
      if (score && point) {
        let texts = score.split(':').map(v => parseInt(v))
        return (texts[1] + texts[0] > parseFloat(point)) ? '大' : '小'
      }
    },
    basePointColor (score, point) {
      if (score && point) {
        let texts = score.split(':').map(v => parseInt(v))
        return (texts[1] + texts[0] > parseFloat(point)) ? 'red' : 'blue'
      }
    },
    returnTextColor (id, score, type) {
      if (id && score && parseInt(this.id) === parseInt(id)) {
        let texts = score.split(':').map(v => parseInt(v))
        if (type === 'left') {
          return texts[1] > texts[0] ? 'red' : 'blue'
        } else {
          return texts[1] < texts[0] ? 'red' : 'blue'
        }
      }
    }
  },
  computed: {
    record () {
      let result = [0, 0, 0]
      this.list && this.list.map((v, k) => {
        let texts = v.score.split(':').map(v => parseInt(v))
        if (parseInt(this.id) === parseInt(v.home_team_id)) {
          if (texts[0] > texts[1]) result[0]++
          if ((texts[1] - parseFloat(v.let_point)) < texts[0]) result[1]++
        } else if (parseInt(this.id) === parseInt(v.guest_team_id)) {
          if (texts[0] < texts[1]) result[0]++
          if ((texts[1] - parseFloat(v.let_point)) > texts[0]) result[1]++
        }
        if ((texts[1] + texts[0] > parseFloat(v.base_point))) result[2]++
      })
      return result
    },
    length () {
      if (this.list) {
        return this.first ? this.list.length - 1 : this.list.length
      }
      return 0
    }
  },
  components: { TotalPercentage }
}
</script>

<style lang="scss">
  .basket-record-table {
    background-color: $cFFfFFF;
    color: $cgray;
    @if ($lotteryIg) {
      .mint-swipe {
        background: $cFFfFFF !important;
        color: $cgray !important;
      }
    } @else {
      background-color: $c313131;
      color: $cFFfFFF;
    }
  }

  .basket-record-table .bg-blue {
    /*border-top: 1px solid #3f9ae7;*/
    /*border-bottom: 1px solid #3f9ae7;*/
    @if ($lotteryIg) {
      background: $cEbebeb;
      color: $cgray;
    } @else {
      background: $c494949;
      color: $cffC63A;
    }
  }

  .basket-record-table .mint-swipe-indicator {
    @if ($lotteryIg) {
      background: #ddd;
    } @else {
      background: $cFFfFFF;
    }
  }

  .basket-record-table .mint-swipe-indicator.is-active {
    background: $cffC63A;
    opacity: 0.8;
  }
</style>
