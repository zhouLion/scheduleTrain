<template>
  <div class="application-list">
    <ApplicationList>
      <template slot="headeraction">
        <el-button
          icon="el-icon-edit"
          type="primary"
          @click="handleCreate"
        >添加</el-button>
      </template>
      <template
        slot="action"
        slot-scope="{row}"
      >
        <el-button
          v-if="row.status!='draft'"
          size="mini"
        >保存</el-button>
        <el-button
          size="mini"
          type="warning"
        >撤回</el-button>
        <el-button
          v-if="row.status!='publish'"
          size="mini"
          type="success"
        >发布</el-button>
        <el-button
          v-if="row.status!='deleted'"
          size="mini"
          type="danger"
        >删除</el-button>
      </template>
    </ApplicationList>
  </div>
</template>

<script>
import ApplicationList from './tables/ApplicationList'
export default {
  name: 'ApplyList',
  components: {
    ApplicationList
  },
  data() {
    return {}
  },
  methods: {
    handleCreate() {
      this.$router.push('/application/new')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
