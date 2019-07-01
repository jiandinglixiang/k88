<template>
  <table>
    <tr>
      <th>场次</th>
      <th>主队vs客队</th>
      <th>投注内容/出票赔率</th>
      <th>彩果</th>
    </tr>
    <tr :key="index" v-for="(item,index) in list">
      <td>
        <p>{{item.round_no}}</p>
      </td>
      <td>
        <p>{{item.home}}</p>
        <p>VS</p>
        <p>{{item.guest}}</p>
      </td>
      <td>
        <p class="state-0">让球 <span>布拉加</span> <br><span>(-1.5/-2.0）</span><span>2.35</span></p>
      </td>
      <td>
        <p>最终</p>
        <p>5-1</p>
      </td>
    </tr>
  </table>
</template>

<script>//
export default {
  name: 'OrderTable',
  props: ['list']
}
</script>

<style scoped lang="scss">
  table {
    width: 100%;
    background: $c313131;
    border-collapse: collapse;
    color: $c999999;
    th {color: $cCccCCc}
    th, td {
      padding: 9px 0;
      border-top: 1px solid #494949;
      border-right: 1px solid #494949;
      text-align: center;
    }
    > tr > th {
      border-top: none
    }
    > tr > td:last-child,
    > tr > th:last-child {
      border-right: none;
    }
    .state-0 {
      color: $cffC63A;
      &:after {
        content: '';
        display: inline-block;
        width: 12px;
        height: 9px;
        background-image: url(../../../../assets/icon/gold_check.png);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
</style>
