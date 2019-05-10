<template>
  <el-card
    :body-style="{ padding: '0px' }"
    class="application-detail"
  >
    <div class="applyinfo-card">
      <div class="applyinfo-no">No.</div>
      <div class="d-flex">
        <div class="applyinfo-avatar">
          <img
            alt="tubian"
            src="as"
          >
        </div>
        <div class="applyinfo-content">
          <div class="applyinfo-content-title">赵丽颖</div>
          <div class="applyinfo-content-subtitle">拉可视对讲福利卡数据的</div>
        </div>
      </div>
      <div class="applyinfo-footer" />
    </div>

    <div class="apply-detail-list">
      <div class="h-66 dark" />
      <div class="padding-top-80">
        <el-row class="py-2 px-3 white">
          <div class="applyinfo-list-title">休假类型</div>
          <div class="applyinfo-list-subtitle">正休</div>
        </el-row>
        <div class="row layout justify-space-between applyinfo-duration">
          <span class>请假时长</span>
          <span class="caption">5天</span>
        </div>
        <el-row class="py-2 px-3 mb-2 white">
          <div class="applyinfo-list-title">理由</div>
          <div class="applyinfo-list-subtitle">wuliyou</div>
        </el-row>
        <el-row class="py-2 px-3 mb-2 white">
          <div class="applyinfo-list-title">休假目的地</div>
          <div class="applyinfo-list-subtitle">hunan</div>
        </el-row>
        <el-row class="py-2 px-3 mb-2 white">
          <div class="applyinfo-list-title">申请离队时间</div>
          <div class="applyinfo-list-subtitle">123123</div>
        </el-row>
        <el-row class="py-2 px-3 mb-2 white">
          <div class="applyinfo-list-title">预计退队时间</div>
          <div class="applyinfo-list-subtitle">2019年6月6日 12点30分</div>
        </el-row>
        <el-row class="py-2 px-3 my-2">
          <div class="applyinfo-list-title">审核进度</div>
          <div class="applyinfo-list-subtitle">展开</div>
        </el-row>
      </div>
    </div>

    <div class="apply-detail-action">
      <div class="layout row justify-center">
        <slot
          :applyid="applyId"
          :row="basic"
          name="action"
        />
      </div>
    </div>
    <!-- card body -->
  </el-card>
</template>

<script>
export default {
  name: '',
  props: {
    basic: {
      type: Object,
      default() {
        return {}
      }
    },
    applyId: {
      type: String,
      default: null
    },
    detail: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  }
}
</script>

<style lang="scss">
.application-detail {
  position: relative;
  padding: 0;
  background: whitesmoke;
  height: calc(100vh - 48px);
  .h-66 {
    height: 66px;
  }

  .dark {
    background: #304156;
  }

  .padding-top-80 {
    padding-top: 80px;
  }

  .applyinfo-card {
    position: absolute;
    border: 1px solid #e0e0e0;
    left: 0;
    right: 0;
    top: 0;
    margin: 12px;
    border-radius: 8px;
    box-shadow: 0 2px 12px -6px;
    padding: 0 8px;
    background: white;
    height: 120px;
    z-index: 36;
  }

  .applyinfo-avatar {
    max-width: 56px;
  }

  .applyinfo-avatar image {
    border-radius: 100%;
    height: 48px;
    width: 48px;
  }

  .applyinfo-footer {
    min-height: 32px;
    border-top: 1px solid #eeeeee;
  }

  .applyinfo-content-title {
    font-size: 15px;
    padding: 8px;
    font-weight: bold;
  }

  .applyinfo-content-subtitle {
    font-size: 12px;
    padding: 8px;
  }

  &.el-card .el-card__body {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .apply-detail-list {
    z-index: 1;
    position: absolute;
    width: 100%;
    height: calc(100vh - 54px);
    overflow-y: auto;
    padding-bottom: 48px;

    .applyinfo-duration {
      height: 60px;
      line-height: 60px;
      padding: 12px 24px;
      box-sizing: content-box;
      background: #f5f5f5;
    }

    .applyinfo-list-title {
      color: #616161;
      padding: 8px;
      font-size: 13px;
    }

    .applyinfo-list-subtitle {
      font-size: 16px;
      font-weight: 500;
      color: black;
      padding: 8px;
    }
  }

  .apply-detail-action {
    position: absolute;
    bottom: 0;
    width: 100%;
    background: white;
    height: 64px;
    box-shadow: 1px 0 8px -5px black;
    z-index: 1;
    padding: 12px;
  }
}
</style>
