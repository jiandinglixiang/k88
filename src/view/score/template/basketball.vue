<style scoped>
  .item-body * {
    box-sizing: border-box;
  }

  .item-body {
    background-color: white;
    width: 100%;
    padding: .26rem 0;
    margin-bottom: 10px;
    position: relative;
    border-radius: 5px;
  }

  .item-body-body {
    margin-top: .34rem;
  }
</style>
<template>
  <div>
    <template v-if="propsData.match_status===1">
      <!--未开始-->
      <div class="item-body">
        <item-title
          :propsData="[weekDay(propsData.begin_date,1),propsData.round_no,propsData.league,weekDay(propsData.first_half_begin_time,2)]"/>
        <div class="row item-body-body">
          <description
            style="width: 17.5%"
            @tap="goBasketball(propsData.third_party_schedule_id)"
            :propsData="[propsData.match_status_description]"
          />
          <!---->
          <name-score
            style="width: 30%"
            theme="basketball"
            @tap="goBasketball(propsData.third_party_schedule_id)"
            :propsGuest="['-', propsData.home,'','']"
            :propsHome="['-',propsData.guest,'','']"
          />
          <!---->
          <bmatch-odds
            style="width: 40%;"
            @tap="goBasketball(propsData.third_party_schedule_id)"
            :propsData="propsData.result_odds"
          />
          <!---->
        </div>
        <is-top :index="index" :toTop="propsData.toTop"/>
      </div>
    </template>
    <template v-else-if="propsData.match_status===2">
      <!--进行中-->
      <div class="item-body">
        <item-title
          :propsData="[weekDay(propsData.begin_date,1),propsData.round_no,propsData.league,weekDay(propsData.first_half_begin_time,2)]"/>
        <div class="row item-body-body">
          <!---->
          <description
            style="width: 17.5%"
            @tap="goBasketball(propsData.third_party_schedule_id)"
            :propsData="[`${propsData.match_status_description}`,propsData.match_duration]"
          />
          <!---->
          <name-score
            style="width: 30%"
            theme="basketball"
            @tap="goBasketball(propsData.third_party_schedule_id)"
            :propsGuest="[scoreArray(0), propsData.home]"
            :propsHome="[scoreArray(1),propsData.guest]"
          />
          <!---->
          <breal-score
            style="width: 40%"
            @tap="goBasketball(propsData.third_party_schedule_id)"
            :propsHome="propsData.home_info"
            :propsGuest="propsData.guest_info"
          />
        </div>
        <is-top :index="index" :toTop="propsData.toTop"/>
      </div>
    </template>
    <template v-else>
      <!--已完成-->
      <div class="item-body">
        <item-title
          :propsData="[weekDay(propsData.begin_date,1),propsData.round_no,propsData.league,weekDay(propsData.first_half_begin_time,2)]"/>
        <div class="row item-body-body">
          <!---->
          <description
            style="width: 17.5%"
            @tap="goBasketball(propsData.third_party_schedule_id)"
            :propsData="[propsData.match_status_description]"
          />
          <!---->
          <name-score
            style="width: 30%"
            theme="basketball"
            @tap="goBasketball(propsData.third_party_schedule_id)"
            :propsGuest="[scoreArray(0), propsData.home]"
            :propsHome="[scoreArray(1),propsData.guest]"
          />
          <!---->
          <btotal-points
            style="width: 40%"
            @tap="goBasketball(propsData.third_party_schedule_id)"
            :propsData="[scoreArray(0)+scoreArray(1),scoreArray(0)-scoreArray(1)]"
          />
          <!---->
        </div>
        <is-top :index="index" :toTop="propsData.toTop"/>
      </div>
    </template>
  </div>
</template>

<script>
  import itemTitle from '../components/title.vue'
  import Description from '../components/description.vue'
  import nameScore from '../components/nameScore.vue'
  import IsTop from '../components/Istop.vue'
  import BmatchOdds from '../components/BmatchOdds.vue'
  import BtotalPoints from '../components/BtotalPoints.vue'
  import BrealScore from '../components/BrealScore.vue'

  export default {
    name: 'basketball',
    props: {
      propsData: {type: Object},
      index: {type: Array}
    },
    methods: {
      goBasketball (id) {
        this.$router.push({name: 'BasketballInformation', params: {id}})
      },
      scoreArray (value) {
        // 比格式化
        let arr = this.propsData.current_score.split(':')
        return parseInt(arr[value])
      },
      weekDay (timestamp, type) {
        const data = new Date(timestamp * 1000);
        const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

        // 检查是不是两位数字，不足补全
        function check (str) {
          str = str.toString();
          if (str.length < 2) {
            str = '0' + str;
          }
          return str;
        }

        if (type === 1) {
          return weeks[new Date(timestamp * 1000).getDay()];
        } else if (type === 2) {
          return `${check(data.getHours())}:${check(data.getMinutes())}`
        }
        return `${check(data.getMonth() + 1)}-${check(data.getDate())} ${check(data.getHours())}:${check(data.getMinutes())}`
      }
    },
    components: {
      itemTitle,
      IsTop,
      Description,
      nameScore,
      BmatchOdds,
      BtotalPoints,
      BrealScore
    }
  }
</script>

