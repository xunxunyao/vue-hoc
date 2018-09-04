<template>
  <div>
    <span @click="handleClick">props: {{count}}</span>
      <slot name="slot1"></slot> <!-- 具名插槽 -->
    <p>===========</p>
      <slot></slot><!-- 默认插槽 -->
  </div>
</template>

<script>
  import consoleMixin from './consoleMixin'
  export default {
    name: 'BaseComponent',
    props: {
      count: Number
    },
    inheritAttrs: false,
    mixins: [ consoleMixin ],
    methods: {
      handleClick () {
        this.$emit('customizeClick')
      }
    }
  }

</script>

<style scoped>

</style>