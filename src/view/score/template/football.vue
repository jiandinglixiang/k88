<style lang="scss" scoped>
  .item-body * {
    box-sizing: border-box;
  }

  .item-body {
    background-color: $c1c1c1c;
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
    <template v-if="propsData.match_status*1===1">
      <div class="item-body">
        <item-title
          :propsData="[weekDay(propsData.begin_date,1),propsData.round_no,propsData.league,weekDay(propsData.first_half_begin_time,2)]"/>
        <div class="row item-body-body">
          <description
            :propsData="[propsData.match_status_description]"
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 17.5%"
          />
          <!---->
          <name-score
            :propsGuest="['-',propsData.guest,'','']"
            :propsHome="['-', propsData.home,'','']"
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 43%"
            theme="football"
          />
          <!---->
          <match-odds
            :game601="propsData.result_odds&&propsData.result_odds.game601"
            :game602="propsData.result_odds&&propsData.result_odds.game602"
            :props601="propsData.result_odds&&propsData.result_odds['601']"
            :props602="propsData.result_odds&&propsData.result_odds['602']"
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 38.2%;"
          />
          <!---->
        </div>
        <is-top :index="index" :toTop="propsData.toTop"/>
      </div>
    </template>
    <template v-else-if="propsData.match_status*1===2">
      <div class="item-body">
        <item-title
          :propsData="[weekDay(propsData.begin_date,1),propsData.round_no,propsData.league,weekDay(propsData.first_half_begin_time,2)]"/>
        <div class="row item-body-body">
          <!---->
          <description
            :propsData="[`${propsData.match_duration}'`,propsData.half_score? `半场${propsData.half_score}`:'']"
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 17.5%"
          />
          <!---->
          <name-score
            :propsGuest="filtration(1)"
            :propsHome="filtration(0)"
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 43%"
            theme="football"
          />
          <real-score
            :propsGuest="propsData.guest_info"
            :propsHome="propsData.home_info"
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 38.2%"
          />
        </div>
        <is-top :index="index" :toTop="propsData.toTop"/>
      </div>
    </template>
    <template v-else>
      <div class="item-body">
        <item-title
          :propsData="[weekDay(propsData.begin_date,1),propsData.round_no,propsData.league,weekDay(propsData.first_half_begin_time,2)]"/>
        <div class="row item-body-body">
          <!---->
          <description
            :propsData="[propsData.match_status_description,`半场${propsData.half_score}`]"
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 17.5%"
          />
          <!---->
          <name-score
            :propsGuest="filtration(1)"
            :propsHome="filtration(0)"
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 43%"
            theme="football"
          />
          <!---->
          <match-odds
            :game601="propsData.result_odds&&propsData.result_odds.game601"
            :game602="propsData.result_odds&&propsData.result_odds.game602"
            :props601="propsData.result_odds&&propsData.result_odds['601']"
            :props602="propsData.result_odds&&propsData.result_odds['602']"
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 38.2%;"
            v-if="propsData.result_odds"
          />
          <!---->
        </div>
        <is-top :index="index" :toTop="propsData.toTop"/>
      </div>
    </template>
  </div>
</template>

<script>//
import itemTitle from '../components/title.vue'
import Description from '../components/description.vue'
import nameScore from '../components/nameScore.vue'
import realScore from '../components/FrealScore.vue'
import IsTop from '../components/Istop.vue'
import matchOdds from '../components/FmatchOdds.vue'

export default {
  name: 'football',
  props: {
    propsData: { type: Object },
    index: { type: Array }
  },
  methods: {
    filtration (who) {
      let data = [this.scoreArray(who), null, null, null]
      if (who * 1 === 0) {
        data[1] = this.propsData.home
        if (this.propsData.home_info) {
          data[2] = this.propsData.home_info.red_card ? this.propsData.home_info.red_card : 0
          data[3] = this.propsData.home_info.yellow_card ? this.propsData.home_info.yellow_card : 0
        }
      } else {
        data[1] = this.propsData.guest
        if (this.propsData.guest_info) {
          data[2] = this.propsData.guest_info.red_card ? this.propsData.guest_info.red_card : 0
          data[3] = this.propsData.guest_info.yellow_card ? this.propsData.guest_info.yellow_card : 0
        }
      }
      return data
    },
    goFootball (id) {
      this.$router.push({ name: 'FootballInformation', params: { id } })
    },
    scoreArray (value) {
      // 比格式化
      let arr = this.propsData.current_score.split(':')
      return arr[value]
    },
    weekDay (timestamp, type) {
      const data = new Date(timestamp * 1000)
      const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

      // 检查是不是两位数字，不足补全
      function check (str) {
        str = str.toString()
        if (str.length < 2) {
          str = '0' + str
        }
        return str
      }

      if (type * 1 === 1) {
        return weeks[new Date(timestamp * 1000).getDay()]
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
    realScore,
    matchOdds
  }
}
</script>
