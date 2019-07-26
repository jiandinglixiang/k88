<template>
  <ul class="s-select-game">
    <li v-for="n of list"
        :key="n[keys]"
        :class="classShow(n)"
        @click.stop="switchTarget(n)"
    >{{n.value}}
    </li>
  </ul>
</template>

<script>//

export default {
  name: 'SelectGame',
  props: {
    list: Array,
    keys: String,
    target: [Number, Array]
  },
  methods: {
    switchTarget (id) {
      // console.log(id)
      this.$emit('switchTarget', id)
    },
    classShow (item) {
      if (Array.isArray(this.target)) {
        return this.target.some(val => {
          return val[this.keys] === item[this.keys]
        }) && 'active-select'
      }
      return item[this.keys] === this.target && 'active-select'
    }
  }
}
</script>

<style scoped lang="scss">
  .s-select-game {
    max-width: 640px;
    width: 100%;
    align-self: flex-start;
    display: flex;
    flex-flow: row wrap;
    background-color: #171717;

    >li {
      font-weight: bold;
      box-sizing: border-box;
      overflow: hidden;
      margin: 1.665%;
      flex: 0 1 30%;
      border-radius: 4px;
      border: 1px solid #999;
      text-align: center;
      line-height: 30px;
      height: 30px;
      font-size: 14px;
      text-wrap: normal;

      &.active-select {
        background-image: url("../../assets/betting/selected.png");
        background-position: bottom right;
        background-repeat: no-repeat;
        background-size: 20px 20px;
        border-color: #ffc63a;
      }
    }
  }
</style>
