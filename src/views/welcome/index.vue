<template>
  <div class="welcome">
    <el-row
      class="row-bg"
      justify="space-around"
      type="flex"
    >
      <el-col :span="6">
        <router-link to="application/new">
          <el-card :body-style="{ padding: '0px' }">
            <img
              class="image"
              src="@/assets/pngs/report_presentation.png"
            >
            <div style="padding: 14px;">
              <span>直接创建申请</span>
            </div>
          </el-card>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="login">
          <el-card :body-style="{ padding: '0px' }">
            <img
              class="image"
              src="@/assets/pngs/checklist.png"
            >
            <div style="padding: 14px;">
              <span>登录管理申请</span>
            </div>
          </el-card>
        </router-link>
      </el-col>
    </el-row>
  </div>
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
.welcome {
  height: 100vh;
  /* line-height: 100vh; */
  padding: 5% 12%;
}
</style>
