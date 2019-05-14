/**
 * 竟彩基类
 */
export default class SportsLottery {
  constructor (obj) {
    this.schedule_status = obj.schedule_status
    this.lottery_id = obj.lottery_id
    this.betting_order = obj.betting_order
    this.result_odds = obj.result_odds
    this.score = obj.score
    this.home = obj.home
    this.guest = obj.guest
    this.round_no = obj.round_no
    this.scoreText = obj.score && obj.score.final
    this.finalArr = this.score && this.score.final && this.score.final.split(':')
    this.result = []
    this.analysePointText()
  }

  // 设置让球让分
  analysePointText () {
    this.team = {}
    let order = this.betting_order
    for (let key in order) {
      if (key === 'betting_score_concede') {
        this.team.letPointText = order[key].let_point > 0 ? '+' + order[key].let_point : order[key].let_point
      }
      if (key === 'betting_score_dxf') {
        this.team.basePointText = order[key].base_point
      }
    }
  }

  analyseBettingOrder () {
    // 处理投注内容
  }

  analyseBettingResult () {
    // 处理投注结果
  }

  // 设置选择结果的
  setBettingChecked () {
    let result = this.result
    if (result && result.length > 0 && ['901', '902'].indexOf(this.lottery_id) === -1) {
      // 亚盘不需要计算checked
      result.map(r => {
        this.betting.map(b => {
          if (String(r.text) === String(b.text)) {
            b.checked = true
          }
          return b
        })
      })
    }
  }

  analyseBettingOrderByLottery (lottery) {
    if (!lottery) return
    const betting = []
    const finalArr = this.finalArr.map(val => parseInt(val))
    const order = this.betting_order
    if (this.lottery_id === '902' || this.lottery_id === '901') {
      f4(function (key, key2) {
        const val = f3(key, key2)// 计算投注的胜负3胜 1平负 0负,
        betting.push({
          text: lottery[key][key2].join('/'),
          value: order[key][key2],
          status: val,
          checked: val === 3,
          con: key2,
          key: key2,
          id: lottery[key].key
        })
      })
    } else {
      f4(function (key, key2) {
        betting.push({
          text: lottery[key][key2],
          value: order[key][key2],
          con: key2,
          key: key2,
          id: lottery[key].key
        })
      })
    }
    this.betting = betting

    function f4 (cbk) {
      Object.keys(order).forEach(key => {
        order[key] && Object.keys(order[key]).forEach(key2 => {
          if (lottery[key][key2] && Array.isArray(lottery[key][key2])) {
            cbk(key, key2)
          }
        })
      })
    }

    function f3 (key, key2) {
      // 计算比分加让球
      let status = 0 // 状态
      for (let letBall of lottery[key][key2]) {
        const arr1 = finalArr[0] + letBall
        if (arr1 === finalArr[1]) {
          status !== 3 && (status = 1) // 未中奖平局
        } else if (arr1 > finalArr[1]) {
          status = 3 // 中奖
        }
      }
      return status
    }
  }

  analyseBettingResultByLottery (lottery) {
    if (!lottery) return
    if (this.finalArr && this.finalArr.length === 0) return
    let result = []
    let finalArr = this.finalArr.map(val => parseInt(val))// 比分[0,1]
    let order = this.betting_order// 投注数据
    let resultOdds = this.result_odds// 赔率
    for (let key in lottery) {
      if (order.hasOwnProperty(key)) {
        let k = ''
        switch (key) {
          case 'betting_score_sizeball':
          case 'betting_score_letball':
            f2(key)
            break
          case 'betting_score_no_concede':
            k = finalArr[0] > finalArr[1] ? '3' : finalArr[0] === finalArr[1] ? '1' : '0'
            f1(key, k)
            break
          case 'betting_score_concede':
            let z = (finalArr[0] + order[key]['let_point']) // 主队的分数
            k = z > finalArr[1] ? '3' : z === finalArr[1] ? '1' : '0'
            f1(key, k)
            break
          case 'betting_score_scores':
            if (lottery[key]['v' + finalArr[0] + finalArr[1]]) {
              k = '' + finalArr[0] + finalArr[1]
            } else {
              k = finalArr[0] > finalArr[1] ? '90' : finalArr[0] === finalArr[1] ? '99' : '09'
            }
            f1(key, k)
            break
          case 'betting_score_balls':
            k = +finalArr[0] + (+finalArr[1])
            if (k > 6) { k = 7 }
            break
          case 'betting_score_half':
            let scoreHalf = this.score.half
            let halfArr = scoreHalf.split(':')
            let t1 = halfArr[0] > halfArr[1] ? '3' : halfArr[0] === halfArr[1] ? '1' : '0'
            let t2 = finalArr[0] > finalArr[1] ? '3' : finalArr[0] === finalArr[1] ? '1' : '0'
            k = t1 + t2
            f1(key, k)
            break
          case 'betting_score_sfc':
            let compare = finalArr[0] - finalArr[1]
            let tail = Math.floor((Math.abs(compare) - 1) / 5) + 1
            tail = tail > 6 ? 6 : tail
            k = (finalArr[0] > finalArr[1] ? '0' : '1') + tail
            f1(key, k)
            break
          case 'betting_score_dxf':
            let total = +finalArr[0] + (+finalArr[1])
            k = total >= order[key]['base_point'] ? 1 : 2
            f1(key, k)
            break
        }
      }
    }

    function f1 (key, k) {
      const temp = {
        text: lottery[key]['v' + k],
        value: order[key]['v' + k],
        con: k
      }
      if (!temp.value && resultOdds && resultOdds[lottery[key]['key']]) {
        temp.value = resultOdds[lottery[key]['key']]['v' + k]
      }
      // 中奖时取betOrders，不中时取resultOdds
      result.push(temp)
    }

    function f2 (key) {
      Object.keys(order[key]).forEach(key2 => {
        const temp = {
          text: `全场${finalArr.join('-')}`, // 比分
          value: order[key][key2], // 投注赔率
          con: key2 // 让球key
        }
        if (!temp.value && resultOdds && resultOdds[lottery[key]['key']]) {
          temp.value = resultOdds[lottery[key]['key']][key2]
        }
        // 中奖时取betOrders，不中时取resultOdds
        result.push(temp)
      })
    }
    this.result = result
  }
}
