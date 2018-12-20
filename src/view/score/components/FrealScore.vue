<style scoped>
  .shoot-1-icon {
    width: 0.3125rem;
    height: 0.5rem;
    background: url("../../../assets/icon/shoot1.png") no-repeat;
    background-size: 100% 100%;
  }

  .shoot-2-icon {
    width: 0.3125rem;
    height: 0.5rem;
    background: url("../../../assets/icon/shoot2.png") no-repeat;
    background-size: 100% 100%;
  }

  .shoot {
    display: inline-block;
    background-position: center;
  }

  .real-score {
    text-align: center;
    position: relative;
    height: 1.76rem;
  }

  .real-score .item {
    height: 50%;
    width: 100%;
    color: #888;
    font-size: .3rem;
  }

  .real-score .item > div {
    display: inline-block;
    width: 33%;
  }
</style>
<template>
  <div @click="$emit('tap')" class=" real-score">
    <!--进行中-->
    <div class="item">
      <div>{{filtration('propsHome','shots_on_goal')}}/{{filtration('propsHome','shoot')}}</div>
      <div>{{filtration('propsHome','ball_possession','%')}}</div>
    </div>
    <div class="item">
      <div>{{filtration('propsGuest','shots_on_goal')}}/{{filtration('propsGuest','shoot')}}</div>
      <div>{{filtration('propsGuest','ball_possession','%')}}</div>
    </div>
    <div class="item" style="position: absolute;top: -0.69rem;width: 100%">
      <!--射门图标-->
      <div><span class="shoot shoot-1-icon"></span></div>
      <div><span class="shoot shoot-2-icon"></span></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'realScore',
    props: {
      propsHome: {type: Object},
      propsGuest: {type: Object}
    },
    methods: {
      filtration (props, who, pre) {
        if (this[props] && this[props][who]) {
          return this[props][who]
        } else {
          return `0${pre || ''}`
        }
      }
    }
  }
</script>
