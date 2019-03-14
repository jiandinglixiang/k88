<template>
  <div class="ah-football-qcdxq-lottery">
    <div class="row text-center text-default-2 text-sm">
      <div class="col col-40">{{schedule.home}}</div>
      <div class="col text-light">VS</div>
      <div class="col col-40">{{schedule.guest}}</div>
    </div>
    <div class="box ellipsis selected text-center box-icon" v-if="isConfirm">曼城（-1.0/-1.5）<span>1.66</span></div>
    <div class="box" v-else>
      <div class="box-hd row">
        <div class="col">进球</div>
        <div class="col-40 bg-red">大</div>
        <div class="col-40 bg-blue">小</div>
      </div>
      <div class="box-item row text-center"
           v-for="(item) in schedule.holderList">
        <div class="col bg-dark">{{ item.text }}</div>
        <div class="col-40 text-color">{{ item.value }}</div>
        <div class="col-40 text-color">{{ item.value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ahQcDXQLottery',
    props: ['schedule', 'isConfirm'],
    methods: {
    }
  }
</script>
<style lang="scss">
  .ah-football-qcdxq-lottery {
    padding-left: 10px;
    font-size: 14px;
    .box {
      overflow: hidden;
      margin-top: 8px;
      background: #494949;
      border-radius: 4px;
      text-align: center;
      font-size: 14px;
      .box-hd {
        height: 20px;
        line-height: 20px;
        color: #fff;
        .col {
          color: #999;
        }
        .bg-red {
          background-color: #f33;
        }
        .bg-blue {
          background-color: #3393ff;
        }
      }
      .box-item {
        margin: 0;
        height: 30px;
        line-height: 30px;
        color: #999;
        .col-40.selected {
            background-color: #ffc63a;
            color: #131313;
          }
        .col {
          color: #131313;
        }
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
      }
      .bg-dark {
        background-color: #ddd;
      }
      &.box-icon {
        padding-right: 15px;
        height: 35px;
        line-height: 35px;
        span {
          color: #3359ff;
        }
      }
    }
  }
</style>
