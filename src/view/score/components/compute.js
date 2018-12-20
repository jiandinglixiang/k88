import { SeriesType } from '../../../store/constants.js'
import SportsCalculate from '../../../model/sports/SportsCalculate'
import SportsLotteryJcInfo from '../../../model/sports/SportsLotteryJcInfo';

export default class compute {
  constructor (groups) {
    this.groups = depthCopy(groups)
    return this.Dispose()
  }

  Dispose () {
    let location = [];
    let PromsSave = [];
    this.groups.groups = this.groups.groups.map((data, indexA) => {
      data.list = data.list.map((list, indexB) => {
        // 比赛信息处理
        if (list.lottery_id === '20' || list.lottery_id === '21') {
          // 胜负彩处理
          list.ectypePrizeNum = list.schedule_list.map((item) => {
            let score;
            if (item.match_status === 3) {
              score = item.current_score.split(':');
              if (score[0] && score[1]) {
                if (score[0] === score[1]) {
                  return 1
                }
                return score[0] > score[1] ? 3 : 0;
              }
              return '-'
            }
            return '-'
          })
        }
        list.jc_info = list.jc_info.map(info => {
          const newInfo = new SportsLotteryJcInfo(info, info.lottery_id);
          const index = list.schedule_list.findIndex(schedule => {
            if (schedule.id === info.id || schedule.issue_no + schedule.round_no === info.issue_no + info.round_no) {
              return true
            }
            return false
          });
          if (index !== -1) {
            const AMatch = list.schedule_list.splice(index, 1);
            info = Object.assign(newInfo, info, {AMatch: AMatch[0]});
          } else {
            info = Object.assign(newInfo, info, {AMatch: {}});
          }
          info.selected = info.betting;
          return info;
        });
        // 如果是胜负彩就不计算奖金
        if (list.lottery_id === '20' || list.lottery_id === '21') return list;
        // 奖金计算
        let series = [];
        if (list.series) {
          list.seriesText = SeriesType[list.series];
          series.push({key: list.series, value: SeriesType[list.series]});
        }
        location.push([indexA, indexB])
        PromsSave.push(this.setProjectBonus(list.lottery_id, series, list.jc_info, list.multiple));
        return list;
      });
      return data;
    });

    return Promise.all(PromsSave).then(yes => {
      location.forEach((item, index) => {
        if (Object.prototype.toString.call(yes[index]) === `[object Object]`) {
          yes[index].min *= this.groups.groups[item[0]].list[item[1]].multiple
          yes[index].max *= this.groups.groups[item[0]].list[item[1]].multiple
          this.groups.groups[item[0]].list[item[1]].calculatePrice = yes[index]
          this.groups.groups[item[0]].list[item[1]].oddsMin = (yes[index].min).toFixed(2)
          this.groups.groups[item[0]].list[item[1]].oddsMax = (yes[index].max).toFixed(2)
        } else {
          this.groups.groups[item[0]].list[item[1]].oddsMin = 0
          this.groups.groups[item[0]].list[item[1]].oddsMax = 0
          this.groups.groups[item[0]].list[item[1]].calculatePrice = {}
        }
      });
      return Promise.resolve(depthCopy(this.groups));
    })
  }

  setProjectBonus (lotteryId, series, orders, multiple) {
    return new SportsCalculate(lotteryId).setProjectBonus(series, orders, multiple)
  }
}

function depthCopy (obj) {
  let data;
  let type = Object.prototype.toString.call(obj);
  switch (type) {
    case '[object Object]':
      data = {...obj};
      for (let i in data) {
        data[i] = depthCopy(data[i]);
      }
      break;
    case '[object Array]':
      data = [...obj];
      for (let i in data) {
        data[i] = depthCopy(data[i]);
      }
      break;
    default:
      data = obj;
  }
  return data
}
