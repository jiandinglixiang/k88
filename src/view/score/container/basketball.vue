<style lang="scss" scoped>
  .organ-item-title {
    position: relative;
    /*border-bottom: 1px solid #ddd;*/
    padding: 10px;
    color: $cCccCCc;
    background-color: $c1c1c1c;
  }

  .organ-item-title .left {
    display: inline-block;
    padding-left: 3px;
    /*border-left: 3px solid #e73f40;*/
  }

  .organ-item-title .right {
    position: absolute;
    display: inline-block;
    background: url("../../../assets/icon/arrow_circle_up.png") no-repeat;
    background-size: 100%;
    right: 10px;
    top: 10px;
    width: 16px;
    height: 16px;
    -webkit-transition: -webkit-transform 300ms;
    transition: transform 300ms;
  }

  .bgPlay {
    -moz-transform: rotate(180deg);
    -webkit-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .organ-item-li {
    background-color: $c1c1c1c;
  }

  .organ-item-li:before {
    content: ' ';
    display: block;
    width: 90%;
    margin: 0 auto;
    height: 1px;
    background-color: $c131313;
  }
</style>
<template>
  <div>
    <div :key="groups.date+index" class="organ-item" v-for="(groups,index) in propsData">
      <div @click="show(groups.date_timestamp)" class="organ-item-title" v-if="groups.name||groups.date">
        <span class="left">{{ groups.name||groups.date }}</span>
        <span :class="{bgPlay:switchItem(groups.date_timestamp)}" class="right"> </span>
      </div>
      <div>
        <ul :key="list.id"
            style="padding: 0.14rem;"
            v-for="list in groups.list"
            v-show="switchItem(groups.date_timestamp)">
          <mine-bet-title
            :propsBonus="[list.status,`${list.oddsMin}~${list.oddsMax}`,list.winnings_bonus]"
            :propsData="[list.lottery_id,list.total_amount,list.jc_info.length,list.seriesText ]"
            :propsImg="list.lottery_image"
            theme="basketball"
          />
          <li :key="item.id"
              class="organ-item-li"
              v-for="(item) in list.jc_info">
            <basketball-mine
              :jc-info="item"
              :props-data="item.AMatch"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>//
import organList from './universal'
import basketballMine from '../template/basketballMine.vue'
import mineBetTitle from '../components/mineBetTitle.vue'

export default {
  name: 'BasketballContainer',
  props: {
    propsData: { type: Array }
  },
  data () {
    return {
      ItemName: '置顶比赛', // 标题名字
      ShowItem: {}, // 是否显示
      groupsList: []
    }
  },
  methods: {
    show (time) {
      this.rotate = !this.rotate
      let show = { ...this.ShowItem }
      if (show[time] !== undefined) {
        show[time] = !show[time]
      } else {
        show[time] = false
      }
      this.ShowItem = show
    },
    switchItem (time) {
      if (this.ShowItem[time] !== undefined) {
        return this.ShowItem[time]
      } else {
        return true
      }
    }
  },
  components: {
    organList,
    basketballMine,
    mineBetTitle
  }
}
</script>
