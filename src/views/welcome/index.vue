<template>
  <div class="welcome">
    <el-row class="row-bg" justify="space-around" type="flex">
      <el-col :span="6">
        <router-link to="application/new">
          <el-card :body-style="{ padding: '0px' }">
            <div class="title">
              <span>创建申请</span>
            </div>
            <svg-icon icon-class="测试申请" />
          </el-card>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="login?redirect=application/examine">
          <el-card :body-style="{ padding: '0px' }">
            <div class="title">
              <span>审核申请</span>
            </div>
            <svg-icon icon-class="提案审批" />
          </el-card>
        </router-link>
      </el-col>
      <el-col :span="6">
        <router-link to="login?redirect=application/list">
          <el-card :body-style="{ padding: '0px' }">
            <div class="title">
              <span>查询申请</span>
            </div>
            <svg-icon icon-class="无序排列" />
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

.title {
  width: 10em;
  padding-left: 1em;
  padding-top: 1em;
  font-stretch: 20px;
}

.svg-icon {
  width: 15em;
  height: 15em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.welcome {
  height: 100vh;
  /* line-height: 100vh; */
  padding: 5% 12%;
}
</style>
