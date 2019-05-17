<template>
  <div class="integral-table">
    <table border="0" cellpadding="0" cellspacing="0">
      <thead>
      <tr class="text-light">
        <td width="9%">排名</td>
        <td width="19%">球队</td>
        <td width="9%">已赛</td>
        <td width="9%">胜</td>
        <td width="9%">平</td>
        <td width="9%">负</td>
        <td width="9%">进</td>
        <td width="9%">失</td>
        <td width="9%">净</td>
        <td width="9%">积分</td>
      </tr>
      </thead>
      <tbody>
      <tr :class="{red: detail.home_id == item.team_id, blue: detail.guest_id == item.team_id}"
          v-for="(item, index) in list">
        <template v-if="index < 3">
          <td><span :class="rankIcon(index)" class="rank-icon"></span></td>
        </template>
        <template v-else>
          <td>{{item.rank}}</td>
        </template>
        <td class="text-overflow">{{item.team_name}}</td>
        <td>{{item.game_count}}</td>
        <td>{{item.win}}</td>
        <td>{{item.equal}}</td>
        <td>{{item.lose}}</td>
        <td>{{item.goal}}</td>
        <td>{{item.fumble}}</td>
        <td>{{item.goal - item.fumble}}</td>
        <td>{{item.point}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>//
export default {
  name: 'integralTable',
  props: ['list'],
  computed: {
    detail () {
      return this.$store.state.information.detail
    }
  },
  methods: {
    rankIcon (index) {
      return ['first', 'second', 'third'][index]
    }
  }
}
</script>

<style lang="scss" scoped>
  .integral-table table {
    width: 100%;
    font-size: 12px;
    border-collapse: collapse;
    border: none;

    thead {
      color: $c999999;
      @if($lotteryIg) {
        background-color: $cEbebeb;
      } @else {
        background-color: #1C1C1C;
      }
    }

    tbody {
      @if($lotteryIg) {
        background-color: $cFFfFFF;
        color: $cgray;
      } @else {
        background-color: #313131;
        color: $cFFfFFF;
      }
    }
  }

  .integral-table table td {
    padding: 5px 0;
    text-align: center;
    @if($lotteryIg) {
      border: 1px solid #ddd;
    } @else {
      border: 1px solid $c494949;
    }
  }

  .integral-table table .rank-icon {
    width: 15px;
    height: 15px;
    display: inline-block;
  }

  .integral-table table .rank-icon.first {
    background: url("../../../assets/information/first_rank.png") no-repeat;
    background-size: 100% 100%;
  }

  .integral-table table .rank-icon.second {
    background: url("../../../assets/information/second_rank.png") no-repeat;
    background-size: 100% 100%;
  }

  .integral-table table .rank-icon.third {
    background: url("../../../assets/information/third_rank.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
