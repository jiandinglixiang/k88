<style scoped lang="scss">
  .down_gray {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: linear-gradient(to top, rgb(28, 28, 28), rgba(19, 19, 19, 0.5)); /* 标准的语法 */
  }

  .down_gray div {
    display: inline-block;
    width: 0.31rem;
    height: 0.6rem;
    background-image: url('../../../assets/betting/down_gray.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-position: bottom;
  }

  .down-gray-details {
    width: 100%;
    font-size: 0.25rem;
    position: absolute;
    background-color: $c1c1c1c;
    box-shadow: -3px 3px 5px $c131313;
    z-index: 1;
    top: 1.8rem;
  }

  .color73f40 {
    color: $cFFfFFF;
  }

  .color333 {
    color: $c999999;
  }

  .color888 {
    color: $c999999;
  }

  .borderBottom {
    background-image: url("../../../assets/dashed.png");
    background-position: bottom;
    background-repeat: repeat-x;
    background-size: 6px 1px;
  }

  .example {
    position: relative;
    height: 1.76rem;
    text-align: center;
  }

  .example-body {
    position: relative;
    height: 1.23rem;
  }

  .example-body:after {
    content: ' ';
    position: absolute;
    left: -1px;
    top: 0;
    width: 1px;
    background-color: $c999999;
    height: 1.3rem;
  }

  .example-body .body {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    color: $c999999;
  }

  .body .item {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>

<template>
  <div class="example">
    <div @click="show" class="example-body">
      <div class="body">
        <div v-for="item in showItem"
             :key="item.text"
             class="item"
             :class="{color73f40:item.checked}"
        >
          <div>{{item.text}}{{ item.id==='602'? `[${jcInfo.let_point}]`:'' }}</div>
          <div v-if="item.value">({{item.value}})</div>
        </div>
      </div>
    </div>
    <template v-if="downShow">
      <div @click="show" class="down_gray">
        <div>
          <!--图标-->
        </div>
      </div>
      <div v-show="down" class="down-gray-details">
        <div @click="show" class="body">
          <div v-for="item in jcInfo.betting" :key="item.text" class="item borderBottom">
            <div :class="item.checked? 'color73f40':'color333'">{{item.text}}{{ item.id==='602'? `[${jcInfo.let_point}]`:'' }}</div>
            <div :class="item.checked? 'color73f40':'color888'" v-if="item.value">({{item.value}})</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'example',
    props: {
      jcInfo: {type: null}
    },
    data () {
      return {
        down: false,
        downShow: false,
        showItem: []
      }
    },
    created () {
      if (this.jcInfo.betting.length >= 2) {
        this.showItem = [{...(this.jcInfo.betting[0])}, {...(this.jcInfo.betting[1])}];
        this.downShow = true
      } else {
        this.showItem = JSON.parse(JSON.stringify(this.jcInfo.betting))
      }
    },
    methods: {
      show () {
        this.down = !this.down
      }
    }
  }
</script>
