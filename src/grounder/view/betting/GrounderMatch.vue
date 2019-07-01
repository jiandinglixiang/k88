<template>
  <div class="grounder-betting">
    <v-head is-fixed="true">
      <span slot="centre" class="g-title g-click-up" @click="mask=!mask">全场大/小球</span>
      <div slot="right" class="g-right">
        <span class="g-refresh">
          <roundness-chart
            :green="timeTxt[2]"
            :red="timeTxt[1]"
            :txt="timeTxt[0]"
          /></span>
        <span class="g-filtrate"></span>
        <span class="g-help"></span>
      </div>
    </v-head>
    <match-container/>
    <m-mask @click.native.stop="mask=!mask" v-show="mask">
      <select-game v-if="0" style="margin-top: 40px"/>
      <grounder-bet-popup v-else-if="1"/>
      <filter-match v-else/>
    </m-mask>
  </div>
</template>

<script>//
import RoundnessChart from '@/grounder/components/RoundnessChart'
import MMask from '@/grounder/components/MMask'
import SelectGame from '@/grounder/components/SelectGame'
import FilterMatch from '@/grounder/components/FilterMatch'
import MatchContainer from '@/grounder/view/betting/MatchContainer'
import GrounderBetPopup from '@/grounder/components/GrounderBetPopup'

export default {
  name: 'GrounderMatch',
  components: { GrounderBetPopup, MatchContainer, FilterMatch, SelectGame, MMask, RoundnessChart },
  data () {
    return {
      timeTxt: [15, 100, 0],
      time: 0,
      mask: false
    }
  },
  mounted () {
    clearInterval(this.time)
    this.$nextTick(function () {
      this.time = setInterval(() => {
        if (this.timeTxt[0] <= 1) {
          this.timeTxt = [15, 100, 0]
          return
        }
        const total = Math.floor(this.timeTxt[0] / 15 * 100)
        this.timeTxt = [this.timeTxt[0] - 1, total, 100 - total]
      }, 1000)
    })
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
