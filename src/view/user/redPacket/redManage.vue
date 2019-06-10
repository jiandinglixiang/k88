<style lang="scss" scoped>

  .red-manage {
    padding-top: 89px;
    padding-bottom: 65px;
    background-color: #131313;

    .red-manage-bottom {
      position: fixed;
      max-width: 640px;
      width: 100%;
      bottom: 0;
      margin: 0 auto;
      background: #131313;
      border-top: 1px solid #313131;
      z-index: 1;

      .button-L {
        display: inline-block;
        font-size: 18px;
        border-radius: 4px;
        height: 40px;
        line-height: 40px;
        width: 43%;
        margin: 10px;
        color: #FFC63A;
        background-color: #131313;
        border: 1px solid #FFC63A;
      }

      .bottom-R {
        display: inline-block;
        font-size: 18px;
        border-radius: 4px;
        border: 0;
        height: 40px;
        line-height: 40px;
        width: 43%;
        margin: 10px;
        color: #131313;
        background-color: #FFC63A;
      }
    }

    .red-manage-title {
      position: fixed;
      width: 100%;
      max-width: 640px;
      top: 0;
      z-index: 1;
      margin: 0 auto;

      .question-icon {
        background: url("../../../assets/betting/question.png") no-repeat center;
        background-size: 50% 50%;
        width: 35px;
        height: 35px;
        position: absolute;
        right: 0;
        top: 0;
      }

      .nav-top-list {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        background-color: #1c1c1c;

        li {
          color: #999999;
          height: 40px;
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 2px solid #313131;
        }

        &.active-1 li:nth-child(1), &.active-2 li:nth-child(2), &.active-3 li:nth-child(3) {
          color: #FFC63A;
          border-bottom-color: #FFC63A;
        }
      }
    }
  }
</style>
<template>
  <div class="box-init red-manage">
    <div class="red-manage-title">
      <v-head style="margin: 0" title="红包"><span @click="goHelp" class="question-icon" slot="right"></span></v-head>
      <ul :class="`active-${select}`" class="nav-top-list">
        <li @click.stop="switchover(1)"><span>可使用( {{redQuantity.available_coupon_number ||0}} )</span></li>
        <li @click.stop="switchover(2)"><span>等待派发( {{ redQuantity.waiting_coupon_number||0 }} )</span></li>
        <li @click.stop="switchover(3)"><span>已使用/过期</span></li>
      </ul>
    </div>
    <ul
      class="red-pack-list"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10"
      infinite-scroll-immediate-check="isMax"
      v-infinite-scroll="loadMore"
    >
      <li :key="n.id" v-for="n in list[select-1]">
        <red-packet :propsData="n" :theme="theme"/>
      </li>
    </ul>
    <no-red-packet props-data="暂无可用红包" v-show="loading===true&&list[select-1].length===0"/>
    <div class="red-manage-bottom text-center">
      <router-link class="button-L" to="exchangeRed">兑换红包</router-link>
      <router-link class="bottom-R" to="redPurchase">购买红包</router-link>
    </div>
  </div>
</template>

<script>//
import redPacket from './component/redPacket.vue'
import noRedPacket from './component/noRedPacket.vue'
import Http from '../../../store/Http.js'
import { Button, Navbar, TabContainer, TabContainerItem, TabItem } from 'mint-ui'
import { copy } from '../../../common/util'

export default {
  name: 'redManage',
  data () {
    return {
      redQuantity: {},
      select: 1,
      list: [[], [], []],
      offset: 15,
      loading: true, // 是否加载
      isMax: false // 当加载数据未撑满容器就再加载一次数据
    }
  },
  created () {
    this.getRedQuantity()
    this.loadMore()
  },
  methods: {
    getRedQuantity () {
      Http.get('/Coupon/calcUserCouponNumber').then(data => {
        if (data) {
          this.redQuantity = { ...data }
        }
      })
    },
    goHelp () {
      this.$router.push({
        name: 'WebPage',
        query: {
          title: '红包管理帮助',
          url: 'http://tgapi.k888.bet/index.php?s=/Content/help/coupon.html'
        }
      })
    },
    switchover (type) {
      // 渲染过一次就不删除
      if (type === this.select) return // 已经在此
      const index = type - 1
      if (this.list[index].length) {
        this.loading = this.list[index].length % this.offset !== 0
        this.select = type
      } else {
        this.getList(type, 0).then(() => {
          this.select = type
        })
      }
    },
    loadMore () {
      if (this.loading === 'true') return // 已经发起请求
      const index = this.select - 1
      return this.getList(this.select, this.list[index].length ? this.list[index].length - 1 : 0)
    },
    getList (type, limit) {
      this.loading = 'true'
      return Http.get('/Coupon/getUserCouponList', {
        type,
        limit,
        offset: this.offset
      }).then(data => {
        const index = type - 1
        if (data && data.list && data.list.length) {
          this.loading = data.list.length < this.offset
          this.$set(this.list, index, (copy(this.list[index])).concat(data.list))
        } else {
          this.loading = true
        }
        return data
      })
    }
  },
  computed: {
    theme () {
      if (this.select === 1) return 'yes'
      if (this.select === 2) return 'wait'
      return 'no'
    }
  },
  components: {
    redPacket,
    noRedPacket,
    [Navbar.name]: Navbar,
    [Button.name]: Button,
    [TabItem.name]: TabItem,
    [TabContainer.name]: TabContainer,
    [TabContainerItem.name]: TabContainerItem
  }
}
</script>
