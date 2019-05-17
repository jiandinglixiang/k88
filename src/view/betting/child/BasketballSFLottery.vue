<template>
  <div class="basketball-sf-lottery">
    <div class="row text-center text-default-2 text-sm">
      <div class="col"><span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span>{{schedule.guest}}
      </div>
      <div class="col text-light">VS</div>
      <div class="col">{{schedule.home}}<span class="text-primary"
                                              v-if="schedule.home_rank">[{{schedule.home_rank}}]</span></div>
    </div>
    <div class="box">
      <div :class="{selected: isSelected(item)}"
           @click="onOptionSelected(item, index)"
           class="box-item"
           v-for="(item, index) in schedule.holderList">
        <span><span>{{item.text}}</span> {{item.value}}</span>
      </div>
    </div>
  </div>
</template>

<script>//
import { SPORTS_OPTION_SELECTED } from '../../../store/betting/types'

export default {
  name: 'basketballSFLottery',
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
  .basketball-sf-lottery {
    padding-left: 10px;
    font-size: 14px;
    @if($lotteryIg) {
      .text-center.text-default-2 .text-light {
        color: $cgray;
      }
    }
  }

  .basketball-sf-lottery .box {
    border-radius: 4px;
    overflow: hidden;
    text-align: center;
    margin-top: 8px;
    font-size: 13px;
    @if($lotteryIg) {
      background: $cFFfFFF;
      border: 1px solid #ddd;
    } @else {
      background: $c494949;
      border: 1px solid $c313131;
    }
  }

  .basketball-sf-lottery .box .box-item {
    padding: 7px 0;
    float: left;
    width: 50%;

    > span {
      @if($lotteryIg) {
        color: $c999999;
      } @else {
        color: $cFFfFFF;
      }

      span {
        color: $c999999;
      }
    }
  }

  .basketball-sf-lottery .box .box-item:first-child > span {
    display: inline-block;
    width: 100%;
    @if($lotteryIg) {
      border-right: 1px dotted #ddd;
    } @else {
      border-right: 1px dotted $c3f3f3f;
    }
  }

  .basketball-sf-lottery .box .box-item.selected {
    background: $cffC63A;

    > span {
      @if($lotteryIg) {
        color: $cgray;
        span {
          color: $cgray;
        }
      } @else {
        color: $c131313;
        span {
          color: $c131313;
        }
      }
    }
  }
</style>
