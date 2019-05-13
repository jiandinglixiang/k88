import SportsPrize from '../SportsPrize'

export default class AHFootballPrize extends SportsPrize {
  constructor (obj) {
    super(obj)
    this.isAHFootBall = true
  }
}
