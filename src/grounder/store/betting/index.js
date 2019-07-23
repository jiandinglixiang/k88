import { LOTTERYIDS } from '../../../store/constants.js'
import { HTTP } from '../../http.js'
import { floor } from '../../../common/util.js'

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
    // groups.push({
    //   'id': 20,
    //   'name': '2019-07-23',
    //   'schedules': [
    //     {
    //       'id': '418543',
    //       'round_no': '310',
    //       'home': '测试测试测试',
    //       'guest': '测试测试测试',
    //       'league': '测试测试测试',
    //       'real_time_score': '',
    //       'start_time': 1563873300,
    //       'server_time': 1563872869,
    //       'game_stauts': '0',
    //       'is_lock': 0,
    //       'betting_date': 1563873300,
    //       'match_id': '90723310',
    //       'end_time': 1563873300,
    //       'betting_score_odds': { 'betting_score_letball': { 'v322': '1.9-e', 'v321': '1.9-e' } },
    //       'third_party_schedule_id': '1756416',
    //       'history_fight': { 'win': 0, 'equal': 0, 'lose': 0, 'games_count': 0 },
    //       'latest_record': {
    //         'home': { 'win': 0, 'equal': 0, 'lose': 0, 'games_count': 0 },
    //         'guest': { 'win': 0, 'equal': 0, 'lose': 0, 'games_count': 0 }
    //       },
    //       'home_rank': 0,
    //       'guest_rank': 0,
    //       'betting_win_percent': '',
    //       'betting_equal_percent': '',
    //       'betting_lose_percent': '',
    //       'average_equal_odds': 0,
    //       'average_win_odds': 0,
    //       'average_lose_odds': 0
    //     },
    //     {
    //       'id': '417122',
    //       'round_no': '065',
    //       'home': '测试测试测试',
    //       'guest': '测试测试测试',
    //       'league': '测试测试测试',
    //       'real_time_score': '',
    //       'start_time': 1563874200,
    //       'server_time': 1563872869,
    //       'game_stauts': '0',
    //       'is_lock': 0,
    //       'betting_date': 1563874200,
    //       'match_id': '90723065',
    //       'end_time': 1563874200,
    //       'betting_score_odds': {
    //         'betting_score_letball': {
    //           'v112': '1.9-e',
    //           'v111': '1.9-e',
    //           'v102': '2-e',
    //           'v101': '1.8-e',
    //           'v082': '1.9-e',
    //           'v081': '1.9-e'
    //         }
    //       },
    //       'third_party_schedule_id': '1755226',
    //       'history_fight': { 'win': 0, 'equal': 0, 'lose': 0, 'games_count': 0 },
    //       'latest_record': {
    //         'home': { 'win': 0, 'equal': 0, 'lose': 0, 'games_count': 0 },
    //         'guest': { 'win': 0, 'equal': 0, 'lose': 0, 'games_count': 0 }
    //       },
    //       'home_rank': 0,
    //       'guest_rank': 0,
    //       'betting_win_percent': '',
    //       'betting_equal_percent': '',
    //       'betting_lose_percent': '',
    //       'average_equal_odds': 0,
    //       'average_win_odds': 0,
    //       'average_lose_odds': 0
    //     },
    //     {
    //       'id': '417126',
    //       'round_no': '066',
    //       'home': '测试测试测试',
    //       'guest': '测试测试测试',
    //       'league': '测试测试测试',
    //       'real_time_score': '',
    //       'start_time': 1563874200,
    //       'server_time': 1563872869,
    //       'game_stauts': '0',
    //       'is_lock': 0,
    //       'betting_date': 1563874200,
    //       'match_id': '90723066',
    //       'end_time': 1563874200,
    //       'betting_score_odds': {
    //         'betting_score_letball': {
    //           'v362': '1.9-e',
    //           'v361': '1.9-e',
    //           'v352': '2.3-u',
    //           'v351': '1.6-d',
    //           'v342': '1.9-e',
    //           'v341': '1.9-e',
    //           'v332': '2.5-e',
    //           'v331': '1.5-e'
    //         }
    //       },
    //       'third_party_schedule_id': '1755227',
    //       'history_fight': { 'win': 0, 'equal': 0, 'lose': 0, 'games_count': 0 },
    //       'latest_record': {
    //         'home': { 'win': 0, 'equal': 0, 'lose': 0, 'games_count': 0 },
    //         'guest': { 'win': 0, 'equal': 0, 'lose': 0, 'games_count': 0 }
    //       },
    //       'home_rank': 0,
    //       'guest_rank': 0,
    //       'betting_win_percent': '',
    //       'betting_equal_percent': '',
    //       'betting_lose_percent': '',
    //       'average_equal_odds': 0,
    //       'average_win_odds': 0,
    //       'average_lose_odds': 0
    //     }
    //   ]
    // })
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
