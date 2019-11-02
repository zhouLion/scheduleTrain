<template>
  <el-form-item :label="label">
    <el-row>
      <el-col :lg="4">
        <el-input
          v-model="form.addressDetail"
          :disabled="disabled"
          placeholder="详细地址"
        />
      </el-col>
      <el-col :lg="6">
        <el-input
          v-model="form.date"
          :disabled="disabled"
          placeholder="居住开始时间"
        />
      </el-col>
      <!-- <el-col :lg="6">
        <el-input
          v-model="form.HomeDetailAddress"
          placeholder="是否有效"
        />
      </el-col>
      <el-col :lg="6">
        <el-input
          v-model="form.HomeDetailAddress"
          placeholder="行政区划编号"
        />
      </el-col> -->
    </el-row>
  </el-form-item>
</template>

<script>
const VALUE_CONSTRUCT = {
  date: '',
  valid: '',
  address: '',
  addressDetail: ''
}

export default {
  name: 'SettleFormItem',
  props: {
    disabled: {
      type: Boolean,
      default: true
    },
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
      form: {
        date: this.value.date,
        valid: this.value.valid,
        address: this.value.address,
        addressDetail: this.value.addressDetail
      }
    }
  },
  watch: {
    form: {
      handler(form) {
        const clonedValue = Object.assign(
          { ...VALUE_CONSTRUCT },
          this.value,
          form
        )
        this.$emit('input', clonedValue)
      },
      deep: true
    }
  }
}
</script>

<style>
</style>
