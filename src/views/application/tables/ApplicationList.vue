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
        :data="dataList"
        border
        fit
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column
          align="center"
          label="详情"
          width="50px"
        >
          <template slot-scope="{row}">
            <i
              class="el-icon-info blue--text"
              @click="handleDetail(row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="创建时间"
          width="150px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.create | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="申请人"
          min-width="150px"
        >
          <template slot-scope="{row}">
            <span>{{ row.base.realName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="申请离队时间"
          width="210px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.stampLeave }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="预计归队时间"
          width="210px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.stampReturn }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="条目状态"
          width="110px"
        >
          <template slot-scope="scope">
            <span style="color:red;">{{ scope.row.status }}</span>
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
      title="详情"
      width="30%"
    >
      {{ detailDrawer.data }}
      <span slot="footer">
        <el-button @click="detailDrawer.show = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAllStatus, detail } from '../../../api/apply'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '../../../utils'

export default {
  name: 'ApplicationList',
  directives: { waves },
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
        data: null
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
  async created() {
    await this.getAllStatus()
  },
  methods: {
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
    handleDetail(id) {
      detail(id).then(data => {
        if (data) {
          this.detailDrawer.show = true
          this.detailDrawer.data = data
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
  position: fixed;
  top: 0;
  bottom: 0;
  background: white;
}
</style>

