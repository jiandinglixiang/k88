<template>
  <div class="mine">
    <v-head hide-back="1" style="background-color: #1C1C1C;margin: 0;" title="个人中心"></v-head>
    <div class="mine-top-i">
      <div class="mine-top">
        <div class="portrait">
          <img :src="mine.avatar">
          <div class="vip-info">
            <div class="username">{{mine.username}}</div>
            <img alt="" v-vip="vipIconUrl">
          </div>
        </div>
        <div class="singIn">
          <div class="bubble-bubble">
            <div class="bubble-bubble-body">{{ mine.sign_days? '已连续签到':'签到有好礼' }}<span v-if="mine.sign_days"><span
              style="color: red">{{ mine.sign_days }}</span>天</span></div>
          </div>
          <div @click="getSignIn" class="singIn-button">
            {{ mine.is_sign? '已签到':'签到' }}
          </div>
        </div>
      </div>
      <div class="mine-vip">
        <p-progress
          :next-data="{next_level_name:mine.next_level_name,next_level_exp:mine.next_level_exp}"
          :user-data="{user_level_name:mine.user_level_name,user_exp:mine.user_exp}"/>
      </div>
    </div>
    <ul class="info-item-list">
      <li>
        <p class="text-normal font-bold" style="color: #FF3333">{{mine.balance | currency}}</p>
        <p class="txt-999">余额</p>
      </li>
      <li>
        <p class="text-normal font-bold" style="color: #FF9C37">{{mine.coupon_balance | currency}}</p>
        <p class="txt-999">红包</p>
      </li>
      <li class="border-right-clear">
        <p class="text-normal font-bold" style="color: #1AC456">{{mine.points}}</p>
        <p class="txt-999">积分</p>
      </li>
      <router-link class="border-bottom-clear" tag="li" to="/payment">
        <p class="text-normal link-item" style="color: white"><span class="mine-recharge-icon icon"></span>充值</p>
      </router-link>
      <router-link class="border-right-clear border-bottom-clear" tag="li" to="/cash">
        <p class="text-normal link-item" style="color: white"><span class="mine-cash-icon icon"></span>提现</p>
      </router-link>
    </ul>
    <ul class="function-list">
      <router-link
        :to="{ name: 'WebPage', query: { title: '24h在线客服', url: `http://tgapi.k888.bet/H5/Chart/index?token=${token}&Device-Type=web` } }"
        tag="li">
        <span class="icon-name"><span class="mine-customer-server icon"></span>24h在线客服</span>
        <span class="arrow-right"></span>
      </router-link>
      <!--      <router-link :to="{name:'Crunchies',params:{target:'[1,1]'}}" tag="li">-->
      <!--        <span class="icon-name"><span class="mine-awesome-icon icon"></span>关注的大神</span>-->
      <!--        <span class="arrow-right"></span>-->
      <!--      </router-link>-->
      <!--      <router-link :to="{name: 'RecommendDetails', params: {target: JSON.stringify([0, mine.id])}}"-->
      <!--                   tag="li">-->
      <!--        <span class="icon-name"><span class="mine-recommended-icon icon"></span>我的推荐</span>-->
      <!--        <span class="arrow-right"></span>-->
      <!--      </router-link>-->
      <router-link tag="li" to="redManage">
        <span class="icon-name"><span class="mine-envelope-management-icon icon"></span>红包管理</span>
        <span class="arrow-right"></span>
      </router-link>
      <router-link tag="li" to="exchangeRed">
        <span class="icon-name"><span class="mine-credit-exchange-icon icon"></span>兑换红包</span>
        <span class="arrow-right"></span>
      </router-link>
      <router-link tag="li" to="integralStore">
        <span class="icon-name"> <span class="mine-point-management-icon icon"></span>积分商城</span>
        <span class="arrow-right"></span>
      </router-link>
      <router-link tag="li" to="/user_info">
        <span class="icon-name"><span class="mine-info-icon icon"></span>个人信息</span>
        <span class="arrow-right"></span>
      </router-link>
      <router-link
        :to="{ name: 'WebPage', query: { title: '关于我们', url: `http://tgapi.k888.bet/index.php?s=/Content/help/about.html` } }"
        tag="li">
        <span class="icon-name"><span class="mine-info-mine icon"></span>关于我们</span>
        <span class="arrow-right"></span>
      </router-link>
    </ul>
    <a @click.stop.prevent="loginOut" class="btn logout-panel">退出登录</a>
    <download-panel v-if="dialogShow"></download-panel>
    <v-dialog @close="onCloseDialog" v-if="dialogShow">
      <!--      <p class="text-md">体验完整功能</p>-->
      <!--      <p class="text-md margin-top-5">请下载安装老虎彩票官方APP</p>-->
      <!--      <div class="padding margin-top-10">-->
      <!--        <a class="btn" href="http://a.app.qq.com/o/simple.jsp?pkgname=co.sihe.tigerlottery" target="_self">立即下载</a>-->
      <!--      </div>-->
    </v-dialog>
  </div>
</template>

<script>//
import DownloadPanel from '../../components/DownloadPanel.vue'
import VDialog from '../../components/VDialog.vue'
import { mapActions, mapState } from 'vuex'
import { LOGOUT, MINE_INFO, MINE_SIGN_IN } from '../../store/user/types'
import PProgress from './Component/progress.vue'

export default {
  name: 'mine',
  data () {
    return {
      dialogShow: false
    }
  },
  computed: {
    ...mapState({
      mine: state => {
        const mine = { ...(state.user.mine) }
        if (!mine.avatar) {
          mine.avatar = require('../../assets/k88/ic_head.png')
        }
        return mine
      },
      token: state => state.user.token
    }),
    vipIconUrl () {
      // 但经验值最大时不会升了
      return this.mine.user_exp >= this.mine.next_level_exp ? this.mine.next_level_img : this.mine.user_level_img
    }
  },
  methods: {
    loginOut () {
      this.logout().finally(() => {
        this.$router.replace({ path: '/login' })
      })
    },
    getSignIn () {
      this.SignIn().then(() => {
        this.$router.push({ path: '/SingInLaTombola' })
      })
    },
    ...mapActions({
      getMineInfo: MINE_INFO,
      SignIn: MINE_SIGN_IN,
      logout: LOGOUT
    })
  },
  created () {
    this.getMineInfo()
  },
  components: {
    DownloadPanel,
    VDialog,
    PProgress
  }
}
</script>
<style lang="scss" scoped>
  .mine {
    position: relative;
    padding-bottom: 60px;

    .mine-top-i {
      background: linear-gradient(0deg, rgba(38, 38, 38, 1), rgba(29, 29, 29, 1));

      .mine-top {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: space-between;
        height: 80px;

        .portrait {
          flex: 1 1 auto;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;

          > img {
            border-radius: 50%;
            width: 50px;
            height: 50px;
            margin: 0 10px;
            overflow: hidden;
          }

          .vip-info {
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;

            .username {
              color: white;
              font-size: 17px;
              font-weight: bold;
              margin-bottom: 10px;
            }

            > img {
              width: 18px;
              height: auto;
            }
          }
        }

        .singIn {
          display: flex;
          flex-flow: column nowrap;
          align-items: center;
          justify-content: center;
          color: red;

          .bubble-bubble {
            position: relative;
            /*height: 20px;*/
            line-height: 1;
            margin-bottom: 5px;
            background-color: #FFF;
            border-radius: 9px;
            color: #999999;
            padding: 5px;

            .bubble-bubble-body {
              text-align: center;
              overflow: hidden;
            }

            &:after {
              content: "";
              display: inline-block;
              border-width: 5px;
              position: absolute;
              bottom: -10px;
              right: 10px;
              border-style: solid dashed dashed;
              border-color: #fff transparent transparent;
              font-size: 0;
              line-height: 0;
            }
          }

          .singIn-button {
            margin: 0 10px;
            background-color: #ffba00;
            background-image: url("../../assets/icon/sing_in.png");
            background-repeat: no-repeat;
            background-position: 6px center;
            background-size: 17px 16px;
            color: white;
            font-size: 14px;
            font-weight: 400;
            padding: 6px 6px 6px 29px;
            border-radius: 5px;
          }
        }
      }

      .mine-vip {
        width: 90%;
        margin: 0 auto;
        padding: 10px 0;
        border-top: 1px solid #313131;
      }
    }

    .info-item-list {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      background-color: #1C1C1C;

      > li {
        height: 50px;
        flex: 1 1 33.3%;
        display: flex;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        border-bottom: 1px solid #313131;
        border-right: 1px solid #313131;

        .link-item {
          span {
            display: inline-block;
            vertical-align: middle;
            margin-right: 7px;
          }
        }

        > p.txt-999 {
          color: #999999;
        }

        > p.font-bold {
          font-weight: bold;
        }
      }

      > li.border-right-clear {
        border-right: none;
      }

      > li.border-bottom-clear {
        border-bottom: none;
      }
    }

    .function-list {
      margin-top: 10px;
      color: white;
      background-color: #1C1C1C;

      li {
        height: 45px;
        display: flex;
        flex-flow: row nowrap;
        border-bottom: 1px solid #313131;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        font-size: 14px;
        color: #999999;
        font-weight: 400;

        .icon-name {
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          flex: 1 1 auto;

          .icon {
            margin-right: 10px;
          }
        }
      }

      > li:last-child {
        border-bottom: none;
      }
    }

    .logout-panel {
      width: 80%;
      margin: 0 auto;
      margin-top: 10%;
      color: #FFC63A;
      border: 1px solid #FFC63A;
      background-color: #131313;
    }
  }
</style>
