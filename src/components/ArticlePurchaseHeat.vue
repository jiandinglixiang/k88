<template>
  <div class="article-purchase-heat" v-show="list.length">
    <img alt="" class="heat" src="../assets/article_purchase_heat.png">
    <div :class="(index+1)!==list.length&&'imaginary'" :key="index" class="item" v-for="(i,index) in list">
      <div class="item-left">
        <div class="item-left-top">
          <img :src="i.image_url" alt="">
          <div>{{ i.title }}</div>
          <span v-if="i.slogon"><span>{{ i.slogon }}</span></span>
        </div>
        <div class="item-left-bottom">{{ i.description||'&nbsp;' }}</div>
      </div>
      <div @click="goTarget(i)" class="item-right">
        <div>{{ i.type>1? '去看看':'去投注' }}</div>
      </div>
    </div>
  </div>
</template>

<script>//
import Http from '../store/Http.js'
import Lottery from '../model/common/Lottery'
import Toast from '../common/toast'

export default {
  name: 'ArticlePurchaseHeat',
  data () {
    return {
      list: []
    }
  },
  methods: {
    goTarget (item) {
      let router = null
      switch (item.type) {
        case '1':
          if (Lottery.getComponent(item.lottery_id)) {
            router = {
              name: Lottery.getComponent(item.lottery_id),
              params: { id: item.lottery_id }
            }
          } else {
            Toast('此彩种暂停销售啦,敬请期待')
          }
          break
        case '2':
        case '3':
          // -打开新页面
          if (item.webpage_url) {
            if (item.webpage_url.indexOf('http://') !== -1) item.webpage_url = item.webpage_url.replace('http:', '')
            router = { name: 'WebPage', query: { title: item.title, url: item.webpage_url } }
          } else {
            Toast('暂无内容')
          }
          break
        default:
          console.log('未知类型')
      }
      router && this.$router.push(router)
    }
  },
  mounted () {
    Http.get('/UserIntegral/getSignedRecommendList').then((data) => {
      if (data && data.list) {
        this.list = data.list
      }
    })
  }
}
</script>

<style scoped>
  .article-purchase-heat {
    background-color: white;
    width: 93.75%;
    margin: 30px auto 0 auto;
    border-radius: 10px;
    overflow: hidden;
  }

  .heat {
    display: block;
    background-color: #e73f40;
    overflow: hidden;
    margin: 0 auto;
    width: 35%;
    height: auto;
    border: 0;
  }

  .item {
    position: relative;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    width: 93%;
    margin: .62rem auto;
  }

  .item-left {
    width: 82.1%;
  }

  .item-right {
    width: 17.9%;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
  }

  .item-right > div {
    width: 100%;
    border: 1px #e73f40 solid;
    color: #e73f40;
    text-align: center;
    min-font-size: 12px;
    font-size: .36rem;
    line-height: 1;
    padding: 15.6% 0;
    border-radius: 5px;
  }

  .item-left-top {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: center;
    align-items: center;
  }

  .item-left-top > div {
    margin-left: 2.2%;
    margin-right: 2.2%;
    max-width: 70%;
    font-size: .45rem;
    font-weight: bold;
    white-space: nowrap;
  }

  .item-left-top > img {
    width: 13%;
  }

  .item-left-top > span {
    overflow: hidden;
    background-color: #fe8b34;
    font-size: .33rem;
    min-font-size: 12px;
    color: white;
    border-radius: 10px;

    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: center;
    align-items: center;
    justify-content: center;
    -webkit-justify-content: center;
  }

  .item-left-top > span > span {
    max-width: 90%;
    margin: 0 10px;
    overflow: hidden;
    white-space: nowrap;
  }

  .item-left-bottom {
    width: 100%;
    padding-left: 15.2%;
    min-font-size: 12px;
    font-size: .34rem;
    color: #867682;
    overflow: hidden;
  }

  .imaginary:after {
    content: '';
    position: absolute;
    bottom: -.31rem;
    left: 0;
    width: 100%;
    height: .05rem;
    background-color: #ffffff;
    background-image: url("../assets/la_imaginary.png");
    background-repeat: repeat-x;
    background-size: auto 100%;
  }
</style>
