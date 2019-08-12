import { LotteryFootballKey } from '../../../store/constants.js'

const actions = {}
const mutations = {}

export default {
  state: {},
  mutations,
  actions
}

export function betOddText (item, lotteryid) {
  const letBall = lotteryid === '903'
  const sizeBall = lotteryid === '904' // 大小球
  let betScoreArray
  try {
    betScoreArray = item.bet_score.split(':')// 即时比分
  } catch (e) {
    betScoreArray = [0, 0]
  }
  const finalArray = item.score && item.score.final && item.score.final.split(':') // 彩果
  const betScoreArr = Array.isArray(betScoreArray) && betScoreArray.map(val => {
    val = parseInt(val)
    return val
  })
  let total = 0 // 总分
  const finalArr = Array.isArray(finalArray) && finalArray.map(val => {
    val = parseInt(val)
    total += val
    return val
  })
  const objKey = (letBall && 'betting_score_letball') || (sizeBall && 'betting_score_sizeball')
  let arr = []
  if (!item.betting_order || !item.betting_order[objKey]) return arr
  const obj = Object.keys(item.betting_order[objKey])
  const odd = item.betting_order[objKey]
  const oddTxt = LotteryFootballKey[objKey]
  obj.sort((key1, key2) => key1.slice(1) > key2.slice(1))

  const difference = lotteryid === '903' ? f2 : f3

  function f1 (arr) {
    if (sizeBall) {
      return arr.join('/')
    } else {
      return arr.map(v => v > 0 ? `+${v}` : v).join('/')
    }
  }

  function f2 (obj) {
    // 让球
    let status = 0 // 中奖状态
    const big = obj[0].charAt(obj[0].length - 1) === '1' // 主队
    if (Array.isArray(finalArr) && Array.isArray(betScoreArr)) {
      const final1 = finalArr[0] - betScoreArr[0] // 减去即时比分
      const final2 = finalArr[1] - betScoreArr[1]
      if (big) {
        for (let letBall of oddTxt[obj[0]]) {
          const arr1 = final1 + letBall
          if (arr1 > final2) {
            status = 3 // 中奖
          } else if (arr1 < final2) {
            status = 0 // 未中奖
          } else {
            status = 1 // 平局
            break
          }
        }
      } else {
        for (let letBall of oddTxt[obj[0]]) {
          const arr1 = final2 + letBall
          if (arr1 > final1) {
            status = 3
          } else if (arr1 < final1) {
            status = 0
          } else {
            status = 1
            break
          }
        }
      }
    }
    return status
  }

  function f3 (obj) {
    // 大小球
    let status = 0 // 状态
    const big = obj[0].charAt(obj[0].length - 1) === '1' // 大球
    let key = 0
    if (Array.isArray(finalArr)) {
      for (let i in oddTxt[obj[0]]) {
        key = oddTxt[obj[0]][i]
        if (big) {
          // 买大球
          if (total > key) {
            status = 3
          } else if (total < key) {
            status = 0
          } else {
            status = 1
            break
          }
        } else {
          // 买小球
          if (total < key) {
            status = 3
          } else if (total > key) {
            status = 0
          } else {
            status = 1
            break
          }
        }
      }
    }
    return status
  }

  let oddText = 0
  if (odd[obj[0]] && typeof odd[obj[0]] === 'string') {
    const odds = odd[obj[0]].split('-')
    oddText = odds[0]
  } else {
    oddText = odd[obj[0]]
  }
  arr.push({
    key: obj[0],
    text: f1(oddTxt[obj[0]]),
    odd: oddText,
    status: difference(obj)
  })
  // console.log(arr[0])
  return arr[0]
}
