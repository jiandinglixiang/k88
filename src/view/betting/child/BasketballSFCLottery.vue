<template>
  <div class="basketball-sfc-lottery">
    <div class="row text-center text-default-2 text-sm">
      <div class="col"><span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span>{{schedule.guest}}
      </div>
      <div class="col text-light">VS</div>
      <div class="col">{{schedule.home}}<span class="text-primary"
                                              v-if="schedule.home_rank">[{{schedule.home_rank}}]</span></div>
    </div>
    <div :class="{'box-icon': isConfirm}" class="box">
      <div :class="{selected: boxText}"
           @click="onPanelShow"
           class="box-item ellipsis">
        <span>{{boxText || '请选择投注内容'}}</span>
        <span class="arrow-right"></span>
      </div>
    </div>
    <v-dialog
      :title="schedule.guest + ' (客) VS  ' + schedule.home + '(主)' "
      @close="onPanelHide()"
      v-show="bettingPanelVisible">
      <div class="table-wrap">
        <table cellpadding="0" cellspacing="1" class="text-center text-sm">
          <thead>
          <tr>
            <td class="blue" colspan="3">客胜</td>
          </tr>
          </thead>
          <tbody>
          <tr :key="index1" v-for="(guestTd,index1) in guestTr">
            <td :class="{selected: isDialogSelected(guest)}"
                :key="index2"
                @click="onDialogOptionSelected(guest)" v-for="(guest,index2) in guestTd">
              <span class="text-light margin-right-10">{{guest.text}}</span>
              {{guest.value}}
            </td>
          </tr>
          </tbody>
        </table>
        <table cellpadding="0" cellspacing="1" class="text-center text-sm margin-top-10">
          <thead>
          <tr>
            <td class="red" colspan="3">主胜</td>
          </tr>
          </thead>
          <tbody>
          <tr :key="index1" v-for="(homeTd,index1) in homeTr">
            <td :class="{selected: isDialogSelected(home)}"
                :key="index2"
                @click="onDialogOptionSelected(home)" v-for="(home,index2) in homeTd">
              <span class="text-light margin-right-10">{{home.text}}</span>
              {{home.value}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="btn-wrap row">
        <div class="col"><a @click="onPanelHide()" class="btn" href="javascript:">取消</a></div>
        <div class="col"><a @click="onPanelConfirm()" class="btn" href="javascript:">确认</a></div>
      </div>
    </v-dialog>
  </div>
</template>

<script>//
import { SPORTS_OPTION_SELECTED } from '../../../store/betting/types'
import VDialog from '../../../components/VDialog.vue'
import { LotteryBasketballKey } from '../../../store/constants'

export default {
  name: 'basketballSFCLottery',
  props: ['schedule', 'isConfirm'],
  data () {
    return {
      dialogItemSelected: [],
      bettingPanelVisible: false
    }
  },
  computed: {
    homeTr () {
      let list = []
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          if (!list[i]) list[i] = []
          list[i][j] = this.schedule.holderList[i * 3 + j]
        }
      }
      return list
    },
    guestTr () {
      let list = []
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 3; j++) {
          if (!list[i]) list[i] = []
          list[i][j] = this.schedule.holderList[(i + 2) * 3 + j]
        }
      }
      return list
    },
    boxText () {
      return this.schedule.selected.map(value => {
        return LotteryBasketballKey.betting_score_sfc[value.key] || '错误'
      }).join(',')
    }
  },
  methods: {
    onDialogOptionSelected (item) {
      const index = this.dialogItemSelected.indexOf(item)
      index !== -1 ? this.dialogItemSelected.splice(index, 1) : this.dialogItemSelected.push(item)
      console.log(this.dialogItemSelected)
    },
    onOptionSelected (item) {
      this.schedule.onOptionSelected(item)
      this.$store.commit(SPORTS_OPTION_SELECTED)
      this.$emit('onOptionSelected')
    },
    onPanelShow () {
      this.dialogItemSelected = [...this.schedule.selected]
      this.bettingPanelVisible = true
    },
    onPanelHide () {
      this.bettingPanelVisible = false
    },
    onPanelConfirm () {
      this.schedule.onOptionSelected(this.dialogItemSelected)
      this.$store.commit(SPORTS_OPTION_SELECTED)
      this.$emit('onOptionSelected')
      this.bettingPanelVisible = false
    },
    isDialogSelected (item) {
      return this.dialogItemSelected.indexOf(item) !== -1
    }
  },
  components: { VDialog }
}
</script>

<style lang="scss">
  .basketball-sfc-lottery {
    padding-left: 10px;
    font-size: 14px;
    @if ($lotteryIg) {
      .text-center.text-default-2 .text-light {
        color: $cgray;
      }
    }
  }

  .basketball-sfc-lottery .box {
    border-radius: 4px;
    overflow: hidden;
    text-align: center;
    margin-top: 8px;
    font-size: 13px;
    position: relative;
    color: $c999999;
    @if ($lotteryIg) {
      background: $cFFfFFF;
      border: 1px solid $cFFfFFF;
    } @else {
      background: $c494949;
      border: 1px solid $c494949;
    }
  }

  .basketball-sfc-lottery .box .arrow-right {
    display: none;
  }

  .basketball-sfc-lottery .box.box-icon .arrow-right {
    position: absolute;
    right: 5px;
    top: 10px;
    display: block;
  }

  .basketball-sfc-lottery .box .box-item {
    padding: 7px 5px;
    width: 100%;
  }

  .basketball-sfc-lottery .box .box-item.selected {
    background: $cffC63A;
    @if ($lotteryIg) {
      color: $cgray;
    } @else {
      color: $c131313;
    }
  }

  .basketball-sfc-lottery .dialog .content {
    width: 95%;
    max-width: 320px;
    /*background: #f2f2f2;*/
    @if ($lotteryIg) {
      background: #F2F2F2;
    }
  }

  .basketball-sfc-lottery .table-wrap {
    padding: 0 10px;
  }

  .basketball-sfc-lottery table {
    width: 100%;
  }

  .basketball-sfc-lottery table td {
    padding: 5px;
    color: $cFFfFFF;
    @if ($lotteryIg) {
      background: $cFFfFFF;
    } @else {
      background: $c313131;
    }
  }

  .basketball-sfc-lottery table td.blue {
    background: #3393FF;
    color: white;
  }

  .basketball-sfc-lottery table td.red {
    background: #FF3333;
    color: white;
  }

  .basketball-sfc-lottery table td.selected {
    background: $cffC63A;

    @if ($lotteryIg) {
      span {
        color: $cgray;
      }
    } @else {
      span {
        color: $c131313;
      }
    }
  }

  .basketball-sfc-lottery .btn-wrap .btn {
    color: $cffC63A;
    margin-top: 5px;
    border-radius: 0;
    @if ($lotteryIg) {
      background: #F2F2F2;
      border-top: 1px solid #F2F2F2;
    } @else {
      background: $c131313;
      border-top: 1px solid $c313131;
    }
  }

  .basketball-sfc-lottery .btn-wrap .col:first-child .btn {
    color: white;

    @if ($lotteryIg) {
      border-right: 1px solid #ddd;
    } @else {
      border-right: 1px solid $c313131;
    }
  }
</style>
