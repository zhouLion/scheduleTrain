<template>
  <div class="application-examine ma-4">
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
        <!-- <div
          @click
          :class=""
          type="primary"
        >12</div>-->

        <ApplicationList
          :data-list="dataList"
          :on-loading="onLoading"
          @refresh="searchData"
        >
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ApplicationList from './components/ApplicationList'
import { toCompany, toUser } from '../../api/apply'
import { getOnMyManage } from '../../api/usercompany'
import { getMembers } from '../../api/company'

export default {
  name: 'ApplyExamine',
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
      myManages: [],
      dataList: [],
      onLoading: false,
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
          this.myManages = data.list || []
        })
        .catch(err => {
          console.warn(err)
        })
    },
    companyChanged(val) {
      this.queryForm.userId = ''
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

    // 查询数据
    searchData() {
      if (this.onLoading === true) {
        return this.$message.warning('查询中，请等候')
      }
      const { isSearchUser, userId, companyCode } = this.queryForm
      let fn = toCompany
      const params = {
        code: companyCode
      }
      // 如果查询指定用户，则异步方法换城toUser
      if (isSearchUser) {
        fn = toUser
        params.id = userId
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
.application-examine {
  .full-width {
    width: 100%;
  }
}
</style>
