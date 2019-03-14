export const NO_CONCEDE = 'betting_score_no_concede';
export const CONCEDE = 'betting_score_concede';
export const SCORES = 'betting_score_scores';
export const BALLS = 'betting_score_balls';
export const HALF = 'betting_score_half';
export const SFC = 'betting_score_sfc';
export const DXF = 'betting_score_dxf';
export const QCRQ = 'betting_score_letball';
export const QCDXQ = 'betting_score_sizeball';

export class BettingScoreOdds {
  static getShowText (lotteryId, key) {
    let type, result;
    switch (parseInt(lotteryId)) {
      case 601:
      case 701: type = NO_CONCEDE; break;
      case 602:
      case 702: type = CONCEDE; break;
      case 603: type = SCORES; break;
      case 604: type = BALLS; break;
      case 605: type = HALF; break;
      case 703: type = SFC; break;
      case 704: type = DXF; break;
      case 901: type = QCRQ; break;
      case 902: type = QCDXQ; break;
    }
    if (type === SCORES) {
      BettingScoreOdds.getType(type).map(value => {
        if (value[key]) {
          result = value[key];
        }
      })
    } else {
      result = BettingScoreOdds.getType(type)[key];
    }
    return result;
  }
  static getType (type) {
    switch (type) {
      case NO_CONCEDE:
        return {
          v0: '主负',
          v1: '平',
          v3: '主胜'
        }
      case CONCEDE:
        return {
          v0: '主负',
          v1: '平',
          v3: '主胜'
        }
      case SCORES:
        return [{
          v10: '1:0', v20: '2:0', v21: '2:1', v30: '3:0', v31: '3:1', v32: '3:2', v40: '4:0', v41: '4:1', v42: '4:2', v50: '5:0', v51: '5:1', v52: '5:2', v90: '胜其他'
        }, {
          v00: '0:0', v11: '1:1', v22: '2:2', v33: '3:3', v99: '平其他'
        }, {
          v01: '0:1', v02: '0:2', v12: '1:2', v03: '0:3', v13: '1:3', v23: '2:3', v04: '0:4', v14: '1:4', v24: '2:4', v05: '0:5', v15: '1:5', v25: '2:5', v09: '负其他'
        }]
      case BALLS:
        return {
          v0: '0',
          v1: '1',
          v2: '2',
          v3: '3',
          v4: '4',
          v5: '5',
          v6: '6',
          v7: '7+'
        }
      case HALF:
        return {
          v33: '胜胜',
          v31: '胜平',
          v30: '胜负',
          v13: '平胜',
          v11: '平平',
          v10: '平负',
          v03: '负胜',
          v01: '负平',
          v00: '负负'
        }
      case SFC:
        return {
          v01: '1-5',
          v02: '6-10',
          v03: '11-15',
          v04: '16-20',
          v05: '21-25',
          v06: '26+',
          v11: '1-5',
          v12: '6-10',
          v13: '11-15',
          v14: '16-20',
          v15: '21-25',
          v16: '26+'
        }
      case DXF:
        return {
          v1: '大分',
          v2: '小分'
        }
      case QCRQ:
        return {
          v001: '0',
          v002: '0',
          v011: '0/0.5',
          v012: '0/-0.5',
          v021: '0.5',
          v022: '-0.5',
          v031: '0.5/1',
          v032: '-0.5/-1',
          v041: '1',
          v042: '-1',
          v051: '1/1.5',
          v052: '-1/-1.5',
          v061: '1.5',
          v062: '-1.5',
          v071: '1.5/2',
          v072: '-1.5/-2',
          v081: '2',
          v082: '-2',
          v091: '2/2.5',
          v092: '-2/-2.5',
          v101: '2.5',
          v102: '-2.5',
          v111: '2.5/3',
          v112: '-2.5/-3',
          v121: '3',
          v122: '-3',
          v131: '3/3.5',
          v132: '-3/-3.5',
          v141: '3.5',
          v142: '-3.5',
          v151: '3.5/4',
          v152: '-3.5/-4',
          v161: '4',
          v162: '-4',
          v171: '4/4.5',
          v172: '-4/-4.5',
          v181: '4.5',
          v182: '-4.5',
          v191: '4.5/5',
          v192: '-4.5/-5',
          v201: '5',
          v202: '-5'
        }
      case QCDXQ:
        return {
          v001: '0',
          v002: '0',
          v011: '0/0.5',
          v012: '0/-0.5',
          v021: '0.5',
          v022: '-0.5',
          v031: '0.5/1',
          v032: '-0.5/-1',
          v041: '1',
          v042: '-1',
          v051: '1/1.5',
          v052: '-1/-1.5',
          v061: '1.5',
          v062: '-1.5',
          v071: '1.5/2',
          v072: '-1.5/-2',
          v081: '2',
          v082: '-2',
          v091: '2/2.5',
          v092: '-2/-2.5',
          v101: '2.5',
          v102: '-2.5',
          v111: '2.5/3',
          v112: '-2.5/-3',
          v121: '3',
          v122: '-3',
          v131: '3/3.5',
          v132: '-3/-3.5',
          v141: '3.5',
          v142: '-3.5',
          v151: '3.5/4',
          v152: '-3.5/-4',
          v161: '4',
          v162: '-4',
          v171: '4/4.5',
          v172: '-4/-4.5',
          v181: '4.5',
          v182: '-4.5',
          v191: '4.5/5',
          v192: '-4.5/-5',
          v201: '5',
          v202: '-5',
          v211: '5/5.5',
          v212: '-5/-5.5',
          v221: '5.5',
          v222: '-5.5',
          v231: '5.5/6',
          v232: '-5.5/-6',
          v241: '6',
          v242: '-6',
          v251: '6/6.5',
          v252: '-6/-6.5',
          v261: '6.5',
          v262: '6.5',
          v271: '6.5/7',
          v272: '-6.5/-7',
          v281: '7',
          v282: '-7'
        }
    }
  }
}
