<template>
  <div class="application-new">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      form: {
        id: null
      }
    }
  },
  methods: {
    onSubmit() {}
  }
}
</script>

<style lang="scss" scoped>
.application-new {
  background: grey;
  padding: 8px;
}
</style>
