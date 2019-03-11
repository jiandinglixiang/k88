<template>
  <div class="orders">
    <v-head :hide-back="true" title="我的投注"></v-head>
    <nav @click.stop="changeStatus" class="row text-center bg-black text-sm" data-top="y">
      <div :class="{active: listIndex['0'] === '0'}" class="col col-25" data-value="0,0"><span>全部</span></div>
      <div :class="{active: listIndex['0'] === '1'}" class="col col-25" data-value="1,-1"><span>待开奖</span></div>
      <div :class="{active: listIndex['0'] === '2'}" class="col col-25" data-value="2,1"><span>中奖</span></div>
      <div :class="{active: listIndex['0'] === '3'}" class="col col-25" data-value="3,-2"><span>未中奖</span></div>
    </nav>
    <div class="list"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="load"
         v-infinite-scroll="loadMore">
      <div :key="index"
           @click="goOrderDetail(item)"
           class="item item-avatar item-right-icon"
           v-for="(item,index) in list[listIndex['0']]">
        <img :src="item.lottery_image" alt="ball">
        <div class="main">
          <span>{{item.lottery_name}}</span>
          <span class="text-primary margin-left-15" v-if="item.plus_award_amount > 0">加奖 {{item.plus_award_amount | currency}}</span>
          <span class="pull-right active" v-if="item.winnings_bonus > 0">中奖 {{item.winnings_bonus | currency}}</span>
          <span class="pull-right text-light" v-else>{{item.statusText}}</span>
        </div>
        <div class="desc">
          <span>{{item.buying_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
          <span class="pull-right">{{item.type===0?'自投':'追号'}}：{{item.total_amount | currency}}</span>
        </div>
        <span class="arrow-right"></span>
      </div>
      <infinite-scroll-loading :show="loading==='true'"/>
    </div>
    <no-order v-show="list[listIndex['0']].length===0"/>
    <bottom-nav active="Orders"/>
  </div>
</template>

<script>
  import VHead from '../../components/VHead'
  import BottomNav from '../../components/BottomNav.vue'
  import NoOrder from '../../components/NoOrders'
  import InfiniteScrollLoading from '../../components/InfiniteScrollLoading.vue'
  import Lottery from '../../model/common/Lottery'
  import Toast from '../../common/toast'
  import Http from '../../store/Http'
  import { copy } from '../../common/util'
  import { OrderStatus } from '../../store/constants'

  export default {
    name: 'orders',
    data () {
      const index = localStorage.getItem('ordersIndex') || `["0","0"]`
      return {
        list: [[], [], [], []],
        listIndex: JSON.parse(index),
        loading: true,
        limit: 15,
        load: true
      }
    },
    methods: {
      goOrderDetail (order) {
        const id = order.lottery_id
        if (Lottery.isFootBall(id) || Lottery.isBasketBall(id) || Lottery.isSYXW(id) ||
          Lottery.isDLT(id) || Lottery.isSSQ(id) || Lottery.isSFCOrRXJ(id) || Lottery.isK3(id) ||
          Lottery.isFC3D(id)) {
          this.$router.push({
            name: 'OrderDetail',
            params: { id: order.id }
          })
        } else {
          Toast('该功能暂未开发!')
        }
      },
      getList (index = '0', orderType = '0', offset = 0, lotteryId = 0) {
        this.loading = 'true'
        return Http.get('/Order', {
          lottery_id: lotteryId,
          order_type: orderType,
          offset,
          limit: this.limit
        }).then(list => {
          if (list && list.length) {
            this.$set(this.list, index, (copy(this.list[index])).concat(list.map(value => ({
              ...value,
              statusText: OrderStatus[value.status]
            }))))
            this.loading = list.length < this.limit // 是否能加载
          } else {
            this.loading = true
          }
          return list
        })
      },
      changeStatus (event) {
        // 切换
        for (let i in event.path) {
          if (event.path[i].dataset) {
            if (event.path[i].dataset.top) break
            if (event.path[i].dataset.value) {
              const index = event.path[i].dataset.value.split(',')
              const unEqual = index[0] !== this.listIndex[0] // 不相等
              const isData = this.list[index[0]].length === 0 // 没有数据
              if (unEqual && isData) {
                this.getList(index[0], index[1], 0).then(() => {
                  // 加载完后切换
                  this.listIndex = index
                  localStorage.setItem('ordersIndex', JSON.stringify(index))
                })
              } else {
                this.loading = this.list[index[0]].length % 10 === 0  // 可被整除
                this.listIndex = index
              }
              break
            }
          }
        }
      },
      loadMore () {
        // 加载更多
        if (!this.loading) {
          this.getList(this.listIndex[0], this.listIndex[1], this.list[this.listIndex[0]].length)
        }
      }
    },
    components: { VHead, NoOrder, InfiniteScrollLoading, BottomNav },
    created () {
      this.getList()
    }
  }
</script>

<style lang="scss">
  @import "../../style/main.css";

  .bg-black {
    background: $c131313;
  }

  .orders nav .col {
    height: 37px;
    line-height: 35px;
    border-bottom: 2px solid #dddddd;
    color: #999;
  }

  .orders .badge {
    position: relative;

    &:after {
      position: absolute;
      content: '';
      top: 1px;
      right: -6px;
      width: 4px;
      height: 4px;
      border-radius: 100%;
      background: $cffC63A;
    }
  }

  .orders .margin-left-15 {
    margin-left: 15px;
  }

  .orders nav .col.active {
    color: $cffC63A;
    border-color: $cffC63A;
  }

  .orders .list {
    padding-bottom: 50px;
  }

  .orders .list .item {
    padding: 10px;
    position: relative;
    background: $c1c1c1c;
    border-bottom: 1px solid #313131;
    min-height: 60px;
  }

  .orders .list .item.item-avatar {
    padding-left: 60px;
  }

  .orders .list .item.item-avatar img {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
  }

  .orders .list .item.item-right-icon {
    padding-right: 30px;
  }

  .orders .list .item.item-right-icon .arrow-right {
    position: absolute;
    right: 10px;
    top: 24px;
  }

  .orders .list .item .main {
    color: $cFFfFFF;
    font-size: 13px;
    height: 25px;
    line-height: 25px;
  }

  .orders .list .item .main .active {
    color: $cffC63A;
  }

  .orders .list .item .desc {
    color: #999999;
    font-size: 10px;
  }

  .orders .no-order {
    margin-top: 100px;
  }
</style>
