<template>
  <div class="application-list">
    <ApplicationList>
      <template
        slot="action"
        slot-scope="{row}"
      >
        <el-button
          size="mini"
          type="success"
        >通过</el-button>
        <el-button
          v-if="row.status!='publish'"
          size="mini"
          type="warning"
        >驳回</el-button>
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
  name: 'ApplyExamine',
  components: {
    ApplicationList
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
</style>
