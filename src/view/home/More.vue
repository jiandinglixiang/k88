<template>
  <div class="home-more">
    <v-head title="更多彩种"></v-head>
    <div class="home-more-container">
      <p class="tip text-sm text-muted">提示：更多彩种请下载365彩票</p>
      <div class="box">
        <lottery-item
          :key="key"
          :lottery="lottery"
          @download="changeDownloadStatus"
          v-for="(lottery, key) in lotteries"></lottery-item>
      </div>
    </div>
    <v-dialog @close="changeDownloadStatus" v-show="downloadPanel">
      <p>
        <img alt="download" src="../../assets/home/download_icon.png" width="50">
      </p>
      <p class="text-md margin-top-5">请下载安装365彩票官方APP</p>
      <div class="padding">
        <a class="btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=co.sihe.tigerlottery" target="_self">立即下载</a>
      </div>
    </v-dialog>
  </div>
</template>

<script>//
import VHead from '../../components/VHead.vue'
import LotteryItem from '../../components/HomeLotteryItem.vue'
import { GET_LOTTERY_LIST } from '../../store/home/types'
import VDialog from '../../components/VDialog.vue'

export default {
  name: 'homeMore',
  data () {
    return {
      downloadPanel: false
    }
  },
  computed: {
    lotteries () {
      return this.$store.state.home.lotteries
    }
  },
  methods: {
    changeDownloadStatus () {
      this.downloadPanel = !this.downloadPanel
    }
  },
  created () {
    this.$store.dispatch(GET_LOTTERY_LIST)
  },
  components: { VHead, LotteryItem, VDialog }
}
</script>

<style lang="scss">
  .home-more .home-more-container {
    padding: 5px 10px;
  }

  .home-more .home-more-container .box {
    /*border: 1px solid #ddd;*/
    border-radius: 5px;
    margin-top: 5px;
    padding: 5px 10px;
    background: $c1c1c1c;
    overflow: hidden;
  }
</style>
