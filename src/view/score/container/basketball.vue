<style scoped>
  .organ-item-title {
    position: relative;
    border-bottom: 1px solid #ddd;
    padding: 10px;
    color: #666666;
  }

  .organ-item-title .left {
    display: inline-block;
    padding-left: 3px;
    border-left: 3px solid #e73f40;
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
  .organ-item-li{
    background-color: white;
  }
  .organ-item-li:before {
    content: ' ';
    display: block;
    width: 90%;
    margin: 0 auto;
    height: 1px;
    background-color: #dddd;
  }
</style>
<template>
  <div>
    <div class="organ-item" v-for="(groups,index) in propsData" :key="groups.date+index">
      <div v-if="groups.name||groups.date" class="bg-white organ-item-title" @click="show(groups.date_timestamp)">
        <span class="left">{{ groups.name||groups.date }}</span>
        <span class="right" :class="{bgPlay:switchItem(groups.date_timestamp)}"> </span>
      </div>
      <div>
        <ul v-show="switchItem(groups.date_timestamp)"
            style="padding: 0.14rem;"
            v-for="list in groups.list"
            :key="list.id">
          <mine-bet-title
            theme="basketball"
            :propsImg="list.lottery_image"
            :propsData="[list.lottery_id,list.total_amount,list.jc_info.length,list.seriesText ]"
            :propsBonus="[list.status,`${list.oddsMin}~${list.oddsMax}`,list.winnings_bonus]"
          />
          <li class="organ-item-li"
              v-for="(item) in list.jc_info"
              :key="item.id">
            <basketball-mine
              :props-data="item.AMatch"
              :jc-info="item"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import organList from './universal'
  import basketballMine from '../template/basketballMine.vue'
  import mineBetTitle from '../components/mineBetTitle.vue'

  export default {
    name: 'BasketballContainer',
    props: {
      propsData: {type: Array}
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
        let show = {...this.ShowItem}
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
