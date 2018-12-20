<style scoped>
  .name-score * {
    box-sizing: border-box;
  }

  .name-score {
    height: 1.76rem;
    font-size: 0.36rem;
    font-weight: bold;
  }

  .item {
    width: 100%;
    height: 50%;
    position: relative;
  }

  .item > div {
    display: inline-block;
    float: left;
  }

  .maxWidth48 {
    max-width: 48%;
  }

  .maxWidth65 {
    max-width: 55%;
  }

  .maxWidth75 {
    max-width: 55%;
  }

  .name {
    margin-right: 2%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .football-score {
    color: #a4a4a4;
    width: 2.3em;
    text-align: center;
  }

  .basketball-score {
    color: #a4a4a4;
    width: 3em;
    text-align: center;
  }

  .football {
    color: #60a839;
    width: 2.3em;
    text-align: center;
  }

  .basketball {
    color: #e73f40;
    width: 3em;
    text-align: center;
  }

  .red-board, .yellow-board {
    box-sizing: border-box;
    width: 1em;
    margin-right: 0.3em;
    text-align: center;
    color: white;
    border-radius: 2px;
  }

  .red-board {
    background-color: #e73f40;
  }

  .yellow-board {
    background-color: #fed223;
  }
</style>
<template>
  <div @click="$emit('tap')"  class="name-score">
    <div class="item">
      <div :class="propsHome[0]>=0 ?theme:`${theme}-score`">{{ propsHome[0] }}</div>
      <div class="name" :class="showClass('propsHome')">{{ propsHome[1]}}</div>
      <div v-if="showClass('propsHome',2)" class="red-board">{{ propsHome[2] }}</div>
      <div v-if="showClass('propsHome',3)" class="yellow-board">{{ propsHome[3] }}</div>
    </div>
    <div class="item">
      <div :class="propsGuest[0]>=0? theme:`${theme}-score`">{{ propsGuest[0] }}</div>
      <div class="name" :class="showClass('propsGuest')">{{ propsGuest[1] }}</div>
      <div v-if="showClass('propsGuest',2)" class="red-board">{{ propsGuest[2] }}</div>
      <div v-if="showClass('propsGuest',3)" class="yellow-board">{{ propsGuest[3] }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'nameScore',
    props: {
      propsHome: {type: Array, required: true},
      propsGuest: {type: Array, required: true},
      theme: {type: String, required: true}
    },
    methods: {
      showClass (home, bol) {
        const is2 = this[home] && this[home][2] > 0
        const is3 = this[home] && this[home][3] > 0
        if (bol) {
          if (bol === 2) {
            return is2
          } else {
            return is3
          }
        }
        if (is2) {
          if (is3) {
            return 'maxWidth48'
          }
          return 'maxWidth65'
        } else if (is3) {
          return 'maxWidth65'
        } else {
          return 'maxWidth75'
        }
      }
    }
  }
</script>

