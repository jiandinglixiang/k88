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
        let f = Math.floor(values[0] * 100) / 100;
        let value = f.toString();
        let rs = value.indexOf('.');
        if (rs < 0) {
          rs = value.length;
          value += '.';
        }
        while (value.length <= rs + 2) {
          value += '0';
        }
        this.holderList.push({
          key: key, value: value, text: lotteryKey[key], str: values[1]
        })
      }
    }
    this.holderList.reverse()
  }
}
