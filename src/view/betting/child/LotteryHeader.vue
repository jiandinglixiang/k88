<template>
  <div class="sport-lottery-header">
    <div class="head">
      <span @click="goBack" class="back-icon"></span>
      <span @click="changePanelVisible" class="select-type">
        {{currentType.value}}
        <i :class="{'up': panelVisible}" class="icon"></i>
      </span>
      <span @click="updateList" class="refresh-icon">
<!--        刷新-->
      </span>
      <span @click="openFilter" class="filter-icon" v-show="hasFilter()"></span>
      <span @click="goHelp" class="question-icon"></span>
    </div>
    <div class="drop-down-panel" v-show="panelVisible">
      <div class="text-container">
        <div :key="index" class="clear" v-for="(group,index) in playTypeGroup">
          <div class="group-name" v-show="group.name"><span class="dot"></span>{{group.name}}</div>
          <div :class="{'selected': currentType.id === item.id && currentType.sure === item.sure}"
               :key="index"
               @click="selectPlayType(item)"
               class="text-item" v-for="(item,index) in group.list">
            {{item.value}}
          </div>
        </div>
      </div>
      <div @click="changePanelVisible" class="mask"></div>
    </div>
  </div>
</template>

<script>//
import { mapState } from 'vuex'
import {
  CURRENT_PLAY_TYPE_SELECT,
  CURRENT_SPORT_PLAY_TYPE_SELECT,
  CURRENT_SPORT_PLAY_TYPE_SELECT_UPDATE,
  GET_CURRENT_LOTTERY,
  GET_CURRENT_SPORT_LOTTERY,
  RECOMMEND_ISSUE_SET,
  SPORTS_FILTER_PANEL_CHANGE
} from '../../../store/betting/types'
import { recommendIssue } from '../../../common/store'
import Lottery from '../../../model/common/Lottery'
import { LOTTERYIDS } from '../../../store/constants'
import Toast from '../../../common/toast.js'

let theFirstTime = false
export default {
  name: 'lotteryHeader',
  props: {
    playTypeGroup: { type: Array, required: true }
  },
  data () {
    return {
      panelVisible: false,
      time: null
    }
  },
  computed: {
    ...mapState({
      lottery: state => state.betting.lottery,
      currentType: state => (state.betting[state.betting.lottery] && state.betting[state.betting.lottery].playType) || { value: '' }
    })
  },
  methods: {
    changePanelVisible () {
      this.panelVisible = !this.panelVisible
    },
    selectPlayType (item) {
      if (Lottery.isFootBall(this.lottery) || Lottery.isBasketBall(this.lottery) || Lottery.isAHFootBall(this.lottery)) {
        this.$store.dispatch(CURRENT_SPORT_PLAY_TYPE_SELECT, item)
      } else if (Lottery.isSSQ(this.lottery) || Lottery.isDLT(this.lottery) ||
        Lottery.isSYXW(this.lottery) || Lottery.isK3(this.lottery) || Lottery.isFC3D(this.lottery)) {
        this.$store.commit(CURRENT_PLAY_TYPE_SELECT, item)
      }
      this.changePanelVisible()
    },
    goBack () {
      this.$router.replace({ path: '/' })
    },
    goHelp () {
      let lotteryId = this.lottery
      if (Lottery.isFootBall(this.lottery)) {
        lotteryId = LOTTERYIDS.FOOTBALL
      }
      if (Lottery.isBasketBall(this.lottery)) {
        lotteryId = LOTTERYIDS.BASKETBALL
      }
      this.$router.push({
        name: 'WebPage',
        query: {
          title: '玩法说明',
          url: Lottery.getHelpUrl(lotteryId)
        }
      })
    },
    hasFilter () {
      return Lottery.isFootBall(this.lottery) || Lottery.isBasketBall(this.lottery) || Lottery.isAHFootBall(this.lottery)
    },
    openFilter () {
      this.$store.commit(SPORTS_FILTER_PANEL_CHANGE, true)
    },
    updateList () {
      // 更新
      const item = this.currentType
      if (Lottery.isAHFootBall(this.lottery)) {
        this.fifteenTimeUpdate().finally(function () {
          Toast('刷新成功')
        })
      } else if (Lottery.isFootBall(this.lottery) || Lottery.isBasketBall(this.lottery)) {
        this.$store.dispatch(GET_CURRENT_SPORT_LOTTERY, item)
      } else if (Lottery.isSSQ(this.lottery) || Lottery.isDLT(this.lottery) ||
        Lottery.isSYXW(this.lottery) || Lottery.isK3(this.lottery) || Lottery.isFC3D(this.lottery)) {
        this.$store.commit(CURRENT_PLAY_TYPE_SELECT, item)
      }
    },
    fifteenTimeUpdate () {
      // 亚盘更新
      clearTimeout(this.time)
      return this.$store.dispatch(CURRENT_SPORT_PLAY_TYPE_SELECT_UPDATE, this.currentType).finally(() => {
        this.time = setTimeout(this.fifteenTimeUpdate, 15000)
      })
    }
  },
  created () {
    if (Lottery.isAHFootBall(this.lottery)) {
      // 亚盘每15秒更新次
      if (theFirstTime) {
        return this.fifteenTimeUpdate()
      }
      theFirstTime = true
      this.time = setTimeout(this.fifteenTimeUpdate, 15000)
    } else if (Lottery.isSSQ(this.lottery) || Lottery.isDLT(this.lottery) || Lottery.isK3(this.lottery) || Lottery.isFC3D(this.lottery)) {
      this.$store.dispatch(GET_CURRENT_LOTTERY).then(() => {
        let issue = recommendIssue.get()
        if (issue) {
          issue.playType && this.$store.commit(CURRENT_PLAY_TYPE_SELECT, issue.playType)
          this.$store.commit(RECOMMEND_ISSUE_SET, issue)
          recommendIssue.clear()
        } else {
          if ((!this.$store.state.betting[this.lottery].playType)) {
            this.$store.commit(CURRENT_PLAY_TYPE_SELECT, this.playTypeGroup[0].list[0])
          }
        }
      })
      // test
      if (Lottery.isK3(this.lottery)) {
        if ((!this.$store.state.betting[this.lottery].playType)) {
          this.$store.commit(CURRENT_PLAY_TYPE_SELECT, this.playTypeGroup[0].list[0])
        }
      }
    }
  },
  beforeDestroy () {
    clearTimeout(this.time)
    console.log('销毁')
  }
}
</script>

<style lang="scss">
  .sport-lottery-header {
    position: relative;
  }

  .sport-lottery-header .mask {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background: black;
    opacity: 0.5;
    z-index: 8;
  }

  .sport-lottery-header .head {
    margin-bottom: 0;
    position: relative;
    z-index: 9;
    color: #333;
  }

  .sport-lottery-header .select-type {
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 16px;
    color: $cFFfFFF;
    @if ($lotteryIg) {
      border: 1px solid $cFFfFFF;
    } @else {
      border: 1px solid $cffC63A;
    }
  }

  .sport-lottery-header .select-type .icon {
    background: url("../../../assets/betting/down.png") no-repeat;
    background-size: 100% 100%;
    width: 10px;
    height: 7px;
    display: inline-block;
    margin-left: 5px;
    vertical-align: middle;
    margin-top: -3px;
    transition: transform 0.5s;
  }

  .sport-lottery-header .select-type .icon.up {
    transform: rotate(180deg);
  }

  .sport-lottery-header .refresh-icon {
    background: url("../../../assets/betting/ic_refrersh.png") no-repeat center;
    background-size: 50% 50%;
    width: 35px;
    height: 35px;
    position: absolute;
    right: 60px;
    top: 0;
  }

  .sport-lottery-header .filter-icon {
    background: url("../../../assets/betting/filter.png") no-repeat center;
    background-size: 50% 50%;
    width: 35px;
    height: 35px;
    position: absolute;
    right: 30px;
    top: 0;
  }

  .sport-lottery-header .question-icon {
    background: url("../../../assets/betting/question.png") no-repeat center;
    background-size: 50% 50%;
    width: 40px;
    height: 40px;
    position: absolute;
    right: 0;
    top: 0;
  }

  .sport-lottery-header .drop-down-panel {
    position: absolute;
    width: 100%;
    z-index: 8;
  }

  .sport-lottery-header .text-container {
    padding: 0 2%;
    background: $c131313;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 5px;
    position: relative;
    z-index: 9;
    max-height: 380px;
  }

  .sport-lottery-header .text-container .group-name {
    font-size: 14px;
    padding-left: 10px;
  }

  .sport-lottery-header .text-container .group-name .dot {
    width: 5px;
    height: 5px;
    border-radius: 5px;
    background: #cccccc;
    margin-right: 5px;
    vertical-align: middle;
    display: inline-block;
    margin-top: -2px;
  }

  .sport-lottery-header .text-item {
    width: 29%;
    float: left;
    margin: 5px 2%;
    padding: 5px 0;
    border: 1px solid $c999999;
    border-radius: 8px;
    font-size: 14px;
    text-align: center;
    color: $c999999;
  }

  .sport-lottery-header .text-item.selected {
    border: 1px solid $cffC63A;
    background: url("../../../assets/betting/selected.png") right bottom no-repeat;
    background-size: auto 60%;
    color: $cffC63A;
  }
</style>
