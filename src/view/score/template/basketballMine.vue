<style scoped>
  .item-body * {
    box-sizing: border-box;
  }

  .item-body {
    background-color: white;
    width: 100%;
    padding: .26rem 0;
    /*margin-bottom: 10px;*/
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
            @tap="goBasketball(propsData.third_party_schedule_id)"
            style="width: 12.7%"
            :propsData="[propsData.match_status_description]"
          />
          <!---->
          <name-score
            @tap="goBasketball(propsData.third_party_schedule_id)"
            style="width: 67%"
            theme="basketball"
            :propsGuest="['-', propsData.home,'','']"
            :propsHome="['-',propsData.guest,'','']"
          />
          <!---->
          <example
            style="width: 20%;"
            :jcInfo="jcInfo"
          />
          <!---->
        </div>
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
            @tap="goBasketball(propsData.third_party_schedule_id)"
            style="width: 12.7%"
            :propsData="[`${propsData.match_status_description}`,propsData.match_duration]"
          />
          <!---->
          <name-score
            @tap="goBasketball(propsData.third_party_schedule_id)"
            style="width: 30%"
            theme="basketball"
            :propsGuest="[scoreArray(0), propsData.home]"
            :propsHome="[scoreArray(1),propsData.guest]"
          />
          <!---->
          <breal-score
            @tap="goBasketball(propsData.third_party_schedule_id)"
            style="width: 37%"
            :propsHome="propsData.home_info"
            :propsGuest="propsData.guest_info"
          />
          <example
            style="width: 20%;"
            :jcInfo="jcInfo"
          />
        </div>
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
            @tap="goBasketball(propsData.third_party_schedule_id)"
            style="width: 12.7%"
            :propsData="[propsData.match_status_description]"
          />
          <!---->
          <name-score
            @tap="goBasketball(propsData.third_party_schedule_id)"
            style="width: 30%"
            theme="basketball"
            :propsGuest="[scoreArray(0), propsData.home]"
            :propsHome="[scoreArray(1),propsData.guest]"
          />
          <!---->
          <btotal-points
            @tap="goBasketball(propsData.third_party_schedule_id)"
            style="width: 37%"
            :propsData="[scoreArray(0)+scoreArray(1),scoreArray(0)-scoreArray(1)]"
          />
          <example
            style="width: 20%;"
            :jcInfo="jcInfo"
          />
          <!---->
        </div>
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
  import example from '../components/example.vue'

  export default {
    name: 'basketballMine',
    props: {
      propsData: {type: Object, required: true},
      jcInfo: {type: Object, required: true}
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
      BrealScore,
      example
    }
  }
</script>
