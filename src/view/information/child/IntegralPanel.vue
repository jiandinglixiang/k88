<template>
  <div class="integral-panel">
    <div class="panel-header row">
      <a :class="{'active': index === activeIndex}" @click="changeTabIndex(index)"
         class="col"
         href="javascript:"
         :key="index"
         v-for="(item, index) in tabItem">
        {{item}}
      </a>
    </div>
    <template v-if="points[activeIndex].list">
      <integral-table :list="points[activeIndex].list"></integral-table>
    </template>
  </div>
</template>

<script>//
import IntegralTable from './IntegralTable.vue'

const tabItem = ['总积分', '主场积分', '客场积分']
export default {
  name: 'integralPanel',
  components: { IntegralTable },
  data () {
    return {
      tabItem: tabItem,
      activeIndex: 0
    }
  },
  computed: {
    points () {
      return this.$store.state.information.points
    }
  },
  methods: {
    changeTabIndex (index) {
      if (this.activeIndex !== index) {
        this.activeIndex = index
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .integral-panel .panel-header {
    padding: 6px 10px;
    border-radius: 10px;
    width: 100%;
    text-align: center;
    font-size: 14px;
  }

  .integral-panel .panel-header a {
    color: $c999999;
    background-color: $c131313;
    padding: 3px;
    border: 1px solid $c999999;
  }

  .integral-panel .panel-header a:first-child {
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    border-right: none;
  }

  .integral-panel .panel-header a:last-child {
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    border-left: 0;
  }

  .integral-panel .panel-header a.active {
    background: $cffC63A;
    @if($lotteryIg) {
      color: $cgray;
    } @else {
      color: $c131313;
    }
  }
</style>
