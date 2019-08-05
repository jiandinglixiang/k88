<template>
  <p>{{timeInit}}</p>
</template>

<script>//
import { GROUNDER_STATUS } from '../store/betting'

export default {
  name: 'MatchTime',
  props: {
    timeUpdate: Number,
    gameStatus: Number,
    serverTime: Number,
    startTime: Number
  },
  data () {
    return {
      downTime: 1,
      time: null,
      serverTimeCopy: Number
    }
  },
  computed: {
    serverTimeOptimize () {
      const date = Date.now() / 1000
      const date1 = this.serverTime + 30
      const date0 = this.serverTime - 30
      if (date1 > date && date0 < date) {
        return Math.floor(date)
      }
      return false
    },
    timeInit () {
      const [status1, status3] = [
        this.gameStatus === 1,
        this.gameStatus === 3
      ]
      if (status1 || status3) {
        // if (this.serverTimeCopy !== this.serverTime) {
        //   this.countdown(1)
        // }
        const nowTime = status3 ? this.serverTime + 2700 : this.serverTime // 下半场
        // console.log(this.timeUpdate)
        const past = nowTime - this.startTime + this.timeUpdate // 现在时间与开始时间差额
        const m = Math.floor(past / 60)
        const ms = past - m * 60
        if (status1 && past > 2700) return '45+'
        if (status3 && past > 5400) return '90+'
        return `${m}:${ms > 9 ? ms : '0' + ms}`
      }
      return GROUNDER_STATUS[this.gameStatus]
    }
  },
  methods: {
    countdown (x) {
      this.downTime = x
      this.serverTimeCopy = this.serverTime
      if (!this.time) {
        this.time = setInterval(() => {
          this.downTime++
        }, 1000)
      }
    }
  },
  beforeDestroy () {
    clearInterval(this.time)
    this.time = null
  }
}
</script>

<style scoped>

</style>
