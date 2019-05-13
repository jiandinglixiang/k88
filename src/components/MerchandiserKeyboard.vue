<template>
  <mt-popup
    class="MerchandiserKeyboard-body"
    position="bottom"
    v-model="popupVisible">
    <div class="body-top">
      <div class="row top">
        <div class="col col-50 col-center">
          <span class="text-normal ellipsis" style="width: 80%; display: inline-block">{{series}}</span>
        </div>
        <div class="col">
          <div class="custom-select-box clear pull-right">
            <span class="label">倍数</span>
            <div class="box pull-left">
              <span @click="calculate(-1)">-</span>
              <input class="text" disabled pattern="[0-9]" type="number" v-model="multiple">
              <span @click="calculate(-2)">+</span>
            </div>
          </div>
        </div>
      </div>
      <div class="summary">
          <span>
            {{confirm.stakeCount}}注 {{confirm.multiple}}倍
            <span class="text-primary">共{{totalmoney}}元</span>
          </span>
        <div class="pull-right text-light ellipsis" style="width: 50%">
          预计奖金:{{confirm.bonus.min * confirm.multiple | currency}} ~ {{confirm.bonus.max * confirm.multiple |
          currency}}元
        </div>
      </div>
    </div>
    <table class="body-keyboard">
      <tr>
        <td @click="calculate(1)">1</td>
        <td @click="calculate(2)">2</td>
        <td @click="calculate(3)">3</td>
        <td @click="calculate(-3)" colspan="2" rowspan="2">重置</td>
      </tr>
      <tr>
        <td @click="calculate(4)">4</td>
        <td @click="calculate(5)">5</td>
        <td @click="calculate(6)">6</td>
      </tr>
      <tr>
        <td @click="calculate(7)">7</td>
        <td @click="calculate(8)">8</td>
        <td @click="calculate(9)">9</td>
        <td @click="calculate(-4)" colspan="2" rowspan="2" style="color: #e73f40">确定</td>
      </tr>
      <tr>
        <td @click="calculate(0)">0</td>
        <td @click="calculate(-1)">－1</td>
        <td @click="calculate(-2)">＋1</td>
      </tr>
    </table>
  </mt-popup>
</template>

<script>//
export default {
  name: 'MerchandiserKeyboard',
  props: {
    Merchandiser: { type: Number, default: 1 },
    show: { type: Boolean },
    series: { type: String },
    confirm: { type: Object },
    totalmoney: { type: Number }
  },
  data () {
    return {
      popupVisible: this.show,
      multiple: this.Merchandiser || 1
    }
  },
  methods: {
    calculate (key) {
      if (key > -1) {
        if (this.multiple > 0) {
          this.multiple = (this.multiple * 10 + key)
        } else {
          this.multiple = key
        }
      } else {
        switch (key) {
          case -1:
            if (this.multiple > 0) this.multiple -= 1
            break
          case -2:
            this.multiple += 1
            break
          case -3:
            this.multiple = 0
            break
          case -4:
            this.$emit('update:Merchandiser', this.multiple)
            this.newVal(false)
            this.$emit('okClick')
            break
          default:
        }
      }
    },
    newVal (Boolean, reset) {
      // 设置是否显示 重置当前组件的值为初始值
      if (reset) {
        this.multiple = this.Merchandiser
      }
      this.popupVisible = Boolean
    }
  },
  watch: {
    popupVisible (newv) {
      this.$emit('update:show', newv)
    },
    show (val) {
      this.newVal(val)
    },
    Merchandiser (val) {
      this.multiple = val
    },
    multiple (val) {
      this.$emit('multiple-change', val)
    }
  }
}
</script>

<style scoped>
  .MerchandiserKeyboard-body {
    width: 100%;
    max-width: 640px;
    background-color: #f5f5f5;
  }

  .MerchandiserKeyboard-body .body-top {
    /*display: flex;*/
    /*flex-flow: row nowrap;*/
    /*justify-content: flex-start;*/
    /*align-items: center;*/
    /*font-size: 16px;*/
    /*color: #999999;*/
    background-color: #fff;
  }

  .MerchandiserKeyboard-body .body-top > input {
    background-color: #f0f0f0;
    text-align: center;
    font-size: 16px;
    color: #999999;
    margin: 5px;
    flex: 4;
  }

  .MerchandiserKeyboard-body .body-top img {
    width: 22px;
    height: 17px;
    vertical-align: middle;
  }

  .MerchandiserKeyboard-body .body-keyboard {
    width: 100%;
    margin-bottom: 5px;
    table-layout: fixed;
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }

  .body-keyboard td:nth-child(1), .body-keyboard td:nth-child(2), .body-keyboard td:nth-child(3) {
    background-color: white;
    width: 20%;
  }

  .body-keyboard td:nth-child(4) {
    width: 40%;
    background-color: white;
  }

  .body-keyboard td {
    padding: 5% 0;
  }

  .body-keyboard td:active {
    background-color: #d0d0d0;
  }

  .custom-select-box .label,
  .custom-select-box .unit {
    float: left;
    padding-right: 5px;
    height: 32px;
    line-height: 32px;
    font-size: 14px;
    color: #666;
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
    background: #f2f2f2;
    color: #999;
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

  .MerchandiserKeyboard-body .body-top .summary {
    padding: 10px;
  }
</style>
