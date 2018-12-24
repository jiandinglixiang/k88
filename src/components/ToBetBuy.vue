<template>
  <div class="not-logged-in row">
    <div class="col-center">
      <img src="../assets/betting/no_match.png" alt="">
      <p>{{ to? '暂无投注比赛':'暂时没有比赛' }}</p>
      <router-link v-if="to" class="btn" :to="to">去投注</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ToBetBuy',
    props: {
      to: {
        type: String
      }
    }
  }
</script>

<style scoped lang="scss">
  .not-logged-in {
    width: 100%;
    height: 300px;
  }

  .not-logged-in .col-center {
    width: 50%;
    margin: 0 auto;
    text-align: center;
  }

  .not-logged-in .col-center img {
    width: 60%;
  }

  .not-logged-in .col-center p {
    margin: 10px 0;
    color: $c999999 ;
    font-size: 14px;
  }
</style>
