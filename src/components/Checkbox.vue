<template>
  <span :class="{active: this.checked}" class="checkbox">
    <span class="red-check-icon"></span>
  </span>
</template>

<script>//
export default {
  name: 'checkbox',
  props: ['checked']
}
</script>

<style scoped>
  .checkbox {
    width: 18px;
    height: 18px;
    border-radius: 16px;
    border: 1px solid #999999;
    text-align: center;
    line-height: 16px;
  }

  .checkbox.active {
    border: 1px solid #FFC63A;
  }

  .checkbox.active .red-check-icon {
    display: inline-block;
  }
</style>
