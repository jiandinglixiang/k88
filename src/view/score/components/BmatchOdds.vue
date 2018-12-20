<style scoped>
  .match-odds {
    height: 1.76rem;
  }

  .match-odds .item {
    height: 50%;
    width: 90%;
    text-align: right;
  }
</style>
<template>
  <div @click="$emit('tap')"   v-if="propsData&&propsData[`701`]" class="match-odds"
       style="position: relative;height: 1.76rem">
    <div class="item">
      {{ propsData[`701`].v0 }}
    </div>
    <div class="item">
      {{ propsData[`701`].v3 }}
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BmatchOdds',
    props: {
      propsData: {type: Object}
    }
  }
</script>
