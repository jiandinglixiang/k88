<template>
  <div class="sport-lottery-container">
    <div class="top row">
      <div :class="{'selected': currentMode === 2}" @click="modeSelect(2)" class="col">
        过关 <span class="text-sm">(至少选两场)</span>
      </div>
      <div :class="{'selected': currentMode === 1}" @click="modeSelect(1)" class="col">
        单关 <span class="text-sm">(猜一场，奖金固定)</span>
      </div>
    </div>
    <template v-if="holders && holders.groups && holders.groups.length > 0">
      <sport-lottery-panel
        :filter="filterSelected"
        :holder="holder"
        :key="index"
        v-for="(holder, index) in holders.groups">
      </sport-lottery-panel>
    </template>
    <template v-else-if="holders && holders.groups && holders.groups.length === 0">
      <sports-no-match></sports-no-match>
    </template>
    <div class="bottom-fixed">
      <div class="content">
        <div @click="clearSelected" class="clear-icon"></div>
        <div class="text">
          <span class="text-muted">{{holders.bottomTip}}</span>
          <a :class="{disabled: !confirmDisabled}" @click="confirmBet" class="btn pull-right" href="javascript:">确认</a>
        </div>
      </div>
    </div>
    <sport-filter :type="filterType" @confirm="filterConfirm"></sport-filter>
  </div>
</template>

<script>//
import {
  CLEAR_SPORT_BETTING_SELECTED,
  CURRENT_SPORT_PLAY_TYPE_SELECT_UPDATE,
  SPORT_MODE_SELECT,
  SPORTS_CONFIRM_BET
} from '../../../store/betting/types'
import SportLotteryPanel from './SportLotteryPanel.vue'
import SportsNoMatch from './SportsNoMatch.vue'
import SportFilter from './SportFilter.vue'
import Lottery from '../../../model/common/Lottery'
import { mapState } from 'vuex'

export default {
  name: 'sportLotteryContainer',
  data () {
    return {
      filterSelected: []
    }
  },
  computed: {
    currentMode () {
      return this.$store.state.betting[this.lottery].mode
    },
    holders () {
      return this.$store.state.betting[this.lottery].scheme[this.currentMode === 2 ? 0 : 1] || {}
    },
    confirmDisabled () {
      if (Lottery.isAHFootBall(this.lottery)) {
        return this.holders && (this.holders.total > (this.holders.mode === 2 ? 1 : 0)) && this.holders.total <= 8
      } else {
        return this.holders && (this.holders.total > (this.holders.mode === 2 ? 1 : 0)) && this.holders.total <= 15
      }
    },
    ...mapState({
      lottery: state => state.betting.lottery,
      currentType: state => state.betting[state.betting.lottery].playType || { value: '' }
    }),
    filterType () {
      return Lottery.isFootBall(this.lottery) ? 'football' : ''
    }
  },
  methods: {
    modeSelect (mode) {
      if (this.currentMode !== mode) {
        this.$store.dispatch(SPORT_MODE_SELECT, mode)
      }
    },
    clearSelected () {
      this.$store.commit(CLEAR_SPORT_BETTING_SELECTED)
    },
    confirmBet () {
      this.$store.commit(SPORTS_CONFIRM_BET)
      this.$router.push({ name: 'SportsConfirm' })
    },
    filterConfirm (selected) {
      this.filterSelected = selected
    }
  },
  mounted () {
    const ff = () => {
      if (!(this.$route.path === '/asianHandicap/ah_footer' || this.$route.path === '/betting/sports_confirm')) return
      this.$store.dispatch(CURRENT_SPORT_PLAY_TYPE_SELECT_UPDATE, this.currentType).then(() => {
        this.$route.path === '/betting/sports_confirm' && this.$store.commit(SPORTS_CONFIRM_BET)
      }).finally(() => {
        setTimeout(ff, 15000)
      })
    }
    if (Lottery.isAHFootBall(this.lottery)) {
      // 每15秒更新次
      this.$nextTick(() => {
        setTimeout(ff, 15000)
      })
    }
  },
  components: { SportLotteryPanel, SportsNoMatch, SportFilter }
}
</script>

<style lang="scss">
  .sport-lottery-container {
    padding-bottom: 50px;
  }

  .sport-lottery-container .top {
    background: $c1c1c1c;
    font-size: 14px;
    text-align: center;
  }

  .sport-lottery-container .top .col {
    padding: 7px;
    border-bottom: 2px solid $c999999;
    color: $c999999;
  }

  .sport-lottery-container .top .col.selected {
    border-bottom: 2px solid $cffC63A;
    color: $cffC63A;
  }

  .sport-lottery-container .bottom-fixed {
    position: fixed;
    height: 45px;
    /*border-top: 1px solid #ddd;*/
    padding: 7px 10px;
    width: 100%;
    bottom: 0;
    left: 0;
    background: $c131313;
  }

  .sport-lottery-container .bottom-fixed .clear-icon {
    width: 25px;
    height: 25px;
    background: url("../../../assets/betting/ic_scheme_trash.png") no-repeat;
    background-size: 100%;
    display: inline-block;
    margin: 3px 15px 0 5px;
    float: left;
  }

  .sport-lottery-container .bottom-fixed .text {
    border-left: 1px dotted #ddd;
    padding-left: 15px;
    margin-left: 40px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: $c999999;
  }

  .sport-lottery-container .bottom-fixed .text .btn {
    height: 31px;
    line-height: 32px;
    display: inline-block;
    width: 50px;
  }
</style>
