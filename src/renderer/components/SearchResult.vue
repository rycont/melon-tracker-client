<template>
  <ul v-if="results.length">
    <li
      v-for="result in results"
      :key="result.SONGID"
      @click="() => addTracker({
      musicUid: result.SONGID,
      title: result.SONGNAME
      })"
      class="wave"
    >
      <span v-html="result.SONGNAMEDP" />
      - {{result.ARTISTNAME}}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'search-result',
  props: ['results'],
  methods: {
    addTracker(a) {
      this.$emit('add-tracker', a)
    }
  }
}
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
  background-color: #ffffff;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
li {
  list-style-type: none;
  padding: 8px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
li:last-child {
  border: none;
}
</style>