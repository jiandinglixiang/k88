<template>
  <div style=" background-color: #131313;">
    <router-view/>
    <ul id="nav-button-list">
      <router-link class="home-link" replace tag="li" to="/">
        <span>首页</span>
      </router-link>
      <router-link class="prize-list-link" replace tag="li" to="/prize/list">
        <span>开奖</span>
      </router-link>
      <router-link class="Score-link" replace tag="li" to="/Score">
        <span>比分</span>
      </router-link>
      <router-link class="orders-link" replace tag="li" to="/orders">
        <span>订单</span>
      </router-link>
      <router-link class="mine-link" replace tag="li" to="/mine">
        <span>我的</span>
      </router-link>
    </ul>
  </div>
</template>

<script>//
export default {
  name: 'Index'
}
</script>

<style lang="scss" scoped>
  #nav-button-list {
    max-width: 640px;
    width: 100%;
    height: 50px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    position: fixed;
    bottom: 0;
    z-index: 1;

    @if ($lotteryIg) {
      background: $cFFfFFF;
      border-top: 1px solid $cFFfFFF;
    } @else {
      background: $c131313;
      border-top: 1px solid #313131;
    }

    li {
      width: 20%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: flex-end;
      background-repeat: no-repeat;
      background-size: auto 25px;
      background-position: center 5px;
      color: $c999999;

      span {
        line-height: 20px;
      }
    }

    li.router-link-exact-active {
      color: #FFC63A;
    }

    li.home-link.router-link-exact-active {
      background-image: url("../assets/k88/home_sel.png");
    }

    li.home-link {
      background-image: url("../assets/k88/home_nor.png");
    }

    li.prize-list-link.router-link-exact-active {
      background-image: url("../assets/k88/Lottery_sel.png");
    }

    li.prize-list-link {
      background-image: url("../assets/k88/Lottery_nor.png");

    }

    li.Score-link.router-link-exact-active {
      background-image: url("../assets/k88/score_sel.png");

    }

    li.Score-link {
      background-image: url("../assets/k88/score_nor.png");
    }

    li.orders-link.router-link-exact-active {
      background-image: url("../assets/k88/order_sel.png");

    }

    li.orders-link {
      background-image: url("../assets/k88/order_nor.png");

    }

    li.mine-link.router-link-exact-active {
      background-image: url("../assets/k88/mine_sel.png");

    }

    li.mine-link {
      background-image: url("../assets/k88/mine_nor.png");
    }
  }
</style>
