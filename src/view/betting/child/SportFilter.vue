<template>
  <div class="sport-filter" v-show="show">
    <v-dialog @close="closeDialog" title="赛事选择">
      <div class="dialog-container">
        <div class="top-btn-wrap clear">
          <a :class="{selected: currentNav === 0}" @click="navSelect(0)" href="javascript:">全选</a>
          <a :class="{selected: currentNav === 1}" @click="navSelect(1)" href="javascript:">反选</a>
          <a :class="{selected: currentNav === 2}" @click="navSelect(2)" href="javascript:" v-if="type === 'football'">仅五大联赛</a>
        </div>
        <div class="selected-box">
          <div :class="{selected: textIsSelected(text)}"
               :key="`1${q8}`"
               @click="textSelect(text)"
               class="text-item"
               v-for="(text,q8) in textContent">{{text}}
          </div>
        </div>
        <div class="text-center text-light text-sm margin-top-10">
          共有 <span class="text-primary-2">{{total}}</span> 场比赛
        </div>
      </div>
      <div class="btn-wrap clear">
        <a @click="closeDialog" href="javascript:">取消</a>
        <a @click="confirm" href="javascript:">确定</a>
      </div>
    </v-dialog>
  </div>
</template>

<script>//
import VDialog from '../../../components/VDialog.vue'
import { mapState } from 'vuex'
import Toast from '../../../common/toast'
import { SPORTS_FILTER_PANEL_CHANGE } from '../../../store/betting/types'

const FIVE_LEAGUE = ['德甲', '西甲', '英超', '法甲', '意甲']
export default {
  name: 'sportFilter',
  props: ['type'],
  data () {
    return {
      currentNav: 0,
      currentSelected: []
    }
  },
  computed: {
    ...mapState({
      show: state => state.betting.filterPanelVisible
    }),
    textContent () {
      let texts = []
      let current = this.$store.state.betting[this.$store.state.betting.lottery]
      if (current && current.scheme[current.mode === 2 ? 0 : 1]) {
        current.scheme[current.mode === 2 ? 0 : 1].groups.map(value => {
          value.schedules.map(v => {
            if (!texts.includes(v.league)) {
              texts.push(v.league)
            }
          })
        })
        const t$is = this
        t$is.currentSelected = [...texts]
      }
      return texts
    },
    total () {
      let total = 0
      let current = this.$store.state.betting[this.$store.state.betting.lottery]
      if (current && current.scheme[current.mode === 2 ? 0 : 1]) {
        current.scheme[current.mode === 2 ? 0 : 1].groups.map(value => {
          value.schedules.map(v => {
            if (this.currentSelected.includes(v.league)) {
              total++
            }
          })
        })
      }
      return total
    }
  },
  methods: {
    textIsSelected (item) {
      return this.currentSelected.includes(item)
    },
    textSelect (item) {
      let index = this.currentSelected.indexOf(item)
      if (index !== -1) {
        this.currentSelected.splice(index, 1)
      } else {
        this.currentSelected.push(item)
      }
    },
    navSelect (type) {
      if (type === 0) {
        this.currentSelected = [...this.textContent]
      } else if (type === 1) {
        let other = []
        this.textContent.map(v => {
          if (!this.currentSelected.includes(v)) {
            other.push(v)
          }
        })
        this.currentSelected = other
      } else if (type === 2) {
        let other = []
        this.textContent.map(v => {
          if (FIVE_LEAGUE.includes(v)) {
            other.push(v)
          }
        })
        this.currentSelected = other
      }
      this.currentNav = type
    },
    closeDialog () {
      this.$store.commit(SPORTS_FILTER_PANEL_CHANGE, false)
    },
    confirm () {
      if (this.total > 0) {
        this.$store.commit(SPORTS_FILTER_PANEL_CHANGE, false)
        this.$emit('confirm', [...this.currentSelected])
      } else {
        Toast('筛选结果为空,请重新选择')
      }
    }
  },
  components: { VDialog }
}
</script>

<style lang="scss">
  .sport-filter .dialog .content {
    background: $c131313;
  }

  .sport-filter .dialog-container {
    padding: 10px 8px;
  }

  .sport-filter .dialog-container .top-btn-wrap {
    margin: 0 1%;
  }

  .sport-filter .dialog-container .top-btn-wrap a {
    width: 33.3%;
    float: left;
    color: $cffC63A;
    text-align: center;
    font-size: 12px;
    padding: 5px;
    border: 1px solid $c999999;
  }

  .sport-filter .dialog-container .top-btn-wrap a:first-child {
    border-bottom-left-radius: 3px;
    border-top-left-radius: 3px;
    border-right: 0;
  }

  .sport-filter .dialog-container .top-btn-wrap a:last-child {
    border-bottom-right-radius: 3px;
    border-top-right-radius: 3px;
    border-left: 0;
  }

  .sport-filter .dialog-container .top-btn-wrap a.selected {
    background: $cffC63A;
    @if ($lotteryIg) {
      color: $cgray;
    } @else {
      color: $c131313;
    }
  }

  .sport-filter .selected-box {
    padding: 15px 0 0 0;
    max-height: 200px;
    overflow-y: auto;
  }

  .sport-filter .selected-box .text-item {
    margin: 3px 1%;
    width: 31%;
    float: left;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    padding: 5px 0;
    border: 1px solid $c999999;
    color: $c999999;
  }

  .sport-filter .selected-box .text-item.selected {
    background: $c131313 url(../../../assets/betting/selected.png) right bottom no-repeat;
    background-size: auto 60%;
    border: 1px solid $cffC63A;
    color: $cffC63A;
  }

  .sport-filter .btn-wrap a {
    width: 50%;
    float: left;
    padding: 10px 0;
    color: $c999999;
    @if ($lotteryIg) {
      border-top: 1px solid #ddd;
    } @else {
      border-top: 1px solid $c313131;
    }
  }

  .sport-filter .btn-wrap a:last-child {
    color: $cffC63A;
    @if ($lotteryIg) {
      border-left: 1px solid #ddd;
    } @else {
      border-left: 1px solid $c313131;
    }
  }
</style>
