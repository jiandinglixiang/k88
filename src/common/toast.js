/**
 * Created by admin on 2017/4/1.
 */
import { Toast as tt } from 'mint-ui'

let toastObj = null
export const Toast = function (message, position, duration) {
  if (!toastObj) {
    toastObj = tt({
      message: message,
      position: position || 'middle'
    })
    setTimeout(() => {
      toastObj.close()
      toastObj = null
    }, duration || 2000)
  }
}
export const toast = Toast
export default Toast
