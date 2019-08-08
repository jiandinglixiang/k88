<template>
  <ul class="g-grounder-betting">
    <li v-for="(n,x) in schedules" :key="n.id" v-show="filterShow(n.league)">
      <div class="g-bet-content">
        <div class="g-Match-message" @click.stop="swAnalyze(x)" :class="show[x]&&'g-click-up'">
          <img class="g-msg-icon" src="../assets/ic_gun.png"/>
          <p class="g-msg-name">
            <!--            <span>{{n.round_no}}</span>-->
            <span>{{n.league}}</span>
            <!--            <span>联赛</span>-->
          </p>
          <match-time class="g-msg-time"
                      :time-update="timeUpdate"
                      :game-status="n.game_stauts*1"
                      :server-time="n.server_time*1"
                      :start-time="n.start_time*1">
          </match-time>
          <img v-show="n.is_lock" src="../assets/ic_closeall.png" class="g-msg-lock" alt="" width="15" height="15">
        </div>
        <grounder-bet-item
          :item="n"
          :schedules-id="schedulesId"
        />
      </div>
    </li>
  </ul>
</template>

<script>// 亚盘投注
import { Toast } from '../../common/toast.js'
import GrounderBetItem from './GrounderBetItem.vue'
import MatchTime from './MatchTime.vue'

export default {
  name: 'GrounderBetting',
  components: { MatchTime, GrounderBetItem },
  props: {
    timeUpdate: Number,
    filterArr: [Array, Boolean], // false默认不过滤,[]过滤
    schedules: Array,
    schedulesId: [String, Number]
  },
  data () {
    return {
      show: []
    }
  },
  computed: {
    filterShow () {
      let [isFillter, leagu] = []
      if (this.filterArr === false) {
        return Boolean.bind(Boolean.prototype, true)
      }
      return (league) => {
        if (leagu === league) return isFillter
        leagu = league
        isFillter = this.filterArr.some(value => league === value.value)
        return isFillter
      }
    }
  },
  methods: {
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
            margin-top: 5px;
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

          /*&::after {*/
          /*  content: '';*/
          /*  margin-top: 5px;*/
          /*  width: 0;*/
          /*  height: 0;*/
          /*  border-left: 6px solid transparent;*/
          /*  border-right: 6px solid transparent;*/
          /*  border-top: 8px solid #999;*/
          /*  transition: transform 0.5s;*/
          /*}*/
          /*&.g-click-up::after {*/
          /*  transform: rotate(180deg);*/
          /*}*/
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
