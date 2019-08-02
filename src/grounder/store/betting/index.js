import { LOTTERYIDS } from '../../../store/constants.js'
import { HTTP } from '../../http.js'
import { floor } from '../../../common/util.js'

export const GROUNDER_STATUS = {
  '0': '未开始',
  '1': '上半场',
  '2': '中场休息',
  '3': '下半场',
  '4': '加时赛',
  '5': '点球',
  '-1': '比赛结束',
  '-10': '比赛取消',
  '-11': '待定',
  '-12': '比赛终止',
  '-13': '比赛待恢复',
  '-14': '比赛推迟'
}
export const GET_JC_LIST = 'GET_JC_LIST'
export const SET_LOTTERY_DATA = 'SET_LOTTERY_DATA'
export const SET_LOTTERY_ID = 'SET_LOTTERY_ID'
export const SET_PLAY_TYPE = 'SET_PLAY_TYPE'
export const ADD_BETTING_ITEM = 'ADD_BETTING_ITEM'

const actions = {
  async [GET_JC_LIST] ({ commit, rootState, state }, params) {
    let lotteryId, playType, data
    if (params && params.lotteryId && params.playType) {
      lotteryId = params.lotteryId
      playType = params.playType
    } else if (state.lotteryId && state.playType) {
      lotteryId = state.lotteryId
      playType = state.playType
    } else {
      return new Error('参数错误')
    }
    data = await HTTP.getLotteryGetJcList(lotteryId, playType)
    commit(SET_LOTTERY_ID, data.lottery_id * 1 || lotteryId * 1)
    commit(SET_PLAY_TYPE, playType)
    commit(SET_LOTTERY_DATA, data)
    return data
  }
}
const mutations = {
  [SET_LOTTERY_DATA] (state, { groups }) {
    state[state.lotteryId] = groups
  },
  [SET_LOTTERY_ID] (state, lotteryId) {
    state.lotteryId !== lotteryId && (state.lotteryId = lotteryId)
  },
  [SET_PLAY_TYPE] (state, playType) {
    state.playType !== playType && (state.playType = playType)
  },
  [ADD_BETTING_ITEM] (state, betItem) {
    state.betItem = betItem
  }
}

export default {
  state: {
    [LOTTERYIDS.GROUNDER_FOOTBALL_RQ]: [], // === groups
    [LOTTERYIDS.GROUNDER_FOOTBALL_DXQ]: [],
    lotteryId: null,
    playType: null, // 滚盘默认1
    betItem: null
  },
  mutations,
  actions
}

export function oddDiscern (odd) {
  // 赔率变化
  const len = odd.length - 2
  const odds = odd.substring(0, len)
  if (odd.startsWith('-u', len)) {
    return { odd: floor(odds), oddStatus: 'up' }
  } else if (odd.startsWith('-d', len)) {
    return { odd: floor(odds), oddStatus: 'down' }
  }
  return { odd: floor(odds), oddStatus: '' }
}
