<template>
  <div class="home">
    <mt-swipe :auto="4000" style="height: 154px" v-show="banners.length > 0">
      <mt-swipe-item :key="item.id" v-for="item in banners">
        <router-link :src="item.image"
                     :to="{name:'WebPage',query:{title:item.title,url:item.target}}"
                     class="banner"
                     tag="img"/>
      </mt-swipe-item>
    </mt-swipe>
    <div class="container">
      <div class="recommend-box" v-if="issue">
        <recommend-lottery :issue="issue" @refresh="refresh"></recommend-lottery>
      </div>
      <div class="lottery-box" v-show="lotteries.length > 0">
        <lottery-item :key="lottery.lottery_id" :lottery="lottery" v-for="lottery in lotteries"></lottery-item>
      </div>
      <!--      <div class="information-list">-->
      <!--        <information-item :information="item" :key="key" v-for="(item, key) in information"></information-item>-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>//
import LotteryItem from '../../components/HomeLotteryItem.vue'
// import InformationItem from '../../components/HomeInformationItem.vue'
import RecommendLottery from '../../components/HomeRecommendLottery.vue'
import { Swipe, SwipeItem } from 'mint-ui'
import { mapActions, mapState } from 'vuex'
import { LotteryIdArray } from '../../store/constants'
import {
  GET_BANNER,
  GET_INFORMATION_LIST,
  GET_LOTTERY_LIST,
  GET_RECOMMEND_ISSUE,
  RECOMMEND_ISSUE_REFRESH
} from '../../store/home/types'

export default {
  name: 'home',
  data () {
    return {
      moreLottery: {
        component: 'More',
        tipText: '',
        lottery_image: require('../../assets/ic_more.png'),
        lottery_name: '敬请期待'
      }
    }
  },
  computed: {
    ...mapState({
      banners: state => state.home.banners,
      information: state => state.home.information,
      issue: state => state.home.issue,
      lotteries: state => {
        const array = []
        for (let item of state.home.lotteries) {
          if (LotteryIdArray.includes(item.lottery_id * 1)) array.push(item)
          if (array.length >= 8) break
        }
        if (array.length) {
          array.push({
            component: 'More',
            tipText: '',
            lottery_image: require('../../assets/ic_more.png'),
            lottery_name: '敬请期待'
          })
        }
        return array
      }
    })
  },
  methods: {
    ...mapActions({
      getBanners: GET_BANNER,
      getLotteryList: GET_LOTTERY_LIST,
      getInformation: GET_INFORMATION_LIST,
      getRecommendIssue: GET_RECOMMEND_ISSUE,
      recommendIssueRefresh: RECOMMEND_ISSUE_REFRESH
    }),
    refresh () {
      this.recommendIssueRefresh()
    }
    // goBannerUrl (banner) {
    //   location.href = banner.target
    // }
  },
  created () {
    this.getBanners()
    this.getLotteryList()
    this.getRecommendIssue()
    // this.getInformation()
  },
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    LotteryItem,
    // InformationItem
    RecommendLottery
  }
}
</script>

<style lang="scss" scoped>
  .home {
    overflow: hidden;
    margin-bottom: 50px;

    .mint-swipe .banner {
      height: 100%;
      width: 100%;
    }

    .mint-swipe-indicators {
      bottom: 5px;
    }

    .mint-swipe-indicator {
      /*   background: $c1c1c1c;*/
      opacity: 0.3;
    }

    .mint-swipe-indicator.is-active {
      opacity: 1;
    }

    .container {
      margin: 10px;

      .lottery-box {
        background: $c1c1c1c;
        border-radius: 5px;
        margin: 10px 0;
        overflow: hidden;
      }

      .lottery-box hr {
        border: none;
      }
    }
  }
</style>
