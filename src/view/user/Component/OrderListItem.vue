<template>
  <li @click="goOrderDetail(item)" class="OrderListItem item-avatar item-right-icon">
    <img :src="item.lottery_image" alt="">
    <div class="main">
      <span>{{item.lottery_name}}</span>
      <template v-if="ShowType==='order'">
        <template v-if="item.is_recommend">
          <span class="main-sing" style="background-color: #e73f40">已推荐</span>
          <span class="main-sing" style="background-color: #ffa836">抽成{{ item.commission|SandHCollagen }}%</span>
        </template>
        <span class="text-primary margin-left-15" v-if="item.plus_award_amount > 0">加奖 {{item.plus_award_amount | currency}}</span>
        <span class="pull-right active" v-if="item.winnings_bonus > 0">中奖 {{item.winnings_bonus | currency}}</span>
        <span class="pull-right text-light" v-else>{{item.statusText}}</span>
      </template>
      <template v-else-if="ShowType==='buyTogether'">
        <!--合买-->
        <span class="pull-right active" v-if="item.winnings_bonus > 0">中奖 {{item.winnings_bonus | currency}}</span>
        <span class="pull-right text-light" v-else-if="item.status_desc">{{item.status_desc}}</span>
      </template>
      <template v-else-if="ShowType==='chaseNumber'">
        <!--追号-->
        <span class="pull-right text-light" v-if="item.total_amount"> {{item.total_amount | currency}}</span>
      </template>
    </div>
    <div class="desc">
      <span>{{item.buying_time | dateFormat('yyyy-MM-dd hh:mm:ss')}}</span>
      <span class="pull-right"
            v-if="ShowType==='order'">{{item.type===0?'自投':'追号'}}：{{item.total_amount | currency}}</span>
      <span class="pull-right" v-else-if="ShowType==='buyTogether'">
        <!--合买-->
     方案金额：{{item.total_amount | currency}}
      </span>
      <template v-else-if="ShowType==='chaseNumber'">
        <!--追号-->
        <span class="pull-right"
              v-if="item.status===1">当前{{ item.current_follow_times }}/{{ item.follow_times }}期</span>
        <span class="pull-right" v-else-if="item.status===2">{{ item.status_desc }}</span>
        <span class="pull-right" v-else>{{ item.status_desc }}</span>
      </template>
    </div>
    <span class="arrow-right"></span>
  </li>
</template>

<script>
import Lottery from '../../../model/common/Lottery'
import Toast from '../../../common/toast'

export default {
  name: 'OrderListItem',
  props: {
    item: { type: Object },
    ShowType: { type: String }
  },
  methods: {
    goOrderDetail (item) {
      const id = item.lottery_id
      switch (this.ShowType) {
        case 'order':
          if (Lottery.isFootBall(id) || Lottery.isBasketBall(id) || Lottery.isSYXW(id) ||
              Lottery.isDLT(id) || Lottery.isSSQ(id) || Lottery.isSFCOrRXJ(id) || Lottery.isK3(id) ||
              Lottery.isFC3D(id)) {
            this.$router.push({
              name: 'OrderDetail',
              params: { id: item.id }
            })
          } else {
            Toast('该功能暂未开发!')
          }
          break
        case 'buyTogether':
          if (Lottery.isBuyTogether(id)) {
            this.$router.push({
              name: 'BuyTogetherOrderDetail',
              params: { id: item.id }
            })
          } else {
            Toast('该功能暂未开发!')
          }
          break
        case 'chaseNumber':
          this.$router.push({
            name: 'ChaseNumberDetail',
            params: { id: item.id }
          })
          break
        default:
      }
    }
  },
  filters: {
    SandHCollagen (val) {
      if (!val) return ''
      return (val * 100).toFixed(1)
    }
  }
}
</script>

<style scoped>

  .OrderListItem {
    padding: 10px;
    position: relative;
    background: white;
    border-bottom: 1px solid #dddddd;
    min-height: 60px;
  }

  .OrderListItem.item-avatar {
    padding-left: 60px;
  }

  .OrderListItem.item-avatar img {
    position: absolute;
    left: 10px;
    top: 10px;
    width: 40px;
    height: 40px;
  }

  .OrderListItem.item-right-icon {
    padding-right: 30px;
  }

  .OrderListItem.item-right-icon .arrow-right {
    position: absolute;
    right: 10px;
    top: 24px;
  }

  .OrderListItem .main {
    color: #333333;
    font-size: 13px;
    line-height: 25px;
  }

  .OrderListItem .main .active {
    color: #e73f40;
  }

  .OrderListItem .main .main-sing {
    display: inline-block;
    vertical-align: top;
    color: white;
    border-radius: 10px;
    line-height: 1.4;
    padding: 0 3px;
    font-size: 12px;
  }

  .OrderListItem .desc {
    color: #999999;
    font-size: 10px;
  }
</style>
