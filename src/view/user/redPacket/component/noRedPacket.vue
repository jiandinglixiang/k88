<template>
  <div class="no-red-packet">
    <div class="no-red-packet-child">
      <img alt="" src="../../../../assets/no_red_packet.png">
      <div>{{ propsData }}</div>
    </div>
  </div>
</template>

<script>//
export default {
  name: 'noRedPacket',
  props: ['propsData']
}
</script>

<style>
  .no-red-packet {
    text-align: center;
    height: 10rem;
  }

  .no-red-packet-child {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    font-size: .41rem;
    color: #666666;
  }

  .no-red-packet-child img {
    width: 34.38%;
  }
</style>
