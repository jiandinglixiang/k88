<template>
  <div id="r-red-employ">
    <div class="r-red-title">
      <div>使用红包</div>
      <p v-show="!list.length">暂无可使用红包</p>
    </div>
    <div class="r-red-container">
      <!--      <div class="r-red-type">-->
      <!--        <div :class="redTypeIndex===0&&'active-select'" @click="cutRedActive(0)">现金红包</div>-->
      <!--        <div :class="redTypeIndex===1&&'active-select'" @click="cutRedActive(1)">满减红包</div>-->
      <!--      </div>-->
      <ul class="r-re-list" @click.stop @touchmove.stop v-show="list.length" >
        <!--        <li :key="32158" class="active-select">-->
        <!--          <div><span>9928元</span></div>-->
        <!--          <p><span style="color:#999;">剩余</span> <span style="color: #FF3333">98988元</span></p>-->
        <!--        </li>-->
        <li v-for="n in list" :key="n.id" :class="redObj&&redObj.id===n.id&&'active-select'" @click="setRedId(n)">
          <div><span>{{n.value*1}}元</span></div>
          <p><span style="color:#999;">剩余</span> <span style="color: #FF3333">{{n.balance*1}}</span><span
            style="color: #FF3333">元</span></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>// 红包使用
import HTTP from '../http.js'

export default {
  name: 'RedEmploy',
  props: {
    lotteryId: Number,
    updateData: Boolean,
    redObj: Object
  },
  data () {
    return {
      // listName: '',
      list: []
      // redTypeIndex: 0
    }
  },
  methods: {
    setRedId (n) {
      if (this.redObj && this.redObj.id === n.id) return this.$emit('update:red-obj', null)
      this.$emit('update:red-obj', n)
    },
    // cutRedActive (x) {
    //   this.redTypeIndex = x
    // },
    getUserCouponList () {
      return HTTP.getUserCouponList(this.lotteryId).then(value => {
        if (value.coupon_list && value.coupon_list[0] && value.coupon_list[0].list && value.coupon_list[0].list.length) {
          // this.listName = value.coupon_list[0].group_name
          this.list = value.coupon_list[0].list
          const red = value.coupon_list[0].list.find(v => v.is_default * 1)
          this.setRedId(red) // 添加默认
        }
        return []
      })
    }
  },
  // computed: {
  //   cashFilled () {
  //     return []
  //   }
  // },
  created () {
    this.getUserCouponList()
  },
  watch: {
    updateData (val) {
      if (val) this.getUserCouponList()
    }
  }
}
</script>

<style scoped lang="scss">
  #r-red-employ {
    .r-red-title {
      margin: 0 10px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      div {
        color: #131313;
        font-weight: bold;
        font-size: 13px;
      }

      p {
        color: #999;
      }
    }

    .r-red-container {

      .r-red-type {
        margin-top: 5px;
        background-color: #F4F4F4;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        color: #999;

        div {
          flex: 1 1 50%;
          height: 34px;
          line-height: 34px;
          text-align: center;
        }

        div.active-select {
          font-weight: bold;
          color: #131313;
          border-bottom: 1px solid #ffc63a;
        }

        &:after {
          content: '';
          width: 1px;
          height: 21px;
          background-color: #ddd;
          position: absolute;
          left: 50%;
        }
      }

      .r-re-list {
        height: 150px;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        display: flex;
        flex-flow: row wrap;

        > li {
          overflow: hidden;
          flex: 0 1 25%;
          height: 73px;

          > div {
            background: url('../assets/rolling_redbag_bg.png') no-repeat center 0;
            background-size: auto 56px;
            padding-top: 30px;
            margin: 0 auto;
            height: 56px;
            width: 50px;
            text-align: center;
            color: #FADB62;
            font-weight: bold;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            /*&.big{*/
            /*  background-image: url("../assets/rolling_redbag_bg.png");*/
            /*}*/
            /*&.small{*/
            /*  background-image: url("../assets/rolling_redbag_sel.png");*/
            /*}*/
          }

          &.active-select > div {
            background-image: url("../assets/rolling_redbag_sel.png");
          }

          > p {
            height: 17px;
            line-height: 1;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #ffc63a;
          }
        }
      }
    }
  }
</style>
