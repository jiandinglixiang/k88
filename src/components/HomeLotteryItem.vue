<template>
  <div @click="goCurrentLottery" class="home-lottery-item">
    <div style="height: 28px;">
      <div :class="{yellow: lottery.priority === 2, disable: lottery.priority === 3}" class="tip"
           v-if="lottery.tipText">
        <span>{{lottery.tipText}}</span>
      </div>
    </div>
    <div class="img">
      <img :src="lottery.lottery_image" alt="" height="40" width="40">
    </div>
    <p class="name">{{lottery.lottery_name}}</p>
  </div>
</template>

<script>//
export default {
  name: 'homeLotteryItem',
  props: {
    lottery: { type: Object, required: true }
  },
  methods: {
    goCurrentLottery () {
      if (this.lottery.component) {
        if (this.status !== 0) {
          this.$router.push({
            name: this.lottery.component,
            params: { id: this.lottery.lottery_id }
          })
        }
      } else {
        this.$emit('download')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-lottery-item {
    width: 33.3%;
    height: 110px;
    text-align: center;
    padding: 10px;
    font-size: 14px;
    float: left;
  }

  .home-lottery-item .tip {
    /*background: url("../assets/home/tip.png") no-repeat;*/
    background: url("../assets/home/yellow_tip.png") no-repeat;
    background-size: 100% 100%;
    height: 28px;
    font-size: 12px;
    line-height: 22px;
    margin-bottom: 3px;
    @if ($lotteryIg) {
      color: $cgray;
    } @else {
      color: $c131313;
    }
  }

  .home-lottery-item .tip.yellow {
    background: url("../assets/home/yellow_tip.png") no-repeat;
    background-size: 100% 100%;
  }

  .home-lottery-item .tip.disable {
    background: url("../assets/home/disable_tip.png") no-repeat;
    background-size: 100% 100%;
  }

  .home-lottery-item .img {
    font-size: 0;
  }

  .home-lottery-item .name {
    @if ($lotteryIg) {
      color: $cgray;
    } @else {
      color: $cFFfFFF;
    }
  }
</style>
