<template>
  <div class="organ-item" v-if="propsData.schedules.length">
    <div @click="show" class="organ-item-title" v-if="name||propsData.name">
      <span class="left">{{ name||propsData.name }}</span>
      <span :class="{bgPlay:rotate}" class="right"> </span>
    </div>
    <ul style="padding: 0.14rem;" v-show="ShowItem">
      <slot name="top"></slot>
      <li :key="item.id" v-for="(item,index) in propsData.schedules">
        <slot :data="item" :index="index"></slot>
      </li>
    </ul>
  </div>
</template>

<script>//
export default {
  name: 'universal',
  props: {
    propsData: {
      type: Object, required: true
    },
    name: { type: String }
  },
  data () {
    return {
      ItemName: '置顶比赛', // 标题名字
      ShowItem: true, // 是否显示
      rotate: false // 旋转
    }
  },
  methods: {
    show () {
      this.rotate = !this.rotate
      this.ShowItem = !this.ShowItem
    }
  }
}
</script>

<style lang="scss" scoped>
  .organ-item-title {
    position: relative;
    font-size: 0.3125rem;
    /*border-bottom: 1px solid #c9c9c9;*/
    padding: 0.21875rem 0.3125rem;
    /*margin:0.015625%;*/
    color: $cCccCCc;
    background-color: $c1c1c1c;
  }

  .organ-item-title .left {
    display: inline-block;
    padding-left: 0.09375rem;
    border-left: 0.046875rem solid $cffC63A;
  }

  .organ-item-title .right {
    position: absolute;
    display: inline-block;
    background: url("../../../assets/icon/arrow_circle_up.png") no-repeat;
    background-size: 100%;
    right: 0.3125rem;
    top: 0.21875rem;
    width: 0.40625rem;
    height: 0.40625rem;
    -webkit-transition: -webkit-transform 300ms;
    transition: transform 300ms;
  }

  .bgPlay {
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }
</style>
