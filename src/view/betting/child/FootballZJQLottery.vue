<template>
  <div class="football-zjq-lottery">
    <div class="row text-center text-default-2 text-sm">
      <div class="col col-40"><span class="text-primary" v-if="schedule.home_rank">[{{schedule.home_rank}}]</span>{{schedule.home}}
      </div>
      <div class="col text-light">VS</div>
      <div class="col col-40">{{schedule.guest}} <span class="text-primary" v-if="schedule.guest_rank">[{{schedule.guest_rank}}]</span>
      </div>
    </div>
    <template v-if="!isConfirm">
      <div class="box">
        <div :class="{selected: isSelected(item), 'border-bottom': index < 4}"
             :key="index"
             @click="onOptionSelected(item, index)"
             class="box-item text-right" v-for="(item, index) in schedule.holderList">
          <span> <i class="text-light pull-left">{{item.text}}</i> {{item.value}}</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div @click="onPanelShow" class="box">
        <div class="box-text">{{boxText}}</div>
        <span class="arrow-right"></span>
      </div>
    </template>
    <v-dialog :title="schedule.home + ' VS ' + schedule.guest" @close="onPanelHide()" v-show="bettingPanelVisible">
      <div class="table-wrap">
        <table cellpadding="0" cellspacing="1" class="text-center text-sm">
          <thead class="blue">
          <tr>
            <td colspan="4">总进球</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <template v-for="(item, index) in schedule.holderList">
              <td :class="{selected: isDialogSelected(item)}"
                  :key="index"
                  @click="onDialogOptionSelected(item, index)"
                  v-if="index < 4">
                <span> <i class="text-light pull-left">{{item.text}}</i> {{item.value}}</span>
              </td>
            </template>
          </tr>
          <tr>
            <template v-for="(item, index) in schedule.holderList">
              <td :class="{selected: isDialogSelected(item)}"
                  :key="index"
                  @click="onDialogOptionSelected(item, index)"
                  v-if="index > 3">
                <span> <i class="text-light pull-left">{{item.text}}</i> {{item.value}}</span>
              </td>
            </template>
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

export default {
  name: 'footballZJQLottery',
  props: ['schedule', 'isConfirm'],
  data () {
    return {
      bettingPanelVisible: false,
      dialogItemSelected: [...this.schedule.selected]
    }
  },
  computed: {
    boxText () {
      let items = []
      this.schedule.selected.map(v => items.push(v.text))
      return items.join(',')
    }
  },
  methods: {
    onDialogOptionSelected (item) {
      const index = this.dialogItemSelected.indexOf(item)
      index !== -1 ? this.dialogItemSelected.splice(index, 1) : this.dialogItemSelected.push(item)
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
    },
    isSelected (item) {
      return this.schedule.selected.indexOf(item) !== -1
    }
  },
  components: { VDialog }
}
</script>

<style lang="scss">
  .football-zjq-lottery {
    padding-left: 10px;
    font-size: 14px;
    @if ($lotteryIg) {
      .text-center.text-default-2 .text-light {
        color: $cgray;
      }
    }
  }

  .football-zjq-lottery .box {
    border-radius: 4px;
    overflow: hidden;
    text-align: center;
    margin-top: 8px;
    font-size: 13px;
    position: relative;
    @if ($lotteryIg) {
      background: $cFFfFFF;
      border: 1px solid $cFFfFFF;
    } @else {
      background: $c494949;
      border: 1px solid $c494949;
    }
  }

  .football-zjq-lottery .box-text {
    height: 30px;
    line-height: 30px;
    background: $cffC63A;
    @if ($lotteryIg) {
      color: $cgray;
    } @else {
      color: $c131313;
    }
  }

  .football-zjq-lottery .box .arrow-right {
    position: absolute;
    right: 5px;
    top: 10px;
  }

  .football-zjq-lottery .box .box-item {
    padding: 7px 0;
    float: left;
    width: 25%;
  }

  .football-zjq-lottery .box .box-item.border-bottom {
    @if ($lotteryIg) {
      border-bottom: 1px solid #ddd;
    } @else {
      border-bottom-top: 1px solid $c3f3f3f;
    }
  }

  .football-zjq-lottery .box .box-item span {
    display: inline-block;
    width: 100%;
    padding: 0 3px;
    box-sizing: border-box;
    @if ($lotteryIg) {
      border-left: 1px dotted #ddd;
      color: $c999999;
    } @else {
      border-left: 1px dotted $c3f3f3f;
      color: $cFFfFFF;
    }
  }

  @media screen and (min-width: 321px) {
    .football-zjq-lottery .box .box-item span {
      padding: 0 8px;
    }
  }

  .football-zjq-lottery .box .box-item:nth-child(1) span,
  .football-zjq-lottery .box .box-item:nth-child(5) span {
    border-left: none;
  }

  .football-zjq-lottery .box .box-item.selected {
    background: $cffC63A;
    color: $c131313;
  }

  .football-zjq-lottery .box .box-item.selected span {

    @if ($lotteryIg) {
      color: $cgray;
      .text-light {
        color: $cgray;
      }
    } @else {
      color: $c131313;
      .text-light {
        color: $c131313;
      }
    }
  }

  .football-zjq-lottery .table-wrap {
    padding: 0 0 5px 0;
  }

  .football-zjq-lottery table {
    width: 100%;
    /*background: #ccc;*/
  }

  .football-zjq-lottery table tbody td {
    padding: 5px;
    color: $c999999;
    @if ($lotteryIg) {
      background: $cFFfFFF;
    } @else {
      background: $c313131;
    }
  }

  .football-zjq-lottery table tbody td.selected {
    background: $cffC63A;

    @if ($lotteryIg) {
      color: $cgray;
      .text-light {
        color: $cgray;
      }
    } @else {
      color: $c131313;
      .text-light {
        color: $c131313;
      }
    }
  }

  .football-zjq-lottery table .blue {
    background: #3393FF;
    @if ($lotteryIg) {
      color: $cFFfFFF;
    }
  }

  .football-zjq-lottery .dialog .content {
    width: 95%;
    max-width: 320px;
    /*background: #f2f2f2;*/
    @if ($lotteryIg) {
      background: #F2F2F2;
    }
  }

  .football-zjq-lottery .btn-wrap .btn {
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

  .football-zjq-lottery .btn-wrap .col:first-child .btn {
    color: #666;
    @if ($lotteryIg) {
      border-right: 1px solid #ddd;
    } @else {
      border-right: 1px solid $c313131;
    }
  }
</style>
