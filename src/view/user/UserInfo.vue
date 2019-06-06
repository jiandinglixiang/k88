<template>
  <div class="user-info">
    <v-head title="个人信息"></v-head>
    <router-link class="item margin-top-20" tag="div" to="id_card">
      <span class="userInfo-IDCard-icon icon"></span>
      <span>身份证信息</span>
      <span class="arrow-right"></span>
    </router-link>
    <router-link class="item border-top" tag="div" to="bank_card">
      <span class="userInfo-bankCard-icon icon"></span>
      <span>银行卡信息</span>
      <span class="arrow-right"></span>
    </router-link>
  </div>
</template>

<script>//
export default {
  name: 'userInfo'
}
</script>

<style>
  .user-info {
    position: relative;
    height: 100%;
  }

  .user-info .item {
    padding: 20px 10px 20px 40px;
    background: #1C1C1C;
    position: relative;
    color: #fff;
  }

  .user-info .item .icon {
    position: absolute;
    left: 12px;
  }

  .user-info .item .arrow-right {
    position: absolute;
    right: 10px;
    top: 25px;
  }

  .user-info .item.border-top {
    border-top: 1px solid #313131;
  }
</style>
