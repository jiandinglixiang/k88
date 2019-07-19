<template>
  <ul class="g-grounder-betting">
    <li v-for="(n,x) in schedules" :key="n.id" v-show="filterShow(n.league)">
      <div class="g-bet-content">
        <div class="g-Match-message" @click.stop="swAnalyze(x)" :class="show[x]&&'g-click-up'">
          <img class="g-msg-icon" src="../assets/ic_gun.png"/>
          <p class="g-msg-name">
            <span>{{n.round_no}}</span>
            <span>{{n.league}}</span>
            <!--            <span>联赛</span>-->
          </p>
          <p class="g-msg-time">{{timeInit(n)}}</p>
          <img v-show="n.is_lock" src="../assets/ic_closeall.png" class="g-msg-lock" alt="" width="15" height="15">
        </div>
        <grounder-bet-item
          :lottery-id="lotteryId"
          :item="n"
          :schedules-id="schedulesId"
        />
      </div>
      <div class="g-bet-analyze" v-show="show[x]">
        <p>
          <span>历史交锋</span>
          <span>近{{n.history_fight.games_count}}次交战，
          {{n.home}}</span>
          <span style="color: #FF3333">{{n.history_fight.win}}胜</span>
          <span style="color: #3393FF">{{n.history_fight.equal}}平</span>
          <span style="color: #1AC456">{{n.history_fight.lose}}负</span>
        </p>
        <p>
          <span>近期战绩</span>
          <span>主队</span><span>{{n.latest_record.home.win}}胜</span><span>{{n.latest_record.home.equal}}平</span> <span>{{n.latest_record.home.lose}}负</span>
          <span></span>
          <span>客队</span> <span>{{n.latest_record.guest.win}}胜</span> <span>{{n.latest_record.guest.equal}}平</span>
          <span>{{n.latest_record.guest.lose}}负</span>
        </p>
        <p>
          <span>平均赔率</span>
          <span>{{n.average_win_odds}}</span> <span>{{n.average_equal_odds}}</span> <span>{{n.average_lose_odds}}</span>
        </p>
        <div @click="goDetail(n)"><img src="../../assets/ball.png" alt="">详细赛事分析</div>
      </div>
    </li>
  </ul>
</template>

<script>// 亚盘投注
import { Toast } from '../../common/toast.js'
import GrounderBetItem from './GrounderBetItem.vue'

export default {
  name: 'GrounderBetting',
  components: { GrounderBetItem },
  props: {
    filterArr: [Array, Boolean], // false默认不过滤,[]过滤
    schedules: Array,
    schedulesId: [String, Number],
    lotteryId: Number
  },
  data () {
    return {
      show: []
    }
  },
  methods: {
    timeInit (n) {
      const gameStauts = n.game_stauts * 1
      const STATUS = {
        '0': '未开始',
        '1': '上半场',
        '2': '中场休息',
        '3': '下半场',
        '4': '加时',
        '5': '点球',
        '-1': '比赛结束',
        '-10': '比赛取消',
        '-11': '待定',
        '-12': '比赛终止',
        '-13': '比赛待恢复',
        '-14': '比赛推迟'
      }
      if (gameStauts === 1 || gameStauts === 3) {
        const duration = gameStauts === 3 ? 45 * 60 : 90 * 60 // 持续时间
        const past = duration - (n.server_time - n.start_time) // 现在时间与开始时间差额
        const m = Math.floor(past / 60)
        const ms = past - m * 60
        return `${m}:${ms > 9 ? ms : ms + '0'}`
      }
      return STATUS[gameStauts]
    },
    filterShow (league) {
      if (this.filterArr === false) return true
      return this.filterArr.some(value => league === value.value)
    },
    swAnalyze (x) {
      this.$set(this.show, x, !this.show[x])
    },
    goDetail (x) {
      if (x.third_party_schedule_id) {
        this.$router.push({
          name: 'FootballInformation',
          params: { id: x.third_party_schedule_id }
        })
      } else {
        Toast('暂时没有详细信息')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .g-grounder-betting {
    > li {

      .g-bet-content {
        background-color: #313131;
        padding: 0 10px 5px 5px;
        /*height: 115px;*/
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        border-bottom: 1px solid #494949;
        .g-Match-message {
          width: 20%;
          text-align: center;
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          align-content: center;

          .g-msg-icon {
            margin-top: 5px;
            width: 30px;
            height: 25px;
          }

          .g-msg-name {
            /*margin-top: 5px;*/
            display: flex;
            flex-flow: column nowrap;
            align-items: center;
            align-content: center;
            color: #999999;
          }

          .g-msg-time {
            color: white;
            font-weight: 500;
            margin: 5px 0;
          }

          &::after {
            content: '';
            margin-top: 5px;
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 8px solid #999;
            transition: transform 0.5s;
          }

          &.g-click-up::after {
            transform: rotate(180deg);
          }
        }

        .g-Match-button {
          width: 80%;

          .g-button-vs {
            height: 25px;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: space-between;

            > p {
              text-align: center;
              width: 40%;
              height: 15px;
              color: #CCCCCC;
              font-weight: 500;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            > div {
              text-align: center;
              font-weight: bold;
              line-height: 15px;
              flex: 0 0 40px;
              background: linear-gradient(90deg, rgba(133, 131, 142, 1) 0%, rgba(133, 131, 142, 1) 100%);
              border-radius: 6px;
            }
          }
        }
      }

      .g-bet-analyze {
        padding-bottom: 5px;
        background-color: #1C1C1C;

        > p {
          line-height: 22px;
          margin: 0 10px;

          span:nth-child(1) {
            color: #888;
            margin-right: 17px;
          }

          span:nth-child(n + 2) {
            margin-right: 5px;
          }
        }

        p:nth-child(n+2) {
          border-top: 1px dashed #777777;
        }

        > div {
          line-height: 22px;
          text-align: center;
          color: #FFC63A;

          img {
            width: 17px;
            height: 17px;
            vertical-align: middle;
            margin-right: 5px;
          }
        }
      }
    }

  }
</style>
