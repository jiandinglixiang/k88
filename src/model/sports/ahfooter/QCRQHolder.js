import SportsHolder from '../SportsHolder';

import { BettingScoreOdds, QCRQ } from '../BettingScoreOdds'

export default class QCRQHolder extends SportsHolder {
  constructor (obj) {
    super(obj);
    this.qCRQ = obj['betting_score_odds'][QCRQ];
    this.setHolderList();
    this.selected = [];
  }
  setHolderList () {
    this.holderList = [];
    const lotteryKey = BettingScoreOdds.getType(QCRQ);
    for (let key in this.qCRQ) {
      if (this.qCRQ.hasOwnProperty(key) && lotteryKey.hasOwnProperty(key)) {
        this.holderList.push({
          key: key, value: this.qCRQ[key], text: lotteryKey[key]
        })
      }
    }
    this.holderList.reverse();
  }
  onOptionSelected (item) {
    console.log(this.selected, item);
    const index = this.selected.indexOf(item);

    index !== -1 ? this.selected.splice(index, 1) : this.selected.push(item);
    this.setIsChecked();
  }
}
