import DigitalLotteryOrder from './digital/DigitalLotteryOrder';
import SportsLotteryOrder from './sports/SportsLotteryOrder';

export default class Order {
  constructor (obj, type) {
    if (obj.jc_info && obj.jc_info.length) {
      return new SportsLotteryOrder(obj, type);
    } else if (obj.tickets && obj.tickets.length) {
      return new DigitalLotteryOrder(obj, type);
    }
  }
}
