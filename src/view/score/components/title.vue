<template>
  <div class="item-title">
    <span :key="i" v-for="i in propsData"> {{ i }}</span>
  </div>
</template>
<style lang="scss" scoped>
  .item-title {
    color: $c999999;
    font-size: 0.27rem;
    text-indent: 1em;
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
