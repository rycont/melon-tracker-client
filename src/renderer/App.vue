<template>
  <div id="app">
    <div v-if="main">
      <header-title />
      <div id="content">
        <side-bar id="side" @add-tracker="addTracker" />
        <my-trackers id="trackers" :trackers="trackers" @remove-tracker="removeTracker" />
      </div>
    </div>
    <div v-else id="bigchart">
      <div id="export-icon">
        <font-awesome-icon
          icon="file-image"
          class="icon-hover-interaction"
          @click="exportChart"
        />
      </div>
      <chart :labels="chartdata[0]" :chartdata="chartdata[1]" />
    </div>
  </div>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle'
import SideBar from '@/components/SideBar'
import MyTrackers from '@/components/MyTrackers'
import Chart from '@/components/Chart'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'

library.add(faFileImage)
Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  name: 'tracker',
  components: {
    HeaderTitle,
    SideBar,
    MyTrackers,
    Chart
  },
  data: () => ({
    trackers: [],
    main: !location.href.includes('#'),
    chartdata:
      location.href.includes('#') &&
      JSON.parse(decodeURI(location.href.split('#')[1])),
    visible: true
  }),
  methods: {
    addTracker(e) {
      this.trackers.push(e)
      localStorage.setItem('trackers', JSON.stringify(this.trackers))
    },
    removeTracker(musicUid) {
      const newTrackers = [...this.trackers]
      newTrackers[
        newTrackers.findIndex(music => music.musicUid === musicUid)
      ] = null
      this.trackers = newTrackers.filter(Boolean)
      localStorage.setItem('trackers', JSON.stringify(this.trackers))
    },
    async exportChart() {
      const a = document.createElement('a')
      a.href = document.getElementById('line-chart').toDataURL()
      a.setAttribute('download', 'chart.jpg')
    }
  },
  mounted() {
    const localTrackers = localStorage.getItem('trackers')
    if (localTrackers) {
      this.trackers = JSON.parse(localTrackers)
      console.log(this.trackers)
    }
  }
}
</script>

<style scoped>
#content {
  display: flex;
  flex-direction: row;
}
#trackers {
  padding: 10px;
  width: calc(100vw - 230px);
}
#export-icon {
  text-align: right;
}
#bigchart {
  padding: 10px;
}
</style>


<style>
/*common style  */
.wave {
  transition: 5s;
  transition-timing-function: cubic-bezier(0, 1.09, 0.38, 0.98);
  background-color: #ffffff;
}
.wave:hover {
  background-color: rgba(0, 0, 0, 0.1);
  transition-timing-function: cubic-bezier(1, 0.05, 1, 0.02);
  transition: 200ms;
}
.icon-hover-interaction {
  transition: 300ms;
  transition-timing-function: cubic-bezier(0.06, 0.67, 0.24, 0.91);
  cursor: pointer;
}
.icon-hover-interaction:hover {
  color: #ff7959;
  transform-origin: 50% 50%;
  transform: scale(1.3);
}
* {
  user-select: none;
  cursor: default;
}
.wave * {
  cursor: pointer;
}
</style>