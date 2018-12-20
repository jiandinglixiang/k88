<style scoped>
  .score {
    padding-top: 94px;
    max-width: 640px;
  }

  .switchover {
    box-sizing: border-box;
    width: 33.3%;
    padding: 8px 0;
    line-height: 1;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    margin: 10px 0;
    border: 1px solid #e73f40;
    color: #e73f40;
  }

  .activate {
    background-color: #e73f40;
    color: white;
  }

  .switchover-left {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .switchover-center {
    border-right: 0;
    border-left: 0;
  }

  .switchover-right {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  .refresh {
    position: absolute;
    background: url('../../assets/home/refresh.png') no-repeat;
    background-size: 100%;
    width: 30px;
    height: 25px;
    margin: 9px 0;
    right: -30%;
    top: 0;
  }

  .two-title > div, .four-title > div {
    flex: 1;
    height: 37px;
    line-height: 35px;
    color: #666;
    border-bottom: 2px solid #dddddd;
  }

  .back-icons {
    display: inline-block;
    padding-right: 10px;
    background-image: url('../../assets/betting/expandable.png');
    background-repeat: no-repeat;
    background-size: 10px 10px;
    background-position: 100% 58%;
  }

  .four-title .activate-child, .two-title .activate-child {
    border-color: #e73f40;
  }

  .v-body {
    background-color: white;
    font-size: 13px;
    color: #999999;
    position: relative;
    padding-top: 15px;
    text-align: center;
  }

  .v-body div {
    position: relative;
    box-sizing: border-box;
    display: inline-block;
    width: 27%;
    margin: 0 3% 3% 3%;
    border: 1px solid #cccccc;
    float: left;
    border-radius: 5px;
    height: 27px;
    line-height: 27px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .v-body .activatediv {
    border-color: #e73f40;
    color: #e73f40;
  }

  .v-body .activate-icon {
    position: absolute;
    display: inline-block;
    width: 12.5px;
    height: 12.5px;
    background-image: url('../../assets/betting/selected.png');
    background-repeat: no-repeat;
    background-size: 100%;
    border-bottom-right-radius: 5px;
    right: 0;
    bottom: 0;
  }

  .score-top {
    position: fixed;
    top: 0;
    left: auto;
    width: 100%;
    max-width: 640px;
    background: white;
    z-index: 2;
  }

  .paddingBottom1 {
    padding-bottom: 1rem;
  }

</style>
<template>
  <div class='score padding-bottom-50'>
    <div class='bg-white score-top'>
      <div style='width: 60%;margin: 0 auto;position: relative;'>
        <div class='row'>
          <div @click='switchShow([1,1])' class='switchover switchover-left' :class='{activate:lotteryType===1}'>竞足
          </div>
          <div @click='switchShow([2,1])' class='switchover switchover-center' :class='{activate:lotteryType===2}'>胜负彩
          </div>
          <div @click='switchShow([3,1])' class='switchover switchover-right' :class='{activate:lotteryType===3}'>竞篮
          </div>
        </div>
        <div class='refresh' @click='switchShow()'></div>
      </div>
      <div v-if='lotteryType===2' class='row text-center two-title'>
        <div :class="{'activate-child':lotteryState===1}" @click="switchShow([lotteryType,1])">
          <div class='back-icons'>第{{(a21.groups.length&&a21.groups[SelectIndex])?a21.groups[SelectIndex].id:''}}期</div>
        </div>
        <div :class="{'activate-child':lotteryState===2}" @click="switchShow([lotteryType,2])">我的投注</div>
      </div>
      <div v-else class='row text-center four-title'>
        <div :class="{'activate-child':lotteryState===1}" @click="switchShow([lotteryType,1])">进行中</div>
        <div :class="{'activate-child':lotteryState===2}" @click="switchShow([lotteryType,2])">已结束</div>
        <div :class="{'activate-child':lotteryState===3}" @click="switchShow([lotteryType,3])">未开始</div>
        <div :class="{'activate-child':lotteryState===4}" @click="switchShow([lotteryType,4])">我的投注</div>
      </div>
    </div>
    <div v-if='a21.groups.length'>
      <mt-popup
        v-model='popupVisible'
        style='width: 100%;max-width: 640px'
        position='top'>
        <div class='v-body'>
          <div v-for='(item,index) in a21.groups'
               :class='{activatediv:SelectIndex===index}'
               @click.stop='actCallback(index)'
               :key='item.id'>
            <span>第{{ item.id }}期</span>
            <span v-show='SelectIndex===index' class='activate-icon'></span>
          </div>
        </div>
      </mt-popup>
    </div>
    <div
      v-infinite-scroll='loadMore'
      infinite-scroll-disabled='Loading'
      infinite-scroll-distance='1'
      infinite-scroll-immediate-check='false'
      :class='{paddingBottom1:isMine([lotteryType,lotteryState])}'
    >
      <container
        :switchBody='[lotteryType,lotteryState]'
        :showToB='showToB'
        :isLogin='isLogin'
        :SelectIndex='SelectIndex'
      />
    </div>
    <bottom-nav active='Score'/>
  </div>
</template>
<script>
  import { mapState, mapMutations, mapActions } from 'vuex';
  import {
    SET_SWITCHOVER,
    GET_GAME_LIST,
    GET_MINE_BET_DATA,
    SET_LOTTERY_1,
    TO_THE_TOP_INIT
  } from '../../store/score/types';
  import BottomNav from '../../components/BottomNav.vue';
  import container from './container.vue'
  import loading from '../../common/loading';
  import Compute from './components/compute.js'

  export default {
    name: 'Score',
    data () {
      return {
        popupVisible: false,
        showToB: false,
        SelectIndex: 1,
        Loading: false
      }
    },
    computed: {
      ...mapState({
        isLogin: state => !state.user.token,
        lotteryType: state => state.score.lotteryType,
        lotteryState: state => state.score.lotteryState,
        a21: state => state.score[`21`]
      })
    },
    methods: {
      ...mapMutations({
        switchover: SET_SWITCHOVER, // 设置切换
        setLottery: SET_LOTTERY_1, // 设置数据
        setToTheTop: TO_THE_TOP_INIT // 设置数据
      }),
      ...mapActions({
        getGameList: GET_GAME_LIST,
        getMineGameList: GET_MINE_BET_DATA
      }),
      switchShow (target = []) {
        this.showToB = false;
        this.Loading = false;
        window.scrollTo(0, 0);
        if (target.length) {
          // 切换
          if (this.isMine(target)) {
            this.getMineData(target)
          } else {
            if (target[0] === 2 && target[0] === this.lotteryType && target[1] === 1 && target[1] === this.lotteryState) {
              this.popupVisible = !this.popupVisible
            } else {
              this.getGameData(target)
            }
          }
        } else {
          // 点击刷新
          target.push(this.lotteryType, this.lotteryState)
          if (this.isMine(target)) {
            this.getMineData(target)
          } else {
            this.getGameData(target)
          }
        }
      },
      getGameData (target) {
        loading.show();
        let newData = null;
        this.getGameList(target).then(({data = {}, toTheTop = null}) => {
          let SelectIndex = 1;
          if (data.groups && data.groups.length) {
            data = this.disposeF(data) // 数据处理同步
            if (target[0] === 2 && target[1] === 1) {
              SelectIndex = data.groups.findIndex(item => {
                return item.is_current === 1
              })
              if (SelectIndex !== -1) {
                this.SelectIndex = SelectIndex
              }
            }
            if (toTheTop) {
              newData = this.findToTheTop(toTheTop, data)  // {newTop, presentData}
            }
            if (newData) {
              // 如果置顶
              this.setLottery({target, params: newData.presentData})  // {target, params}
              this.setToTheTop({target, params: newData.newTop})
            } else {
              this.setLottery({target, params: data})  // {target, params}
            }
          } else {
            if (toTheTop) {
              this.setToTheTop({target, params: []})
            }
            this.setLottery({target, params: data})  // {target, params}
            this.showToB = true;
          }
          this.switchover(target)
          loading.hide()
        }).catch(err => {
          console.log(err)
          loading.hide()
        })
      },
      getMineData (target) {
        if (this.isLogin) {
          this.switchover(target);
          return;
        }
        loading.show();
        const push = {id: `${target[0]}${target[1]}`, offset: target[2]};
        if (target[2]) {
          this.Loading = true;
        }
        this.getMineGameList(push).then(data => {
          new Compute(data).then(resolve => {
            // --避免上拉重复加载
            let nub = 0;
            if (target[2]) {
              resolve.groups.forEach(inx => {
                nub += inx.list.length
              });
              this.Loading = nub < 5;
            }
            // --避免上拉重复加载
            this.setLottery({target, params: resolve, add: target[2]});// 设置目标数据
            this.switchover(target);// 切换目标
            if (!resolve.groups || !resolve.groups.length && !target[2]) {
              // 是否显示没有比赛
              this.showToB = true;
            }
            loading.hide()
          })
        })
      },
      findToTheTop (presentTop = [], presentData) {
        let newTop = []; // 主数据删除的数据
        if (presentTop.length) {
          // 找到置顶的数据
          let toTop = [] // 数据数组坐标
          presentTop.forEach((item, index) => {
            let inx2 = -1
            let inx1 = -1
            inx1 = presentData.groups.findIndex(item2 => {
              inx2 = item2.schedules.findIndex(item3 => {
                return item3.id === item.id
              })
              return inx2 !== -1
            })
            if (inx1 !== -1 && inx2 !== -1) {
              toTop.push([inx1, inx2, item])
            }
          })
          // 从主数据中删除置顶的数据
          let sing = {}
          toTop.forEach((item) => {
            let topSing = presentData.groups[item[0]].schedules.splice(item[1] - (sing[item[0]] || 0), 1)
            topSing[0].toTop = {...item[2].toTop}
            newTop.push(topSing[0])
            if (sing[item[0]]) {
              sing[item[0]]++
            } else {
              sing[item[0]] = 1
            }
          })
        }
        return {newTop, presentData}
      },
      actCallback (inx) {
        this.popupVisible = !this.popupVisible
        this.SelectIndex = inx
      },
      disposeF (props) {
        const computeS = (val1, val2) => {
          // console.log(val1, val2)
          if (val1 === val2) {
            return 1
          }
          return val1 > val2 ? 3 : 0
        }
        props.groups = props.groups.map(groups => {
          groups.schedules = groups.schedules.map(schedules => {
            if (schedules.result_odds && schedules.result_odds[602] && schedules.match_status === 3 && schedules.result_odds[601]) {
              // console.log(schedules)
              let victory = schedules.current_score.split(':')
              schedules.result_odds.game601 = computeS(parseInt(victory[0]), parseInt(victory[1]))
              schedules.result_odds.game602 = computeS(parseInt(victory[0]) + parseInt(schedules.result_odds[602].letPoint), parseInt(victory[1]))
            }
            return schedules
          });
          return groups
        });
        return props
      },
      isMine (target = []) {
        if (!target.length) {
          return
        }
        if (target[0] === 1 || target[0] === 3) {
          if (target[1] === 4) {
            return true
          }
        } else if (target[1] === 2) {
          return true
        }
        return null
      },
      loadMore () {
        let item;
        let i = 0;
        if (this.isMine([this.lotteryType, this.lotteryState])) {
          item = this.$store.state.score[`${this.lotteryType}${this.lotteryState}`];
          item.groups.forEach(inx => {
            i += inx.list.length
          });
          if (i >= 5) {
            this.getMineData([this.lotteryType, this.lotteryState, i])
          }
        }
      }
    },
    created () {
      this.switchShow([this.lotteryType, this.lotteryState])
    },
    components: {
      container,
      BottomNav
    }
  }
</script>
