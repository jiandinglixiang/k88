<template>
  <div class="OrderStatus" style="overflow: hidden">
    <div
      v-if="status"
      class="recommend">
      <div v-if="status[0]">
        <p>本单已推荐</p>
        <p v-if="status[1]" style="color: #e73f40">本单共抽成{{ status[3] }}元</p>
        <p v-if="status[2]" style="color: #e73f40">本单抽成{{ status[4] }}%</p>
      </div>
      <router-link
        tag="div"
        :to="{name: 'RecommendDetails', params: {target: JSON.stringify([0, userId])}}"
        v-else>
        <p>推荐者: {{ recommendName }}</p>
        <p v-if="status[1]" style="color: #e73f40">本单已被抽成{{ status[3] }}元</p>
        <p v-if="status[2]" style="color: #e73f40">本单抽成{{ status[4] }}%</p>
      </router-link>
    </div>
    <div v-else>
      <p>订单状态： <span class="text-primary">{{statusText}}</span></p>
      <slot name="TogetherState"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'OrderStatus',
    props: {
      userId: {type: String | Number},
      status: {type: Array},
      statusText: {type: String},
      recommendName: {type: String}
    }
  }
</script>

<style scoped>
  .OrderStatus > div {
    display: flex;
    font-size: 14px;
    flex-flow: row nowrap;
    background-color: white;
    line-height: 1;
    padding: 10px;
    color: #333333;
    margin-top: 10px;
  }

  .OrderStatus > .recommend > div {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;
  }

  .OrderStatus > .recommend > div p:first-child {
    flex: 1;
  }
</style>
