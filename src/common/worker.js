'use strict'

this.onmessage = async function (event) {
  const EVENT_DATA = event.data.slice(1)
  // eslint-disable-next-line no-eval
  const val = await eval(`(${event.data[0]})(...EVENT_DATA)`)
  this.postMessage(val)
  this.close()
  return EVENT_DATA
}

export default async function (func, ...arg) {
  if (typeof func !== 'function') return new Error('func!==function')
  const work = new Worker('./worker.js')
  return new Promise(function (resolve, reject) {
    work.onmessage = function (value) {
      resolve(value)
      work.terminate()
    }
    work.addEventListener('error', function (value) {
      reject(value)
      work.terminate()
    })
    work.addEventListener('messageerror', function (value) {
      reject(value)
      work.terminate()
    })
    work.postMessage([func.toString(), ...arg])
  })
}
