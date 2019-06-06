<template>
  <div class="OrderTopInfo" v-cloak>
    <img :src="detail.lottery_image">
    <div class="text-md">
      {{detail.lottery_name}}
      <slot name="buyTogether"></slot>
      <span class="text-sm text-muted" v-if="detail.issueNoShow">{{`第${detail.issue_no}期`}}</span>
    </div>
    <div class="text-sm margin-top-5">
      <span class="text-light">投注金额: <span class="text-default">{{detail.total_amount | currency}}</span></span>
      <span class="text-light" v-if="detail.failure_amount > 0">出票失败: <span class="text-default">{{detail.failure_amount | currency}}</span></span>
    </div>
    <div class="text-sm margin-top-5">
      <span class="text-light">中奖金额: <span class="text-primary">{{detail.winnings_bonus}}</span></span>
      <span class="text-light" v-if="detail.plus_award_amount > 0">加奖金额: <span class="text-primary">{{detail.plus_award_amount}}</span></span>
    </div>
    <span :class="detail.statusIcon">{{detail.statusIconText}}</span>
  </div>
</template>

<script>
  export default {
    name: 'OrderTopInfo',
    props: {
      detail: {type: Object}
    }
  }
</script>

<style scoped>
  .OrderTopInfo {
    background: url("../../../assets/icon/order_top_bg.png") no-repeat;
    background-size: 100% 100%;
    padding: 20px 10px 20px 75px;
    position: relative;
  }

  .OrderTopInfo img {
    position: absolute;
    left: 10px;
    top: 23px;
    width: 55px;
    height: 55px;
  }

  .OrderTopInfo .win-icon,
  .OrderTopInfo .no-win-icon,
  .OrderTopInfo .refund-icon {
    position: absolute;
    right: 0;
    top: 35px;
  }

  .OrderTopInfo .refund-icon {
    top: 20px;
  }

  .OrderTopInfo .prize-time-icon {
    position: absolute;
    right: 20px;
    top: 20px;
  }
</style>
