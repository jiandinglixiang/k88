<template>
  <div class="basketball-sf-lottery">
    <div class="row text-center text-default-2 text-sm">
      <div class="col"><span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span>{{schedule.guest}}
      </div>
      <div class="col text-light">VS</div>
      <div class="col">
        {{schedule.home}}<span class="text-primary" v-if="schedule.home_rank">[{{schedule.home_rank}}]</span>
        <span :class="schedule.letPointsColor" class="let-points">{{schedule.letPointsText}}</span>
      </div>
    </div>
    <div class="box">
      <div :class="{selected: isSelected(item)}"
           :key="index"
           @click="onOptionSelected(item, index)"
           class="box-item"
           v-for="(item, index) in schedule.holderList">
        <span>{{item.text}} {{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>//
import { SPORTS_OPTION_SELECTED } from '../../../store/betting/types'

export default {
  name: 'basketballRFSFLottery',
  props: ['schedule', 'isConfirm'],
  methods: {
    onOptionSelected (item) {
      this.schedule.onOptionSelected(item)
      this.$store.commit(SPORTS_OPTION_SELECTED)
      this.$emit('onOptionSelected')
    },
    isSelected (item) {
      return this.schedule.selected.indexOf(item) !== -1
    }
  }
}
</script>

<style lang="scss">
  .basketball-sf-lottery .let-points {
    padding: 2px 5px;
    border-radius: 20px;
    color: white;
    font-size: 12px;
  }

  .basketball-sf-lottery .let-points.yellow {
    background: $cffC63A;
    color: white;
  }

  .basketball-sf-lottery .let-points.green {
    background: #1AC456;
    color: white;
  }
</style>
