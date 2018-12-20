<style scoped>
  .football-back {
    background-image: url('../../../assets/mine_back.png');
  }

  .basketball-back {
    background-image: url('../../../assets/mine_back2.png');
  }

  .green-card-body {
    display: inline-block;
    background-color: #6cb43d;
    border-radius: 2px;
    width: 1em;
    text-align: center;
    margin-right: 0.25em;
  }

  .green-card {
    height: 100%;
    color: white;
    font-weight: bold;
    font-size: .36rem;
  }

  .send-icon {
    display: inline-block;
    width: 0.36rem;
    height: 0.36rem;
    background-image: url("../../../assets/send_icon.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin-left: 0.5em;
  }

  .opacity50 {
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
  }

  .bet-title {
    position: relative;
    background-color: white;
    padding: 0.359375rem 0.25rem 0.265625rem 0.25rem;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    background-size: 12px 100%;
    background-repeat: repeat-x;
  }

  .bet-title:after {
    content: ' ';
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: -2px;
    left: 0;
    background-color: white;
  }

  .bet-title .f-img {
    display: inline-block;
    line-height: 100%;
    vertical-align: top;
    width: 1.1rem;
  }

  .bet-title .body {
    display: inline-block;
    height: 1.1rem;
    width: 85%;
    vertical-align: top;
  }

  .bet-title .body .body-item {
    padding-left: 1em;
    height: 50%;
    width: 100%;
  }

  .msgSpan {
    color: #b6b5b5;
    font-size: .3rem;
  }

  .money {
    font-weight: bold;
    font-size: .36rem;
    color: #333333
  }

  .yes-money {
    font-size: .36rem;
    color: #ffb81f;
    font-weight: bold
  }
</style>
<template>
  <li class="bet-title" :class="`${theme}-back`">
    <img class="f-img" :src="propsImg" alt="">
    <div class="body">
      <div class="body-item">
        <span class="money">¥{{propsData[1]}}</span>
        <span class="msgSpan">( {{propsData[2]}}场 )</span>
        <span class="msgSpan">{{showSeries}}</span>
      </div>
      <div class="body-item">
        <div class="green-card" v-if="propsData[0]==='20'||propsData[0]==='21'">
          <div class="green-card-body"
               v-for="(i,index) in sfcResult(prizeNum)"
               :key="index"
               :class="{opacity50:i.check}">{{i.txt}}
          </div>
        </div>
        <div v-else>
          <template v-if="propsBonus[0]>3&&propsBonus[0]<7">
            <span class="msgSpan">奖金:</span>
            <span class="yes-money">{{propsBonus[2]}}</span>
          </template>
          <template v-else>
            <span class="msgSpan">理论奖金:</span>
            <span class="yes-money">{{propsBonus[1]}}</span>
          </template>
          <span class="send-icon" @click="Message"></span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
  import { MessageBox } from 'mint-ui';

  export default {
    name: 'mineBetTitle',
    props: {
      theme: {type: String, default: ''},
      propsImg: {type: String, default: ''},
      propsData: {type: Array, default: []},
      propsBonus: {type: Array, default: []},
      jcInfo: {type: Array},
      prizeNum: {type: null}
    },
    computed: {
      showSeries () {
        if (this.propsData[0] === '20' || this.propsData[0] === '21') {
          return `第 ${this.propsData[4]} 期`
        }
        return this.propsData[3]
      }
    },
    methods: {
      sfcResult (arr) {
        let add = JSON.parse(JSON.stringify(arr))
        if (add) {
          if (Object.prototype.toString.call(add) === '[object String]') {
            add = add.split(',');
          }
          add = add.map(i => {
            return {txt: i, check: true}
          });
        } else {
          add = new Array(14);
          for (let i = 0; i < add.length; i++) {
            add[i] = {txt: '-', check: true}
          }
        }
        this.jcInfo.forEach((item) => {
          if (add[item.round_no - 1]) {
            add[item.round_no - 1].check = false
          }
        });
        return add
      },
      Message () {
        MessageBox('', `<p class="text-left" style="line-height:0.56rem;color:#333 ">该订单相关比赛当期赛况下理论奖金范围,实际赔率有浮动,仅做参考,最终以实际中奖金额为准.<br/>奖金优化方案暂不支持理论奖金计算</p>`);
      }
    }
  }
</script>
