<template>
  <el-card
    :body-style="{ padding: '0px' }"
    class="application-detail"
  >
    <div class="applyinfo-card">
      <div class="applyinfo-no caption py-2">
        创建于.
        <span class="font-weight-thin">{{ basic.create }}</span>
      </div>
      <div class="row layout justify-start">
        <div class="applyinfo-avatar">
          <i class="el-icon-user-solid" />
        </div>
        <div class="applyinfo-content">
          <div class="applyinfo-content-title">
            {{ basic.base.realName }}
            <el-tag
              class="ml-2"
              size="mini"
              type="info"
            >{{ basic.base.dutiesName }}</el-tag>
          </div>
          <div
            :title="basic.base.companyName"
            class="applyinfo-content-subtitle text-truncate"
          >{{ basic.base.companyName }}</div>
        </div>
      </div>
      <div class="applyinfo-footer pa-2">
        <div class="layout row justify-space-between">
          <el-tag type="info">{{ basic.statusDesc }}</el-tag>
        </div>
      </div>
    </div>

    <div class="apply-detail-list">
      <div class="h-88 dark" />
      <div class="padding-top-80">
        <div v-if="requestInfo">
          <el-row class="py-2 px-3 white">
            <div class="applyinfo-list-title">休假类型</div>
            <div class="applyinfo-list-subtitle">{{ requestInfo.type }}</div>
          </el-row>
          <div class="row layout justify-space-between applyinfo-duration">
            <span class>休假时长</span>
            <span class="caption">
              <span class="title">{{ requestInfo.onTripLength }}</span>
              天
            </span>
          </div>
          <el-row class="py-2 mx-2 mb-2 px-2 white el-row">
            <div class="applyinfo-list-title">理由</div>
            <div class="applyinfo-list-subtitle">{{ requestInfo.reason }}</div>
          </el-row>
          <el-row class="py-2 mx-2 mb-2 px-2 white el-row">
            <div class="applyinfo-list-title">休假目的地</div>
            <div class="applyinfo-list-subtitle">{{ requestInfo.vocationPlace.name }}</div>
          </el-row>
          <el-row class="py-2 mx-2 mb-2 px-2 white el-row">
            <div class="applyinfo-list-title">申请离队时间</div>
            <div class="applyinfo-list-subtitle">{{ requestInfo.stampLeave }}</div>
          </el-row>
          <el-row class="py-2 mx-2 mb-2 px-2 white el-row">
            <div class="applyinfo-list-title">预计归队时间</div>
            <div class="applyinfo-list-subtitle">{{ requestInfo.stampReturn }}</div>
          </el-row>
        </div>

        <el-row class="py-2 px-3 my-2">
          <div class="applyinfo-list-title">审核流程</div>
          <el-steps
            :active="activedProcess"
            class="pa-2"
            direction="vertical"
          >
            <el-step
              v-for="(step) in response"
              :key="step.companyName"
              finish-status="success"
            >
              <div
                slot="description"
                class="audit-process-card"
              >
                <div class="audit-process-status">
                  <span>{{ step.status == 1 ? '通过' : '驳回或尚未处理' }}</span>
                </div>
                <div class="audit-process-companyName">
                  <span>{{ step.companyName }}</span>
                </div>
                <div class="row layout justify-space-around">
                  <span class="audit-process-person">{{ step.auditingUserRealName }}</span>
                  <span class="audit-process-handleStamp">{{ step.handleStamp }}</span>
                </div>
                <div class="audit-process-remark">
                  <span>{{ step.remark }}</span>
                </div>
              </div>
            </el-step>
          </el-steps>
          <!-- <div class="applyinfo-list-subtitle">展开</div> -->
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
  name: 'ApplicationDetail',
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
  },
  computed: {
    response() {
      return this.detail.response
    },
    requestInfo() {
      return this.detail.requestInfo
    },
    activedProcess() {
      const { nowAuditCompany } = this.basic
      const { response } = this
      const index = response.findIndex(
        val => val.companyName === nowAuditCompany
      )
      return index + 1 < 1 ? -1 : index + 1
    }
  }
}
</script>

<style lang="scss">
.application-detail {
  position: relative;
  padding: 0;
  background: whitesmoke;
  height: calc(100vh - 48px);
  .h-88 {
    height: 88px;
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
    max-width: 280px;
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
    background: #f5f5f5;
    overflow-y: auto;
    padding-bottom: 56px;

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

  .audit-process- {
    &card {
      background: white;
      margin-bottom: 12px;
      padding: 12px;
      border-radius: 4px;
      box-shadow: 0px 0px 2px 0px;
    }
    &status {
      font-size: 13px;
      padding: 4px 0;
    }
    &companyName {
      padding: 4px 0 4px;
    }
  }
}
</style>
