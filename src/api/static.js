import request from '../utils/request'
/**
 * 刷新验证码
 *
 * @export
 * @returns
 * id   guid    验证码的id
 * posY int     前景图片y坐标
 */
export function verify() {
  return request.get('static/verify')
}

/**
 * 获取指定行政区划子层级
 *
 * @export
 * @param {string} code 行政区划code
 * @returns
 * {array} list:
 *  {json} list[i]:
 *      {string} list[i].name:"东城区"
 *      {int} list[i].code:110101
 */
export function locationChildren(code) {
  return request({
    url: '/static/locationChildren',
    method: 'get',
    params: { code }
  })
}

/**
 *行政区划详情
 *
 * @export
 * @param {string} code
 * @returns
 *    {string} list[i].name:"东城区"
 *    {int} list[i].code:110101
 */
export function location(code) {
  return request({
    url: '/static/location',
    method: 'get',
    code
  })
}

const exportPath = '/static/xlsExport'
const exportXSL = (params) => request({
  url: exportPath,
  method: 'get',
  params,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

/**
 * 导出休假登记模版
 * @param {{
    "Templete":"干部休假登记卡.xlsx",
    "Model":{
      "user":"ADJC1AH121"
    }
  }} params
 */
export function exportUserApplies({
  Templete = '干部休假登记卡.xlsx',
  user
}) {
  return exportXSL({
    Templete,
    Model: {
      user
    }
  })
}

/**
 * 导出休假请求列表
 * @param {{
    "Templete":"休假人员统计表.xlsx",
    "Model":{
      "apply":"ADJC1AH121"
    }
  }} params
 */
export function exportApply({
  Templete = '干部请假单.xlsx',
  apply
}) {
  return exportXSL({
    Templete,
    Model: {
      apply
    }
  })
}

/**
 * 导出汇总状态
 * @param {{
    "Templete":"休假人员统计表.xlsx",
    "Model":{
      "company":"ADJC1AH121"
    }
  }} params
 */
export function exportCompanyApplies({
  Templete = '休假人员统计表.xlsx',
  company
}) {
  return exportXSL({
    Templete,
    Model: {
      company
    }
  })
}
