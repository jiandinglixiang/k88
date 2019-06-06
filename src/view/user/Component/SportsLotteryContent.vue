<template>
  <div class="margin-top-10">
    <div class="padding bg-white text-default text-xn">{{detail.contextTitle}}</div>
    <order-table :list="detail.jc_info"></order-table>
    <div class="padding text-light bg-white text-sm">
      <p>投注时间：{{detail.buying_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}</p>
      <p class="margin-top-5">方案编号：{{detail.sku}}</p>
    </div>
  </div>
</template>

<script>
  import OrderTable from '../../../components/OrderTable';

  export default {
    name: 'SportsLotteryContent',
    props: {
      detail: {type: Object}
    },
    components: {OrderTable}
  }
</script>

<style scoped>

</style>
