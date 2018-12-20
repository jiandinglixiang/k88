<style scoped>
  .back41b43b {
    background-color: #41b43b;
  }

  .backFed223 {
    background-color: #fed223;
  }

  .match-odds * {
    box-sizing: border-box;
  }

  .match-odds {
    height: 1.76rem;
  }

  .match-odds .item {
    height: 50%;
    width: 100%;
    position: relative;
  }

  .match-odds .item > div {
    display: inline-block;
    font-size: 0.3rem;
    float: right;
  }

  .match-odds .score-x1 {
    width: 20%;
    color: white;
    text-align: right;
  }

  .score-x1 div {
    display: inline-block;
    text-align: center;
    width: 1.5em;
    line-height: 100%;
    margin-right: 10%;
    font-weight: 400;
    border-radius: 5px;
  }

  .match-odds .item .txt {
    width: 26%;
  }

  .color888 {
    color: #888888;
  }
</style>
<template>
  <div @click="$emit('tap')"   class="match-odds">
    <div class="item" v-if="props602">
      <div class="txt" :class="game602===0? 'text-primary':'color888'">{{props602.v0}}</div>
      <div class="txt" :class="game602===1? 'text-primary':'color888'">{{props602.v1}}</div>
      <div class="txt" :class="game602===3? 'text-primary':'color888'">{{props602.v3}}</div>
      <div class="score-x1">
        <div :class="props602.letPoint>0? 'back41b43b':'backFed223'">
          {{props602.letPoint }}
        </div>
      </div>
    </div>
    <div class="item" v-if="props601">
      <div class="txt" :class="game601===0? 'text-primary':'color888'">{{props601.v0}}</div>
      <div class="txt" :class="game601===1? 'text-primary':'color888'">{{props601.v1}}</div>
      <div class="txt" :class="game601===3? 'text-primary':'color888'">{{props601.v3}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'matchOdds',
    props: {
      props601: {type: Object},
      props602: {type: Object},
      game601: {type: Number},
      game602: {type: Number}
    }
  }
</script>
