<template>
  <div class="sports-prize-panel">
    <div class="panel-top" @click="changePanelVisible">
      {{holder.name}} {{holder.schedules.length}}场比赛
      <span class="icon" :class="{'up': panelVisible}"></span>
    </div>
    <div class="panel-list" v-show="panelVisible">
      <div class="panel-list-content" v-for="item in holder.schedules">
        <div class="col col-25 col-center text-center text-light item-left">
          {{item.round_no}} <br/> {{item.league}}
        </div>
        <div class="col col-75 item-right">
          <template v-if="item.isFootball">
            <football-panel-item :data="item"></football-panel-item>
          </template>
          <template v-else-if="item.isBasketball">
            <basketball-panel-item :data="item"></basketball-panel-item>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import FootballPanelItem from './FootballPanelItem.vue'
  import BasketballPanelItem from './BasketballPanelItem.vue'

  export default {
    name: 'sportsPrizePanel',
    props: ['holder'],
    data () {
      return {
        panelVisible: true
      }
    },
    methods: {
      changePanelVisible () {
        this.panelVisible = !this.panelVisible;
      }
    },
    components: {FootballPanelItem, BasketballPanelItem}
  }
</script>

<style lang="scss">
  .sports-prize-panel {
    .panel-top {
      background: $c1c1c1c;
      padding: 5px 10px;
      font-size: 12px;
      position: relative;
      color: $cCccCCc;

      .icon {
        position: absolute;
        right: 10px;
        top: 5px;
        background: url("../../../assets/betting/down_out.png") no-repeat;
        background-size: 100% 100%;
        width: 18px;
        height: 18px;
        transition: tranform 0.5s;
      }

      .icon.up {
        transform: rotate(180deg);
      }
    }

    .panel-list {

      .panel-list-content {
        display: flex;
        flex-flow: row nowrap;
        background-color: $c313131;
        padding: 5px 10px 5px 0;
        border-bottom: 1px solid $c3f3f3f;

        .item-left {
          font-size: 12px;
          line-height: 20px;
        }

        .item-right {
          > div {
            > div:nth-child(1) {
              color: $cCccCCc;
            }

            .box {
              border: 1px solid $c3f3f3f;
              border-radius: 5px;
              text-align: center;
              font-size: 12px;
              background: $c494949;
              margin-top: 5px;

              .box-content:first-child {
                border-bottom: 1px solid $c3f3f3f;
              }

              .box-item {
                padding: 5px 0;
                float: left;
                color: $c999999;

                span {
                  display: block;
                  border-right: 1px dotted $c3f3f3f;
                }
              }

              .box-item:last-child span {
                border: none;
              }
            }
          }

        }
      }
    }
  }

  .sports-prize-panel span.green {
    color: #1AC456;
  }
  .sports-prize-panel span.yellow {
    color: #FF3333;
  }
  .sports-prize-panel span.blue {
    color: #3393FF;
  }
  .sports-prize-panel span.yellow-2 {
    color: #FFC63A;
  }
</style>
