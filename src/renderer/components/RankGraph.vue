<template>
  <article>
    <div id="headers">
      <h1>{{title}}</h1>
      <div @click="() => removeTracker(musicUid)">
        <font-awesome-icon icon="trash-alt" class="icon-hover-interaction" />
      </div>
    </div>
    <div class="chart" @click="openWindow" @contextmenu="exportChartData">
      <chart v-if="loaded" :labels="labels" :chartdata="ranks" />
    </div>
  </article>
</template>

<script>
import { getRanksWithMusicUid } from '@/functions/chart'
import store from '@/functions/db'
import Chart from '@/components/Chart'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {clipboard} from 'electron'
import Vue from 'vue'

library.add(faTrashAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

export default {
  name: 'rank-graph',
  props: ['title', 'musicUid', 'width'],
  data: () => ({
    labels: [20190903],
    ranks: [1, 2, 3, 4, 5],
    loaded: false,
    rawData: []
  }),
  methods: {
    async getRanks() {
      const ranks = await getRanksWithMusicUid(this.musicUid, store)

      if (ranks) {
        this.rawData = ranks[2]
        const labels = ranks[0].map(k => {
          const splited = k.match(/.{1,2}/g)
          return `${splited[1]}/${splited[2]}:${splited[3]}`
        })
        this.labels = labels
        this.ranks = ranks[1]
      } else {
        this.labels = [
          '2019091313',
          '2019091315',
          '2019091316',
          '2019091317',
          '2019091417'
        ]
        this.ranks = [1, 2, 27, 14, 9]
      }
      this.loaded = true
    },
    openWindow() {
      open(
        `${location.href}#${encodeURI(
          JSON.stringify([this.labels, this.ranks])
        )}`
      )
    },
    removeTracker(k) {
      this.$emit('remove-tracker', k)
    },
    exportChartData() {
      console.log(this.rawData)
      clipboard.writeText(JSON.stringify(this.rawData))
    }
  },
  created() {
    this.getRanks()
  },
  components: {
    Chart
  }
}
</script>

<style scoped>
article {
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 10px;
  display: inline-block;
  max-width: 300px;
  height: 500px;
}
h1 {
  padding: 0;
  margin: 0;
}
.chart {
  margin-top: 10px;
  cursor: pointer;
}
#headers {
  display: flex;
}
#headers div {
  flex: 1;
  text-align: right;
}
</style>