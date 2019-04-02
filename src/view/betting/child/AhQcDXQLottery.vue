<template>
  <div class="ah-football-qcdxq-lottery">
    <template v-if="currentMode === 1">
      <template v-if="isConfirm">
        <template v-for="(item, index) in selectedList">
          <div class="scheme-box-item">
            <span class="scheme-delete-icon poa-m" @click="deleteBetting(index)"></span>
            <div class="padding-left-10">
              <div class="row text-center text-default-2 text-sm">
                <div class="col col-40">{{item.home}}</div>
                <div class="col text-light">VS</div>
                <div class="col col-40">{{item.guest}}</div>
              </div>
              <div class="box order-list">
                <div class="ellipsis text-center box-icon selected margin-bottom">{{ item.name }}({{ item.text }})
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
                      <input placeholder="请输入投注金额" type="number" @input="getInputValue($event, index)">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="row text-center text-default-2 text-sm">
          <div class="col col-40">{{schedule.home}}</div>
          <div class="col text-light">VS</div>
          <div class="col col-40">{{schedule.guest}}</div>
        </div>
        <div class="box">
          <div class="box-hd row">
            <div class="col">进球</div>
            <div class="col-40 bg-red">大</div>
            <div class="col-40 bg-blue">小</div>
          </div>
          <div class="box-bd">
            <div class="box-item row"
                 @click="selectedItem(item)"
                 v-for="(item, index) in schedule.holderList"
                 :class="{selected: isSelected(item), 'border-top': index > 0}">
              <div class="col bg-dark">{{ item.text }}</div>
              <div class="col-67 text-color" :class="isStyle(item.str)">{{ item.value }}<span class="arrow-icon"></span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else>
      <div class="row text-center text-default-2 text-sm">
        <div class="col col-40">{{schedule.home}}</div>
        <div class="col text-light">VS</div>
        <div class="col col-40">{{schedule.guest}}</div>
      </div>
      <template v-if="isConfirm">
        <div class="box ellipsis selected text-center box-icon" v-for="item in selectedList">{{item.name}} ({{ item.text
          }})<span>{{ item.value }}</span>
        </div>
      </template>
      <div class="box" v-else>
        <div class="box-hd row">
          <div class="col">进球</div>
          <div class="col-40 bg-red">大</div>
          <div class="col-40 bg-blue">小</div>
        </div>
        <div class="box-bd">
          <div class="box-item row"
               @click="selectedItem(item)"
               v-for="(item, index) in schedule.holderList"
               :class="{selected: isSelected(item), 'border-top': index > 0}">
            <div class="col bg-dark">{{ item.text }}</div>
            <div class="col-67 text-color" :class="isStyle(item.str)">{{ item.value }}<span class="arrow-icon"></span>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { SPORTS_OPTION_SELECTED, SPORTS_CONFIRM_DELETE_TICKET_ONE } from '../../../store/betting/types'
  import { mapState } from 'vuex'

  export default {
    name: 'ahQcDXQLottery',
    props: ['schedule', 'isConfirm', 'bonusLimit', 'amountMax', 'amountMin'],
    data () {
      return {
        inputValueArray: []
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
        this.schedule.selected.map(v => items.push(v.value))
        return items.join('')
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
            value: v.value,
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
        currentMode: state => state.betting[state.betting.lottery].mode
      })
    },
    methods: {
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
          this.schedule.onOptionSelected(item)
          this.$store.commit(SPORTS_OPTION_SELECTED)
          this.$emit('onOptionSelected')
        } else {
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
      deleteBetting (index) {
        this.$store.commit(SPORTS_CONFIRM_DELETE_TICKET_ONE, index)
      },
      getInputValue (e, index) {
        this.$set(this.inputValueArray, index, {
          index: index,
          total: e.target.value,
          guest: this.selectedList[index].guest,
          home: this.selectedList[index].home,
          id: this.selectedList[index].id,
          key: this.selectedList[index].key,
          name: this.selectedList[index].name,
          text: this.selectedList[index].text,
          value: this.selectedList[index].value,
          upperLimit: this.selectedList[index].upperLimit
        })
      }
    },
    watch: {
      inputValueArray (news) {
        this.$emit('update:inputValue', news)
      }
    }
  }
</script>
<style lang="scss">
  .ah-football-qcdxq-lottery {
    padding-left: 10px;
    font-size: 14px;
    .box {
      overflow: hidden;
      margin-top: 8px;
      background: #494949;
      border-radius: 4px;
      text-align: center;
      font-size: 14px;
      &.selected {
        background-color: #ffc63a;
        color: #131313;
      }
      .box-hd {
        height: 20px;
        line-height: 20px;
        color: #fff;
        .col {
          color: #999;
        }
        .bg-red {
          background-color: #f33;
        }
        .bg-blue {
          background-color: #3393ff;
        }
      }
      .box-bd {
        overflow: hidden;
      }
      .box-item {
        float: left;
        margin: 0;
        height: 30px;
        line-height: 30px;
        color: #999;
        width: 60%;
        &.selected {
          .col-67 {
            background-color: #ffc63a;
            color: #131313;
          }
        }
        .col {
          color: #131313;
        }
        .col-67 {
          -moz-flex: 0 0 67%;
          -ms-flex: 0 0 67%;
          flex: 0 0 67%;
          max-width: 67%;
        }
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
        &:nth-child(even) {
          width: 40%;
          .bg-dark {
            display: none;
          }
          .col-67 {
            -moz-flex: 0 0 100%;
            -ms-flex: 0 0 100%;
            flex: 0 0 100%;
            max-width: 100%;
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
      }
      .bg-dark {
        background-color: #ddd;
      }
      .selected {
         background-color: #ffc63a;
         color: #131313;
       }
      &.box-icon {
        padding-right: 15px;
        height: 35px;
        line-height: 35px;
        span {
          color: #3359ff;
        }
      }
      .box-icon {
         padding-right: 15px;
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
