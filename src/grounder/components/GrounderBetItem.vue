<template>
  <div class="g-Match-button">
    <div class="g-button-vs">
      <p>{{item.home}}</p>
      <div>{{timeScore}}</div>
      <p>{{item.guest}}</p>
    </div>
    <ul v-if="lotteryId===903" class="g-button-body-rq">
      <li v-for="(n,x) of betOdd" :key="x">
        <div
          v-for="n2 of n"
          :key="n2.key"
          :class="{'lock':item.is_lock}"
          @click="addBetItem(n2)"
        ><span>{{n2.text}}</span><span
          :class="n2.oddStatus">{{n2.odd}}</span>
        </div>
      </li>
    </ul>
    <ul v-else-if="lotteryId===904" class="g-button-body-dxq">
      <li>
        <div>进球</div>
        <div>大</div>
        <div>小</div>
      </li>
      <li v-for="(n,x) of betOdd" :key="x">
        <div>{{n[0].text}}</div>
        <div v-for="n2 of n" :key="n2.key"
             @click="addBetItem(n2)"
             :class="{'lock':item.is_lock,[n2.oddStatus]:1}">{{n2.odd}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>//
import { LotteryFootballKey } from '../../store/constants.js'
import { ADD_BETTING_ITEM, oddDiscern } from '../store/betting'
import Toast from '../../common/toast.js'
import { mapState } from 'vuex'

export default {
  name: 'GrounderBetItem',
  props: {
    item: Object,
    schedulesId: [String, Number],
    lotteryId: Number
  },
  computed: {
    ...mapState({
      isLogin: state => !state.user.token
    }),
    betOdd () {
      const sizeBall = this.lotteryId === 904 // 大小球
      const letBall = this.lotteryId === 903
      const objKey = (letBall && 'betting_score_letball') || (sizeBall && 'betting_score_sizeball')
      let arr = []
      if (!this.item.betting_score_odds || !this.item.betting_score_odds[objKey]) return arr
      const obj = Object.keys(this.item.betting_score_odds[objKey])
      const oddTxt = LotteryFootballKey[objKey]
      obj.sort((key1, key2) => key1.slice(1) > key2.slice(1))

      function f1 (arr) {
        if (sizeBall) arr.join('/')
        return arr.map(v => v > 0 ? `+${v}` : v).join('/')
      }

      function f2 (i) {
        return obj[i].slice(0, obj[i].length - 1)
      }

      for (let i = obj.length - 1; i >= 1;) {
        const oddData2 = this.item.betting_score_odds[objKey]
        if (f2(i) === f2(i - 1)) {
          arr.unshift([
            {
              ...oddDiscern(oddData2[obj[i]]),
              key: obj[i],
              text: f1(oddTxt[obj[i]])
            },
            {
              ...oddDiscern(oddData2[obj[i - 1]]),
              key: obj[i - 1],
              text: f1(oddTxt[obj[i - 1]])
            }
          ])
          i -= 2
        } else {
          arr.push([{
            ...oddDiscern(oddData2[obj[i]]),
            key: obj[i],
            text: f1(oddTxt[obj[i]])
          }, {}])
          i--
        }
      }
      // console.log(obj, arr)
      return arr
    },
    timeScore () {
      const arr = !!this.item.real_time_score && this.item.real_time_score.split(':')
      if (arr) return `${arr[0] || 0} - ${arr[1] || 0}`
      return `0 - 0`
    }
  },
  methods: {
    addBetItem (n) {
      if (this.isLogin) {
        Toast('未登录账号')
        return
      }
      if (this.item.is_lock) {
        Toast('投注已锁定')
        return
      }
      this.$store.commit(ADD_BETTING_ITEM, {
        lotteryId: this.lotteryId,
        Id: [this.schedulesId, this.item.id],
        key: n.key,
        text: n.text
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .g-Match-button {
    width: 80%;

    .g-button-vs {
      height: 25px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;

      > p {
        text-align: center;
        width: 40%;
        height: 15px;
        color: #CCCCCC;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      > div {
        text-align: center;
        font-weight: bold;
        line-height: 15px;
        flex: 0 0 40px;
        background: linear-gradient(90deg, rgba(133, 131, 142, 1) 0%, rgba(133, 131, 142, 1) 100%);
        border-radius: 6px;
      }
    }

    .g-button-body-dxq {
      width: 100%;
      text-align: center;

      > li {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;

        div:first-child {
          width: 20%;
        }

        div:nth-child(n+2) {
          width: 40%;
        }
      }

      > li:first-child {

        div:nth-child(1) {
          line-height: 17px;
          background-color: #494949;
          border-top-left-radius: 2px;
        }

        div:nth-child(2) {
          line-height: 17px;
          color: white;
          background-color: #FF3333;
        }

        div:nth-child(3) {
          line-height: 17px;
          color: white;
          background-color: #3393FF;
          border-top-right-radius: 2px;
        }
      }

      > li:nth-child(n+2) {
        font-weight: 500;

        div:first-child {
          background-color: #DDDDDD;
          color: #131313;
          height: 30px;
          line-height: 30px;
          border-bottom: 1px solid #3F3F3F;
        }

        div:nth-child(2) {
          border-right: 1px dashed #3F3F3F;
        }

        div:nth-child(n+2) {
          height: 30px;
          line-height: 30px;
          background-color: #494949;
          border-bottom: 1px solid #3F3F3F;
        }

        div.active-select, div:active {
          color: #131313;
          background-color: #FFC63A;
        }

        .up {
          color: #1AC456;

          &:after {
            display: inline-block;
            content: '';
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-bottom: 6px solid #1AC456;
            margin: 0 0 2px 4px;
          }
        }

        .down {
          color: #FF3333;

          &:after {
            display: inline-block;
            content: '';
            width: 0;
            height: 0;
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid #FF3333;
            margin: 0 0 2px 4px;
          }
        }
      }

      > li:last-child {
        > div:first-child {
          border-bottom: 0;
          border-bottom-left-radius: 2px;
        }

        > div:nth-child(2) {
          border-bottom: 0;
        }

        > div:last-child {
          border-bottom: 0;
          border-bottom-right-radius: 2px;
        }
      }
    }

    .g-button-body-rq {
      width: 100%;
      overflow: hidden;
      border-radius: 2px;

      > li {
        display: flex;
        flex-flow: row nowrap;

        div {
          background-color: #494949;
          height: 30px;
          line-height: 30px;
          width: 50%;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          font-weight: 500;

          span:first-child {
            width: 65%;
            overflow: hidden;
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #999999;
          }

          span:last-child {
            color: white;
            width: 35%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          span.up {
            color: #1AC456;

            &:after {
              display: inline-block;
              content: '';
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-bottom: 6px solid #1AC456;
              margin: 0 0 2px 4px;
            }
          }

          span.down {
            color: #FF3333;

            &:after {
              display: inline-block;
              content: '';
              width: 0;
              height: 0;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              border-top: 6px solid #FF3333;
              margin: 0 0 2px 4px;
            }
          }
        }

        div.active-select, div:active {
          background-color: #FFC63A;

          span {
            color: #131313;
          }
        }

        div.lock {
          span {
            display: none;
          }

          background: url("../assets/ic_selclose.png") no-repeat center center, url("../assets/ya_rang_bg.png") no-repeat center center;
          background-size: 10px 15px, 110% 110%;
        }

        div:last-child {
          border-left: 1px dashed #3F3F3F;
        }
      }

      > li:nth-child(n+ 2) {
        border-top: 1px solid #3F3F3F;
      }
    }
  }
</style>
