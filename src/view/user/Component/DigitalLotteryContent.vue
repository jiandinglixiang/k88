<template>
  <div class="DigitalLotteryContent margin-top-10">
    <div class="padding bg-white">
      <p class="text-normal follow-times" v-if="detail.follow_times">
        追号订单，当前第<span class="text-primary">{{detail.current_follow_times}}/{{detail.follow_times}}</span>期
      </p>
      <p class="text-normal" style="line-height: 34px" v-if="detail.prizeResult">
        开奖号码：
        <template v-if="isK3(detail.lottery_id)">
          <span :class="'k3-' + ball + '-icon'" :key="`1${n001}`" class="k3-item"
                v-for="(ball,n001) in detail.prizeResult[0]"></span>
          <span class="k3-item-hz">和值：{{k3Hz(detail.prizeResult[0])}}</span>
        </template>
        <template v-else>
          <span :key="`2${n002}`" class="bg-red-ball margin-right-3" v-for="(item,n002) in detail.prizeResult[0]">{{item}}</span>
          <span :key="`3${n003}`" class="bg-blue-ball margin-right-3" v-for="(item,n003) in detail.prizeResult[1]">{{item}}</span>
        </template>
      </p>
      <p class="text-normal" v-else>
        开奖号码：等待开奖中
      </p>
      <p class="text-normal margin-top-5">投注内容：<span
        class="text-muted">{{detail.stackCount}}注,{{detail.multiple}}倍</span></p>
      <p :key="n002"
         class="text-normal margin-top-5"
         v-for="(item,n002) in detail.tickets">
        {{item.playTypeText}}：
        <!--十一选五-->
        <span class="text-muted" v-if="item.lotteryType == 'syxw' || item.lotteryType == 'fc3d'">
            <span :key="k" v-for="(r, k) in item.result">
              <span v-if="k > 0">|</span>
              <template v-if="r.pre">
                <span>(</span>
                <span :class="{'margin-left-3': t > 0, 'text-primary': p.checked}"
                      :key="t"
                      v-for="(p, t) in r.pre">{{p.text}}</span>
                <span>)</span>
              </template>
              <span :class="{'text-primary': i.checked}" :key="n003" class="margin-right-3" v-for="(i,n003) in r.next">{{i.text}}</span>
            </span>
          </span>
        <!--双色球和大乐透-->
        <span class="text-muted" v-else>
            <span :key="k" v-for="(r, k) in item.result">
              <span v-if="k > 0">:</span>
              <span v-if="r.pre">
                <span>(</span>
                <span :class="{'margin-left-3': t > 0, 'text-primary': p.checked}"
                      :key="t"
                      v-for="(p, t) in r.pre">{{p.text}}</span>
                <span>)</span>
              </span>
              <span :class="{'text-primary': i.checked}" :key="n005" class="margin-right-3" v-for="(i,n005) in r.next">{{i.text}}</span>
            </span>
          </span>
      </p>
    </div>
    <div class="padding text-light bg-white text-sm margin-top-10">
      <p>投注时间：{{detail.buying_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}</p>
      <p class="margin-top-5">方案编号：{{detail.sku}}</p>
    </div>
  </div>
</template>

<script>//
import Lottery from '../../../model/common/Lottery'

export default {
  name: 'DigitalLotteryContent',
  props: {
    detail: { type: Object }
  },
  methods: {
    isK3 (id) {
      return Lottery.isK3(id)
    },
    k3Hz (ball) {
      return ball.reduce((a, b) => {
        return parseInt(a) + parseInt(b)
      })
    }
  }
}
</script>

<style scoped>

  .DigitalLotteryContent .follow-times {
    padding-left: 10px;
    padding-bottom: 10px;
  }

  .DigitalLotteryContent .k3-item {
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
  }

  .DigitalLotteryContent .k3-item-hz {
    vertical-align: top;
    margin-top: 5px;
    color: #333333;
  }

  .DigitalLotteryContent .margin-right-3 {
    margin-right: 3px;
  }

  .DigitalLotteryContent .margin-left-3 {
    margin-left: 5px;
  }
</style>
