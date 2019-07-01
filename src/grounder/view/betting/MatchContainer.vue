<template>
  <ul id="match-container">
    <li v-for="n of 10" :key="n">
      <div class="m-title" :class="{'show':n%2}">
        <span>2019-02-20</span>
        <span>星期三</span>
        <span>6场比赛</span>
      </div>
      <grounder-betting/>
    </li>
  </ul>
</template>

<script>//

import GrounderBetting from '@/grounder/components/GrounderBetting'

export default {
  name: 'MatchContainer',
  components: { GrounderBetting }
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
