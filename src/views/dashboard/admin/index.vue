<template>
  <div class="dashboard-editor-container">
    <panel-group @handleSetLineChartData="handleSetLineChartData" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :lg="12" :sm="24" :xs="24">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :lg="12" :sm="24" :xs="24">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :lg="32" :sm="32" :xs="1">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="8">
      <el-col
        :lg="{ span: 6 }"
        :md="{ span: 12 }"
        :sm="{ span: 12 }"
        :xl="{ span: 6 }"
        :xs="{ span: 24 }"
        style="margin-bottom:30px;"
      >
        <todo-list />
      </el-col>
      <el-col
        :lg="{ span: 6 }"
        :md="{ span: 12 }"
        :sm="{ span: 12 }"
        :xl="{ span: 6 }"
        :xs="{ span: 24 }"
        style="margin-bottom:30px;"
      >
        <box-card />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import LineChart from './components/LineChart'
import RaddarChart from './components/RaddarChart'
import PieChart from './components/PieChart'
import BarChart from './components/BarChart'
import TodoList from './components/TodoList'
import BoxCard from './components/BoxCard'

export default {
  name: 'DashboardAdmin',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    TodoList,
    BoxCard
  },
  data() {
    return {
      lineChartData: null
    }
  },
  methods: {
    handleSetLineChartData(
      onApplyingData,
      beenAuditData,
      beenDeniedData,
      titles
    ) {
      this.lineChartData = {
        onApplying: onApplyingData,
        beenAudit: beenAuditData,
        beenDenied: beenDeniedData
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
