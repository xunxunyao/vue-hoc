export default function selectInputHoc (BaseInput) {
  return {
    props: Object.assign(BaseInput.props, {
      optionList: {
        type: Array,
        default () {
          return []
        }
      }
    }),
    render (h) {
      const slots = Object.keys(this.$slots)
        .reduce((arr, key) => arr.concat(this.$slots[key]), [])
        .map(vnode => {
          vnode.context = this._self
          return vnode
        })
      return h(BaseInput, {
        on: this.$listeners,
        props: this.$props
      }, [h('Select', {
        domProps: {
          value: this.$props.value
        },
        on: {
          change: function (event) {
            self.$emit('input', event.target.value)
          }
        }
      }, this.$props.optionList.map(item => {
        return h('Option', {
          domProps: {
            value: item.value
          }
        }, item.label)
      }
      ))].concat(slots))
    }
  }
}
