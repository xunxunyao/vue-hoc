<template>
  <div>
    <span @click="handleClick">props: {{test}}</span>
  </div>
</template>

<script>
  import consoleMixin from './consoleMixin'
  export default {
    name: 'BaseComponent',
    props: {
      test: Number
    },
    mixins: [ consoleMixin ],
    methods: {
      handleClick () {
        this.$emit('customize-click')
      }
    }
  }

</script>

<style scoped>

</style>