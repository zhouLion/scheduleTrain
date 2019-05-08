<template>
  <div class="application-new">
    <el-card>
      <div
        slot="header"
        class="layout row justify-space-between"
      >
        <span>新建申请</span>
        <span>
          <el-button>1</el-button>
          <el-button>2</el-button>
        </span>
      </div>
      <el-card class="elevation-0">
        <div class="pa-2">
          <el-steps
            :active="active"
            finish-status="success"
            simple
            style="margin-top: 20px"
          >
            <el-step title="填写基本信息" />
            <el-step title="填写休假请求" />
            <el-step title="提交请求" />
          </el-steps>
        </div>
      </el-card>
      <el-card class="elevation-0">
        <div
          v-show="active == 0"
          class="row layout"
        >
          <el-form
            ref="form"
            :model="form"
            class="full-width"
            label-width="180px"
          >
            <el-form-item label="身份号">
              <el-input
                v-model="form.id"
                :style="{ width: '400px' }"
                @keydown.native.enter="fetchUserInfoes"
              >
                <el-tooltip
                  slot="append"
                  class="item"
                  content="点击自动查询对应信息"
                  effect="dark"
                  placement="bottom"
                >
                  <el-button
                    :loading="OnloadingUserInfoes"
                    icon="el-icon-search"
                    @click="fetchUserInfoes"
                  />
                </el-tooltip>
              </el-input>
            </el-form-item>
            <el-form-item label="真实姓名">
              <el-input v-model="form.realName" />
            </el-form-item>
            <el-form-item label="所在部门">
              <el-input
                v-model="form.companyName"
                disabled
              />
            </el-form-item>
            <el-form-item
              hidden
              label="所在部门"
            >
              <el-input
                v-model="form.company"
                disabled
                hidden
              />
            </el-form-item>
            <el-form-item label="担任职务">
              <el-input
                v-model="form.duties"
                disabled
              />
            </el-form-item>
            <el-form-item label="家庭地址">
              <el-input
                v-model="form.HomeDetailAddress"
                disabled
              />
            </el-form-item>
            <el-form-item
              hidden
              label="家庭地址"
            >
              <el-input
                v-model="form.HomeAddress"
                disabled
              />
            </el-form-item>
            <el-form-item label="手机号码">
              <el-input
                v-model="form.Phone"
                disabled
              />
            </el-form-item>
            <hr class="divider">
            <el-form-item label="回执编号">
              <el-input
                v-model="formFinal.baseInfoId"
                :style="{ width: '400px' }"
                disabled
              >
                <el-button
                  v-if="formFinal.baseInfoId"
                  slot="append"
                  :loading="onLoadingInfoId"
                  class="success"
                  icon="el-icon-success"
                  type="success"
                />
                <el-button
                  v-else
                  slot="append"
                  :loading="onLoadingInfoId"
                  icon="el-icon-question"
                />
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                @click="submitBaseInfo"
              >提交基本信息</el-button>
              <el-button
                :disabled="!formFinal.baseInfoId"
                @click="active = 1"
              >下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div
          v-show="active == 1"
          class="row layout"
        >
          <el-form
            ref="formApply"
            :model="formApply"
            class="full-width"
            label-width="180px"
          >
            <el-form-item label="申请理由">
              <el-input v-model="formApply.reason" />
            </el-form-item>
            <el-form-item label="休假类型">
              <el-select
                v-model="formApply.VocationType"
                placeholder="必填"
              >
                <el-option
                  label="正休"
                  value="zhengxiu"
                />
                <el-option
                  label="年休"
                  value="nianxiu"
                />
                <el-option
                  label="探亲"
                  value="tanqin"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="离队时间">
              <el-col :span="6">
                <el-date-picker
                  v-model="formApply.StampLeave"
                  placeholder="选择日期"
                  style="width: 100%;"
                  type="date"
                />
              </el-col>
              <el-col
                :span="2"
                class="line text-lg-right pr-2"
              >休假天数</el-col>
              <el-col :span="6">
                <el-input-number
                  v-model="formApply.VocationLength"
                  :max="100"
                  :min="1"
                  label="休假时长（天）"
                  @change="handleChange"
                />
              </el-col>
              <el-col
                :span="2"
                class="line text-lg-right pr-2"
              >路途天数</el-col>
              <el-col :span="6">
                <el-input-number
                  v-model="formApply.OnTripLength"
                  :max="100"
                  :min="1"
                  label="路途时间"
                  @change="handleChange"
                />
              </el-col>
            </el-form-item>
            <el-form-item label="休假目的地">
              <el-select
                v-model="formApply.vocationPlace"
                placeholder="必填"
              >
                <el-option
                  label="正休"
                  value="zhengxiu"
                />
                <el-option
                  label="年休"
                  value="nianxiu"
                />
                <el-option
                  label="探亲"
                  value="tanqin"
                />
              </el-select>
            </el-form-item>
            <el-form-item size="large">
              <el-button
                type="primary"
                @click="submitRequestInfo"
              >提交请求信息</el-button>
              <el-button @click="active = 0">上一步</el-button>
              <el-button
                type="primary"
                @click="active = 2"
              >下一步</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          class="row layout"
          v-show="active == 2"
          >
          <el-button @click="submitApply">提交</el-button>
        </div>
        <!-- card body -->
      </el-card>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from '../../api/usercompany'
import { postBaseInfo, postRequestInfo, submitApply } from '../../api/apply'
export default {
  name: 'NewApply',
  data() {
    return {
      active: 0,
      OnloadingUserInfoes: false,
      onLoadingInfoId: false,
      form: {
        id: '',
        realName: '',
        company: '',
        companyName: '',
        duties: '',
        HomeAddress: 0,
        HomeDetailAddress: '',
        Phone: 0,
        Settle: 0
      },
      formApply: {
        // id: '',
        StampLeave: '2019-5-7',
        VocationLength: 0,
        OnTripLength: 0,
        VocationType: '',
        vocationPlace: 0,
        reason: ''
      },
      formFinal: {
        baseInfoId: '',
        RequestId: ''
      }
    }
  },
  methods: {
    fetchUserInfoes() {
      const id = this.form.id
      if (this.OnloadingUserInfoes === true) {
        return this.$message.info({
          message: '用户信息获取中，请稍等'
        })
      }
      if (id.length === 7 || id.length === 18) {
        this.OnloadingUserInfoes = true
        getUserInfo(this.form.id)
          .then(data => {
            this.OnloadingUserInfoes = false
            const { base, company, duties, social } = data
            this.form.realName = base.realName
            this.form.company = company.company.code
            this.form.companyName = company.company.name
            this.form.duties = duties.name
            this.form.HomeDetailAddress = social.addressDetail
            this.form.HomeAddress = social.address.code
            return this.$message.success('获取成功，已自动填充到表单')
          })
          .catch(_err => {
            this.OnloadingUserInfoes = false
            return this.$message.error('查询时错误')
          })
      } else {
        this.$message.warning({
          message: '非正确身份号码,正确格式为7位身份号或者18位法定身份证号码'
        })
      }
    },
    // 提交基本信息
    submitBaseInfo() {
      const {
        id,
        realName,
        company,
        duties,
        HomeAddress,
        HomeDetailAddress,
        Phone,
        Settle
      } = this.form
      this.onLoadingInfoId = true
      postBaseInfo({
        id,
        realName,
        company,
        duties,
        HomeAddress,
        HomeDetailAddress,
        Phone,
        Settle
      })
        .then(data => {
          this.onLoadingInfoId = false
          if (data.id) {
            this.formFinal.baseInfoId = data.id
            this.$message.success('成功提交，回执编号为：' + data.id)
          }
        })
        .catch(() => {
          this.onLoadingInfoId = false
          this.formFinal.baseInfoId = ''
          this.$message.error('基本信息提交失败，请检查填写信息')
        })
    },

    /**
     * 提交请求信息
     */
    submitRequestInfo() {
      const infoParam = Object.assign({}, this.formApply, {
        id: this.form.id
      })
      postRequestInfo(infoParam)
        .then(data => {
          const id = data.id
          this.formFinal.RequestId = id
          if (id) {
            return this.$message.success('申请信息提交完成，回执编号为' + id)
          }
        })
        .catch(() => {
          return this.$message.error('提交失败，请重新检查表单')
        })
    },

    /**
     * 提交申请
     */
    submitApply() {
      const BaseId = this.formFinal.baseInfoId
      const RequestId = this.formFinal.RequestId
      submitApply({
        RequestId,
        BaseId,
        Verify: {
          Code: 201700816
        }
      })
        .then(data => {
          return this.$message.success('保存成功')
        })
        .catch(() => {
          return this.$message.error('保存失败')
        })
    },
    handleChange() {},
    onSubmit() {}
  }
}
</script>

<style lang="scss" scoped>
.application-new {
  background: #f5f5f5;
  padding: 24px;
}
hr.divider {
  border: 1px solid grey;
  margin: 16px;
  border: none;
  border-bottom: 1px solid #eeeeee;
}
.full-width {
  width: 100%;
}
</style>
