<template>
  <div id="sync-con">
    <div id="header">
      <h2>TOP 100 실시간 차트</h2>
      <div id="sync" @click="getChartData">
        <font-awesome-icon icon="sync-alt" data-micron="jerk" id="sync-icon" class="icon-hover-interaction" />
      </div>
    </div>
    <article>
      <div id="scroller">
        <ul>
          <li
            v-for="(music, rank) in chart"
            v-bind:key="music.musicUid"
            @click="() => addToTracker(music)"
            class="wave"
          >
            <span class="rank">{{ rank + 1 }}</span>
            <section>
              <span class="title dotdotdot">{{ music.title }}</span>
              <span class="artist dotdotdot">{{ music.artist }}</span>
            </section>
          </li>
        </ul>
      </div>
    </article>
  </div>
</template>

<script>
import { getRealtimeChart } from '@/functions/chart'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import micron from 'webkul-micron'
import Vue from 'vue'

library.add(faSyncAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  name: 'chart-list',
  data: () => ({
    // rank: await getRealtimeChart()
    chart: []
  }),
  methods: {
    async getChartData() {
      console.log('Loading Chart...')
      const chart = await getRealtimeChart()
      this.chart = chart
    },
    addToTracker(e) {
      this.$emit('add-tracker', e)
    }
  },
  created() {
    this.getChartData()
  }
}
</script>

<style scoped>
article {
  border: 1px solid rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
}
div#scroller {
  overflow-y: scroll;
  height: calc(100vh - 240px);
}
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  background-color: rgba(0, 0, 0, 0.2);
}
ul {
  padding: 0;
  margin: 0;
}
li {
  display: flex;
  padding: 18px;
  padding-top: 5px;
  padding-bottom: 5px;
}
section {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
}
.rank {
  font-size: 18px;
  color: #ff9d77;
  font-weight: 900;
  width: 17px;
}
.artist {
  font-weight: 700;
  opacity: 0.5;
}
.title {
  font-size: 15px;
  font-weight: 900;
}
.dotdotdot {
  overflow: hidden !important;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  width: 140px;
}
#header {
  display: flex;
}
h2 {
  font-size: 15px;
}
#sync {
  flex: 1;
  text-align: right;
  padding: 10px;
  opacity: 0.7;
}
</style>