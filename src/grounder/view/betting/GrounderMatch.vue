<template>
  <div class="grounder-betting">
    <v-head is-fixed="true">
      <span slot="centre" class="g-title g-click-up" @click.stop="switchMask(0)">{{targetId()}}</span>
      <div slot="right" class="g-right">
        <span class="g-refresh" @click.stop="manuallyUpdate">
          <roundness-chart
            :green="timeTxt[2]"
            :red="timeTxt[1]"
            :txt="timeTxt[0]"
          />
        </span>
        <span @click.stop="switchMask(1)" class="g-filtrate"></span>
        <router-link
          :to="{ name: 'WebPage',query: {
          title: '玩法说明',
          url: 'http://tgapi.k888.bet/index.php?s=/Content/help/jczq.html'
        }
      }" tag="span" class="g-help"
        ></router-link>
      </div>
    </v-head>
    <match-container :filter-arr="filterArr"/>
    <m-mask @click.native.stop="switchMask(-1)" v-show="showMask">
      <select-game
        :list="GrounderFootballList"
        keys="lotteryId"
        :target="targetId(1)"
        v-if="mask[0].load"
        v-show="mask[0].show"
        @switchTarget="switchGame"
        style="margin-top: 40px"/>
      <filter-match
        :filter-arr.sync="filterArr"
        :mask-show="mask[1].show"
        v-if="mask[1].load"
        v-show="mask[1].show"
      />
      <grounder-bet-popup
        @fifteenUpdate="manuallyUpdate"
        v-if="mask[2].load"
        v-show="mask[2].show"
        :mask-show.sync="mask[2].show"
      />
    </m-mask>
  </div>
</template>

<script>//
import MatchContainer from './MatchContainer.vue'
import MMask from '../../components/MMask.vue'
import RoundnessChart from '../../components/RoundnessChart.vue'
import SelectGame from '../../components/SelectGame.vue'
import GrounderBetPopup from '../../components/GrounderBetPopup.vue'
import FilterMatch from '../../components/FilterMatch.vue'
import { mapActions, mapState } from 'vuex'
import { ADD_BETTING_ITEM, GET_JC_LIST } from '../../store/betting'
import { LotteryId, LOTTERYIDS } from '../../../store/constants.js'
import { loading } from '../../../common/loading.js'
import Toast from '../../../common/toast.js'

let isGet = true
export default {
  name: 'GrounderMatch',
  components: { FilterMatch, GrounderBetPopup, SelectGame, RoundnessChart, MMask, MatchContainer },
  created () {
    this.fifteenTimeUpdate(isGet && this.GrounderFootballList[0])
    isGet = false
  },
  computed: {
    ...mapState({
      targetId: function (state) {
        return function (x) {
          if (x) return state.grounder.lotteryId
          return (state.grounder.lotteryId && LotteryId[state.grounder.lotteryId]) || '加载中.'
        }
      },
      betItem: state => state.grounder.betItem
    }),
    showMask () {
      return this.mask.some(function (value) {
        return value.show
      })
    }
  },
  data () {
    return {
      GrounderFootballList: [
        { lotteryId: LOTTERYIDS.GROUNDER_FOOTBALL_RQ, playType: 1, value: LotteryId[LOTTERYIDS.GROUNDER_FOOTBALL_RQ] },
        { lotteryId: LOTTERYIDS.GROUNDER_FOOTBALL_DXQ, playType: 1, value: LotteryId[LOTTERYIDS.GROUNDER_FOOTBALL_DXQ] }
      ],
      mask: [{ load: false, show: false }, { load: false, show: false }, { load: false, show: false }],
      filterArr: false, // 过滤条件
      timeTxt: [15, 100, 0], // 倒计时计算
      time: 0, // 刷新
      time2: 0 // 倒计时
    }
  },
  methods: {
    ...mapActions({
      getList: GET_JC_LIST
    }),
    fifteenTimeUpdate (data /* = { lotteryId, playType, value } */) {
      // 亚盘更新
      clearTimeout(this.time)
      clearInterval(this.time2)
      this.timeTxt = [15, 100, 0]
      // console.log(new Date().getSeconds(), new Date().getSeconds() + 15)
      return this.getList(data).finally(() => {
        this.time2 = setInterval(() => {
          if (this.timeTxt[0] <= 1) {
            this.timeTxt = [15, 100, 0]
            return
          }
          const total = Math.floor((this.timeTxt[0] - 1) / 15 * 100)
          this.timeTxt = [this.timeTxt[0] - 1, total, 100 - total]
        }, 1000)
        this.time = setTimeout(this.fifteenTimeUpdate, 15000)
      })
    },
    manuallyUpdate () {
      return this.fifteenTimeUpdate().then(function () {
        Toast('刷新成功')
      })
    },
    switchMask (type, func) {
      if (type === -1) {
        this.mask = this.mask.map(value => ({ load: value.load, show: false }))
      } else {
        if (this.mask[type].load && this.mask[type].show) {
          this.$set(this.mask[type], 'show', false)
        } else {
          this.$set(this.mask, type, { load: true, show: true })
        }
      }
      return func
    },
    filterUpdate (arr) {
      if (Array.isArray(arr)) this.filterArr = arr
    },
    switchGame (val) {
      loading.show()
      this.$store.commit(ADD_BETTING_ITEM, null) // 清理选中的比赛
      this.fifteenTimeUpdate(this.GrounderFootballList.find(value => val.lotteryId === value.lotteryId)).finally(() => {
        loading.hide() //
        this.switchMask(-1)
      })
    }
  },
  beforeDestroy () {
    clearTimeout(this.time)
    clearInterval(this.time2)
    console.log('销毁')
  },
  watch: {
    betItem (val) {
      // betItem投注对象
      if (val) this.switchMask(2)
    }
  }
}
</script>

<style scoped lang="scss">
  .grounder-betting {
    color: white;

    .g-title {
      border-radius: 4px;
      border: 1px solid #FFC63A;
      padding: 5px 10px;
      font-size: 14px;
      font-weight: bold;

      &::after {
        display: inline-block;
        content: '';
        margin-left: 5px;
        width: 0;
        height: 0;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-top: 10px solid white;
        transition: transform 0.5s;
      }

      &.g-click-up::after {
        transform: rotate(180deg);
      }
    }

    .g-right {
      width: 120px;
      @media screen and (max-width: 360px) {
        width: 100px;
      }
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      .g-refresh {
        flex: 1 1 33.3%;
        height: 40px;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;
      }

      .g-filtrate {
        flex: 1 1 33.3%;
        background: url("../../../assets/betting/filter.png") no-repeat center;
        background-size: 20px auto;
        height: 40px;
      }

      .g-help {
        flex: 1 1 33.3%;
        background: url("../../../assets/betting/question.png") no-repeat center;
        background-size: 20px auto;
        height: 40px;
      }
    }

  }
</style>
