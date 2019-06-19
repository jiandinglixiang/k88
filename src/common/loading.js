import { Indicator } from 'mint-ui'

export const loading = {
  show () {
    Indicator.open({
      spinnerType: 'fading-circle'
    })
  },
  hide () {
    Indicator.close()
  }
}
export default loading
