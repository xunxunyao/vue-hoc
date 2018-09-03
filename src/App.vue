<template>
  <div id="app">
    <h3>基础组件</h3>
    <BaseComponent :test="100">
      <h2 slot="slot1">BaseComponent slot</h2>
      <p>default slot</p>
    </BaseComponent>
    <h3>增强后的组件</h3>
    <EnhancedCom>
      <h2 slot="slot1">EnhancedComponent slot</h2>
      <p>default slot</p>
    </EnhancedCom>
  </div>
</template>

<script>
import BaseComponent from './components/BaseComponent.vue'
import hoc from './components/hoc.js'

const EnhancedCom = hoc(BaseComponent)
export default {
  name: 'app',
  components: {
    BaseComponent,
    EnhancedCom
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
  #app h3{
    text-align: left;
  }
</style>
