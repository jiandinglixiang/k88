<template>
  <div :class="{'v-fixed':isFixed}" style="height: 41px">
    <div id="v-head">
      <div class="v-left" @click.stop="goBack" v-if="!hideBack"></div>
      <div class="v-center">
        {{title}}
        <slot name="centre"></slot>
      </div>
      <div class="v-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>//

export default {
  name: 'VHead',
  props: {
    isFixed: [String, Number, Boolean],
    title: String,
    hideBack: [String, Boolean],
    to: { type: String },
    fn: { type: Function },
    goApp: [String, Boolean],
    hideOrder: [String, Boolean]
  },
  methods: {
    goBack () {
      if (this.fn && typeof this.fn === 'function') {
        this.fn()
      } else {
        if (this.to) {
          this.$router.replace(this.to)
        } else {
          this.$router.go(-1)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
  .v-fixed > #v-head {
    z-index: 1;
    position: fixed;
    top: 0;
    max-width: 640px;
  }

  #v-head {
    position: relative;
    width: 100%;

    > .v-left {
      left: 0;
      top: 0;
      position: absolute;
      background: url("../assets/icon/white_back_icon.png") no-repeat center;
      background-size: 8px 15px;
      width: 40px;
      height: 40px;
    }

    > .v-center {
      width: 100%;
      height: 40px;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      background: $c131313;
      color: $cFFfFFF;
      font-size: 15px;
    }

    > .v-right {
      position: absolute;
      height: 40px;
      right: 0;
      top: 0;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }
  }
</style>
<style lang="scss">
  .head {
    width: 100%;
    position: relative;
    padding: 0 20px;
    height: 40px;
    background: $c131313;
    color: $cFFfFFF;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    > .back-icon {
      position: absolute;
      left: 0;
      top: 0;
      background: url("../assets/icon/white_back_icon.png") no-repeat center;
      background-size: 8px 15px;
      width: 40px;
      height: 40px;
    }

    > .right {
      height: 40px;
      right: 0;
      top: 0;
      position: absolute;
    }
  }
</style>
