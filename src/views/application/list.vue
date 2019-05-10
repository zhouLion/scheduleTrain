<template>
  <div class="application-list ma-4">
    <el-row :gutter="20">
      <el-col
        :md="6"
        :sm="24"
        :span="4"
      >
        <el-card
          class="elevation-1"
          shadow="hover"
        >
          <el-tabs v-model="form.tab">
            <el-tab-pane
              label="按部门"
              name="按部门"
            >
              <el-card>
                <el-input
                  v-model="form.company"
                  label="部门"
                />
                <el-button
                  type="primary"
                  @click="searchData"
                >查询</el-button>
              </el-card>
            </el-tab-pane>
            <el-tab-pane
              label="按人员"
              name="按人员"
            >
              <el-card>
                <el-input
                  v-model="form.user"
                  label="人员"
                />
                <el-button
                  type="primary"
                  @click="searchData"
                >查询</el-button>
              </el-card>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
      <el-col
        :md="18"
        :sm="24"
        :span="20"
      >
        <ApplicationList
          :data-list="dataList"
          :on-loading="onLoading"
          @refresh="searchData"
        >
          <template slot="headeraction">
            <el-button
              icon="el-icon-edit"
              type="primary"
              @click="handleCreate"
            >添加</el-button>
          </template>
          <template
            slot="action"
            slot-scope="{ row, applyid }"
          >
            <el-button
              size="mini"
              @click="hendleExecute('保存', row, applyid)"
            >保存</el-button>
            <el-button
              size="mini"
              type="warning"
              @click="hendleExecute('撤回', row, applyid)"
            >撤回</el-button>
            <el-button
              size="mini"
              type="success"
              @click="hendleExecute('发布', row, applyid)"
            >发布</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="hendleExecute('删除', row, applyid)"
            >删除</el-button>
          </template>
        </ApplicationList>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ApplicationList from './components/ApplicationList'
import { fromUser, fromCompany } from '../../api/apply'
import { getOnMyManage } from '../../api/usercompany'
import { deleteApply, publish, save, withdrew } from '../../api/apply'

export default {
  name: 'ApplyList',
  components: {
    ApplicationList
  },
  data() {
    return {
      form: {
        tab: '按人员',
        company: 'ADJC1AH122',
        user: '1000000'
      },
      dataList: [],
      onLoading: false
    }
  },
  created() {
    this.getOnMyManage()
  },
  methods: {
    getOnMyManage() {
      getOnMyManage().then(data => {
        if (data.list) {
          this.myManages = this.list
        }
      })
    },
    hendleExecute(method, row, id) {
      const methodsDic = {
        保存: save,
        撤回: withdrew,
        发布: publish,
        删除: deleteApply
      }
      const fn = methodsDic[method]
      fn(id).then(data => {
        debugger
      })
    },
    handleCreate() {
      this.$router.push('/application/new')
    },
    // 查询数据
    searchData() {
      if (this.onLoading === true) {
        return this.$message.warning('查询中，请等候')
      }
      const { tab, user, company } = this.form
      let fn = fromCompany
      let params = {
        code: company,
        id: user
      }
      if (tab === '按人员') {
        fn = fromUser
        params = user
      }
      this.onLoading = true
      fn(params)
        .then(data => {
          const list = data.list
          this.dataList = list || []
        })
        .finally(() => {
          return (this.onLoading = false)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
