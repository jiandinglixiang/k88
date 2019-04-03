import { OrderStatus } from '../store/constants';
import Util from '../common/util';

export default class LotteryOrder {
  constructor (obj, type) {
    this.lottery_id = String(obj.lottery_id);
    this.issue_no = obj.issue_no;
    this.lottery_name = obj.lottery_name;
    this.status = obj.status;
    this.sku = obj.sku;
    this.lottery_image = obj.lottery_image;
    this.multiple = obj.multiple;
    this.failure_amount = obj.failure_amount;
    this.total_amount = obj.total_amount;
    this.stackCount = obj.total_amount / obj.multiple / 2;
    this.ahstackCount = obj.stake_count;
    this.winnings_bonus = obj.winnings_bonus;
    this.official_prize_time = obj.official_prize_time;
    this.buying_time = obj.buying_time || obj.bet_time;

    this.is_recommend = obj.is_recommend;
    this.commission = obj.commission;
    this.commission_amount = obj.commission_amount;
    this.recommend_user_id = obj.recommend_user_id;
    this.recommend_nick_name = obj.recommend_nick_name;

    if (type && type === 'buyTogether') {
      // 合买特殊详情
      this.prize_time = obj.prize_time;
      this.addition_amount = obj.addition_amount;
      this.status_desc = obj.status_desc;
      this.nick_name = obj.nick_name;
      this.user_name = obj.user_name;
      this.history_gain = obj.history_gain;
      this.user_id = obj.user_id;
      this.total_unit = obj.total_unit;
      this.total_subscribe = obj.total_subscribe;
      this.subscribe = obj.subscribe;
      this.ensure = obj.ensure;
      this.is_subscribe = obj.is_subscribe;
      this.author_subscribe = obj.author_subscribe;
      this.history_record = obj.history_record;
      this.type = obj.type;
      this.issue_id = obj.issue_id;
      this.end_time = obj.end_time;
      this.copurchase_end_time = obj.copurchase_end_time;
      this.unit_amount = obj.unit_amount;
      this.user_amount = obj.user_amount;
      this.id = obj.order_id;// 如果没有ID就订单id
      this.user_failure_amount = obj.user_failure_amount;
      this.ensure_used = obj.ensure_used;
    } else {
      this.id = obj.id;
      this.plus_award_amount = obj.plus_award_amount;// 嘉奖金额
      this.handleStatus();
    }
  }

  handleStatus () {
    this.statusText = OrderStatus[this.status];
    this.statusIcon = this.status === 5 ? 'win-icon'
      : this.status === 4 ? 'no-win-icon'
        : this.status === 8 ? 'refund-icon' : '';
    if (this.lottery_id === '1' || this.lottery_id === '3') {
      if (this.official_prize_time > 0 && (this.status === 7 || this.status === 3)) {
        const DayTime = 86400000;
        const currentStr = Util.timeFmt(Date.now() / 1000, 'yyyy-MM-dd');
        const timestamp = this.official_prize_time * 1000 - (new Date(currentStr)).getTime();
        if (timestamp > 2 * DayTime) {
          this.statusIconText = Util.timeFmt(this.official_prize_time, 'M/d') + ' 开奖';
          this.statusIcon = 'prize-time-icon';
        } else if (timestamp > DayTime) {
          this.statusIconText = '明日开奖';
          this.statusIcon = 'prize-time-icon';
        } else if (timestamp > 0) {
          this.statusIconText = '今日开奖';
          this.statusIcon = 'prize-time-icon';
        }
      }
    }
  }
}
