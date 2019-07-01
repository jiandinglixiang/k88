import { LOTTERYIDS } from '../../store/constants'

const SYXWBetting = 'SYXWBetting'
const SSQBetting = 'SSQBetting'
const FootballBetting = 'FootballBetting'
const BasketballBetting = 'BasketballBetting'
const AHFooter = 'AHFooter'
const K3Betting = 'K3Betting'
const SFCBetting = 'SFCBetting'
const FC3DBetting = 'FC3DBetting'
export const GrounderBetting = 'GrounderBetting'

export default class Lottery {
  static getComponent (lotteryId) {
    const LotteryComponent = {
      [LOTTERYIDS.SYXW]: SYXWBetting,
      [LOTTERYIDS.SYXW8]: SYXWBetting,
      [LOTTERYIDS.SYXW18]: SYXWBetting,
      [LOTTERYIDS.SSQ]: SSQBetting,
      [LOTTERYIDS.DLT]: SSQBetting,
      [LOTTERYIDS.FOOTBALL]: FootballBetting,
      [LOTTERYIDS.BASKETBALL]: BasketballBetting,
      [LOTTERYIDS.K3]: K3Betting,
      [LOTTERYIDS.JXK3]: K3Betting,
      [LOTTERYIDS.JSK3]: K3Betting,
      [LOTTERYIDS.SFC]: SFCBetting,
      [LOTTERYIDS.RXJ]: SFCBetting,
      [LOTTERYIDS.FC3D]: FC3DBetting,
      [LOTTERYIDS.FOOTBALL_SPF]: FootballBetting,
      [LOTTERYIDS.FOOTBALL_RQSPF]: FootballBetting,
      [LOTTERYIDS.FOOTBALL_BF]: FootballBetting,
      [LOTTERYIDS.FOOTBALL_ZJQ]: FootballBetting,
      [LOTTERYIDS.FOOTBALL_BQC]: FootballBetting,
      [LOTTERYIDS.FOOTBALL_HH]: FootballBetting,
      [LOTTERYIDS.BASKETBALL_SF]: BasketballBetting,
      [LOTTERYIDS.BASKETBALL_RFSF]: BasketballBetting,
      [LOTTERYIDS.BASKETBALL_SFC]: BasketballBetting,
      [LOTTERYIDS.BASKETBALL_DXF]: BasketballBetting,
      [LOTTERYIDS.BASKETBALL_HH]: BasketballBetting,
      [LOTTERYIDS.AHFOOTBALL]: AHFooter,
      [LOTTERYIDS.AHFOOTBALL_QCRQ]: AHFooter,
      [LOTTERYIDS.AHFOOTBALL_QCDXQ]: AHFooter,
      [LOTTERYIDS.GROUNDER]: GrounderBetting
    }
    return LotteryComponent[lotteryId]
  }

  static isSYXW (lotteryId) {
    return [LOTTERYIDS.SYXW, LOTTERYIDS.SYXW8, LOTTERYIDS.SYXW18].indexOf(parseInt(lotteryId)) !== -1
  }

  static isSSQ (lotteryId) {
    return LOTTERYIDS.SSQ === parseInt(lotteryId)
  }

  static isDLT (lotteryId) {
    return LOTTERYIDS.DLT === parseInt(lotteryId)
  }

  static isK3 (lotteryId) {
    return [LOTTERYIDS.K3, LOTTERYIDS.JXK3, LOTTERYIDS.JSK3].includes(parseInt(lotteryId))
  }

  static isFC3D (lotteryId) {
    return [LOTTERYIDS.FC3D].includes(parseInt(lotteryId))
  }

  static isFootBall (lotteryId) {
    return [LOTTERYIDS.FOOTBALL_SPF, LOTTERYIDS.FOOTBALL_RQSPF, LOTTERYIDS.FOOTBALL_BF, LOTTERYIDS.FOOTBALL_ZJQ,
      LOTTERYIDS.FOOTBALL_BQC, LOTTERYIDS.FOOTBALL_HH].indexOf(parseInt(lotteryId)) !== -1
  }

  static isBasketBall (lotteryId) {
    return [LOTTERYIDS.BASKETBALL_DXF, LOTTERYIDS.BASKETBALL_HH, LOTTERYIDS.BASKETBALL_SFC,
      LOTTERYIDS.BASKETBALL_RFSF, LOTTERYIDS.BASKETBALL_SF].indexOf(parseInt(lotteryId)) !== -1
  }

  static isAHFootBall (lotteryId) {
    return [LOTTERYIDS.AHFOOTBALL_QCRQ, LOTTERYIDS.AHFOOTBALL_QCDXQ].indexOf(parseInt(lotteryId)) !== -1
  }

  static isRecommend (lotteryId) {
    return this.isFootBall(lotteryId) || this.isBasketBall(lotteryId) || this.isAHFootBall(lotteryId)
  }

  static isSFCOrRXJ (lotteryId) {
    return [LOTTERYIDS.SFC, LOTTERYIDS.RXJ].indexOf(parseInt(lotteryId)) !== -1
  }

  static isDigital (id) {
    return Lottery.isDLT(id) || Lottery.isSSQ(id) || Lottery.isSYXW(id) || Lottery.isK3(id) || Lottery.isFC3D(id)
  }

  static isSFC (lotteryId) {
    return LOTTERYIDS.SFC === parseInt(lotteryId)
  }

  static isRXJ (lotteryId) {
    return LOTTERYIDS.RXJ === parseInt(lotteryId)
  }

  static isBuyTogether (ID) {
    return [LOTTERYIDS.RXJ, LOTTERYIDS.SFC, LOTTERYIDS.DLT, LOTTERYIDS.SSQ, LOTTERYIDS.FOOTBALL_SPF, LOTTERYIDS.FOOTBALL_RQSPF, LOTTERYIDS.FOOTBALL_BF, LOTTERYIDS.FOOTBALL_ZJQ,
      LOTTERYIDS.FOOTBALL_BQC, LOTTERYIDS.FOOTBALL_HH,
      LOTTERYIDS.BASKETBALL_DXF, LOTTERYIDS.BASKETBALL_HH, LOTTERYIDS.BASKETBALL_SFC,
      LOTTERYIDS.BASKETBALL_RFSF, LOTTERYIDS.BASKETBALL_SF,
      LOTTERYIDS.AHFOOTBALL_QCRQ, LOTTERYIDS.AHFOOTBALL_QCRQ].indexOf(parseInt(ID)) !== -1
  }

  static isJointPurchase (lotteryId) {
    if (typeof lotteryId === 'string') {
      lotteryId = parseInt(lotteryId)
    }
    return [LOTTERYIDS.FOOTBALL_SPF,
      LOTTERYIDS.FOOTBALL_RQSPF,
      LOTTERYIDS.FOOTBALL_BF,
      LOTTERYIDS.FOOTBALL_ZJQ,
      LOTTERYIDS.FOOTBALL_BQC,
      LOTTERYIDS.FOOTBALL_HH,
      LOTTERYIDS.BASKETBALL_SF,
      LOTTERYIDS.BASKETBALL_RFSF,
      LOTTERYIDS.BASKETBALL_SFC,
      LOTTERYIDS.BASKETBALL_DXF,
      LOTTERYIDS.BASKETBALL_HH,
      LOTTERYIDS.SFC,
      LOTTERYIDS.RXJ,
      LOTTERYIDS.SSQ,
      LOTTERYIDS.DLT,
      LOTTERYIDS.FOOTBALL,
      LOTTERYIDS.BASKETBALL,
      LOTTERYIDS.AHFOOTBALL,
      LOTTERYIDS.AHFOOTBALL_QCRQ,
      LOTTERYIDS.AHFOOTBALL_QCDXQ
    ].indexOf(lotteryId) !== -1
  }

  static getHelpUrl (lotteryId) {
    switch (lotteryId * 1) {
      case LOTTERYIDS.SYXW:
      case LOTTERYIDS.SYXW8:
      case LOTTERYIDS.SYXW18:
        return 'http://tgapi.k888.bet/index.php?s=/Content/help/p5.html'
      case LOTTERYIDS.SSQ:
        return 'http://tgapi.k888.bet/index.php?s=/Content/help/ssq.html'
      case LOTTERYIDS.DLT:
        return 'http://tgapi.k888.bet/index.php?s=/Content/help/dlt.html'
      case LOTTERYIDS.K3:
      case LOTTERYIDS.JXK3:
      case LOTTERYIDS.JSK3:
        return 'http://tgapi.k888.bet/index.php?s=/Content/help/ks.html'
      case LOTTERYIDS.FOOTBALL:
        return 'http://tgapi.k888.bet/index.php?s=/Content/help/jczq.html'
      case LOTTERYIDS.BASKETBALL:
        return 'http://tgapi.k888.bet/index.php?s=/Content/help/jclq.html'
      case LOTTERYIDS.SFC:
        return 'http://tgapi.k888.bet/index.php?s=/Content/help/jcsfc.html'
      case LOTTERYIDS.RXJ:
        return 'http://tgapi.k888.bet/index.php?s=/Content/help/jcrxj.html'
      case LOTTERYIDS.FC3D:
        return 'http://tgapi.k888.bet/index.php?s=/Content/help/p3.html'
      case LOTTERYIDS.AHFOOTBALL:
      case LOTTERYIDS.AHFOOTBALL_QCRQ:
      case LOTTERYIDS.AHFOOTBALL_QCDXQ:
        return 'http://tgapi.k888.bet/index.php?s=/Content/help/jcyp.html'
    }
  }

  static getPrizeBalls (prizeText) {
    const block = '#'
    const sep = ','
    let result = [prizeText]
    if (prizeText.indexOf(block) !== -1) {
      result = prizeText.split(block)
    }
    return result.map(value => {
      return value.split(sep)
    })
  }
}
