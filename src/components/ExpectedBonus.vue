<template>
  <div class="expected-bonus"><span>{{ text }}</span>元</div>
</template>

<script>//
function getGroup (data, index = 0, group = []) {
  const need = [data[index]]
  for (let i = 0; i < group.length; i++) {
    if (Array.isArray(group[i])) {
      need.push(group[i].concat([data[index]]))
    } else {
      need.push([group[i], data[index]])
    }
  }
  group.push.apply(group, need)
  if (index + 1 >= data.length) {
    return group
  } else {
    return getGroup(data, index + 1, group)
  }
}

export default {
  name: 'ExpectedBonus',
  props: {
    inputArray: { type: Array },
    bettingList: { type: Array }
  },
  data () {
    return {}
  },
  computed: {
    text () {
      console.log(this.inputArray)
      const temp = [
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ] // 0/2串1 1/3串1 ....
      const arr = getGroup(this.bettingList)
      // 计算出n串1的可能性
      arr.forEach(value => {
        // 过滤1串一的值
        if (Array.isArray(value)) {
          temp[value.length - 2].push(value)
        }
      })
      let sum = 0 // 总金额
      this.inputArray.forEach((value, i) => {
        // 如果是输入框绑定最后一个,她就是n串n否则就是n串1
        if (this.inputArray.length - 1 === i) {
          // n串n
          sum += this.computedSum(temp, value, true)
        } else {
          // n串1
          sum += this.computedSum(temp[i], value)
        }
      })
      return sum
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

<style scoped>

</style>
