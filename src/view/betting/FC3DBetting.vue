<template>
  <div class="fc3d-betting">
    <lottery-header :playTypeGroup="playTypeGroup"></lottery-header>
    <lottery-container>
      <template v-for="(group, index) in panelBallGroups">
        <p class="group-title" v-show="group.title">{{group.title}}</p>
        <div class="row">
          <div class="col col-20">
            <span class="side-title">{{group.name}}</span>
          </div>
          <div class="col">
          <span :class="{active: item.selected}"
                @click="ballChanged(item, index)"
                class="play-ball-white"
                v-for="item in group.list">
                {{item.id}}
          </span>
          </div>
        </div>
        <template v-if="index < panelBallGroups.length - 1">
          <hr>
        </template>
      </template>
    </lottery-container>
  </div>
</template>

<script>//
import LotteryHeader from './child/LotteryHeader.vue'
import LotteryContainer from './child/DigitalLotteryContainer.vue'
import { CURRENT_PLAY_TYPE_SELECT, SET_CURRENT_LOTTERY } from '../../store/betting/types'

const playTypeGroup = [{
  list: [{ id: 11, value: '直选' }, { id: 13, value: '组六' },
    { id: 14, value: '组三单式' }, { id: 15, value: '组三复式' }]
}]
export default {
  name: 'FC3DBetting',
  data () {
    return {
      LOTTERY_ID: 0
    }
  },
  computed: {
    playTypeGroup () {
      return playTypeGroup
    },
    lotteryObj () {
      return this.$store.state.betting[this.LOTTERY_ID]
    },
    panelBallGroups () {
      return (this.lotteryObj.initBettingPanelBallGroups && this.lotteryObj.initBettingPanelBallGroups()) || []
    }
  },
  created () {
    this.LOTTERY_ID = this.$router.currentRoute.params.id
    this.$store.commit(SET_CURRENT_LOTTERY, this.LOTTERY_ID)
    if (!this.$store.state.betting[this.LOTTERY_ID].playType) {
      this.$store.commit(CURRENT_PLAY_TYPE_SELECT, playTypeGroup[0].list[0])
    }
  },
  methods: {
    ballChanged (item, index) {
      this.lotteryObj.onBallChanged(item, index)
    }
  },
  components: {
    LotteryHeader, LotteryContainer
  }
}
</script>

<style>
  .digital-lottery-container .top-tip .shake {
    bottom: 15px;
  }
</style>
