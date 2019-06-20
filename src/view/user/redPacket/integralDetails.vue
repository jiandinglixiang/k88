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

  .integral-details .integral-details-item {
    border-bottom: 1px solid #313131;
    background-color: #1c1c1c;
    height: 50px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;

    > div {
      flex: 1 1 33.3%;
      text-align: center;
      color: white;
    }

    > .integral-details-left {
      color: #666;
      font-size: 14px;
      padding-left: 10px;
      text-align: left;
    }

    .color73f {
      color: #FF3333;
    }

    .color35a {
      color: #FFC63A;
    }
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
          <span>{{ n.time|dateFormat('yyyy-MM-dd hh:mm:ss') }}</span>
        </div>
        <div><span>{{ n.event_name }}</span></div>
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
