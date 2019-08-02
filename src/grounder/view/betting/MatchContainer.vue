<template>
  <ul id="match-container">
    <li v-show="!list.length" style="text-align: center;margin: 25% 0;" key="asd321">
      <img alt="" src="../../../assets/betting/no_match.png" width="100">
      <p class="text-light">暂时没有符合条件的比赛</p>
    </li>
    <li v-for="(n1,x) of list" :key="n1.id">
      <div class="m-title" :class="{'show':!show[x]}" @click="showBet(x)">
        <span>{{n1.name}}</span>
        <span>{{n1.name|weekDay}}</span>
        <span>{{n1.schedules.length}}场比赛</span>
      </div>
      <grounder-betting
        v-show="!show[x]"
        :schedules="n1.schedules"
        :schedules-id="n1.id"
        :filter-arr="filterArr"
        :lottery-id="lotteryId"
        :time-update="timeUpdate"
      />
    </li>
  </ul>
</template>

<script>//
import { mapState } from 'vuex'
import GrounderBetting from '../../components/GrounderBetting.vue'

export default {
  name: 'MatchContainer',
  components: { GrounderBetting },
  props: {
    timeUpdate: Number,
    filterArr: [Array, Boolean] // false默认不过滤,[]过滤
  },
  data () {
    return {
      show: []
    }
  },
  methods: {
    showBet (x) {
      this.$set(this.show, x, !this.show[x])
    }
  },
  computed: {
    ...mapState({
      list: state => state.grounder.lotteryId ? state.grounder[state.grounder.lotteryId] : [],
      lotteryId: state => state.grounder.lotteryId
    })
  },
  filters: {
    weekDay (val) {
      const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      const day = new Date(val).getDay()
      return weeks[day]
    }
  }
}
</script>

<style scoped lang="scss">
  #match-container {
    .m-title {
      position: relative;
      height: 21px;
      line-height: 21px;
      margin-bottom: 1px;
      background-color: #1C1C1C;

      span {
        margin-left: 10px;
      }

      &:after {
        position: absolute;
        top: 0;
        right: 10px;
        width: 21px;
        height: 21px;
        content: '';
        background: url("../../../assets/betting/down_out.png") no-repeat center center;
        background-size: 15px 15px;
      }

      &.show:after {
        transform: scaleY(-1);
      }
    }
  }
</style>
