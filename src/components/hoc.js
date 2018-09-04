// 在组件被注册之前是一个对象
// 所以vue中的高阶组件可以这样定义，接收一个纯对象。返回一个新的纯对象
export default function WithConsole (WrappedComponent) {
  return {
    // template: '<wrapped v-on="$listeners" v-bind="$attrs"/>',
    // components: {
    //   wrapped: WrappedComponent
    // },
    mounted () {
      console.log('I have already mounted --hoc')
    },
    inheritAttrs: false,
    props: WrappedComponent.props,
    // template 选项只有在完整版的 Vue 中可以使用，在运行时版本中是不能使用的
    render (h) {
      // 将 this.$slots 格式化为数组，因为 h 函数第三个参数是子节点，是一个数组
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })
      return h(WrappedComponent, {
        on: this.$listeners,
        props: this.$props
      }, slots)
    }
  }
}

// 虽然跟mixins的功能是一样的
// 优点：非入侵式的，没有修改原组件