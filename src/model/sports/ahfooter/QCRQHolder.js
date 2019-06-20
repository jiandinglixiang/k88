import SportsHolder from '../SportsHolder'

import { BettingScoreOdds, QCRQ } from '../BettingScoreOdds'

export default class QCRQHolder extends SportsHolder {
  constructor (obj) {
    super(obj)
    this.qCRQ = obj['betting_score_odds'][QCRQ]
    this.setHolderList()
    this.selected = []
  }

  setHolderList () {
    this.holderList = []
    const lotteryKey = BettingScoreOdds.getType(QCRQ)
    for (let key in this.qCRQ) {
      if (this.qCRQ.hasOwnProperty(key) && lotteryKey.hasOwnProperty(key)) {
        let values = this.qCRQ[key].split('-')
        this.holderList.push({
          key: key, value: values[0], text: lotteryKey[key], str: values[1]
        })
      }
    }
    this.holderList.reverse()
  }

  onOptionSelected2 (item) {
    // 过关
    const index = this.selected.indexOf(item)
    if (index !== -1) {
      this.selected.splice(index, 1)
    } else {
      this.selected.shift()
      this.selected.push(item)
    }
    this.setIsChecked()
  }
}
