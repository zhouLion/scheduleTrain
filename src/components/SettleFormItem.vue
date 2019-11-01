<template>
  <el-form-item :label="label">
    <el-col :lg="3">
      <el-cascader
        v-model="form.HomeAddressArr"
        :options="locationOptions"
        :show-all-levels="false"
        @active-item-change="handleHomeAddressItemChange"
      />
    </el-col>
    <el-col :lg="9">
      <el-input
        v-model="form.HomeDetailAddress"
        placeholder="详细地址"
      />
    </el-col>
  </el-form-item>
</template>

<script>
import { locationChildren } from '../api/static'

const VALUE_CONSTRUCT = {
  date: '',
  valid: '',
  address: '',
  addressDetail: ''
}

export default {
  name: 'SettleFormItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: Object,
      default() {
        return VALUE_CONSTRUCT
      }
    }
  },
  data() {
    return {
      locationOptions: [
        {
          label: '选择地域',
          value: 0,
          children: []
        },
        {
          label: '不选择',
          value: -1
        }
      ],
      form: {
        HomeAddressArr: this.value.code,
        HomeDetailAddress: this.value.addressDetail
      }
    }
  },
  watch: {
    form: {
      handler(form) {
        const clonedValue = Object.assign({ ...VALUE_CONSTRUCT }, this.value)
        clonedValue.addressDetail = form.HomeDetailAddress
        clonedValue.code = form.HomeAddressArr
        this.$emit('input', clonedValue)
      },
      deep: true
    }
  },
  methods: {
    getLocationChildrenIndexByValue(item, value) {
      for (var i = 0; i < item.children.length; i++) {
        if (item.children[i].value === value) return i
      }
      return 0
    },
    handleHomeAddressItemChange(val) {
      if (val) {
        const deep = val.length - 1
        const id = val[deep]
        this.form.HomeAddressArr = val
        locationChildren(id).then(data => {
          const children = data.list.map(d => ({
            label: d.name,
            value: d.code,
            children: []
          }))
          var item = this.locationOptions[0]
          var nextIndex = 0
          for (var i = 0; i < deep; i++) {
            nextIndex = this.getLocationChildrenIndexByValue(item, val[i + 1])
            item = item.children[nextIndex]
          }
          item.children = children
          if (item.children.length === 0) {
            item.children[0] = {
              label: '无下一层级',
              disabled: true
            }
          }
        })
      } else {
        this.$message.error('无效的地址')
      }
    }
  }
}
</script>

<style>
</style>
