<template>
  <div class="basket-team-table">
    <p class="panel-title-head">
      <img :src="team.src" alt="">
      {{team.name}}
    </p>
    <table class="border-bottom-solid">
      <tbody>
      <tr class="bg-gray padding-10">
        <td>场次</td>
        <td>赛</td>
        <td>胜</td>
        <td>负</td>
        <td>得分</td>
        <td>失分</td>
        <td>净胜</td>
        <td>胜率</td>
      </tr>
      <tr :key="n1" v-for="(item,n1) in team.list">
        <th>{{item.round}}</th>
        <td>{{item.game_count}}</td>
        <td>{{item.win}}</td>
        <td>{{item.lose}}</td>
        <td>{{item.goal}}</td>
        <td>{{item.fumble}}</td>
        <td>{{item.differential}}</td>
        <td>{{item.win_rate}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>//
export default {
  name: 'basketTeamTable',
  props: ['team']
}
</script>

<style lang="scss" scoped>
  .basket-team-table {
    .panel-title-head {
      @if ($lotteryIg) {
        color: $cgray;
      } @else {
        color: $cFFfFFF;
      }
    }

    table {
      .bg-gray {
        background-color: $c1c1c1c;
        color: $c999999;
      }

      @if ($lotteryIg) {
        background-color: $cFFfFFF;
        color: $cgray;
        .bg-gray {
          background-color: #F2F2F2;
        }
      } @else {
        background-color: $c313131;
        color: $cFFfFFF;
      }
    }
  }
</style>
