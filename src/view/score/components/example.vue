<style scoped>
  .down_gray {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: -webkit-linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5)); /* Safari 5.1 - 6 */
    background: -o-linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5)); /* Opera 11.1 - 12*/
    background: -moz-linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5)); /* Firefox 3.6 - 15*/
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.5)); /* 标准的语法 */
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
    background-color: white;
    box-shadow: -3px 3px 5px #ddd;
    z-index: 1;
    top: 1.8rem;
  }

  .color73f40 {
    color: #e73f40;
  }

  .color333 {
    color: #333333;
  }

  .color888 {
    color: #888888;
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
    background-color: #ddd;
    height: 1.3rem;
  }

  .example-body .body {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
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
