<template>
  <div class="ah-football-qcrq-lottery">
    <template v-if="currentMode === 1">
      <template v-if="isConfirm">
        <template v-for="(item, index) in selectedList">
          <div :key="index" class="scheme-box-item">
            <span @click="deleteBetting(index,item)" class="scheme-delete-icon poa-m"></span>
            <div class="padding-left-10">
              <div class="row text-center text-default-2 text-sm">
                <div class="col col-40">{{item.home}}</div>
                <div class="col text-light">VS</div>
                <div class="col col-40">{{item.guest}}</div>
              </div>
              <div class="box order-list">
                <div class=" ellipsis text-center box-icon selected margin-bottom">{{ item.name }}({{ item.text }})
                  <span>{{ item.value }}</span>
                </div>
                <!--单关显示 -->
                <div class="row order-input-text">
                  <div class="col col-50 padding-right-10 text-left c-white">
                    <div class="row ellipsis">
                      <div class="col">投注金额</div>
                      <div class="col text-right">1注</div>
                    </div>
                    <div class="row margin-top-5">
                      <div class="col">投注上限</div>
                      <div class="col ellipsis text-right">{{ item.upperLimit }}</div>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-text text-center">
                      <input placeholder="请输入投注金额" type="number" v-model="ValueArray[index]">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="padding-left-10">
          <div class="row text-center text-default-2 text-sm">
            <div class="col col-40">{{schedule.home}}</div>
            <div class="col text-light">VS</div>
            <div class="col col-40">{{schedule.guest}}</div>
          </div>
          <div class="box">
            <div :class="{selected: isSelected(item), 'border-top': index > 1}"
                 :key="index"
                 @click="selectedItem(item)"
                 class="box-item row" v-for="(item, index) in schedule.holderList">
              <div class="col-60 text-center">{{ item.text}}</div>
              <div :class="isStyle(item.str)" class="col text-color">{{ twoDecimal[index] }}<span
                class="arrow-icon"></span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="padding-left-10">
        <div class="row text-center text-default-2 text-sm">
          <div class="col col-40">{{schedule.home}}</div>
          <div class="col text-light">VS</div>
          <div class="col col-40">{{schedule.guest}}</div>
        </div>
        <div class="box order-list" v-if="isConfirm">
          <div class=" ellipsis text-center box-icon selected margin-bottom">{{boxText}}) <span>{{ boxValue }}</span>
          </div>
        </div>
        <div class="box" v-else>
          <div :class="{selected: isSelected(item), 'border-top': index > 1}"
               :key="index"
               @click="selectedItem(item)"
               class="box-item row" v-for="(item, index) in schedule.holderList">
            <div class="col-60 text-center">{{ item.text }}</div>
            <div :class="isStyle(item.str)" class="col text-color">{{ twoDecimal[index] }}<span
              class="arrow-icon"></span></div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>//
import { SPORTS_CONFIRM_DELETE_TICKET_ONE, SPORTS_OPTION_SELECTED } from '../../../store/betting/types'
import { mapState } from 'vuex'
import { toast } from '../../../common/toast'

export default {
  name: 'ahQcRQLottery',
  props: ['schedule', 'isConfirm', 'bonusLimit', 'amountMax', 'amountMin'],
  data () {
    return {
      ValueArray: []
    }
  },
  computed: {
    boxText () {
      let items = []
      let name = ''
      this.schedule.selected.map(v => {
        if (v.key.substring(4, 3) === '1') {
          name = this.schedule.home
        } else {
          name = this.schedule.guest
        }
        items.push(name, v.text)
      })
      return items.join(' (')
    },
    boxValue () {
      let items = []
      this.schedule.selected.map(v => items.push(this.toDecimal(v.value)))
      return items.join('')
    },
    twoDecimal () {
      let items = []
      this.schedule.holderList.map(v => {
        items.push(this.toDecimal(v.value))
      })
      return items
    },
    selectedList () {
      let items = []
      let name = ''
      let upperLimit = ''
      this.schedule.selected.map(v => {
        if (v.key.substring(4, 3) === '1') {
          name = this.schedule.home
        } else {
          name = this.schedule.guest
        }
        upperLimit = Math.floor(this.bonusLimit / v.value)
        if (upperLimit > this.amountMax) {
          upperLimit = this.amountMax
        } else if (upperLimit < this.amountMin) {
          upperLimit = this.amountMin
        }
        items.push({
          name: name,
          key: v.key,
          value: this.toDecimal(v.value),
          text: v.text,
          home: this.schedule.home,
          guest: this.schedule.guest,
          id: this.schedule.id,
          upperLimit: upperLimit
        })
      })
      return items
    },
    ...mapState({
      currentMode: state => state.betting[state.betting.lottery].mode,
      bettingList: state => {
        const obj = state.betting[state.betting.lottery]
        return obj.scheme[obj.mode === 2 ? 0 : 1]
      }
    })
  },
  methods: {
    toDecimal (odds) {
      let f = (odds * 1)
      let value = f.toString()
      let rs = value.indexOf('.')
      if (rs < 0) {
        rs = value.length
        value += '.'
      }
      if (value.length > rs + 3) {
        let st = value.length - (rs + 3)
        value = value.substring(0, value.length - st)
      }
      while (value.length <= rs + 2) {
        value += '0'
      }
      return value
    },
    onOptionSelected (item) {
      this.schedule.onOptionSelected(item)
      this.$store.commit(SPORTS_OPTION_SELECTED)
      this.$emit('onOptionSelected')
    },
    isSelected (item) {
      return this.schedule.selected.indexOf(item) !== -1
    },
    selectedItem (item) {
      if (this.currentMode === 1) {
        if (this.bettingList.total2 >= 8 && f.call(this, 1)) {
          toast('最多选择8场比赛')
          return
        }
        f1.call(this)
      } else if (this.bettingList.total >= 8 && f.call(this)) {
        toast('最多选择8场比赛')
        return ''
      } else {
        f2.call(this)
      }

      function f (mode) {
        const groups = this.bettingList.groups
        for (let i = 0; i < groups.length; i++) {
          for (let j = 0; j < groups[i].schedules.length; j++) {
            if (this.schedule.id === groups[i].schedules[j].id && groups[i].schedules[j].checked) {
              if (mode) {
                // 单关继续
                return !(groups[i].schedules[j].selected.some(value => value.key === item.key))
              }
              return false
            }
          }
        }
        return true
      }

      function f1 () {
        this.schedule.onOptionSelected(item)
        this.$store.commit(SPORTS_OPTION_SELECTED)
        this.$emit('onOptionSelected')
      }

      function f2 () {
        this.schedule.onOptionSelected2(item)
        this.$store.commit(SPORTS_OPTION_SELECTED)
        this.$emit('onOptionSelected')
      }
    },
    isStyle (item) {
      if (item === 'u') {
        item = 'up'
      } else if (item === 'd') {
        item = 'down'
      } else {
        item = ''
      }
      return item
    },
    deleteBetting (index, item) {
      const listValue = JSON.parse(JSON.stringify(this.ValueArray))
      listValue.splice(index, 1)
      this.ValueArray = listValue
      this.initInputValueArray(listValue)
      this.$store.commit(SPORTS_CONFIRM_DELETE_TICKET_ONE, { index, item })
    },
    initInputValueArray (news) {
      const arr = news.map((value, index) => ({
        index: index,
        total: value,
        guest: this.selectedList[index].guest,
        home: this.selectedList[index].home,
        id: this.selectedList[index].id,
        key: this.selectedList[index].key,
        name: this.selectedList[index].name,
        text: this.selectedList[index].text,
        value: this.selectedList[index].value,
        upperLimit: this.selectedList[index].upperLimit
      }))
      this.$emit('update:inputValue', arr)
    }
  },
  filters: {
    parseIntBalance: function (value) {
      value = parseInt(value)
      return value
    }
  },
  watch: {
    ValueArray (news) {
      this.initInputValueArray(news)
    }
  }
}
</script>
<style lang="scss" scoped>
  .ah-football-qcrq-lottery {
    font-size: 14px;

    .box {
      overflow: hidden;
      margin-top: 8px;
      background: #494949;
      border: 1px solid #494949;
      border-radius: 4px;
      text-align: center;
      font-size: 14px;

      .box-item {
        float: left;
        margin: 0;
        width: 50%;
        height: 30px;
        line-height: 30px;
        text-align: left;
        color: #999;

        &.border-top {
          border-top: 1px solid #3f3f3f;
        }

        .arrow-icon {
          display: none;
          vertical-align: middle;
          margin-left: 5px;
          width: 0;
          height: 0;
          border-width: 4px;
          border-style: solid dashed dashed dashed;
        }

        .text-color {
          color: #fff;

          &.up {
            color: #1ac456;

            .arrow-icon {
              display: inline-block;
              margin-bottom: 6px;
              border-color: transparent transparent #1ac456 transparent;
            }
          }

          &.down {
            color: #f33;

            .arrow-icon {
              display: inline-block;
              border-color: #f33 transparent transparent transparent;
            }
          }
        }

        &:nth-child(odd) {
          position: relative;

          &:after {
            position: absolute;
            top: 9px;
            right: 0;
            content: '';
            border-left: 1px dotted #3f3f3f;
            width: 0;
            height: 12px;
          }
        }

        &.selected {
          background-color: #ffc63a;
          color: #131313;

          .text-color {
            color: #131313;
          }
        }
      }

      .selected {
        background-color: #ffc63a;
        color: #131313;
      }

      .box-icon {
        height: 35px;
        line-height: 35px;

        span {
          color: #3359ff;
        }
      }
    }

    .order-list {
      background: transparent;
      border: none;
      border-radius: 0;

      .selected {
        border-radius: 4px;
      }

      .margin-bottom {
        margin-bottom: 8px;
      }

      .c-white {
        color: $cFFfFFF;
      }
    }

    .order-input-text .margin-top-5 {
      margin-top: 4px !important;
    }
  }
</style>
