<template>
  <div class="bankCard">
    <v-head title="银行卡信息"></v-head>
    <div class="back-1c1c1c" v-if="userBank.no">
      <div class="padding-0-10 margin-top-10">
        <div class="info">
          <span class="name">户&emsp;&emsp;名：</span>
          <span>{{ userBank.account }}</span>
        </div>
        <div class="info">
          <span class="name">银&emsp;&emsp;行：</span>
          <span>{{ userBank.type }}</span>
        </div>
        <div class="info">
          <span class="name">银行卡号：</span>
          <span>{{ userBank.no }}</span>
        </div>
        <div class="info no-border">
          <span class="name">开户网点：</span>
          <span>{{ userBank.address }}</span>
        </div>
      </div>
      <div class="prompt text-center margin-top-20">为了您的财产和资金安全，银行卡信息暂时不支持修改</div>
    </div>
    <div class="back-1c1c1c" v-else>
      <div class="register padding">
        <div>
          <input disabled placeholder="户名" type="text" v-bind:value="mine.realname">
        </div>
        <div class="margin-top-10 position-relative">
          <!--<div v-model="bank_name" @click="onShowBankDialog">{{ bank_name }}</div>-->
          <input @click="onShowBankDialog" placeholder="选择银行" type="text" v-model="bank_name" v-text="bank_name">
          <span class="arrow-circle-up-icon icon"></span>
        </div>
        <div class="margin-top-10">
          <input placeholder="银行卡号" type="text" v-model="bank_no">
        </div>
        <div class="margin-top-10">
          <input placeholder="开户网点" type="text" v-model="bank_address">
        </div>
        <div class="margin-top-20">
          <a @click="submit" class="btn" href="javascript:">提交</a>
        </div>
        <div class="prompt margin-top-20">
          请务必如实填写真实姓名和身份证号，两者信息必须和身份证上的内容完全一致，否则无法领奖；护照、军官证、台胞证、香港身份证、社会保障卡、机动车驾驶证等均不能领奖；
        </div>
        <div class="prompt margin-top-10">购买彩票是个人行为，请保证以上信息是您个人的真实信息，不要使用公司或他人信息，身份证信息暂时不支持修改，请慎重填写；</div>
        <div class="prompt margin-top-10">依据财政部《彩票发行与销售管理暂行规定》未满18岁不得购买彩票请务必如实填写。</div>

      </div>
      <!--<download-panel></download-panel>-->
      <v-dialog @close="onCloseDialog" v-show="mine.identity_status==0&&!hasIDCard">
        <p class="text-md">提示</p>
        <p class="text-md margin-top-5">请先完成身份证认证</p>
        <div class="padding margin-top-10">
          <router-link class="width-45" tag="div" to="id_card">
            <a class="btn" href="javascript:">确定</a>
          </router-link>
          <a @click="onCloseDialog" class="btn width-45 bg-gray" href="javascript:">取消</a>
        </div>
      </v-dialog>
      <!--<bankList-panel></bankList-panel>-->
      <div class="bank-dialog" v-show="dialogShow">
        <div @click="onCloseBankDialog" class="mask"></div>
        <div class="content">
          <div @click="getBankInfo">
            <div :key="item.name" v-for="item in bankList">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>//
import VDialog from '../../components/VDialog.vue'
import Util from '../../common/util'
import Toast from '../../common/toast'
import { mapActions, mapState } from 'vuex'
import { GET_BANKS_LIST, GET_USER_BANKCARD, MINE_INFO, SET_USER_BANKCARD } from '../../store/user/types'

export default {
  name: 'bankCard',
  data: () => {
    return {
      bank_name: '',
      bank_no: '',
      bank_address: '',
      hasIDCard: false,
      dialogShow: false
    }
  },
  computed: {
    ...mapState({
      mine: state => state.user.mine,
      userBank: state => state.user.userBank,
      bankList: state => state.user.bankList
    })
  },
  methods: {
    submit () {
      if (this.mine.identity_status * 1 === 0) {
        Toast('请先完成身份验证!')
        return
      }
      if (!Util.isNull(this.bank_name)) {
        Toast('银行类型不能为空!')
        return
      }
      if (!Util.isBank(this.bank_no)) {
        Toast('请输入正确的银行卡号!')
        return
      }
      if (!Util.isNull(this.bank_address)) {
        Toast('开户网点不能为空!')
        return
      }
      this.setBankCard({
        type: this.bank_name, address: this.bank_address, no: this.bank_no, account: this.mine.realname
      })
    },
    onShowDialog () {
      this.hasIDCard = false
    },
    onCloseDialog () {
      this.hasIDCard = true
    },
    onShowBankDialog () {
      this.dialogShow = true
    },
    onCloseBankDialog () {
      this.dialogShow = false
    },
    getBankInfo: function (event) {
      if (event) {
        this.bank_name = event.target.innerHTML
        this.dialogShow = false
      }
    },
    ...mapActions({
      getMineInfo: MINE_INFO,
      getUserBankCard: GET_USER_BANKCARD,
      getBanksList: GET_BANKS_LIST,
      setBankCard: SET_USER_BANKCARD
    })
  },
  components: {
    VDialog
  },
  created () {
    this.getMineInfo()
    this.getUserBankCard()
    this.getBanksList()
  }
}
</script>

<style>
  .bankCard {
    position: relative;
    height: 100%;
  }

  .bankCard .padding-0-10 {
    padding: 0 10px;
  }

  .bankCard .info {
    padding: 15px 0;
    color: white;
    font-size: 14px;
    border-bottom: 1px solid #313131;
  }

  .bankCard .info .name {
    color: white;
  }

  .bankCard .info.no-border {
    border-bottom: none;
  }

  .bankCard .prompt {
    padding: 0 0;
    color: #999999;
    font-size: 13px;
  }

  .bankCard .width-45 {
    width: 45%;
    display: inline-block;
  }

  .bankCard .bank-dialog {
    position: absolute;
  }

  .bankCard .bank-dialog .mask {
    position: fixed;
    z-index: 500;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
  }

  .bankCard .bank-dialog .content {
    position: fixed;
    z-index: 501;
    width: 80%;
    max-width: 300px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background-color: #FFFFFF;
    text-align: left;
    border-radius: 3px;
    overflow: hidden;
    color: #333;
    height: 80%;
    overflow-y: scroll;
    padding: 0 10px;
    line-height: 24px;
    font-size: 14px;
  }

  .bankCard .icon {
    display: inline-block;
    position: absolute;
    top: 12px;
    right: 10px;
  }

  .bankCard .position-relative {
    position: relative;
  }
</style>
<style lang="scss" scoped>
  .bankCard {
    > .back-1c1c1c {
      background-color: #1C1C1C;
    }
  }
</style>
