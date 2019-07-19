<template>
  <div class="order-deatil-scheme">
    <v-head title="方案明细"></v-head>
    <div class="detail">
      <div class="title"><i class="icon order-content-icon"></i>投注内容</div>
      <order-table :list="details.jc_info" :status="details.status"></order-table>
      <div class="title"><i class="icon order-scheme-icon"></i>方案明细</div>
      <scheme-table :scheme="scheme"></scheme-table>
    </div>
  </div>
</template>

<script>//
import VHead from '../../../components/VHead'
import OrderTable from './components/OrderTable'
import SchemeTable from './components/SchemeTable'
import http from '../../http'

export default {
  name: 'OrderDetailScheme',
  data () {
    return {
      details: {
        jc_info: []
      },
      scheme: []
    }
  },
  created () {
    http.getOrderDetail(this.$route.query.id).then(val => {
      if (val) {
        this.details = val.data.data
      }
    })
    http.getOrderDetailRequest(this.$route.query.id).then(value => {
      if (value) {
        this.scheme = value.data.data
      }
    })
  },
  components: {
    VHead,
    OrderTable,
    SchemeTable
  }
}
</script>

<style scoped lang="scss">
  .order-deatil-scheme {
    .detail {
      background-color: $c1c1c1c;
    }

    .title {
      padding: 10px 15px;
      color: $cCccCCc;
    }

    .icon {
      display: inline-block;
      margin-right: 4px;
      margin-bottom: 2px;
      vertical-align: middle;
    }
  }
</style>
