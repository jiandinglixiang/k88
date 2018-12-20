<style scoped>
  .real-score *{
    box-sizing: border-box;
  }
  .real-score {
    position: relative;
    height: 1.76rem;
  }

  .real-score .item {
    height: 50%;
    text-align: center;
    font-size: .3rem;
    margin: 0;
  }

  .real-score .item .child {
    flex: 1 1 100%;
  }
</style>

<template>
  <div @click="$emit('tap')" class="real-score">
    <div class="item row">
      <div class="child" v-for="(i,index) in showLength()" :key="i">
        {{ propsGuest.score[index]? propsGuest.score[index].score:'-' }}
      </div>
    </div>
    <div class="item row">
      <div class="child" v-for="(i,index) in showLength()" :key="i">
        {{propsHome.score[index]? propsHome.score[index].score:'-' }}
      </div>
    </div>
    <div class="item row" style="position: absolute;top: -0.47rem;color: #cccccc">
      <div class="child" v-for="i in showLength()" :key="i">{{ i }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BrealScore',
    props: {
      propsHome: {type: Object, default: {}},
      propsGuest: {type: Object, default: {}}
    },
    created () {
      const score = JSON.parse(JSON.stringify(this.propsHome.score))
      const score2 = JSON.parse(JSON.stringify(this.propsGuest.score))
      const func = ({quarter}, z) => {
        return quarter - z.quarter
      };
      this.propsHome.score = score.sort(func)
      this.propsGuest.score = score2.sort(func)
    },
    methods: {
      showLength () {
        if (this.propsGuest.score.length === 5 && this.propsHome.score.length === 5) {
          return ['1st', '2nd', '3rd', '4th', 'TO']
        } else {
          return ['1st', '2nd', '3rd', '4th']
        }
      }
    }
  }
</script>
