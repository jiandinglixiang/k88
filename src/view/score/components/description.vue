<template>
  <div @click="$emit('tap')" class="text-center body">
    <div class="middle" v-if="propsData.length===1">
      <div class="txt1">{{ propsData[0] }}</div>
    </div>
    <div class="bottom" v-else>
      <div class="txt2">{{ propsData[0] }}</div>
      <div class="txt3">{{ propsData[1] }}</div>
    </div>
  </div>
</template>

<script>//
export default {
  name: 'description',
  props: {
    propsData: { type: Array }
  }
}
</script>

<style lang="scss" scoped>
  .body * {
    box-sizing: border-box;
  }

  .txt1 {
    font-size: 0.36rem;
    @if ($lotteryIg) {
      color: $cgray;
    } @else {
      color: $cCccCCc;
    }
  }

  .txt2 {
    font-size: 0.36rem;
    @if ($lotteryIg) {
      color: $cgray;
    } @else {
      color: $cCccCCc;
    }
  }

  .txt3 {
    font-size: 0.3rem;
    @if ($lotteryIg) {
      color: $cgray;
    } @else {
      color: $cCccCCc;
    }
  }

  .body {
    position: relative;
    height: 1.23rem;
  }

  .body:after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 1.3rem;
    background-color: #ddd;
  }

  .body .middle, .body .bottom {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
</style>
