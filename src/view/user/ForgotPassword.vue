<template>
  <div>
    <v-head title="找回密码"></v-head>
    <div class="register padding">
      <div>
        <input placeholder="请输入手机号码" type="text" v-model="phone">
      </div>
      <div class="margin-top-10 row">
        <div class="col col-60">
          <input placeholder="请输入短信验证码" type="text" v-model="captcha">
        </div>
        <div class="col col-40 padding-left-10">
          <captcha-button :phone="phone" :type="4" appId="1"></captcha-button>
        </div>
      </div>
      <div class="margin-top-10">
        <input maxlength="18" placeholder="请输入新密码" type="password" v-model="password">
      </div>
      <div class="margin-top-10">
        <input maxlength="18" placeholder="请再次输入新密码" type="password" v-model="confirmPassword">
      </div>
      <div class="margin-top-20">
        <a @click="submit" class="btn" href="javascript:">提交</a>
      </div>
    </div>
  </div>
</template>

<script>//
import CaptchaButton from '../../components/CaptchaButton'
import Util from '../../common/util'
import Toast from '../../common/toast'
import { mapActions } from 'vuex'
import { FORGET_PASSWORD } from '../../store/user/types'

export default {
  name: 'forgotPassword',
  data () {
    return {
      phone: '',
      captcha: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    submit () {
      if (!Util.isMobile(this.phone)) {
        Toast('请输入正确的手机号!')
        return
      }
      if (!Util.smsValid(this.captcha)) {
        Toast('请输入短信验证码!')
        return
      }
      if (!Util.passwordValid(this.password)) {
        Toast('请输入6-18位密码, 不能有特殊字符!')
        return
      }
      if (this.password !== this.confirmPassword) {
        Toast('两次密码不一样!')
        return
      }
      this.forgetPassword({
        tel: this.phone, passwd: this.password, sms_validation: this.captcha
      }).then(() => {
        this.goBack('/login')
      })
    },
    ...mapActions({
      forgetPassword: FORGET_PASSWORD
    }),
    goBack (path) {
      const query = this.$route.query
      // 重定向路径
      if (query.redirect && query.back /* === '/guessingDetails' */) {
        const redirect = query.redirect
        delete query.redirect
        this.$router.replace({ path: redirect, query })
        // 返回重定向页面,带参数
      } else {
        this.$router.replace({ path: path || '/' })
        // 返回根页
      }
    }
  },
  components: { CaptchaButton
  }
}
</script>
