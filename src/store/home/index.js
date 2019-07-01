import * as types from './types'
import Http from '../Http'
import loading from '../../common/loading'
import HomeLotteryItem from '../../model/HomeLotteryItem'
import HomeLotteryIssue from '../../model/HomeLotteryIssue'
import { LOTTERYIDS } from '../constants'

const actions = {
  [types.GET_BANNER] (context) {
    const { state } = context
    if (state.banners.length === 0) {
      Http.get('/Home/getBanner').then(data => {
        context.commit(types.GET_BANNER, data)
      })
    }
  },
  [types.GET_LOTTERY_LIST] (context) {
    const { state } = context

    if (state.lotteries.length === 0) {
      loading.show()
      return Http.get('/Lottery/getLotteryList').then(data => {
        context.commit(types.GET_LOTTERY_LIST, data)
        loading.hide()
      })
    }
  },
  [types.LOTTERY_LIST_REFRESH] (context) {
    Http.get('/Lottery/getLotteryList').then(data => {
      context.commit(types.GET_LOTTERY_LIST, data)
    })
  },
  [types.GET_RECOMMEND_ISSUE] (context) {
    const { state } = context

    if (!state.issue.lottery_id) {
      Http.get('/Home/getRecommentIssue').then(data => {
        data && context.commit(types.GET_RECOMMEND_ISSUE, data)
      })
    }
  },
  [types.GET_INFORMATION_LIST] (context) {
    const { state } = context

    if (Array.isArray(state.information) === true) {
      if (state.information.length === 0) {
        Http.get('/News/getRecommendList').then(data => {
          context.commit(types.GET_INFORMATION_LIST, data)
        })
      }
    }
  },
  [types.RECOMMEND_ISSUE_REFRESH] (context) {
    Http.get('/Home/getRecommentIssue').then(data => {
      context.commit(types.GET_RECOMMEND_ISSUE, data)
    })
  }
}

const mutations = {
  [types.DEVICE_RESIZE] (state, params) {
    state.Device = { width: params.width, height: params.height, navInfo: params.navInfo }
  },
  [types.GET_BANNER] (state, banners) {
    state.banners = banners
  },
  [types.GET_LOTTERY_LIST] (state, data) {
    if (state.lotteries) {
      // 取消定时器
      state.lotteries.map(value => value.onClearInterval())
    }
    if (process.env.NODE_ENV !== 'production') {
      const grounder = JSON.parse(JSON.stringify(data.list[0]))
      grounder.lottery_id = `${LOTTERYIDS.GROUNDER}`
      grounder.lottery_name = '滚盘'
      data.list.push(grounder)
    }
    state.lotteries = data.list.map(value => {
      return new HomeLotteryItem(value, data.server_time)
    })
  },
  [types.GET_RECOMMEND_ISSUE] (state, issue) {
    Object.prototype.toString.call(issue) === '[object Object]' && (state.issue = new HomeLotteryIssue(issue))
  },
  [types.GET_INFORMATION_LIST] (state, data) {
    state.information = data.list
  }
}

export default {
  state: {
    Device: { // 设备信息
      navInfo: { wx: false, ios: false, android: false },
      width: 100,
      height: 100
    },
    banners: [],
    issue: {},
    lotteries: [],
    information: []
  },
  mutations,
  actions
}
