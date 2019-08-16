<template>
  <div class="g-Match-button">
    <div class="g-team-score">
      <div class="team-card-left">
        <span v-show="card.team1_red_card" class="red-card">{{card.team1_red_card}}</span>
        <span v-show="card.team1_yellow_card" class="yellow-card">{{card.team1_yellow_card}}</span>
        {{item.home}}
      </div>
      <div class="score">{{timeScore}}</div>
      <div class="team-card-right">
        <p class="team">{{item.guest}}</p>
        <span v-show="card.team2_red_card" class="red-card">{{card.team2_red_card}}</span>
        <span v-show="card.team2_yellow_card" class="yellow-card">{{card.team2_yellow_card}}</span>
      </div>
    </div>
    <div class="bet-odds-but">
      <ul>
        <li v-for="(n,x) of betOdd(true)" :key="x">
          <div class="rq-txt" v-for="n2 of n" :key="n2.key" :class="n2.isLock" @click="addBetItem(n2)">
            <span class="sm-big">{{n2.hosGue}}</span>
            <span class="item-score">{{n2.text}}</span>
            <span class="item-odds" :class="n2.oddStatus">{{n2.odd}}</span>
          </div>
        </li>
      </ul>
      <ul>
        <li v-for="(n,x) of betOdd(false)" :key="x">
          <div class="dxq-txt" v-for="n2 of n" :key="n2.key" :class="n2.isLock" @click="addBetItem(n2)">
            <span class="sm-big">{{n2.hosGue}}</span>
            <span class="item-score">{{n2.text}}</span>
            <span class="item-odds" :class="n2.oddStatus">{{n2.odd}}</span>
          </div>
        </li>
      </ul>
    </div>
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
    schedulesId: [String, Number]
  },
  computed: {
    ...mapState({
      isLogin: state => !state.user.token
    }),
    betOdd () {
      const nu$ll = [{ text: '-', isLock: 'lock', key: 11 }, { text: '-', isLock: 'lock', key: 22 }]
      const scoreOdds = this.item.betting_score_odds
      const isLock = (this.item.is_lock * 1 || ['0', '2', '-1', '-10', '-11', '-12', '-13', '-14'].includes(`${this.item.game_stauts}`)) ? `lock` : ''
      const initArr = [
        {
          lotteryId: 903,
          key: 'betting_score_letball',
          keys1: '空',
          keys2: '空',
          betObj: scoreOdds.betting_score_letball
        },
        {
          lotteryId: 904,
          key: 'betting_score_sizeball',
          keys1: '大',
          keys2: '小',
          betObj: scoreOdds.betting_score_sizeball
        }
      ]

      if (!scoreOdds || isLock) {
        return function () {
          return [nu$ll]
        }
      }

      function f1 (arr, key) {
        if (key === 'betting_score_sizeball') return arr.join('/')
        return arr.map(v => v > 0 ? `+${v}` : v).join('/')
      }

      function f2 (ovj) {
        return ovj.slice(0, ovj.length - 1)
      }

      function f3 (match, key) {
        const troops = f4(key)
        return {
          key: key, // v101
          text: f1(LotteryFootballKey[match.key][key] || [], match.key), // 0/+0.5
          isLock, // true
          hosGue: match[`keys${troops}`], // 大/小
          troops,
          lotteryId: match.lotteryId, // id
          ...oddDiscern(match.betObj[key]) // { odd: '', oddStatus: '' }
        }
      }

      function f4 (key) {
        return key.slice(key.length - 1)
      }

      const [letBall, sizeBall] = initArr.map(match => {
        if (!match.betObj) return [nu$ll] // 如果赔率为空就返回锁定
        const oddKeyArray = Object.keys(match.betObj).sort((key1, key2) => key1.slice(1) - key2.slice(1))
        // 排序key
        const arr = []
        for (let i = oddKeyArray.length - 1; i >= 0;) {
          // 对赔率进行排序
          const pushArr = [f3(match, oddKeyArray[i])]
          if (i >= 1 && f2(oddKeyArray[i]) === f2(oddKeyArray[i - 1])) {
            // console.log(i, i - 1, f2(oddKeyArray[i]), f2(oddKeyArray[i - 1]))
            // 如果赔率符合v01===v01说明他们是一对儿
            // 在pushArr开头插入obj{}
            pushArr.unshift(f3(match, oddKeyArray[i - 1]))
            // 因为是从后向前遍历 所以arr开头插入
            arr.unshift(pushArr)
            i -= 2
          } else {
            // console.log(i, f2(oddKeyArray[i]))
            // 不是一对儿 判断当前key最末位的是1还是2还是0
            f4(oddKeyArray[i]) > 1 ? pushArr.unshift(nu$ll[0]) : pushArr.push(nu$ll[1])
            // 把只有单组赔率的放到末尾
            arr.push(pushArr)
            i--
          }
        }
        return arr
      })

      return function (x) {
        if (x) return letBall
        return sizeBall
      }
    },
    timeScore () {
      const arr = !!this.item.real_time_score && this.item.real_time_score.split(':')
      if (arr) return `${arr[0] || 0} - ${arr[1] || 0}`
      return `0 - 0`
    },
    card () {
      if (this.item && this.item.schedule_team_card) {
        return Object.keys(this.item.schedule_team_card).reduce((t, key) => {
          if (this.item.schedule_team_card[key]) t[key] = this.item.schedule_team_card[key] * 1
          return t
        }, {})
      }
      return {}
    }
  },
  methods: {
    addBetItem (n) {
      if (this.isLogin) {
        Toast('未登录账号')
        return
      }
      if (n.isLock) {
        Toast('投注已锁定')
        return
      }
      this.$store.commit(ADD_BETTING_ITEM, {
        lotteryId: n.lotteryId,
        Id: [this.schedulesId, this.item.id],
        key: n.key,
        text: n.text,
        troops: n.troops
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .g-Match-button {
    width: 80%;

    .g-team-score {
      height: 30px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: flex-start;

      .red-card, .yellow-card {
        flex: 0 0 auto;
        color: white;
        font-weight: bold;
        border-radius: 4px;
        padding: 1px 2px 2px 2px;
      }

      .red-card {
        background: linear-gradient(0deg, rgba(255, 8, 68, 1) 0%, rgba(255, 78, 80, 1) 100%);
      }

      .yellow-card {
        background-color: #FFC63A;
      }

      .team-card-right {
        width: 0;
        flex: 1 1 auto;
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        justify-content: center;

        .team {
          margin-right: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .team-card-left {
        width: 0;
        flex: 1 1 auto;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .score {
        flex: 0 0 auto;
        background: linear-gradient(90deg, rgba(133, 131, 142, 1) 0%, rgba(133, 131, 142, 1) 100%);
        line-height: 1;
        border-radius: 6px;
        white-space: nowrap;
        padding: 1px 5px 2px 5px;
      }
    }

    .bet-odds-but {
      > ul {
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 10px;

        > li {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          align-content: center;
          height: 30px;

          .rq-txt:active, .dxq-txt:active {
            background-color: #FFC63A;

            .item-score {
              color: #131313;
            }
          }

          .rq-txt, .dxq-txt {
            width: 0;
            flex: 0 0 50%;
            background-color: #494949;
            display: flex;
            flex-flow: row nowrap;
            align-items: center;
            justify-content: flex-end;

            .sm-big {
              flex: 0 0 10%;
              text-align: center;
            }

            .item-score {
              flex: 0 0 40%;
              text-align: center;
              color: #999999;
              font-weight: 500;
            }
          }

          .rq-txt > .sm-big {
            visibility: hidden;
          }

          .item-odds {
            width: 0;
            flex: 0 0 40%;
            font-weight: bold;

            &.up {
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

            &.down {
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

          > div.lock {
            span {
              display: none;
            }

            background: url("../assets/ic_selclose.png") no-repeat center center, url("../assets/ya_rang_bg.png") no-repeat center center;
            background-size: 10px 15px, 110% 110%;
          }

          > div:first-child {
            border-right: 1px solid #3f3f3f;
          }
        }

        > li:nth-child(n+2) {
          border-top: 1px solid #3F3F3F;
        }
      }
    }
  }
</style>
