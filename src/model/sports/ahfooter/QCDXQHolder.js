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
        this.holderList.push({
          key: key, value: values[0], text: lotteryKey[key], str: values[1]
        })
      }
    }
    this.holderList.reverse();
  }
  onOptionSelected (item) {
    const index = this.selected.indexOf(item);
    if (index !== -1) {
      this.selected.splice(index, 1);
    } else {
      this.selected.splice(0, this.selected.length);
      this.selected.push(item);
    }
    this.setIsChecked();
    console.log(item)
  }
}
