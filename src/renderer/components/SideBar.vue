<template>
  <section>
    <search-box @on-input="getSearchResult" />
    <search-result :results="results" @add-tracker="addTracker" />
    <chart-list @add-tracker="addTracker" />
  </section>
</template>

<script>
import SearchBox from '@/components/SearchBox.vue'
import ChartList from '@/components/ChartList.vue'
import SearchResult from '@/components/SearchResult.vue'
import search from '@/functions/melonSearch.js'
// import _ from 'lodash'
export default {
  name: 'side-bar',
  props: ['trackers'],
  components: {
    SearchBox,
    ChartList,
    SearchResult
  },
  methods: {
    addTracker(music) {
      this.$emit('add-tracker', music)
    },
    async getSearchResult(query) {
      const results = await search(query)
      this.results = results
    }
  },
  data: () => ({
    results: []
  })
}
</script>

<style scoped>
section {
  background-color: #fbfff6;
  width: 230px !important;
  height: 100vh;
  padding: 10px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>