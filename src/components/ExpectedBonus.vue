<template>
  <div class="expected-bonus"><span>{{ text }}</span>元</div>
</template>

<script>//

export default {
  name: 'ExpectedBonus',
  props: {
    tempBetting: { type: Object }, // n串1可能性
    ManyValue: { type: Object } // 绑定值
  },
  data () {
    return {}
  },
  computed: {
    text () {
      let sum = 0 // 总金额
      for (let i in this.ManyValue) {
        if (/^\d+$/.test(this.ManyValue[i])) {
          if (i === 'nCn') {
            // n串n
            sum += this.computedSum(this.tempBetting, this.ManyValue[i], true)
          } else {
            // n串1
            sum += this.computedSum(this.tempBetting[i], this.ManyValue[i])
          }
        }
      }
      return sum.toFixed(2)
    }
  },
  methods: {
    computedSum (temp, val, all) {
      let sum = 0 // 当前串关奖金
      if (all) {
        // n串n将所有的值都计算一遍
        for (let o in temp) {
          for (let i in temp[o]) {
            sum = sum + (val * f1(temp[o][i]))
          }
        }
      } else {
        // 只计算当前串关的奖金
        for (let i in temp) {
          sum = sum + (val * f1(temp[i]))
        }
      }

      function f1 (arr) {
        let s = 1
        for (let j in arr) {
          s *= arr[j].selected[0].value
        }
        return s
      }

      return sum
    }
  }
}
</script>
