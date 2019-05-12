<template>
  <div class="application-list ma-4">
    <el-row :gutter="20">
      <el-col
        :lg="4"
        :md="4"
        :sm="24"
      >
        <el-card
          class="elevation-0"
          shadow="hover"
        >
          <el-form
            ref="queryForm"
            :model="queryForm"
          >
            <el-row>
              <el-col
                :md="24"
                :sm="12"
                class="mb-3"
              >
                <div class="py-2 body-2 layout align-center row justify-space-between">
                  单位
                  <el-button
                    circle
                    icon="el-icon-refresh"
                    size="mini"
                    type="primary"
                    @click="getOnMyManage"
                  />
                </div>
                <el-select
                  v-model="queryForm.companyCode"
                  class="full-width"
                  placeholder="选择管辖单位"
                  @change="companyChanged"
                >
                  <el-option
                    label="--全部--"
                    value
                  />
                  <el-option
                    v-for="item in myManages"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code"
                  />
                </el-select>

                <!-- <el-input v-model="queryForm.companyCode"></el-input> -->
              </el-col>
              <el-col
                :md="24"
                :sm="12"
                class="mb-3"
              >
                <div class="py-2 body-2 layout align-center row justify-space-between">
                  指定人员
                  <el-switch v-model="queryForm.isSearchUser" />
                </div>
                <el-select
                  v-show="queryForm.isSearchUser"
                  v-model="queryForm.userId"
                  class="full-width"
                  placeholder
                >
                  <el-option
                    v-for="item in membersOption"
                    :key="item.id"
                    :label="item.realName"
                    :value="item.id"
                  />
                </el-select>
              </el-col>

              <el-col
                :span="24"
                class="py-2"
              >
                <el-button
                  class="full-width"
                  type="primary"
                  @click="searchData"
                >查询</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </el-col>
      <el-col
        :lg="20"
        :md="20"
        :sm="24"
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
import { getMembers } from '../../api/company'

export default {
  name: 'ApplyList',
  components: {
    ApplicationList
  },
  data() {
    return {
      queryForm: {
        companyCode: '',
        userId: '',
        isSearchUser: false
      },
      dataList: [],
      onLoading: false,
      myManages: [],
      membersOption: [],
      cacheMembers: []
    }
  },
  created() {
    this.getOnMyManage()
  },
  methods: {
    getOnMyManage() {
      getOnMyManage()
        .then(data => {
          if (data.list) {
            this.myManages = data.list || []
          }
        })
        .catch(err => {
          console.warn(err)
        })
    },

    companyChanged(val) {
      const cache = this.cacheMembers.find(d => d.companyCode === val)
      if (cache) {
        this.membersOption = cache.list
      } else {
        getMembers({
          id: val
        }).then(data => {
          if (data.list) {
            this.membersOption = data.list
            this.cacheMembers.push({
              companyCode: val,
              list: data.list
            })
          }
        })
      }
    },

    hendleExecute(method, row, id) {
      if (this.onLoading === true) {
        return false
      }
      const methodsDic = {
        保存: save,
        撤回: withdrew,
        发布: publish,
        删除: deleteApply
      }
      let params = id
      const fn = methodsDic[method]
      if (method === '删除') {
        params = {
          id,
          Auth: {
            Code: 201700816,
            AuthByUserID: 'Root'
          }
        }
      }
      this.onLoading = true
      fn(params)
        .then(data => {
          const { status } = data
          debugger
          const curItem = this.dataList.find(d => d.id === id)
          if (curItem) {
            curItem.status = status
            this.dataList = [...this.dataList]
          }
          this.$message.success(method + '成功，请求状态已改变')
        })
        .catch(err => {
          console.log(err)
          this.$message.error('操作失败')
        })
        .finally(() => {
          this.onLoading = false
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
      const { isSearchUser, userId, companyCode } = this.queryForm
      let fn = fromCompany
      let params = {
        code: companyCode
      }
      if (isSearchUser) {
        fn = fromUser
        params = {
          id: userId
        }
      }
      this.onLoading = true
      this.dataList = []
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
.application-list {
  .full-width {
    width: 100%;
  }
}
</style>
