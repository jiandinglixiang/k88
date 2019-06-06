<style scoped>

  .yes-badge, .wait-badge, .no-badge {
    border-radius: 8px;
    padding: 2px 6px;
    font-size: 12px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
  }

  .yes-badge {
    color: #f63144;
    background-color: #fcc748;
  }

  .wait-badge {
    color: #f63144;
    background-color: #fcc748;
  }

  .no-badge {
    color: #85838f;
    background-color: #cccccc;
  }

  .yes-back-color {
    background-color: #f63130;
  }

  .wait-back-color {
    background-color: #fda044;
  }

  .no-back-color {
    background-color: #85838f;
  }

  .red-packet {
    margin: 3%;
    width: 94%;
  }

  .red-packet-top {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-image: url("../../../../assets/red_paecket_back.png");
    background-position: 100% 100%;
    background-repeat: repeat-x;
    padding: 12px;
    font-size: 0;
  }

  .red-packet-bottom {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    background-color: white;
  }

  .red-packet-left, .red-packet-right {
    display: inline-block;
    width: 50%;
  }

  .left-red-minor, .right-red-minor {
    font-size: .37rem;
    line-height: .59rem;
    color: white;
    filter: alpha(opacity=50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
  }

  .right-red-minor, .right-red-importance {
    text-align: right;
  }

  .left-red-importance, .right-red-importance {
    font-size: .5rem;
    line-height: 1;
    color: white;
  }

  .left-red-importance {
    font-weight: bold;
  }

  .red-packet-bottom {
    font-size: .37rem;
    padding: 10px 12px;
    color: #999999;
  }
</style>
<template>
  <div class="red-packet">
    <div :class="`${theme}-back-color`" class="red-packet-top">
      <div class="red-packet-left">
        <div class="left-red-importance">
          <span style="font-size: 0.5em">¥</span>
          <span>{{ propsData.balance }}</span>
          <span :class="theme+'-badge'" v-if="propsData.balance>0&&propsData.balance!=propsData.value">余额</span>
        </div>
        <div class="left-red-minor">{{ propsData.condition }}</div>
      </div>
      <div class="red-packet-right">
        <div class="right-red-importance">{{ propsData.display_name }}</div>
        <div class="right-red-minor" v-if="propsData.balance>0">{{propsData.end_time|getEndTime}}</div>
        <div class="right-red-minor" v-else>已使用</div>
      </div>
    </div>
    <div class="red-packet-bottom">可用彩种: {{ propsData.support_lottery }}</div>
  </div>
</template>

<script>//
import { Badge } from 'mint-ui'

export default {
  name: 'redPacket',
  props: {
    propsData: { type: Object },
    theme: { type: null }
  },
  components: {
    [Badge.name]: Badge
  }
}
</script>
