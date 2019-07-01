<template>
  <div id="r-red-employ">
    <div class="r-red-title">
      <div>使用红包</div>
      <p>暂无可使用红包</p>
    </div>
    <div class="r-red-container">
      <div class="r-red-type">
        <div class="active-select">现金红包</div>
        <div>满减红包</div>
      </div>
      <ul class="r-re-list" @click.stop @touchmove.stop>
        <li :key="32158" class="active-select">
          <div><span>9928元</span></div>
          <p><span style="color:#999;">剩余</span> <span style="color: #FF3333">98988元</span></p>
        </li>
        <li v-for="n in 100" :key="n">
          <div><span>{{n*888}}元</span></div>
          <p><span style="color:#999;">剩余</span> <span style="color: #FF3333">{{n*999}}元</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>// 红包使用
export default {
  name: 'RedEmploy'
}
</script>

<style scoped lang="scss">
  #r-red-employ {
    .r-red-title {
      margin: 0 10px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      div {
        color: #131313;
        font-weight: bold;
        font-size: 13px;
      }

      p {
        color: #999;
      }
    }

    .r-red-container {

      .r-red-type {
        margin-top: 5px;
        background-color: #F4F4F4;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: #999;

        div {
          flex: 1 1 50%;
          height: 34px;
          line-height: 34px;
          text-align: center;
        }

        div.active-select {
          font-weight: bold;
          color: #131313;
          border-bottom: 1px solid #ffc63a;
        }

        &:after {
          content: '';
          width: 1px;
          height: 21px;
          background-color: #ddd;
          position: absolute;
          left: 50%;
        }
      }

      .r-re-list {
        height: 146px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: flex;
        flex-flow: row wrap;

        > li {
          flex: 0 1 25%;
          height: 73px;

          > div {
            background: url('../assets/rolling_redbag_bg.png') no-repeat center 0;
            background-size: auto 56px;
            padding-top: 30px;
            margin: 0 auto;
            height: 56px;
            width: 50px;
            text-align: center;
            color: #FADB62;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          &.active-select > div {
            background-image: url("../assets/rolling_redbag_sel.png");
          }

          > p {
            height: 17px;
            line-height: 1;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #ffc63a;
          }
        }
      }
    }
  }
</style>
