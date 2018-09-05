<!--基础组件：
       /**
       * @desc 可编辑输入框的基础，用来被各个类型的输入框继承
       * @author yaoxx
       * @date 2017/07/12
        -->
<template>
  <div class="text-left">
    <Row v-if="isEditing">
      <Col span="5">
        <slot></slot>
      </Col>
      <Col span="8"></Col>
      <Button class="mg-l5 mg-r5"
              type="primary"
              :loading="loading"
              :disabled="disabled"
              @click="saveEdit"
      >确定</Button>
      <Button @click="cancelEdit">
        取消
      </Button>
    </Row>
    <Row v-else>
      <Col span="12">
        <span class="mg-r10">{{ curLabel }}
          <Icon class="con-button mg-l10" type="compose"
                @click.native="goEdit"
          ></Icon>
        </span>
      </Col>
    </Row>
  </div>
</template>

<script>
// TODO 失焦保存、回车保存
import api from '@/plugins/api'

export default {
  name: 'VEditInputBase',
  props: {
    /**
     * 输入框的值 支持用v-modal使用
     * 如果是checkbox等就是key值以逗号隔开
     */
    value: {
      type: String
    },
    /**
     * 如果传这个参数，就要进行服务端请求保存数据，没有传则不用
     */
    api: {
      type: String,
      default: ''
    },
    /**
     * 请求接口是编辑字段对应的参数key
     */
    paramName: {
      type: String,
      default: 'value'
    },
    /**
     * 请求接口的其他参数键值对
     */
    otherParams: {
      type: Object,
      default () {
        return {}
      }
    },
    /**
     * 是否显示编辑入口
     */
    showEdit: {
      type: Boolean,
      default: true
    },
    /**
     * 获取数据时候的loading效果
     */
    spin: {
      type: Boolean,
      default: false
    },
    curLabel: {
      type: String,
      default: '没有数据'
    },
    validEmptyMsg: {
      type: String,
      default: '请输入有效值'
    }
  },
  data () {
    return {
      curValue: this.value,
      isEditing: false,
      loading: false,
      disabled: true,
      validEmpty: false
    }
  },
  computed: {
    params () {
      return this.otherParams
    }
  },
  watch: {
    value () {
      this.curValue = this.value
    },
    curValue (val) {
      this.disabled = false
      this.validEmpty = !val
    }
  },
  methods: {
    changeEditingStatus () {
      this.isEditing = !this.isEditing
    },
    goEdit () {
      this.disabled = true
      this.changeEditingStatus()
    },
    cancelEdit () {
      // 取消修改，将输入框的值恢复
      this.curValue = this.value
      // 树选择器的label是根据组件暴露的onChange事件的参数拿到的，不是根据value计算
      if (this.oldLabel) {
        this.curLabel = this.oldLabel
      }
      this.changeEditingStatus()
    },
    saveEdit () {
      if (this.curValue) {
        this.loading = true
        let params = {}
        params[this.paramName] = this.curValue
        if (this.api && api[this.api]) {
          this.loading = true
          api[this.api](Object.assign(params, this.params)).then(data => {
            // 接口请求成功之后才需要保存值
            this.afterSaveEdit()
            this.$emit('onSaveSuccess', data)
          }).finally(() => {
            this.loading = false
          })
        } else {
          this.afterSaveEdit()
        }
      } else {
        this.validEmpty = true
      }
    },
    afterSaveEdit () {
      this.$emit('input', this.curValue)
      this.changeEditingStatus()
    }
  }
}
</script>

<style scoped>

</style>
