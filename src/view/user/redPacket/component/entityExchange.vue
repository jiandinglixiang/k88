<template>
  <div class="entity-exchange">
    <img :src="propsData.image" alt="">
    <div>
      <div class="entity-exchange-top">{{ propsData.name }}</div>
      <div class="entity-exchange-bottom">
        <div>
          <span style="color: #e73f40">{{ propsData.point }}</span>
          <span style="color: #a9a9a9">积分</span>
        </div>
        <div @click="$emit('tap',propsData)">兑换</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .entity-exchange {
    background-color: white;
    border-bottom: 1px #ddd solid;
    padding: 0.3rem;
    font-size: 0;
  }

  .entity-exchange > img {
    width: 50%;
    padding: 5%;
  }

  .entity-exchange > div {
    position: relative;
    display: inline-block;
    width: 50%;
    padding: 25%;
  }

  .entity-exchange-top {
    position: absolute;
    width: 100%;
    max-height: 50%;
    left: 0;
    top: 0;
    font-size: .59rem;
    color: #333;
  }

  .entity-exchange-bottom {
    position: absolute;
    width: 100%;
    max-height: 50%;
    left: 0;
    bottom: 0;
    overflow: hidden;
    font-size: 0;
  }

  .entity-exchange-bottom > div {
    display: inline-block;
    vertical-align: middle;
  }

  .entity-exchange-bottom > div:first-child {
    font-size: .39rem;
    width: 60%;
  }

  .entity-exchange-bottom > div:last-child {
    width: 40%;
    font-size: .43rem;
    border: 1px #e73f40 solid;
    text-align: center;
    padding: .2rem 0;
    border-radius: 5px;
    color: #e73f40;
  }
</style>

<script>
  export default {
    name: 'entityExchange',
    props: {
      propsData: {type: Object}
    }
  }
</script>

