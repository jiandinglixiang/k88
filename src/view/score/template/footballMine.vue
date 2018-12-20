<style scoped>
  .item-body * {
    box-sizing: border-box;
  }

  .item-body {
    background-color: white;
    width: 100%;
    padding: .26rem 0;
    position: relative;
  }


  .item-body-body {
    margin-top: .34rem;
  }
</style>
<template>
  <div>
    <template v-if="propsData.match_status===1">
      <div class="item-body">
        <item-title
          :propsData="[isSFC(1),propsData.league,isSFC(2)]"/>
        <div class="row item-body-body">
          <description
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 12.7%"
            :propsData="[propsData.match_status_description]"
          />
          <!---->
          <name-score
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 67%"
            theme="football"
            :propsHome="['-', propsData.home,'','']"
            :propsGuest="['-',propsData.guest,'','']"
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
      <div class="item-body">
        <item-title
          :propsData="[isSFC(1),propsData.league,isSFC(2)]"/>
        <div class="row item-body-body">
          <!---->
          <description
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width:12.7%"
            :propsData="[`${propsData.match_duration}'`,propsData.half_score? `半场${propsData.half_score}`:'']"
          />
          <!---->
          <name-score
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 43%"
            theme="football"
            :propsHome="filtration(0)"
            :propsGuest="filtration(1)"
          />
          <real-score
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 24%"
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
      <div class="item-body">
        <item-title
          :propsData="[isSFC(1),propsData.league,isSFC(2)]"/>
        <div class="row item-body-body">
          <!---->
          <description
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 17.5%"
            :propsData="[propsData.match_status_description,`半 ${propsData.half_score}`]"
          />
          <!---->
          <name-score
            @tap="goFootball(propsData.third_party_schedule_id)"
            style="width: 67%"
            theme="football"
            :propsHome="filtration(0)"
            :propsGuest="filtration(1)"
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
  </div>
</template>
<script>
  import itemTitle from '../components/title.vue'
  import Description from '../components/description.vue'
  import nameScore from '../components/nameScore.vue'
  import realScore from '../components/FrealScore.vue'
  import example from '../components/example.vue'

  export default {
    name: 'footballMine',
    props: {
      propsData: {type: Object, required: true},
      jcInfo: {type: Object, required: true}
    },
    methods: {
      filtration (who) {
        let data = [this.scoreArray(who), null, null, null]
        if (who === 0) {
          data[1] = this.propsData.home;
          if (this.propsData.home_info) {
            data[2] = this.propsData.home_info.red_card ? this.propsData.home_info.red_card : 0;
            data[3] = this.propsData.home_info.yellow_card ? this.propsData.home_info.yellow_card : 0;
          }
        } else {
          data[1] = this.propsData.guest;
          if (this.propsData.guest_info) {
            data[2] = this.propsData.guest_info.red_card ? this.propsData.guest_info.red_card : 0;
            data[3] = this.propsData.guest_info.yellow_card ? this.propsData.guest_info.yellow_card : 0;
          }
        }
        return data
      },
      goFootball (id) {
        this.$router.push({name: 'FootballInformation', params: {id}})
      },
      scoreArray (value) {
        // 比格式化
        let arr = this.propsData.current_score.split(':')
        return arr[value]
      },
      isSFC (type) {
        if (this.jcInfo.lottery_id === '20' || this.jcInfo.lottery_id === '21') {
          if (type === 1) {
            return `第${this.jcInfo.round_no}场 `
          }
          return this.weekDay(this.jcInfo.AMatch.first_half_begin_time)
        }
        if (type === 1) {
          return this.weekDay(this.jcInfo.AMatch.begin_date, type)
        }
        return this.weekDay(this.jcInfo.AMatch.first_half_begin_time, type)
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
          return `${weeks[new Date(timestamp * 1000).getDay()]} ${this.propsData.round_no}`;
        } else if (type === 2) {
          return `${check(data.getHours())}:${check(data.getMinutes())}`
        }
        return `${check(data.getMonth() + 1)}-${check(data.getDate())} ${check(data.getHours())}:${check(data.getMinutes())}`
      }
    },
    components: {
      itemTitle,
      Description,
      nameScore,
      realScore,
      example
    }
  }
</script>
