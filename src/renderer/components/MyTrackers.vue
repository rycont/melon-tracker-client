<template>
  <section>
    <div id="header">
      <h1>내 트래커</h1>
      <div>
        <font-awesome-icon
          icon="file-export"
          class="icon-hover-interaction icon"
          @click="exportTrackers"
          :class="{visible: visible}"
        />
        <font-awesome-icon
          icon="check-circle"
          class="icon-hover-interaction icon"
          id="successed"
          @click="exportTrackers"
          :class="{visible: !visible}"
        />
      </div>
    </div>
    <div v-if="trackers.length" id="tracker-con">
      <rank-graph
        v-for="music in trackers"
        :key="music.musicUid"
        v-bind="music"
        :width="chartWidth"
        @remove-tracker="removeTracker"
      />
    </div>
    <div v-else id="manual">
      <h1 id>간단 매뉴얼</h1>
      <h2 id="-1">트래커 추가하기</h2>
      <p>좌측의 사이드바에서 검색을 해보세요. 혹은 그 아래의 TOP 100 차트를 클릭해도 추가할 수 있습니다.</p>
      <h2 id="-2">트래커 관리하기</h2>
      <p>트래커 오른쪽 위의 휴지통 버튼을 눌러서 트래커를 삭제할 수 있습니다. 창 오른쪽 위의 내보내기 버튼을 클릭해서 추가한 트래커들을 내보낼 수 있습니다. 그래프를 오른쪽 클릭해서 순위 정보를 클립보드에 저장할 수 있습니다.</p>
      <h2 id="-3">보기 모드</h2>
      <p>그래프를 클릭하면 새 창에서 그래프가 열려서 크게 볼 수 있습니다. 오른쪽 위의 파일 버튼을 클릭해서 사진으로 저장할 수 있습니다.</p>
    </div>
  </section>
</template>

<script>
import RankGraph from '@/components/RankGraph'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFileExport, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue from 'vue'
import { clipboard } from 'electron'

library.add(faFileExport)
library.add(faCheckCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)
export default {
  name: 'my-trackers',
  props: ['trackers'],
  components: {
    RankGraph
  },
  data: () => ({
    chartWidth: 100,
    visible: true
  }),
  created() {
    this.chartWidth = (innerWidth - 200) / 200
    window.addEventListener('resize', () => {
      this.chartWidth = (innerWidth - 200) / 200
      console.log(this.chartWidth)
    })
  },
  methods: {
    removeTracker(k) {
      this.$emit('remove-tracker', k)
    },
    exportTrackers() {
      this.visible = false
      setTimeout(() => {
        this.visible = true
      }, 1000)
      clipboard.writeText(JSON.stringify(this.trackers))
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 18px;
  padding: 0;
  margin: 0;
}
section {
  height: calc(100vh - 25px);
  overflow: hidden;
}
#header {
  display: flex;
}
#header div {
  flex: 1;
  text-align: right;
  color: rgba(0, 0, 0, 0.7);
}
#tracker-con {
  height: calc(100vh - 25px);
  overflow-y: scroll;
}
#manual {
  margin-top: 10px;
}
#manual h1 {
  font-size: 15px;
}
#manual h2 {
  font-size: 12px;
}
.visible {
  display: inline;
}
.icon:not(.visible) {
  display: none;
}
#successed {
  color: green !important;
}
</style>