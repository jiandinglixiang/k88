<template>
  <div class="football-bf-lottery">
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
          <thead class="red">
          <tr>
            <td colspan="7">胜</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td :class="{selected:isDialogSelected(item)}"
                @click="onDialogOptionSelected(item, 0)"
                v-for="item in firstLine(schedule.holderList[0])">
              <span class="text-light">{{item.text}}</span>
              <p>{{item.value}}</p>
            </td>
          </tr>
          <tr>
            <td :class="{selected: isDialogSelected(item)}"
                :colspan="index === 5 ? 2 : 1"
                @click="onDialogOptionSelected(item, 0)"
                v-for="(item, index) in secondLine(schedule.holderList[0])">
              <span class="text-light">{{item.text}}</span>
              <p>{{item.value}}</p>
            </td>
          </tr>
          </tbody>
        </table>
        <table cellpadding="0" cellspacing="1" class="text-center text-sm margin-top-5">
          <thead class="yellow">
          <tr>
            <td colspan="7">平</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td :class="{selected: isDialogSelected(item)}"
                :colspan="index === 5 ? 2 : 1"
                @click="onDialogOptionSelected(item, 1)"
                v-for="(item, index) in schedule.holderList[1]">
              <span class="text-light">{{item.text}}</span>
              <p>{{item.value}}</p>
            </td>
          </tr>
          </tbody>
        </table>
        <table cellpadding="0" cellspacing="1" class="text-center text-sm margin-top-5">
          <thead class="green">
          <tr>
            <td colspan="7">负</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td :class="{selected: isDialogSelected(item)}"
                @click="onDialogOptionSelected(item, 2)"
                v-for="item in firstLine(schedule.holderList[2])">
              <span class="text-light">{{item.text}}</span>
              <p>{{item.value}}</p>
            </td>
          </tr>
          <tr>
            <td :class="{selected: isDialogSelected(item)}"
                :colspan="index === 5 ? 2 : 1"
                @click="onDialogOptionSelected(item, 2)"
                v-for="(item, index) in secondLine(schedule.holderList[2])">
              <span class="text-light">{{item.text}}</span>
              <p>{{item.value}}</p>
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
  name: 'footballBFLottery',
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
    onPanelShow () {
      this.dialogItemSelected = [...this.schedule.selected]
      this.bettingPanelVisible = true
    },
    onPanelHide () {
      this.bettingPanelVisible = false
    },
    firstLine (arr) {
      return arr.filter((v, i) => i < 7)
    },
    secondLine (arr) {
      return arr.filter((v, i) => i > 6)
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
  .football-bf-lottery {
    padding-left: 10px;
    font-size: 14px;
  }

  .football-bf-lottery .box {
    border: 1px solid $c494949;
    border-radius: 4px;
    overflow: hidden;
    background: $c494949;
    text-align: center;
    margin-top: 8px;
    font-size: 14px;
    padding: 7px 0;
    position: relative;
    color: $c999999;
  }

  .football-bf-lottery .box.selected {
    background: $cffC63A;
    color: $c131313;
  }

  .football-bf-lottery .box.box-icon {
    padding-right: 15px;
  }

  .football-bf-lottery .box .arrow-right {
    display: none;
  }

  .football-bf-lottery .box.box-icon .arrow-right {
    position: absolute;
    right: 8px;
    top: 10px;
    display: block;
  }

  .football-bf-lottery .table-wrap {
    padding: 0px 5px 5px 5px;
  }

  .football-bf-lottery table {
    width: 100%;
    /*background: #ccc;*/
  }

  .football-bf-lottery table tbody td {
    background: $c313131;
    padding: 3px 0;
    color: $c999999;
  }

  .football-bf-lottery table tbody td.selected {
    background: $cffC63A;
    color: $c131313;

    span {
      color: $c131313;
    }
  }

  .football-bf-lottery table thead {
    color: white;
  }

  .football-bf-lottery table .red {
    background: #FF3333;
  }

  .football-bf-lottery table .yellow {
    background: #3393FF;
  }

  .football-bf-lottery table .green {
    background: #1AC456;
  }

  .football-bf-lottery .dialog .content {
    width: 95%;
    max-width: 320px;
    /*background: #f2f2f2;*/
  }

  .football-bf-lottery .btn-wrap .btn {
    background: $c131313;
    color: $cffC63A;
    border-top: 1px solid $c313131;
    margin-top: 5px;
    border-radius: 0;
  }

  .football-bf-lottery .btn-wrap .col:first-child .btn {
    border-right: 1px solid $c313131;
    color: #666;
  }
</style>
