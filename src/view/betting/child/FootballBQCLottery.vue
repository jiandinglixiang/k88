<template>
  <div class="football-bqc-lottery">
    <div class="row text-center text-default-2 text-sm">
      <div class="col col-40"><span class="text-primary" v-if="schedule.home_rank">[{{schedule.home_rank}}]</span>{{schedule.home}}
      </div>
      <div class="col text-light">VS</div>
      <div class="col col-40">{{schedule.guest}} <span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span>
      </div>
    </div>
    <div :class="{selected: boxText, 'box-icon': isConfirm && boxText}" @click="onPanelShow()" class="box ellipsis">
      <span>{{boxText || '请点击展开投注'}}</span>
      <span class="arrow-right"></span>
    </div>
    <v-dialog :title="schedule.home + ' VS ' + schedule.guest" @close="onPanelHide()" v-show="bettingPanelVisible">
      <div class="table-wrap">
        <table cellpadding="0" cellspacing="1" class="text-center text-sm">
          <thead class="green">
          <tr>
            <td colspan="3">半全场</td>
          </tr>
          </thead>
          <tbody>
          <tr :key="n7" v-for="(list,n7) in tableTrList">
            <td :class="{selected: isDialogSelected(item)}" :key="n8" @click="onDialogOptionSelected(item)"
                class="text-left"
                v-for="(item,n8) in list"
            >
              <span class="text-light">{{item.text}}</span>
              <span class="text-value">{{item.value}}</span>
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
import VDialog from '../../../components/VDialog.vue'
import { SPORTS_OPTION_SELECTED } from '../../../store/betting/types'

export default {
  name: 'footballBQCLottery',
  props: ['schedule', 'isConfirm'],
  data () {
    return {
      bettingPanelVisible: false,
      dialogItemSelected: [...this.schedule.selected]
    }
  },
  computed: {
    tableTrList () {
      let list = []
      this.schedule.holderList.map((value, index) => {
        let floor = Math.floor(index / 3)
        !list[floor] && (list[floor] = [])
        list[floor].push(value)
      })
      return list
    },
    boxText () {
      let items = []
      this.schedule.selected.map(v => items.push(v.text))
      return items.join(',')
    }
  },
  methods: {
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
    isDialogSelected (item) {
      return this.dialogItemSelected.indexOf(item) !== -1
    },
    onDialogOptionSelected (item) {
      const index = this.dialogItemSelected.indexOf(item)
      index !== -1 ? this.dialogItemSelected.splice(index, 1)
        : this.dialogItemSelected.push(item)
    },
    onPanelConfirm () {
      console.log('dialog', this.dialogItemSelected)
      this.schedule.onOptionSelected(this.dialogItemSelected)
      this.$store.commit(SPORTS_OPTION_SELECTED)
      this.$emit('onOptionSelected')
      this.bettingPanelVisible = false
    }
  },
  components: { VDialog }
}
</script>

<style lang="scss">
  .football-bqc-lottery {
    padding-left: 10px;
    font-size: 14px;
    @if ($lotteryIg) {
      .text-center.text-default-2 .text-light {
        color: $cgray;
      }
    }
  }

  .football-bqc-lottery .box {
    border-radius: 4px;
    overflow: hidden;
    text-align: center;
    margin-top: 8px;
    font-size: 14px;
    padding: 7px 0;
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

  .football-bqc-lottery .box.box-icon {
    padding-right: 15px;
  }

  .football-bqc-lottery .box .arrow-right {
    display: none;
  }

  .football-bqc-lottery .box.box-icon .arrow-right {
    position: absolute;
    right: 8px;
    top: 10px;
    display: block;
  }

  .football-bqc-lottery .box.selected {
    background: $cffC63A;
    @if ($lotteryIg) {
      color: $cgray;
    } @else {
      color: $c131313;
    }
  }

  .football-bqc-lottery .table-wrap {
    padding: 0px 5px 5px 5px;
  }

  .football-bqc-lottery table {
    width: 100%;
    /*background: #ccc;*/
  }

  .football-bqc-lottery table tbody td {
    padding: 5px 10px;
    color: $c999999;
    @if ($lotteryIg) {
      background: $cFFfFFF;
    } @else {
      background: $c313131;
    }
  }

  .football-bqc-lottery table tbody td .text-value {
    margin-left: 10px;
  }

  .football-bqc-lottery table tbody td.selected {
    background: $cffC63A;

    @if ($lotteryIg) {
      color: $cgray;
      span {
        color: $cgray;
      }
    } @else {
      color: $c131313;
      span {
        color: $c131313;
      }
    }
  }

  .football-bqc-lottery table thead {
    color: $cFFfFFF;
    padding: 5px 0;
  }

  .football-bqc-lottery table .green {
    background: #1AC456;
    color: $cFFfFFF;
  }

  .football-bqc-lottery .dialog .content {
    width: 95%;
    max-width: 320px;
    /*background: #f2f2f2;*/
    @if ($lotteryIg) {
      background: #F2F2F2;
    }
  }

  .football-bqc-lottery .btn-wrap .btn {
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

  .football-bqc-lottery .btn-wrap .col:first-child .btn {
    color: #666;
    @if ($lotteryIg) {
      border-right: 1px solid #ddd;
    } @else {
      border-right: 1px solid $c313131;
    }
  }
</style>
