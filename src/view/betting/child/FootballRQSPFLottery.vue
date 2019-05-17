<template>
  <div class="football-rqspf-lottery">
    <div class="row text-center text-default-2 text-sm">
      <div class="col col-40"><span class="text-primary" v-if="schedule.home_rank">[{{schedule.home_rank}}]</span>{{schedule.home}}
      </div>
      <div class="col text-light">VS</div>
      <div class="col col-40">{{schedule.guest}} <span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span>
      </div>
    </div>
    <div class="box">
      <div :class="schedule.letPointsColor" class="left-point">{{schedule.letPointsText}}</div>
      <div :class="{selected: isSelected(item), 'box-center': index===1}"
           @click="onOptionSelected(item, index)"
           class="box-item"
           :key="index" v-for="(item, index) in schedule.holderList">
        <span>{{item.text}}<span> {{item.value}}</span></span>
      </div>
    </div>
  </div>
</template>

<script>//
import { SPORTS_OPTION_SELECTED } from '../../../store/betting/types'

export default {
  name: 'footballRQSPFLottery',
  props: ['schedule'],
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
  .football-rqspf-lottery {
    padding-left: 10px;
    font-size: 14px;
    @if($lotteryIg) {
      .text-center.text-default-2 .text-light {
        color: $cgray;
      }
    }
  }

  .football-rqspf-lottery .box {
    border-radius: 4px;
    overflow: hidden;
    text-align: center;
    margin-top: 8px;
    font-size: 13px;
    padding-left: 15px;
    position: relative;
    @if($lotteryIg) {
      background: $cFFfFFF;
      border: 1px solid #ddd;
    } @else {
      background: $c494949;
      border: 1px solid $c494949;
    }
  }

  .football-rqspf-lottery .box .left-point {
    width: 15px;
    position: absolute;
    left: 0;
    color: white;
    font-size: 12px;
    height: 100%;
    padding-top: 7px;
  }

  .football-rqspf-lottery .box .left-point.green {
    background: #1AC456;
  }

  .football-rqspf-lottery .box .left-point.yellow {
    background: #FF3333;
  }

  .football-rqspf-lottery .box .box-item {
    padding: 7px 0;
    float: left;
    width: 35%;

    > span {
      @if($lotteryIg) {
        color: $c999999;
      } @else {
        color: $cFFfFFF;
      }

      span {
        color: $cFFfFFF;
      }
    }
  }

  .football-rqspf-lottery .box .box-item.box-center {
    width: 30%;

    > span {
      display: inline-block;
      width: 100%;
      @if($lotteryIg) {
        border-left: 1px dotted #ddd;
        border-right: 1px dotted#ddd;
      } @else {
        border-left: 1px dotted $c3f3f3f;
        border-right: 1px dotted $c3f3f3f;
      }
    }
  }

  .football-rqspf-lottery .box .box-item.selected {
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
