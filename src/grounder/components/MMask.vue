<template>
  <div id="m-mask" @touchmove.stop>
    <slot>
      <!--   align-self: flex-end;    -->
      <!--   align-self: flex-state;    -->
    </slot>
  </div>
</template>

<script>//
export default {
  name: 'MMask'
}
</script>
<style scoped>
  #m-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: rgba(28, 28, 28, 0.5);
    display: flex;
    flex-flow: row;
    justify-content: center;
    overflow: hidden;
  }
</style>
