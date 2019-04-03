import SportsLotteryJcInfo from './SportsLotteryJcInfo';
import LotteryOrder from '../LotteryOrder';
import { SeriesType } from '../../store/constants';

export function initJcInfo (jcInfo) {
  return jcInfo.map(jc => {
    return new SportsLotteryJcInfo(jc, jc.lottery_id);
  })
}

export default class SportsLotteryOrder extends LotteryOrder {
  constructor (obj, ...type) {
    super(obj, ...type);
    this.jc_info = obj.jc_info;
    this.series = obj.series;
    this.handleJcInfo();
    this.setContentTitle();
  }

  handleJcInfo () {
    this.jc_info = this.jc_info.map(jc => {
      return new SportsLotteryJcInfo(jc, this.lottery_id);
    })
  }

  // 设置表格title
  setContentTitle () {
    let seriesArr = this.series.split(',').map(value => {
      return SeriesType[value];
    })
    let seriesStr = seriesArr.join(',');
    // 串数统计
    if (String(this.lottery_id) === '901' || String(this.lottery_id) === '902') {
      this.contextTitle = '投注内容：' + this.ahstackCount + '注, ' + this.jc_info.length + '场, ' +
        seriesStr;
    } else {
      this.contextTitle = '投注内容：' + this.stackCount + '注, ' + this.jc_info.length + '场, ' +
        seriesStr + `, ${this.multiple}倍`;
    }
    if (String(this.lottery_id) === '20' || String(this.lottery_id) === '21') {
      this.issueNoShow = true;
    }
  }
}
