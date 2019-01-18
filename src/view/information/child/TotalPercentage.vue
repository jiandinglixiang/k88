<template>
  <div class="total-percentage">
    <div class="percentage" :class="direction">
      <span :style="style"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'totalPercentage',
    props: ['direction', 'percent'],
    computed: {
      style () {
        if (this.percent > 0 && this.percent < 1) {
          return { width: this.percent * 100 + '%' };
        } else if (parseFloat(this.percent) === 0) {
          return { border: 'none' };
        } else if (parseFloat(this.percent) === 1) {
          return { width: '100%', height: '5px', border: 'none', background: this.direction === 'left' ? 'red' : 'blue' }
        }
      }
    }
  }
</script>

<style>
  .total-percentage .percentage {
    background: #E4E4E4;
    height: 5px; width: 100%;
    position: relative;
  }
  .total-percentage .percentage span {
    height: 0;
    display: block;
    position: absolute;
    right: 0;
    width: 0;
  }
  .total-percentage .percentage.center {
    background: #FF7172;
  }
  .total-percentage .percentage.center span {
    border-color: #8FAAFF #8FAAFF transparent transparent;
    border-style: solid none solid solid;
    border-width: 5px 0 0 5px;
  }
  .total-percentage .percentage.left span {
    border-color: #FF7172 #FF7172 transparent transparent;
    border-style: solid none solid solid;
    border-width: 5px 0 0 5px;
  }
  .total-percentage .percentage.left.zero span,
  .total-percentage .percentage.right.zero span{
    border: none;
  }
  .total-percentage .percentage.left span.full {
    border: none;
    width: 100%;
    height: 5px;
    background: #FF7172;
  }
  .total-percentage .percentage.right span.full {
    border: none;
    width: 100%;
    height: 5px;
    background: #8FAAFF;
  }
  .total-percentage .percentage.right span {
    border-color: #8FAAFF transparent transparent transparent;
    border-style: solid solid solid solid;
    border-width: 5px 5px 0 0;
    right: auto;
    left:0;
  }
</style>
