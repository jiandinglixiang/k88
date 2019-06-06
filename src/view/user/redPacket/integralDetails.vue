<style lang="scss" scoped>
  .integral-details {
    padding-top: 81px;
    width: 100%;
  }

  .integral-details-top {
    position: fixed;
    width: 100%;
    max-width: 640px;
    top: 0;
    background-color: #1c1c1c;
    z-index: 1;
    margin: 0 auto;
  }

  /*@media screen and (min-width: 640px) {*/
  /*  .integral-details-top {*/
  /*    width: 640px;*/
  /*    left: 50%;*/
  /*    margin-left: -320px;*/
  /*  }*/
  /*}*/

  .integral-details-classes {
    font-size: 0;
  }

  .integral-details-classes > div {
    width: 33.33%;
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    color: #fff;
    border-top: 1px solid #313131;
    border-bottom: 3px solid #313131;
    overflow: hidden;
  }

  .border-right1 {
    border-right: 1px solid #313131;
  }

</style>
<style>
  .integral-details .integral-details-item {
    font-size: 0;
    border-bottom: 1px solid #313131;
    background-color: #1c1c1c;
  }

  .integral-details .integral-details-item > div {
    display: inline-block;
    width: 33.33%;
    height: 50px;
    padding: 5px 0;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    vertical-align: middle;
  }

  .integral-details .integral-details-item > div.integral-details-left {
    line-height: 20px;
    text-align: left;
    /*text-indent: 1em;*/
    padding-left: 1em;
    color: #666666;
    word-wrap: break-word;
    word-break: normal;
  }

  .color73f {
    color: #FF3333;
  }

  .color35a {
    color: #FFC63A;
  }
</style>
<template>
  <div class="box-init integral-details">
    <div class="integral-details-top">
      <v-head title="积分明细"/>
      <div class="integral-details-classes">
        <div class="border-right1">时间</div>
        <div class="border-right1">事件类型</div>
        <div>积分变动</div>
      </div>
    </div>
    <div infinite-scroll-distance="10"
         infinite-scroll-immediate-check="false"
         v-infinite-scroll="loadMore"
    >
      <div :key="index" class="integral-details-item" v-for="(n,index) in list">
        <div class="integral-details-left">
          <div>{{ n.time|dateFormat('yyyy-MM-dd hh:mm:ss') }}</div>
        </div>
        <div style="color: #666666;">{{ n.event_name }}</div>
        <div :class="n.event_point>0 ?'color35a':'color73f'">{{ n.event_point }}</div>
      </div>
    </div>
  </div>
</template>

<script>//
import Http from '../../../store/Http.js'
import loading from '../../../common/loading'

export default {
  name: 'IntegralDetails',
  data () {
    return {
      list: [],
      loading: false
    }
  },
  methods: {
    loadMore () {
      this.getIntegralList()
    },
    getIntegralList () {
      if (this.loading) return
      this.loading = true
      loading.show()
      Http.get('/UserIntegral/getUserIntegralList', {
        offset: this.list.length,
        limit: 15
      }).then(data => {
        if (data && data.list && data.list.length) {
          this.loading = data.list.length < 15
          this.list = (JSON.parse(JSON.stringify(this.list))).concat(data.list)
        } else {
          this.loading = true
        }
        loading.hide()
      })
    }
  },
  created () {
    this.getIntegralList()
  }
}
</script>
