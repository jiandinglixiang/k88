<style scoped>
  .total-points {
    height: 1.23rem;
    line-height: 1.23rem;
    color: #888;
    font-size: .3rem;
    text-align: center;
  }

  .total-points > div {
    display: inline-block;
  }
</style>
<template>
  <div @click="$emit('tap')" class="total-points">
    <div style="width: 48%">总分:{{propsData[0]}}</div>
    <div style="width: 48%">分差:{{propsData[1]}}</div>
  </div>
</template>

<script>
  export default {
    name: 'BtotalPoints',
    props: {
      propsData: {
        type: Array
      }
    }
  }
</script>
