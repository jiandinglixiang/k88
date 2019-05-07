import SportsHolder from '../SportsHolder';

import { BettingScoreOdds, QCDXQ } from '../BettingScoreOdds'

export default class QCDXQHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.qCDXQ = obj['betting_score_odds'][QCDXQ];
    this.setHolderList();
    this.selected = [];
  }
  setHolderList () {
    this.holderList = [];
    const lotteryKey = BettingScoreOdds.getType(QCDXQ);
    for (let key in this.qCDXQ) {
      if (this.qCDXQ.hasOwnProperty(key) && lotteryKey.hasOwnProperty(key)) {
        let values = this.qCDXQ[key].split('-')
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
    this.holderList.reverse();
  }
}
