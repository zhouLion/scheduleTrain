<template>
  <div class="application-list">
    <el-card>
      <div class="layout row justify-space-between px-2 pb-3">
        <el-button
          v-waves
          icon="el-icon-search"
          type="primary"
          @click="emitRefresh"
        >刷新</el-button>
        <div>
          <slot name="headeraction" />
          <el-button
            v-waves
            :loading="downloadLoading"
            icon="el-icon-download"
            type="primary"
            @click="handleDownload"
          >导出</el-button>
        </div>
      </div>
      <el-table
        :key="tableKey"
        v-loading="onLoading"
        :data="formatedList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          label="申请人"
          min-width="120px"
        >
          <template slot-scope="{row}">
            <el-button
              plain
              size="mini"
              type="info"
              @click="handleDetail(row, row.id)"
            >
              <i class="el-icon-info blue--text" />
              <span class="info--text">{{ row.base.realName }}</span>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="单位"
          min-width="130px"
        >
          <template slot-scope="{row}">
            <span class="caption">{{ row.base.companyName }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="创建时间"
          width="150px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.create }}</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="申请离队时间"
          width="150px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.stampLeave }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="预计归队时间"
          width="150px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.stampReturn }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="状态"
          width="110px"
        >
          <template slot-scope="{row}">
            <el-tag
              :color="row.statusColor"
              class="white--text"
              size="mini"
            >{{ row.statusDesc }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          class-name="small-padding fixed-width"
          fixed="right"
          label="操作"
          width="330"
        >
          <template slot-scope="{row}">
            <slot
              :applyid="row.id"
              :row="row"
              name="action"
            />
          </template>
        </el-table-column>
      </el-table>
      <!-- card body -->
    </el-card>

    <el-dialog
      :visible.sync="detailDrawer.show"
      custom-class="p-fixed f-right apply-detail"
      title="详情"
      top="0"
      width="408px"
    >
      <ApplicationDetail
        :apply-id="detailDrawer.id"
        :basic="detailDrawer.basic"
        :detail="detailDrawer.data"
      >
        <slot
          slot="action"
          slot-scope="{applyid, row}"
          :applyid="applyid"
          :row="row"
          name="action"
        />
      </ApplicationDetail>
    </el-dialog>
  </div>
</template>

<script>
import { format } from 'timeago.js'
import moment from 'moment'
import { getAllStatus, detail } from '../../../api/apply'
import ApplicationDetail from './ApplicationDetail'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '../../../utils'

export default {
  name: 'ApplicationList',
  directives: { waves },
  components: {
    ApplicationDetail
  },
  props: {
    dataList: {
      type: Array,
      default() {
        return []
      }
    },
    onLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableKey: 0,
      detailDrawer: {
        show: false,
        data: null,
        basic: null,
        id: null
      },
      list: [],
      listLoading: true,
      listQuery: {
        // page: 1,
        // limit: 20,
        // importance: undefined,
        // keyword: undefined,
        status: undefined,
        userid: '',
        company: ''
      },
      statusOptions: {},
      downloadLoading: false
    }
  },
  computed: {
    /**
     * 状态字典翻译
     */
    formatedList() {
      const { statusOptions } = this
      return this.dataList.map(li => {
        const { ...item } = li
        const statusObj = statusOptions[item.status]
        item.statusDesc = statusObj ? statusObj.desc : '不明类型'
        item.statusColor = statusObj ? statusObj.color : 'white'
        item.stampLeave = moment(item.stampLeave).format(
          'MMMM Do YYYY, h:mm:ss a'
        )
        item.stampLeave = moment(item.stampReturn).format(
          'MMMM Do YYYY, h:mm:ss a'
        )
        item.create = format(item.create, 'zh_CN')
        // item.stampLeave = parseTime(item.stampLeave, 'YYYY年MM月dd日')
        // item.stampReturn = parseTime(item.stampReturn, 'YYYY年MM月dd日')
        // item.create = parseTime(item.create, 'YYYY年MM月dd日')
        return item
      })
    }
  },
  async created() {
    await this.getAllStatus()
  },
  methods: {
    // 获取所有的状态字典
    getAllStatus() {
      return getAllStatus().then(status => {
        if (status.list) {
          this.statusOptions = status.list
        }
      })
    },

    /**
     * 查询详情
     */
    handleDetail(row, id) {
      detail(id).then(data => {
        if (data) {
          this.detailDrawer.show = true
          this.detailDrawer.data = data
          this.detailDrawer.basic = row
          this.detailDrawer.id = id
        }
      })
    },

    /**
     * 执行导出
     */
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal, this.list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },

    /**
     * 格式json数据
     */
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },

    /**
     * 请求刷新
     */
    emitRefresh() {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="scss">
.p-fixed {
  position: fixed !important;
  top: 0;
  bottom: 0;
  background: white;
}
.f-right {
  right: 0 !important;
}
.el-dialog.apply-detail {
  margin-right: 0;
  z-index: 10000;
}
.el-dialog.apply-detail .el-dialog__body {
  padding: 0;
}
</style>

