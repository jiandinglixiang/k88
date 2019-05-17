<template>
  <div class="item-title">
    <span :key="i" v-for="i in propsData"> {{ i }}</span>
  </div>
</template>
<style lang="scss" scoped>
  .item-title {
    font-size: 0.27rem;
    text-indent: 1em;
    @if ($lotteryIg) {
      color: #888;
    } @else {
      color: $c999999;
    }
  }
</style>
<script>//
export default {
  name: 'itemTitle',
  props: {
    propsData: { type: Array }
  }
}
</script>
