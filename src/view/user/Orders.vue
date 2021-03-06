<template>
  <div class="orders">
    <div class="fixation-top">
      <div>
        <v-head :hide-back="true" title="我的投注"></v-head>
        <nav class="row text-center bg-black text-sm">
          <div :class="{active: listIndex[0] === 0}" class="col col-25" @click="changeStatus([0,0])"><span>全部</span>
          </div>
          <div :class="{active: listIndex[0] === 1}" class="col col-25" @click="changeStatus([1,-1])"><span>待开奖</span>
          </div>
          <div :class="{active: listIndex[0] === 2}" class="col col-25" @click="changeStatus([2,1])"><span>中奖</span>
          </div>
          <div :class="{active: listIndex[0] === 3}" class="col col-25" @click="changeStatus([3,-2])"><span>未中奖</span>
          </div>
        </nav>
      </div>
    </div>
    <div class="list"
         infinite-scroll-disabled="loading"
         infinite-scroll-distance="10"
         infinite-scroll-immediate-check="load"
         v-infinite-scroll="loadMore">
      <div :key="index"
           @click="goOrderDetail(item)"
           class="item item-avatar item-right-icon"
           v-for="(item,index) in list[listIndex[0]]">
        <img :src="item.lottery_image" alt="ball">
        <div class="main">
          <span>{{item.lottery_name}}</span>
          <span class="text-primary margin-left-15" v-if="item.plus_award_amount > 0">加奖 {{item.plus_award_amount | currency}}</span>
          <span class="pull-right active" v-if="item.winnings_bonus > 0">中奖 {{item.winnings_bonus | currency}}</span>
          <span class="pull-right text-light" v-else>{{item.statusText}}</span>
        </div>
        <div class="desc">
          <span>{{item.buying_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
          <span class="pull-right">{{item.type*1===0?'自投':'追号'}}：{{item.total_amount | currency}}</span>
        </div>
        <span class="arrow-right"></span>
      </div>
      <infinite-scroll-loading :show="loading==='true'"/>
    </div>
    <no-order v-show="list[listIndex[0]].length===0"/>
  </div>
</template>

<script>//
import NoOrder from '../../components/NoOrders'
import InfiniteScrollLoading from '../../components/InfiniteScrollLoading.vue'
import Lottery from '../../model/common/Lottery'
import Toast from '../../common/toast'
import Http from '../../store/Http'
import { copy } from '../../common/util'
import { OrderStatus } from '../../store/constants'
import loading from '../../common/loading.js'

export default {
  name: 'orders',
  data () {
    let listIndex
    try {
      listIndex = JSON.parse(localStorage.getItem('ordersIndex') || `[0,0]`)
    } catch (e) {
      listIndex = [0, 0]
    }
    return {
      list: [[], [], [], []],
      listIndex,
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
        Lottery.isFC3D(id) || Lottery.isAHFootBall(id)) {
        this.$router.push({
          name: 'OrderDetail',
          params: { id: order.id }
        })
      } else if (Lottery.isGrounderFootBall(id)) {
        this.$router.push({
          name: 'GrounderOrderDetail',
          params: { id: order.id }
        })
      } else {
        Toast('该功能暂未开发!')
      }
    },
    getList (index = this.listIndex[0], orderType = this.listIndex[1], offset = 0, lotteryId = 0) {
      this.loading = 'true'
      loading.show()
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
      }).finally(function () {
        loading.hide()
      })
    },
    changeStatus (index) {
      // 切换
      window.scrollTo(0, 0)
      const unEqual = index[0] !== this.listIndex[0] // 不相等
      const isData = this.list[index[0]].length === 0 // 没有数据
      if (unEqual && isData) {
        this.getList(index[0], index[1], 0).then(() => {
          // 加载完后切换
          this.listIndex = index
          localStorage.setItem('ordersIndex', JSON.stringify(index))
        })
      } else {
        this.loading = this.list[index[0]].length % 10 === 0
        // 可被整除
        this.listIndex = index
        localStorage.setItem('ordersIndex', JSON.stringify(index))
      }
    },
    loadMore () {
      // 加载更多
      if (!this.loading) {
        this.getList(this.listIndex[0], this.listIndex[1], this.list[this.listIndex[0]].length)
      }
    }
  },
  components: { NoOrder, InfiniteScrollLoading },
  created () {
    this.getList(this.listIndex[0], this.listIndex[1])
  }
}
</script>

<style lang="scss">
  @import "../../style/main.css";

  .fixation-top {
    height: 78px;

    > div {
      max-width: 640px;
      width: 100%;
      position: fixed;
      top: 0;
      z-index: 2;
      background-color: rgb(19, 19, 19);
    }
  }

  .bg-black {
    @if ($lotteryIg) {
      background: $cFFfFFF;
    } @else {
      background: $c131313;
    }
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
    min-height: 60px;
    @if ($lotteryIg) {
      border-bottom: 1px solid $cEbebeb;
    } @else {
      border-bottom: 1px solid #313131;
    }
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
    font-size: 13px;
    height: 25px;
    line-height: 25px;
    @if ($lotteryIg) {
      color: $cgray;
    } @else {
      color: $cFFfFFF;
    }
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
