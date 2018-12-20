<template>
  <div class="item-title">
    <span v-for="i in propsData" :key="i"> {{ i }}</span>
  </div>
</template>
<style scoped>
  .item-title {
    color: #9b9b9b;
    font-size: 0.27rem;
    text-indent: 1em;
  }
</style>
<script>
  export default {
    name: 'itemTitle',
    props: {
      propsData: {type: Array}
    }
  }
</script>
