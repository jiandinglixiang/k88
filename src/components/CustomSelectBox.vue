<template>
  <div :class="type" class="custom-select-box clear">
    <span class="label" v-if="label">{{label}}</span>
    <div class="box pull-left">
      <span @click="decrease">-</span>
      <input @click="inputclick" class="text" readonly type="input" v-model="input">
      <span @click="increase">+</span>
    </div>
    <span class="unit" v-if="unit">{{unit}}</span>
    <merchandiser-keyboard :Merchandiser.sync="input" :confirm="confirmdata" :series="seriesdata" :show.sync="show"
                           :totalmoney="totalmoney" @multiple-change="inputchange"></merchandiser-keyboard>
  </div>
</template>

<script>//
import MerchandiserKeyboard from './MerchandiserKeyboard'

export default {
  name: 'customSelectBox',
  components: { MerchandiserKeyboard },
  props: {
    label: { type: String },
    value: { required: true, type: Number },
    unit: { type: String },
    type: { type: String },
    min: { type: Number },
    seriesdata: { type: String },
    confirmdata: { type: Object },
    totalmoney: { type: Number }
  },
  data () {
    return {
      input: this.value,
      textMin: this.min === undefined ? 0 : this.min,
      show: false
    }
  },
  methods: {
    increase () {
      const r = this.input + 1
      this.input = r > 9999 ? 9999 : r
      this.$emit('increase', this.input)
    },
    decrease () {
      const r = this.input - 1
      this.input = r >= this.textMin ? r : this.textMin
      this.$emit('decrease', this.input)
    },
    inputclick () {
      this.show = true
    },
    inputchange (val) {
      this.input = val
    }
  },
  watch: {
    value (newValue) {
      this.input = newValue
    },
    input (newValue) {
      const r = (parseInt(newValue) || parseInt(newValue) === 0) ? parseInt(newValue) : this.textMin
      this.input = r > 9999 ? 9999 : r
      this.$emit('change', this.input)
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-select-box .label,
  .custom-select-box .unit {
    float: left;
    padding-right: 5px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: white;
  }

  .custom-select-box .unit {
    padding-left: 5px;
  }

  .custom-select-box .box {
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 112px;
  }

  .custom-select-box .box span {
    width: 30px;
    height: 30px;
    font-size: 18px;
    line-height: 30px;
    float: left;
    text-align: center;
    color: #999;
    @if ($lotteryIg) {
      background: #ddd;
    } @else {
      background: #f2f2f2;
    }
  }

  .custom-select-box .box span:first-child {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .custom-select-box .box span:last-child {
    border-bottom-right-radius: 5px;
    border-top-right-radius: 5px;
  }

  .custom-select-box .text {
    width: 50px;
    border-top: none;
    border-bottom: 0;
    height: 30px;
    line-height: 28px;
    float: left;
    text-align: center;
    border-radius: 0;
    padding: 0;
  }

  .custom-select-box.mini .box {
    width: 80px;
  }

  .custom-select-box.mini .box span {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
  }

  .custom-select-box.mini .text {
    width: 38px;
    height: 20px;
    line-height: 18px;
  }
</style>
