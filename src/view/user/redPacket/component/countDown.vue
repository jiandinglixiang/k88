<template>
  <span :endText="endText" :endTime="endTime">
    <slot>
      剩余:{{content}}
    </slot>
  </span>
</template>
<script>//
export default {
  name: 'countDown',
  data () {
    return {
      content: ''
    }
  },
  props: {
    endTime: {
      type: Number,
      default: 0
    },
    endText: {
      type: String,
      default: '已结束'
    }
  },
  mounted () {
    this.countdowm(this.endTime)
  },
  methods: {
    countdowm (timestamp) {
      let self = this
      let timer = setInterval(function () {
        let nowTime = new Date()
        let endTime = new Date(timestamp * 1000)
        let t = endTime.getTime() - nowTime.getTime()
        if (t > 0) {
          let day = Math.floor(t / 86400000)
          let hour = Math.floor((t / 3600000) % 24)
          let min = Math.floor((t / 60000) % 60)
          let sec = Math.floor((t / 1000) % 60)
          hour = hour < 10 ? '0' + hour : hour
          min = min < 10 ? '0' + min : min
          sec = sec < 10 ? '0' + sec : sec
          let format = ''
          if (day > 0) {
            format = `${day}天`
            clearInterval(timer)
          }
          if (day <= 0 && hour > 0) {
            format = `${hour}:${min}:${sec}`
          }
          if (day <= 0 && hour <= 0) {
            format = `${min}:${sec}`
          }
          self.content = format
        } else {
          clearInterval(timer)
          self.content = self.endText
        }
      }, 1000)
    }
  }
}
</script>
