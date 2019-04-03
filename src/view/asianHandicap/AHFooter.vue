<template>
  <div class="asian-handicap">
    <sport-lottery-header :playTypeGroup="playTypeGroup">
    </sport-lottery-header>
    <sport-lottery-container></sport-lottery-container>
  </div>
</template>

<script>
  import SportLotteryHeader from '../betting/child/LotteryHeader.vue'
  import SportLotteryContainer from '../betting/child/SportLotteryContainer.vue'
  import { CURRENT_SPORT_PLAY_TYPE_SELECT } from '../../store/betting/types'
  import Lottery from '../../model/common/Lottery';

  const AHFootballLotteryIdList = [
    {id: 901, value: '全场让球'},
    {id: 902, value: '全场大/小球'}
  ];

  export default {
    name: 'ahFooter',
    data () {
      return {
        playTypeGroup: [{name: '', list: AHFootballLotteryIdList}]
      }
    },
    created () {
      if (!Lottery.isAHFootBall(this.$store.state.betting.lottery)) {
        this.$store.dispatch(CURRENT_SPORT_PLAY_TYPE_SELECT, AHFootballLotteryIdList[0]);
      }
    },
    components: { SportLotteryHeader, SportLotteryContainer }
  }
</script>
