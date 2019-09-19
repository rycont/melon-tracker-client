<template>
  <input type="text" placeholder="검색..." @input="type" :class="{
        typing: query
      }" />
</template>

<script>
export default {
  name: 'search-box',
  data: () => ({
    query: ''
  }),
  methods: {
    type(event) {
      this.query = event.target.value
      this.$emit('on-input', event.target.value, 100)
    }
  }
}
</script>

<style scoped>
input {
  padding: 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  transition: 500ms;
  cursor: text;
}
input:hover:not(:focus) {
  box-shadow: 0px 0px 50px 0px rgba(255,121,89,0.3);
}
input:focus {
  outline-width: 0;
}
.typing {
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
}
</style>