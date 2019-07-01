<template>
  <div class="f-filter-match" @click.stop>
    <p class="f-title">赛事选择</p>
    <ul class="f-filter-one">
      <li class="active-select">全选</li>
      <li>反选</li>
      <li>仅五大联赛</li>
    </ul>
    <select-game/>
    <p class="f-descriptio">共 <span>12</span> 场比赛</p>
    <div class="f-filter-button">
      <button>取消</button>
      <button>确定</button>
    </div>
  </div>
</template>

<script>// 筛选
import SelectGame from '@/grounder/components/SelectGame'

export default {
  name: 'FilterMatch',
  components: { SelectGame }
}
</script>

<style scoped lang="scss">
  .f-filter-match {
    overflow: hidden;
    max-width: 320px;
    margin: 0 10px;
    align-self: center;
    text-align: center;
    background-color: #131313;

    .f-title {
      margin: 10px 0;
      color: #ccc;
      font-size: 15px;
    }

    .f-filter-one {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      margin-top: 20px;
      overflow: hidden;

      > li {
        margin: 10px 0;
        box-sizing: border-box;
        overflow: hidden;
        flex: 0 1 33.3%;
        border: 1px solid #999;
        text-align: center;
        line-height: 30px;
        height: 30px;
        font-size: 14px;
        text-wrap: normal;
        color: #ffc63a;
        font-weight: bold;

        &.active-select {
          color: #131313;
          border-color: #ffc63a;
          background-color: #ffc63a;
        }
      }

      > li:nth-child(3n+2), li:nth-child(3n+0) {
        border-left: 0;
      }

      > li:nth-child(3n+1) {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      > li:last-child, > li:nth-child(3n+0) {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }

    .f-descriptio {
      overflow: hidden;
      color: #999999;
      font-weight: 500;
      margin: 10px;

      > span {
        color: #ffc63a;
      }
    }

    .f-filter-button {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;

      > button {
        flex: 1 1 50%;
        height: 40px;
        background-color: #131313;
        border-top: 1px solid #313131;
      }

      > button:first-child {
        color: #999;
        border-right: 1px solid #313131;
      }

      > button:last-child {
        color: #ffc63a;
      }
    }
  }

</style>
