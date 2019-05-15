<template>
  <table border="0" cellpadding="0" cellspacing="1" width="100%">
    <thead>
    <tr class="text-dark">
      <td width="19%">场次</td>
      <td v-if="list && list[0] && list[0].homeFirst" width="31%">主队vs客队</td>
      <td v-else width="31%">客队vs主队</td>
      <td width="31%">投注内容/出票赔率</td>
      <td width="19%">彩果</td>
    </tr>
    </thead>
    <tbody class="text-light">
    <tr :key="index" v-for="(item,index) in list">
      <td>{{item.round_no}}</td>
      <td>
        {{item.homeFirst ? item.home : item.guest}}
        <span v-if="item.team.letPointText && item.homeFirst">({{item.team.letPointText}})</span><br/>
        {{(item.scoreText) || 'VS'}}<span v-if="item.team.basePointText">({{item.team.basePointText}})</span><br/>
        {{item.homeFirst ? item.guest : item.home}}
        <span v-if="item.team.letPointText && !item.homeFirst">({{item.team.letPointText}})</span>
      </td>
      <td>
        <!--显示足彩和篮彩-->
        <span v-if="item.showCheck">
          <template v-if="item.lottery_id==901">
            <span :class="{'text-primary': b.status===3,'blue-color':b.status===1}" :key="index2"
                  v-for="(b,index2) in item.betting">
                <span>让球 <span v-if="b.key.substring(4, 3)=== '1'">{{ item.home }}</span><span
                  v-else>{{ item.guest }}</span></span>
               ({{b.text}}) {{toDecimal(b.value)}}
                                <span class="red-check-icon" v-if="b.checked"></span>
                <span class="check-active" v-if="b.status===1"></span>
            </span>
          </template>
          <template v-else-if="item.lottery_id==902">
         <span :class="{'text-primary': b.status===3,'blue-color':b.status===1}" :key="index2"
               v-for="(b,index2) in item.betting">
           <span v-if="b.key.substring(4, 3)=== '1'">大</span>
           <span v-else>小</span>
                ({{b.text}}) {{toDecimal(b.value)}}
                     <span class="red-check-icon" v-if="b.checked"></span>
                <span class="check-active" v-if="b.status===1"></span>
            </span>
          </template>
          <template v-else>
              <span :class="{'text-primary': b.checked}" :key="index2" v-for="(b,index2) in item.betting">
              <span>
                ({{b.text}}) {{toDecimal(b.value)}}
                <span class="red-check-icon" v-show="b.checked"></span>
              </span>
            </span>
          </template>
        </span>
        <!--胜负彩和任选九-->
        <span v-else>
          <span :key="i" v-for="(b, i) in item.betting">
            <span :class="{'text-primary': b.checked}">{{b.text}}</span><span v-if="i < item.betting.length -1">,</span>
          </span>
        </span>
      </td>
      <td><span style="color: red" v-if="item.schedule_status==='6'">已取消</span>
        <span :key="index3"
              v-for="(r,index3) in item.result">{{r.text}} <span
          v-if="item.lottery_id!=901&&item.lottery_id!=902&&r.value">({{r.value}})</span><br/></span></td>
    </tr>
    </tbody>
  </table>
</template>

<script>//
export default {
  name: 'orderTable',
  props: ['list'],
  computed: {
    teamName (key) {
      if (key.substring(4, 3) === '1') {
        return 'item.home'
      } else {
        return 'item.guest'
      }
    }
  },
  methods: {
    toDecimal (odds) {
      if (this.list[0].lottery_id === '901' || this.list[0].lottery_id === '902') {
        let f = (odds * 1)
        let value = f.toString()
        let rs = value.indexOf('.')
        if (rs < 0) {
          rs = value.length
          value += '.'
        }
        if (value.length > rs + 3) {
          let st = value.length - (rs + 3)
          value = value.substring(0, value.length - st)
        }
        while (value.length <= rs + 2) {
          value += '0'
        }
        return value
      } else {
        return odds
      }
    }
  }
}
</script>

<style scoped>
  .check-active {
    display: inline-block;
    width: 5px;
    height: 2px;
    background: #3692fb;
    line-height: 0;
    font-size: 0;
    vertical-align: middle;
    -webkit-transform: rotate(45deg);
  }

  .check-active:after {
    content: '/';
    display: block;
    width: 10px;
    height: 2px;
    background: #3692fb;
    -webkit-transform: rotate(-90deg) translateY(-50%) translateX(50%);
  }

  .blue-color {
    color: #3692fb;
  }

  table {
    text-align: center;
    font-size: 11px;
    border-spacing: 0;
    border-collapse: collapse;
    border: 1px solid #313131;
  }

  table td {
    background: #313131;
    padding: 5px 0;
    border-left: 0;
    border-top: 0;
    border-right: 1px solid #494949;
    border-bottom: 1px solid #494949;
  }

  table tbody tr:last-child td {
    border-bottom: 0;
  }

  .red-check-icon {
    display: inline-block;
  }
</style>
