<template>
  <div id="g-grounder-betting" @click.stop>
    <p class="g-vs-team">
      <span>卡里阿美利加</span>
      <span>VS</span>
      <span>卡尔达斯卡</span>
    </p>
    <div class="g-betting-odds">
      <p><span>全场让球</span><span>卡里阿美里加</span></p>
      <p><span>0.0/-0.5 @</span><span class="odds up"> 2.85</span></p>
      <div class="g-odds-refresh"></div>
    </div>
    <div class="g-remind"><img src="../assets/remind_001.png" alt=""><span>{{'赔率已发生变化'||'投注已暂停'}}</span></div>
    <div class="g-input-number">
      <div class="g-input-top">
        <div>投注金额</div>
        <p>账户余额 25874698.00元</p>
      </div>
      <input type="number" placeholder="输入投注金额" :disabled="1">
      <div class="g-input-bottom">
        <div>预计奖金 <span style="color: #3393FF">578.77</span></div>
        <p>投注上限 100000</p>
      </div>
      <div class="g-disabled">投注暂停</div>
    </div>
    <red-employ/>
    <div class="g-submit-button">
      <button :disabled="1">付款</button>
    </div>
  </div>
</template>

<script>// 投注弹窗
import RedEmploy from '@/grounder/components/RedEmploy'

export default {
  name: 'GrounderBetPopup',
  components: { RedEmploy }
}
</script>

<style scoped lang="scss">
  #g-grounder-betting {
    max-width: 300px;
    margin: 0 auto;
    align-self: center;
    background-color: white;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;

    > .g-vs-team {
      color: #131313;
      font-weight: bold;
      font-size: 14px;
      margin: 10px 10px 0 10px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      > span {
        max-width: 45%;
      }

      > span:nth-child(2) {
        margin: 0 5px;
      }
    }

    > .g-betting-odds {
      margin: 0 10px;
      background-color: #fbf7f0;
      position: relative;
      border-radius: 4px;

      > p {
        line-height: 25px;
        text-align: center;
        color: #FFC63A;
        font-weight: bold;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;

        .up::after, .down::after {
          display: none;
          content: '';
          vertical-align: middle;
          margin-left: 5px;
          width: 0;
          height: 0;
          border-width: 4px;
          border-style: solid dashed dashed dashed;
        }

        .up {
          color: #1ac456;

          &::after {
            display: inline-block;
            margin-bottom: 6px;
            border-color: transparent transparent #1ac456 transparent;
          }
        }

        .down {
          color: #f33;

          &::after {
            display: inline-block;
            border-color: #f33 transparent transparent transparent;
          }
        }

        span:first-child {
          margin-right: 5px;
        }
      }

      > .g-odds-refresh {
        position: absolute;
        right: -5px;
        top: -10px;
        width: 40px;
        height: 40px;
        background: linear-gradient(0deg, rgba(255, 136, 8, 1), rgba(255, 67, 91, 1));
      }
    }

    > .g-remind {
      margin-top: 10px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      color: #FF3333;
      font-weight: 500;

      img {
        width: 16px;
        height: 16px;
        margin-right: 5px;
      }
    }

    > .g-input-number {
      position: relative;
      margin: 10px 0;
      padding: 10px;
      background-color: #F4F4F4;

      > input[type="number"] {
        background-color: #ddd;
        border: 0;
        text-align: center;
        color: #999999;
        font-weight: bold;
        height: 34px;
        margin: 5px 0;
      }

      > input[disabled='disabled'] {
        &::placeholder {
          color: #ddd;
        }
      }

      > input[disabled='disabled'] ~ .g-disabled {
        // 禁止提示
        transform: translate(-50%, -50%);
        position: absolute;
        color: #999999;
        left: 50%;
        top: 50%;
      }

      .g-input-top, .g-input-bottom {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        font-weight: 500;
      }

      .g-input-top {
        > div {
          font-size: 13px;
          color: #131313;
          font-weight: bold;
        }

        > p {
          color: #999999;
          max-width: 80%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }

      .g-input-bottom {
        color: #999;
        height: 17px;
      }
    }

    > .g-submit-button {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      height: 45px;

      button {
        width: 80%;
        height: 40px;
        background: linear-gradient(90deg, rgba(255, 167, 13, 1), rgba(255, 198, 58, 1));
        box-shadow: 0 0 3px 0 rgba(83, 10, 10, 0.14);
        border-radius: 17px;
        font-size: 14px;
        font-weight: bold;
        color: #131313;
      }

      button[disabled='disabled'] {
        background: linear-gradient(90deg, rgba(153, 153, 153, 1), rgba(204, 204, 204, 1));
        box-shadow: 0 0 3px 0 rgba(83, 10, 10, 0.14);
        color: white;
      }
    }
  }
</style>
