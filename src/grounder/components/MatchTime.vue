<template>
  <p>{{timeInit}}</p>
</template>

<script>//
import { GROUNDER_STATUS } from '../store/betting'

export default {
  name: 'MatchTime',
  props: {
    gameStatus: Number,
    serverTime: Number,
    startTime: Number
  },
  data () {
    return {
      downTime: 1,
      time: null,
      serverTimeCopy: Number,
      startTimeCopy: Number
    }
  },
  created () {},
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
      const [status1, status3] = [this.gameStatus === 1, this.gameStatus === 3]
      if (status1 && status3) {
        // if (this.serverTimeCopy !== this.serverTime) {
        //   this.countdown(1);
        // }
        const past = (this.serverTime) - this.startTime + this.downTime // 现在时间与开始时间差额
        const m = Math.floor(past / 60)
        const ms = past - m * 60
        if (status1 && m > 45) return '45:00+'
        if (status3 && m > 90) return '90:00+'
        return `${m}:${ms > 9 ? ms : '0' + ms}`
      }
      return GROUNDER_STATUS[this.gameStatus]
    }
  },
  methods: {
    countdown () {
      clearInterval(this.time)
      this.downTime = 1
      this.serverTimeCopy = this.serverTime
      this.startTimeCopy = this.startTime
      this.time = setInterval(() => {
        this.downTime++
      }, 1100)
    }
  },
  beforeDestroy () {
    clearInterval(this.time)
  }
}
</script>

<style scoped>

</style>
