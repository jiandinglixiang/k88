<template>
  <div class="ah-football-qcrq-lottery">
    <div class="row text-center text-default-2 text-sm">
      <div class="col col-40">{{schedule.home}}</div>
      <div class="col text-light">VS</div>
      <div class="col col-40">{{schedule.guest}}</div>
    </div>
    <div class="box order-list" v-if="isConfirm">
      <div class=" ellipsis text-center box-icon selected margin-bottom">曼城（-1.0/-1.5）<span>1.66</span></div>
      <!-- 单关显示 -->
      <div class="row">
        <div class="col col-40 padding-right-10 text-left c-white">
          <div class="row ellipsis">
            <div class="col">投注金额</div>
            <div class="col text-right">1注</div>
          </div>
          <div class="">投注上限 <span>xxx.00</span></div>
        </div>
        <div class="col">
          <div class="input-text text-center">
            <input type="text" placeholder="请输入投注金额">
          </div>
        </div>
      </div>
    </div>
    <div class="box" v-else>
      <div class="box-item row"
           @click="onOptionSelected(item)"
           v-for="(item, index) in schedule.holderList"
           :class="{selected: isSelected(item), 'border-top': index > 1}">
        <div class="col-66 text-center">{{ item.text }}</div>
        <div class="col text-color">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { SPORTS_OPTION_SELECTED } from '../../../store/betting/types'
  export default {
    name: 'ahQcRQLottery',
    props: ['schedule', 'isConfirm'],
    methods: {
      onOptionSelected (item) {
        this.schedule.onOptionSelected(item);
        this.$store.commit(SPORTS_OPTION_SELECTED);
        this.$emit('onOptionSelected');
      },
      isSelected (item) {
        return this.schedule.selected.indexOf(item) !== -1;
      }
    }
  }
</script>
<style lang="scss">
  .ah-football-qcrq-lottery {
    padding-left: 10px;
    font-size: 14px;
    .box {
      overflow: hidden;
      margin-top: 8px;
      background: #494949;
      border: 1px solid #494949;
      border-radius: 4px;
      text-align: center;
      font-size: 14px;
      .box-item {
        float: left;
        margin: 0;
        width: 50%;
        height: 30px;
        line-height: 30px;
        text-align: left;
        color: #999;
        &.border-top {
          border-top: 1px solid #3f3f3f;
        }
        .text-color {
          color: #fff;
          &.up {
            color: #1ac456;
          }
          &.down {
            color: #f33;
          }
        }
        &:nth-child(odd) {
          position: relative;
          &:after {
            position: absolute;
            top: 9px;
            right: 0;
            content: '';
            border-left: 1px dotted #3f3f3f;
            width: 0;
            height: 12px;
          }
        }
        &.selected {
          background-color: #ffc63a;
          color: #131313;
        }
      }
      .selected {
        background-color: #ffc63a;
        color: #131313;
      }
      .box-icon {
        height: 35px;
        line-height: 35px;
        span {
          color: #3359ff;
        }
      }
    }
    .order-list {
      background: transparent;
      border: none;
      border-radius: 0;
      .selected {
        border-radius: 4px;
      }
      .margin-bottom {
        margin-bottom: 8px;
      }
      .c-white {
        color: $cFFfFFF;
      }
    }
  }
</style>
