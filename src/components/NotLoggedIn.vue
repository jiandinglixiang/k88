<template>
  <div class="not-logged-in row">
    <div class="col-center">
      <img src="../assets/mine_not_logged.png" alt="">
      <p>请登陆查看</p>
      <!--<router-link class="btn" to="/login">马上登陆</router-link>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotLoggedIn'
  }
</script>

<style scoped lang="scss">
  .not-logged-in {
    width: 100%;
    height: 300px;
  }

  .not-logged-in .col-center {
    width: 50%;
    margin-top: 50%;
    margin: 0 auto;
    text-align: center;
  }

  .not-logged-in .col-center img {
    width: 60%;
  }

  .not-logged-in .col-center p {
    margin: 10px 0;
    font-size: 14px;
    color: $c999999;
  }
</style>
