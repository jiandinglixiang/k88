<template>
  <div class="digital-scheme-item">
    <div class="number">
      <span class="text-primary" v-if="ticket.lotteryType == 'syxw' || ticket.lotteryType =='fc3d'">
        <span :key="k" v-for="(r, k) in numberList">
          <span v-if="k > 0">|</span>
          <template v-if="r.pre">
            <span>(</span>
            <span :class="{'margin-left-3': t > 0}" :key="`111${t}`" v-for="(p, t) in r.pre">{{p.text}}</span>
            <span>)</span>
          </template>
          <span :key="`22${n}`" class="margin-right-3" v-for="(i,n) in r.next">{{i.text}}</span>
        </span>
      </span>
      <span class="text-green " v-else-if="ticket.lotteryType === 'k3'">
        {{ticket.betText}}
      </span>
      <span v-else>
        <template v-for="(r, k) in numberList">
          <template v-if="r.pre">
            <span :class="{'text-primary': k == 0, 'text-blue': k == 1}" :key="`111${k}`">(</span>
            <span :class="{'margin-left-3': t > 0, 'text-primary': k == 0, 'text-blue': k == 1}" :key="`222${k}${t}`"
                  v-for="(p, t) in r.pre">{{p.text}}</span>
            <span :class="{'text-primary': k == 0, 'text-blue': k == 1}" :key="`333${k}`">)</span>
          </template>
          <span :class="{'text-primary': k == 0, 'text-blue': k == 1}" :key="`444${k}${n4}`" class="margin-right-3"
                v-for="(i,n4) in r.next">{{i.text}}</span>
        </template>
      </span>
    </div>
    <div class="summary text-sm margin-top-5 text-light">
      {{ticket.playTypeText}}
      {{ticket.stakeCount}}注
      {{ticket.totalAmount}}元
    </div>
  </div>
</template>

<script>//
export default {
  name: 'digitalSchemeItem',
  props: {
    ticket: { type: Object, required: true }
  },
  computed: {
    numberList () {
      let betNumber = this.ticket.betNumber || ''
      let result = {}
      let results = []
      let hasBlock = betNumber.indexOf('#') !== -1
      result.block = hasBlock ? betNumber.split('#') : [betNumber]
      result.block.map(value => {
        let hasFixed = value.indexOf('@') !== -1
        let obj = {}
        if (hasFixed) {
          let temp = value.split('@')
          obj.pre = temp[0].split(',').map(v => {
            return { text: v }
          })
          obj.next = temp[1].split(',').map(v => {
            return { text: v }
          })
        } else {
          obj.next = value.split(',').map(v => {
            return { text: v }
          })
        }
        results.push(obj)
      })
      return results
    }
  }
}
</script>

<style scoped>
  .digital-scheme-item .text-blue {
    color: #3f67e7;
  }

  .digital-scheme-item span {
    word-break: break-all;
  }
</style>
