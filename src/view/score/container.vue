<template>
  <div>
    <!--没有登陆去登陆-->
    <not-logged-in v-if="showLogin&&isLogin"/>
    <!--竞足-->
    <div v-else-if="switchBody[0]*1===1">
      <div v-show="switchBody[1]*1===1">
        <div v-if="a11.groups.length">
          <to-the-top :propsData="toTop11" v-if="toTop11.length">
            <template slot-scope="props">
              <football :index="[0,props.index]" :propsData="props.data"/>
            </template>
          </to-the-top>
          <universal :key="item.data"
                     :propsData="item"
                     v-for="(item,index) in a11.groups">
            <template slot-scope="props">
              <football :index="[index,props.index]" :propsData="props.data"/>
            </template>
          </universal>
        </div>
      </div>
      <div v-show="switchBody[1]*1===2">
        <div v-if="a12.groups.length">
          <to-the-top :propsData="toTop12" v-if="toTop12.length">
            <template slot-scope="props">
              <football :index="[0,props.index]" :propsData="props.data"/>
            </template>
          </to-the-top>
          <universal :key="item.data"
                     :propsData="item"
                     v-for="(item,index) in a12.groups">
            <template slot-scope="props">
              <football :index="[index,props.index]" :propsData="props.data"/>
            </template>
          </universal>
        </div>
      </div>
      <div v-show="switchBody[1]*1===3">
        <div v-if="a13.groups.length">
          <to-the-top :propsData="toTop13" v-if="toTop13.length">
            <template slot-scope="props">
              <football :index="[0,props.index]" :propsData="props.data"/>
            </template>
          </to-the-top>
          <universal :key="item.data"
                     :propsData="item"
                     v-for="(item,index) in a13.groups">
            <template slot-scope="props">
              <football :index="[index,props.index]" :propsData="props.data"/>
            </template>
          </universal>
        </div>
      </div>
      <div v-show="switchBody[1]*1===4">
        <div v-if="a14.groups.length">
          <football-container :propsData="a14.groups"/>
        </div>
      </div>
    </div>
    <!--胜负彩-->
    <div v-else-if="switchBody[0]*1===2">
      <div v-show="switchBody[1]*1===1">
        <div v-if="a21.groups.length">
          <to-the-top :propsData="toTop21" v-if="toTop21.length">
            <template slot-scope="props">
              <football-s-f-c :index="[0,props.index]" :propsData="props.data"/>
            </template>
          </to-the-top>
          <universal :name="toTop21.length?`第${a21.groups[SelectIndex].id}期`:''"
                     :propsData="a21.groups[SelectIndex]">
            <template slot-scope="props">
              <football-s-f-c :index="[SelectIndex,props.index]" :propsData="props.data"/>
            </template>
          </universal>
        </div>
      </div>
      <div v-show="switchBody[1]*1===2">
        <div v-if="a22.groups.length">
          <football-container :propsData="a22.groups"/>
        </div>
      </div>
    </div>
    <!--竞篮-->
    <div v-else-if="switchBody[0]*1===3">
      <div v-show="switchBody[1]*1===1">
        <div v-if="a31.groups.length">
          <to-the-top :propsData="toTop31" v-if="toTop31.length">
            <template slot-scope="props">
              <basketball :index="[0,props.index]" :propsData="props.data"/>
            </template>
          </to-the-top>
          <universal :key="item.data" :propsData="item" v-for="(item,index)  in a31.groups">
            <template slot-scope="props">
              <basketball :index="[index,props.index]" :propsData="props.data"/>
            </template>
          </universal>
        </div>
      </div>
      <div v-show="switchBody[1]*1===2">
        <div v-if="a32.groups.length">
          <to-the-top :propsData="toTop32" v-if="toTop32.length">
            <template slot-scope="props">
              <basketball :index="[0,props.index]" :propsData="props.data"/>
            </template>
          </to-the-top>
          <universal :key="item.data" :propsData="item" v-for="(item,index)  in a32.groups">
            <template slot-scope="props">
              <basketball :index="[index,props.index]" :propsData="props.data"/>
            </template>
          </universal>
        </div>
      </div>
      <div v-show="switchBody[1]*1===3">
        <div v-if="a33.groups.length">
          <to-the-top :propsData="toTop33" v-if="toTop33.length">
            <template slot-scope="props">
              <basketball :index="[0,props.index]" :propsData="props.data"/>
            </template>
          </to-the-top>
          <universal :key="item.data" :propsData="item" v-for="(item,index)  in a33.groups">
            <template slot-scope="props">
              <basketball :index="[index,props.index]" :propsData="props.data"/>
            </template>
          </universal>
        </div>
      </div>
      <div v-show="switchBody[1]*1===4">
        <div v-if="a34.groups.length">
          <basketball-container :propsData="a34.groups"/>
        </div>
      </div>
    </div>
    <!---->
    <to-bet-buy :to="loadingFinish[switchBody]" v-show="showToB"/>
  </div>
</template>

<script>//
import { mapState } from 'vuex'

export default {
  name: 'container',
  props: {
    SelectIndex: { type: Number },
    showToB: { type: Boolean },
    switchBody: { type: Array }, // 当前显示
    isLogin: { type: Boolean } // 是否登陆
  },
  data () {
    return {
      loadingFinish: { [`1,4`]: `/betting/football`, [`2,2`]: `/betting/sfc/20`, [`3,4`]: `/betting/basketball` }
    }
  },
  computed: {
    ...mapState({
      a11: state => state.score[`11`],
      a12: state => state.score[`12`],
      a13: state => state.score[`13`],
      a14: state => state.score[`14`],
      a31: state => state.score[`31`],
      a32: state => state.score[`32`],
      a33: state => state.score[`33`],
      a34: state => state.score[`34`],
      a21: state => state.score[`21`],
      a22: state => state.score[`22`],
      toTop11: state => state.score['toTop11'],
      toTop12: state => state.score['toTop12'],
      toTop13: state => state.score['toTop13'],
      toTop31: state => state.score['toTop31'],
      toTop32: state => state.score['toTop32'],
      toTop33: state => state.score['toTop33'],
      toTop21: state => state.score['toTop21']
    }),
    showLogin () {
      if (this.switchBody[0]*1 === 1 || this.switchBody[0]*1 === 3) {
        if (this.switchBody[1]*1 === 4) {
          return true
        }
      } else if (this.switchBody[1]*1 === 2) {
        return true
      }
      return false
    }
  },
  components: {
    NotLoggedIn: () => import('../../components/NotLoggedIn.vue'),
    ToBetBuy: () => import('../../components/ToBetBuy.vue'),
    toTheTop: () => import('./components/toTheTop.vue'),
    universal: () => import('./container/universal.vue'),
    footballSFC: () => import('./template/footballSFC.vue'),
    Basketball: () => import('./template/basketball.vue'),
    Football: () => import('./template/football.vue'),
    FootballContainer: () => import('./container/football.vue'),
    BasketballContainer: () => import('./container/basketball.vue')
  }
}
</script>
