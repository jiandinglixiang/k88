<style scoped>

  .red-item {
    float: left;
    position: relative;
    display: inline-block;
    width: 50%;
    background-color: #1C1C1C;
    border-bottom: 1px solid #313131;
  }

  .red-item:after {
    content: ' ';
    position: absolute;
    top: 0;
    right: -1px;
    height: 100%;
    width: 1px;
    background-color: #313131;
    z-index: 2;
  }

  .red-item-body {
    padding: .35rem;
  }

  .red-item-top {
    background: url("../../../../grounder/assets/shop_redbag_bg1top.png") no-repeat left top, url("../../../../grounder/assets/shop_redbag_bg1bottom.png") no-repeat left bottom;
    background-size: 100% 1.03rem, 100% 0.6rem;
    height: 1.63rem;
    width: 100%;
    color: white;
  }

  .red-item-top-1 {
    height: 1.03rem
  }

  .red-item-top-1 > div {
    position: relative;
    padding-left: 18%;
    top: 50%;
    transform: translateY(-50%);
    background-image: url("../../../../assets/icon/red_item_icon.png");
    background-size: auto 100%;
    background-repeat: no-repeat;
    background-position: 4% 0;
    font-size: .47rem;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
  }

  .red-item-top-2 {
    height: 0.6rem;
    line-height: 0.6rem;
    position: relative;
  }

  .red-item-top-2 > div {
    display: inline-block;
    font-size: .37rem;
    overflow: hidden;
    white-space: nowrap;
  }

  .top2-child-left {
    float: left;
    padding-left: 7%;
    filter: alpha(opacity=70);
    -moz-opacity: 0.7;
    -khtml-opacity: 0.7;
    opacity: 0.7;
    /*-webkit-transform: scale(0.8);*/
  }

  .top2-child-right {
    float: right;
    padding-right: 7%;
    filter: alpha(opacity=70);
    -moz-opacity: 0.7;
    -khtml-opacity: 0.7;
    opacity: 0.7;
    /*-webkit-transform: scale(0.8);*/
  }

  .red-item-details {
    color: #666666;
    padding: .15rem 0;
    font-size: .37rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .red-item-PB2, .red-item-PB {
    font-size: 0;
  }

  .red-item-price {
    color: #999999;
  }

  .red-item-PB .red-item-price > span {
    color: #e73f40;
    font-weight: bold;
  }

  .red-item-button {
    border: 1px #e73f40 solid;
    text-align: center;
    padding: .25rem 0;
    border-radius: 5px;
    color: #e73f40;
  }

  .red-item-button {
    width: 30%;
    display: inline-block;
    font-size: .37rem;
    line-height: 1;
    vertical-align: middle;
  }

  .red-item-price {
    vertical-align: middle;
    width: 70%;
    display: inline-block;
    font-size: .37rem;
    line-height: 1;
  }

</style>
<template>
  <div class="red-item">
    <div class="red-item-body">
      <template v-if="theme">
        <div class="red-item-top">
          <div class="red-item-top-1">
            <div>¥{{ propsData.value }}</div>
          </div>
          <div class="red-item-top-2">
            <div class="top2-child-left">{{ propsData.diaplay_name }}</div>
          </div>
        </div>
        <div class="red-item-details"></div>
        <div class="red-item-PB">
          <div class="red-item-price"><span>{{ propsData.price }}</span>元</div>
          <div @click="$emit('tap',propsData)" class="red-item-button">购买</div>
        </div>
      </template>
      <template v-else>
        <div class="red-item-top">
          <div class="red-item-top-1">
            <div>{{ propsData.name }}</div>
          </div>
          <div class="red-item-top-2">
            <div class="top2-child-left">{{ propsData.condition }}</div>
            <div class="top2-child-right">{{ goodNum }}</div>
          </div>
        </div>
        <div class="red-item-details">可用彩种: {{ propsData.support_lottery||'通用' }}</div>
        <div class="red-item-PB2">
          <div class="red-item-price">
            <div><span style="color:#e73f40;">{{  propsData.point}}</span>积分</div>
            <div style="color: #333333;margin-top: 0.1rem"
                 v-if="propsData.exchane_end_time>0&&propsData.exchane_end_time<2102415999">
              <count-down :endTime="propsData.exchane_end_time"/>
            </div>
          </div>
          <div @click="$emit('tap',propsData)" class="red-item-button">兑换</div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>//
import countDown from './countDown.vue'

export default {
  name: 'redItem',
  props: {
    theme: { type: null }, // true代表展示购买红包
    propsData: {}
  },
  computed: {
    goodNum () {
      if (this.propsData.good_num < 100) {
        if (this.propsData.good_num < 1) {
          return `补货中`
        }
        return `剩余${this.propsData.good_num}个`
      }
      return ``
    }
  },
  components: { countDown }
}
</script>
