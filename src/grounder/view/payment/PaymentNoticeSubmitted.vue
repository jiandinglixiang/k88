<template>
  <div>
    <v-head :title="query.name"></v-head>
    <div class="official-account">
      <div class="title"><span>官方账户</span></div>
      <ul>
        <li class="opening-bank two-lines">
          <p class="bank-title">开户行:</p>
          <textarea class="bank-content"
                    rows="2"
                    readonly
                    ref="openingBank"
                    v-model="query.bank_name"
          ></textarea>
          <button @click="copyTxt('openingBank')">复制</button>
        </li>
        <li class="opening-bank">
          <p class="bank-title">银行账户:</p>
          <textarea class="bank-content" rows="1" readonly ref="account" v-model="query.bank_account"></textarea>
          <button @click="copyTxt('account')">复制</button>
        </li>
        <li class="opening-bank">
          <p class="bank-title">账户名称:</p>
          <textarea class="bank-content" rows="1" disabled v-model="query.account_name">喵哩个喵</textarea>
        </li>
      </ul>
    </div>
    <ul class="info-form">
      <li>
        <label for="names" class="significance">付款人姓名</label><input id="names" type="text" placeholder="请输入付款人姓名"
                                                                    v-model="names">
      </li>
      <li>
        <label for="money" class="significance">付款金额</label><input id="money" type="number" placeholder="请输入存款金额"
                                                                   v-model="money"><span>元</span>
      </li>
      <li>
        <label for="dec">付款说明</label><input id="dec" type="text" placeholder="备注信息,选填" v-model="txt">
      </li>
    </ul>
    <div class="prompt-message">
      <p>完成转账后，请主动与客服联系！</p>
      <p>
        注：转账完成后请提交正确的金额，存款人姓名（付款银行
        卡的实名制姓名）
      </p>
    </div>
    <div class="recharge-information">
      <button :disabled="disabledSubmit" @click="submitInfo">提交充值信息</button>
    </div>
  </div>
</template>

<script>//
import Toast from '../../../common/toast.js'
import HTTP from '../../http.js'

export default {
  name: 'PaymentNoticeSubmitted',
  data () {
    return {
      names: null,
      money: null,
      txt: null
    }
  },
  computed: {
    query () {
      const obj = this.$route.query
      if (!obj.name) obj.name = `转账充值`
      // {
      //   id: item.id,
      //   type: item.type,
      //   name: item.name,
      //   account_name: item.recharge_channel_account_name,
      //   bank_account: item.recharge_channel_bank_account,
      //   bank_name: item.recharge_channel_bank_name
      // }
      return obj
    },
    disabledSubmit () {
      if (!this.names) {
        return true
      }
      return !this.money
    }
  },
  methods: {
    copyTxt (name) {
      if (this.$refs[name]) {
        this.$refs[name].select()
        document.execCommand('Copy')
        Toast('您已成功复制信息')
      }
    },
    submitInfo () {
      if (!/^[a-zA-Z\u4e00-\u9fa5]+$/.test(this.names)) return Toast('姓名只能由中文或英文组成')
      if (!(/^\d+$/.test(this.money))) return Toast('金额必须是整数')
      if (this.money < 1) return Toast('金额必须大于0')
      if (!this.query.id) return Toast('数据错误')
      HTTP.postTransferRecharge(this.query.id, this.names, this.money, this.txt).then(value => {
        this.names = null
        this.money = null
        this.txt = null
        Toast('提交成功')
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .official-account {
    overflow: hidden;
    width: 100vw;
    height: 52vw;
    max-width: 640px;
    max-height: 332px;
    background: url("../../assets/backpay12312.png") center center no-repeat;
    background-size: 100% 100%;
    color: white;

    .title {
      height: 22.5%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 17px;
      font-weight: bold;
    }

    .opening-bank {
      margin: 4% 8.5% 0 8.5%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      height: 1.5em;
      font-size: 0.4rem;
      font-weight: bold;

      &.two-lines {
        height: 2.5em;
        align-items: flex-start;
      }

      .bank-title {
        flex: 0 0 5em;
      }

      .bank-content {
        flex: 1 1 auto;
        color: white;
        background-color: transparent;
        border: none;
        font-size: 0.4rem;
        font-weight: bold;
        padding: 0 5px 0 0;

        &:focus {
          outline: none;
        }
      }

      button {
        flex: 0 0 4em;
        font-size: 0.4rem;
        color: white;
        font-weight: bold;
        background: rgba(153, 153, 153, 1);
        border-radius: 4px;
      }
    }

    .input-hidden {
      opacity: 0;
    }
  }

  .info-form {
    background-color: #1C1C1C;
    margin: 20px 10px;
    border-radius: 4px;
    overflow: hidden;

    li {
      margin: 0 10px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;

      label {
        position: relative;
        flex: 0 0 6em;
        color: white;
        font-size: 15px;
      }

      label.significance:before {
        content: '*';
        position: absolute;
        color: red;
        left: -7px;
        top: 0;
      }

      input {
        border: none;
        text-align: right;
        font-size: 15px;
      }

      span {
        font-size: 15px;
        color: white;
      }
    }

    li:nth-child(n+2) {
      border-top: 1px solid #313131;
    }
  }

  .prompt-message {
    background-color: #1C1C1C;
    margin: 0 10px;
    border-radius: 4px;
    padding: 10px;

    p:nth-child(1) {
      text-align: center;
      font-size: 12px;
      font-weight: 400;
      color: rgba(255, 198, 58, 1);
      line-height: 31px;
    }

    p:nth-child(2) {
      font-weight: 400;
      color: rgba(204, 204, 204, 1);
      line-height: 20px;
    }
  }

  .recharge-information {
    margin: 20px 10px;

    button {
      width: 100%;
      height: 38px;
      color: #131313;
      background: #FFC63A;
      border-radius: 3px;
    }

    button[disabled="disabled"] {
      background: rgba(153, 153, 153, 1);
    }
  }
</style>
