<template>
  <div class="ssq-betting">
    <lottery-header :playTypeGroup="playTypeGroup"></lottery-header>
    <lottery-container>
      <template v-for="(group, index) in panelBallGroups">
        <p :key="`11${index}`" class="group-title" v-show="group.title">{{group.title}}</p>
        <div :key="`22${index}`" class="group-ball-panel">
          <div :key="n2" class="group-ball-panel-item" v-for="(item,n2) in group.list">
            <span :class="{'play-ball-blue': group.color === 'blue',active: item.selected}"
                  @click="ballChanged(item, index)"
                  class="play-ball-white">
              {{item.id}}
            </span>
          </div>
        </div>
        <template v-if="index < panelBallGroups.length - 1">
          <hr :key="`33${index}`">
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
  list: [{ id: 1, value: '普通投注' }, { id: 1, sure: true, value: '胆拖投注' }]
}]
export default {
  name: 'SSQBetting',
  data () {
    return {
      playTypeGroup: playTypeGroup
    }
  },
  computed: {
    lotteryObj () {
      return this.$store.state.betting[this.LOTTERY_ID]
    },
    panelBallGroups () {
      return this.lotteryObj.initBettingPanelBallGroups()
    }
  },
  methods: {
    ballChanged (item, index) {
      this.lotteryObj.onBallChanged(item, index)
    }
  },
  created () {
    this.LOTTERY_ID = this.$router.currentRoute.params.id
    this.$store.commit(SET_CURRENT_LOTTERY, this.LOTTERY_ID)
    if (!this.$store.state.betting[this.LOTTERY_ID].playType) {
      this.$store.commit(CURRENT_PLAY_TYPE_SELECT, playTypeGroup[0].list[0])
    }
  },
  components: { LotteryHeader, LotteryContainer }
}
</script>

<style>
  .ssq-betting .group-ball-panel {
    padding: 5px;
    overflow: hidden;
  }

  .ssq-betting .group-ball-panel .group-ball-panel-item {
    width: 14.2%;
    float: left;
    text-align: center;
  }

  .ssq-betting .digital-lottery-container .top-tip .shake {
    bottom: 0;
  }
</style>
