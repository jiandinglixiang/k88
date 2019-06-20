<template>
  <div style="margin-bottom: 150px">
    <router-link append class="padding relative bg-white margin-top-10" tag="div" to="scheme" v-if="isId">
      <span class="text-normal text-default">方案明细</span>
      <span class="arrow-right"></span>
    </router-link>
    <div class="padding relative bg-white margin-top-10" v-else>
      <span class="text-normal text-default">暂无方案明细</span>
      <span class="arrow-right"></span>
    </div>
    <div class="bottom-logo margin-top-20 text-center">
      <img alt="" src="../../../assets/bottom_logo.png"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailFooter',
  props: {
    isId: { type: Boolean }
  }
}
</script>

<style scoped>
  .arrow-right {
    position: absolute;
    right: 10px;
    top: 15px;
  }

  .bottom-logo img {
    width: 100px;
  }
</style>
