<template>
  <ul class="s-select-game">
    <li>全场让球</li>
    <li>全场大/小球</li>
    <li>全场大/小球</li>
    <li>全场让球</li>
    <li>全场大/小球</li>
    <li>全场大/小球</li>
    <li class="active-select">全场让球</li>
    <li>全场大/小球</li>
    <li>全场大/小球</li>
  </ul>
</template>

<script>//
export default {
  name: 'SelectGame'
}
</script>

<style scoped lang="scss">
  .s-select-game {
    width: 100%;
    align-content: flex-start;
    display: flex;
    flex-flow: row wrap;

    >li {
      font-weight: bold;
      box-sizing: border-box;
      overflow: hidden;
      margin: 1.665%;
      flex: 0 1 30%;
      border-radius: 4px;
      border: 1px solid #999;
      text-align: center;
      line-height: 30px;
      height: 30px;
      font-size: 14px;
      text-wrap: normal;

      &.active-select {
        background-image: url("../../assets/betting/selected.png");
        background-position: bottom right;
        background-repeat: no-repeat;
        background-size: 20px 20px;
        border-color: #ffc63a;
      }
    }
  }
</style>
