<!--基础组件：
       /**
       * @desc 可编辑文本输入框
       * @author yaoxx
       * @date 2017/07/13
       * @example
         <VEditInputText v-model="inputValue">
         </VEditInputText>
        -->
<template lang="pug">
  extends VEditInputBase.pug
  block input
    Input(v-model="curValue" placeholder="Enter something...")
</template>

<script>
import VEditInputBase from './VEditInputBase.vue'
export default {
  name: 'InputExtends',
  extends: VEditInputBase,
  computed: {
    curLabel () {
      return this.curValue
    }
  }
}
</script>

<style scoped>

</style>
