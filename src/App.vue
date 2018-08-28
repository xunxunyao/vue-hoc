<template>
  <div id="app">
    <BaseComponent :test="100"></BaseComponent>
  </div>
</template>

<script>
import BaseComponent from './components/BaseComponent.vue'

export default {
  name: 'app',
  components: {
    BaseComponent
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
