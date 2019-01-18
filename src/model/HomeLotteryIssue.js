import { PlayType, IS_SPORTS, IS_FOOTBALL, LotteryBasketballKey, LotteryFootballKey } from '../store/constants';
import Lottery from './common/Lottery';

export default class HomeLotteryIssue {
  constructor (obj) {
    this.lottery_id = parseInt(obj.lottery_id);
    this.lottery_name = obj.lottery_name;
    this.play_type = obj.play_type;
    this.bet_number = obj.bet_number;
    this.component = Lottery.getComponent(this.lottery_id);
    if (IS_SPORTS[obj.lottery_id]) {
      this.roundNo = obj.round_no;
      this.scheduleId = obj.schedule_id;
      this.bettingOrder = obj.betting_order;
      this.bettingScore_odds = obj.betting_score_odds;
      this.endTime = this.TimeDispose(obj.end_time);
      this.let_point = null;
      if (IS_FOOTBALL[obj.lottery_id]) {
        this.HomeGuestName = [obj.home, obj.guest]
        this.HomeGuestLogo = [obj.home_logo, obj.guest_logo]
        this.bettingOdds = this.oddsInit(true, obj.betting_score_odds, obj.betting_order)
      } else {
        this.HomeGuestName = [obj.guest, obj.home];
        this.HomeGuestLogo = [obj.guest_logo, obj.home_logo];
        this.bettingOdds = this.oddsInit(false, obj.betting_score_odds, obj.betting_order)
      }
    } else {
      this.slogon = obj.slogon;
      this.bet_type = obj.bet_type;
      this.betNum = this.handleBalls();
    }
  }

  oddsInit (isFootball, odds, optOdds) {
    let name;
    if (this.lottery_id === 601 || this.lottery_id === 602) {
      name = {v3: null, v1: null, v0: null}
    } else if (this.lottery_id === 701 || this.lottery_id === 702) {
      name = {v0: null, v3: null}
    }
    if (isFootball) {
      for (let i in odds) {
        for (let s in odds[i]) {
          if (s !== 'let_point') {
            name[s] = {
              odds: odds[i][s],
              name: (LotteryFootballKey[`${i}_ectype`] && LotteryFootballKey[`${i}_ectype`][s]) || LotteryFootballKey[i][s],
              opt: (optOdds[i] && optOdds[i][s])
            }
          } else {
            this.let_point = odds[i][s]
          }
        }
      }
    } else {
      for (let i in odds) {
        for (let s in odds[i]) {
          if (s !== 'let_point') {
            name[s] = {
              odds: odds[i][s],
              name: (LotteryBasketballKey[`${i}_ectype`] && LotteryBasketballKey[`${i}_ectype`][s]) || LotteryBasketballKey[i][s],
              opt: (optOdds[i] && optOdds[i][s])
            };
          } else {
            this.let_point = odds[i][s]
          }
        }
      }
    }
    return name
  }

  handleBalls () {
    const block = '#';
    const sep = ',';
    let result = [this.bet_number];
    if (this.bet_number.indexOf(block) !== -1) {
      result = this.bet_number.split(block);
    }
    if (Lottery.isSYXW(this.lottery_id)) {
      result = [result.join(',')];
    }
    return result.map(value => {
      return value.split(sep);
    })
  }

  getIssue () {
    const block = '#';
    const sep = ',';
    let result, ballSelected;
    // 预选内容
    if (IS_SPORTS[this.lottery_id]) {
      return {...this}
    } else {
      if (this.bet_number.indexOf(block) !== -1) {
        result = this.bet_number.split(block);
        ballSelected = result.map(value => value.split(sep));
      } else {
        ballSelected = this.bet_number.split(sep);
      }
      if (Lottery.isSYXW(this.lottery_id)) {
        let playType = {id: parseInt(this.play_type), value: PlayType[this.play_type]};
        return {playType: playType, ballSelected: ballSelected};
      } else {
        return {ballSelected: ballSelected, playType: {id: 1, value: '普通投注'}};
      }
    }
  }

  TimeDispose (time = 0) {
    const date = new Date(time * 1000);
    return `${date.getHours()}:${date.getMinutes()}截至`
  }
}
