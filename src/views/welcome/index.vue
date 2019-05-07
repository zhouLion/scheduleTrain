<template>
  <el-row type="flex" class="row-bg" justify="space-around">
    <el-col :span="6">
      <router-link to="application/new">
        <el-card :body-style="{ padding: '0px' }">
          <img src="@/assets/pngs/report_presentation.png" class="image">
          <div style="padding: 14px;">
            <span>直接创建申请</span>
          </div>
        </el-card>
      </router-link>
    </el-col>
    <el-col :span="6">
      <router-link to="login">
        <el-card :body-style="{ padding: '0px' }">
          <img src="@/assets/pngs/checklist.png" class="image">
          <div style="padding: 14px;">
            <span>登录管理申请</span>
          </div>
        </el-card>
      </router-link></el-col>
  </el-row>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.image {
  width: 100%;
  height: 400px;
}
</style>
