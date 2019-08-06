<template>
  <div class="RoundnessChart">
    <div class="left">
      <div :style="{transform:`rotateZ(${rotate[1]}deg)`}" class="left-red"></div>
      <div :style="{transform:`rotateZ(${rotate[3]}deg)`}" class="left-green"></div>
    </div>
    <div class="right">
      <div :style="{transform:`rotateZ(${rotate[0]}deg)`}" class="right-red"></div>
      <div :style="{transform:`rotateZ(${rotate[2]}deg)`}" class="right-green"></div>
    </div>
    <div class="progress"><span>{{txt||'0'}}</span></div>
  </div>
</template>

<script>//
function validator (value) {
  return value >= 0 && value <= 100
}

export default {
  name: 'RoundnessChart',
  props: {
    red: {
      type: Number,
      validator,
      default: 100
    },
    green: {
      type: Number,
      validator,
      default: 0
    },
    txt: [Number, String]
  },
  data () {
    return {}
  },
  computed: {
    rotate () {
      const rotateZ = [-180, -180, -180, -180]
      const redAngle = dispose(this.red, this.green)
      rotateZ[1] = (redAngle[1] * 3.6) - 180// left-red
      rotateZ[3] = (redAngle[3] * 3.6) - 180// left-green
      // --
      rotateZ[0] = (redAngle[0] * 3.6) - 180// right-red
      rotateZ[2] = (redAngle[2] * 3.6) - 180// right-green
      return rotateZ
    }
  },
  methods: {}
}

function dispose (val3, val4) {
  const arr = []
  if ((val3 + val4) / 100 > 1) {
    let temp = val3
    val3 /= ((temp + val4) / 100)
    val4 /= ((temp + val4) / 100)
  }
  if (val3 > 50) {
    arr[0] = 50// right-red
    arr[2] = 50 // right-green
    arr[1] = val3 - 50// left-red
    arr[3] = (val3 - 50) + val4 <= 50 ? (val3 - 50) + val4 : 50// left-green
  } else {
    arr[0] = val3// right-red
    arr[2] = val3 + val4 <= 50 ? val3 + val4 : 50// right-green
    arr[1] = 0// left-red
    arr[3] = arr[2] === 50 ? (val3 + val4) - 50 : 0// left-green
  }
  return arr
}

</script>

<style lang="scss" scoped>
  .RoundnessChart {
    position: relative;
    overflow: hidden;
    width: 20px;
    height: 20px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    .progress {
      position: absolute;
      left: 3px;
      top: 3px;
      width: 14px;
      height: 14px;
      background-color: #131313;
      border-radius: 50%;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      z-index: 5;

      > span {
        line-height: 1;
        transform: scale(0.6);
      }
    }

    .left, .right {
      overflow: hidden;
      position: absolute;
      width: 50%;
      height: 100%;
      z-index: 1;

      > div {
        position: absolute;
        width: 10px;
        height: 20px;
      }
    }

    .left {
      left: 0;
      border-radius: 20px 0 0 20px;
    }

    .right {
      left: 10px;
      border-radius: 0 20px 20px 0;
    }

    .left-red, .left-green {
      border-radius: 20px 0 0 20px;
      transform-origin: right center;
    }

    .right-red, .right-green {
      border-radius: 0 20px 20px 0;
      transform-origin: left center;
    }

    .left-green, .right-green {
      background-color: #999999;
      z-index: 2;
    }

    .left-red, .right-red {
      background-color: #FFC63A;
      z-index: 3;
    }
  }
</style>
