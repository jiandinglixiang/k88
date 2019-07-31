<template>
  <div class="f-filter-match">
    <p class="f-title">赛事选择</p>
    <ul class="f-filter-one">
      <li @click.stop="addInverse(0)" :class="filterUnconfirmed.length===filterTypeArr.length&&'active-select'">全选</li>
      <li @click.stop="addInverse(1)">反选</li>
      <li @click.stop="addInverse(2)">仅五大联赛</li>
    </ul>
    <select-game
      :list="filterTypeArr"
      keys="value"
      :target="filterUnconfirmed"
      @switchTarget="addFilter"
    />
    <p class="f-descriptio">共 <span>{{several}}</span> 场比赛</p>
    <div class="f-filter-button">
      <button>取消</button>
      <button @click="filterUpdate">确定</button>
    </div>
  </div>
</template>

<script>// 筛选
import SelectGame from './SelectGame.vue'
import { mapState } from 'vuex'
import { copy } from '../../common/util.js'

const FIVE_LEAGUE = ['德甲', '西甲', '英超', '法甲', '意甲']

export default {
  name: 'FilterMatch',
  components: { SelectGame },
  props: {
    maskShow: Boolean,
    filterArr: [Array, Boolean] // false默认不过滤,[]过滤
  },
  created () {
    this.filterUnconfirmed = copy(this.filterTypeArr)
  },
  data () {
    return {
      filterUnconfirmed: [] // 没有操作
    }
  },
  computed: {
    ...mapState({
      filterTypeArr: state => state.grounder[state.grounder.lotteryId].reduce(function (arr, val) {
        return val.schedules.reduce(function (arr2, val2) {
          const addLeague = arr2.some(value => {
            const isEqual = value.value === val2.league
            if (isEqual) value.num++
            return isEqual
          })
          !addLeague && arr2.push({ value: val2.league, num: 1 })
          return arr2
        }, arr)
      }, [])
    }),
    several () {
      // 如果没有过滤条件 默认全选
      const arr = this.filterUnconfirmed
      return arr.reduce(function (total, val) {
        return total + val.num
      }, 0)
    }
  },
  methods: {
    addFilter (val) {
      let isExist
      const transcript = this.filterUnconfirmed.map((value, index) => {
        if (value.value === val.value) isExist = index
        return { ...value }
      })
      if (typeof isExist === 'number') {
        transcript.splice(isExist, 1)
      } else {
        transcript.push(val)
      }
      this.filterUnconfirmed = transcript
    },
    addInverse (x) {
      const [len1, len2] = [this.filterUnconfirmed.length, this.filterTypeArr.length]
      let arr = []
      // console.log(x)
      if (x === 0) {
        if (len1 !== len2) arr = this.filterTypeArr
      } else if (x === 1) {
        if (len1 !== len2) {
          arr = this.filterTypeArr.filter((val1) => !this.filterUnconfirmed.some(function (val2) {
            return val2.value === val1.value
          }))
        }
      } else {
        // x===2
        arr = this.filterTypeArr.filter((val1) => FIVE_LEAGUE.some(function (val2) {
          return val2 === val1.value
        }))
      }
      this.filterUnconfirmed = copy(arr)
    },
    filterUpdate () {
      if (this.filterUnconfirmed.length !== this.filterTypeArr.length) {
        return this.$emit('update:filter-arr', copy(this.filterUnconfirmed))
      }
      this.$emit('update:filter-arr', false)
    }
  },
  watch: {
    maskShow (ne) {
      if (ne && Array.isArray(this.filterArr)) {
        this.filterUnconfirmed = this.filterArr.length ? copy(this.filterArr) : []
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .f-filter-match {
    overflow: hidden;
    width: 320px;
    margin: 0 10px;
    align-self: center;
    text-align: center;
    background-color: #131313;

    .f-title {
      margin: 10px 0;
      color: #ccc;
      font-size: 15px;
    }

    .f-filter-one {
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      margin: 0 10px;
      overflow: hidden;

      > li {
        margin: 10px 0;
        box-sizing: border-box;
        overflow: hidden;
        flex: 0 1 33.3%;
        border: 1px solid #999;
        text-align: center;
        line-height: 30px;
        height: 30px;
        font-size: 14px;
        text-wrap: normal;
        color: #ffc63a;
        font-weight: bold;

        &:active, &.active-select {
          color: #131313;
          border-color: #ffc63a;
          background-color: #ffc63a;
        }
      }

      > li:nth-child(3n+2), li:nth-child(3n+0) {
        border-left: 0;
      }

      > li:nth-child(3n+1) {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
      }

      > li:last-child, > li:nth-child(3n+0) {
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
    }

    .f-descriptio {
      overflow: hidden;
      color: #999999;
      font-weight: 500;
      margin: 10px;

      > span {
        color: #ffc63a;
      }
    }

    .f-filter-button {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;

      > button {
        flex: 1 1 50%;
        height: 40px;
        background-color: #131313;
        border-top: 1px solid #313131;
      }

      > button:first-child {
        color: #999;
        border-right: 1px solid #313131;
      }

      > button:last-child {
        color: #ffc63a;
      }
    }
  }

</style>
