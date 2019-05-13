<template>
  <div>
    <v-head title="登录"></v-head>
    <div class="login">
      <div>
        <input placeholder="请输入手机号码" type="text" v-model="phone">
      </div>
      <div class="margin-top-10">
        <input maxlength="18" placeholder="请输入密码" type="password" v-model="password">
      </div>
      <div class="margin-top-20">
        <a @click="submit" class="btn" href="javascript:">登录</a>
      </div>
      <div class="margin-top-10">
        <router-link :to="registerUrl" class="btn btn-out-line">10秒注册</router-link>
      </div>
      <div class="margin-top-20 text-right">
        <router-link :to="forgetUrl" class="text-sm forget" tag="a">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>//
import VHead from '../../components/VHead'
import Util from '../../common/util'
import Toast from '../../common/toast'
import { mapActions, mapMutations } from 'vuex'
import { LOGIN } from '../../store/user/types'
import { user } from '../../common/store'

export default {
  name: 'login',
  data: function () {
    return {
      password: '',
      phone: '',
      registerUrl: {
        name: 'Register', query: this.$route.query
      },
      forgetUrl: {
        name: 'ForgotPassword', query: this.$route.query
      }
    }
  },
  methods: {
    submit () {
      if (!Util.isMobile(this.phone)) {
        Toast('请输入正确的手机号!')
        return
      }
      if (!this.password || this.password.length < 6) {
        Toast('请输入6-18位密码！')
        return
      }
      this.login({ tel: this.phone, passwd: this.password })
    },
    ...mapActions({
      login: LOGIN
    }),
    ...mapMutations({
      reLogin: LOGIN
    })
  },
  created () {
    if (user.getToken()) {
      this.reLogin({ user_token: user.getToken() })
    }
  },
  components: { VHead }
}
</script>

<style>
  .login {
    padding: 10px;
  }

  .login .forget {
    color: #3f6ee7;
  }
</style>
