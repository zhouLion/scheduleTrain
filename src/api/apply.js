import request from '../utils/request'

export function getApplyToUser(userid) {
  return request.get('apply')
}

/**
 *查询指定用户的申请
 *
 * @export
 * @param {*} userid
 * @returns
 */
export function fromUser(userid) {
  const { id } = userid
  return request.get('/apply/fromUser', {
    params: {
      id
    }
  })
}

/**
 * 提交基本信息
 * @param {*} data 基本信息参数
 */
export function postBaseInfo(data) {
  return request.post('/apply/BaseInfo', data)
}

/**
 * 提交请求信息
 * @param {*} data 请求参数
 */
export function postRequestInfo(data) {
  return request.post('/apply/RequestInfo', data)
}

/**
 * 提交申请
 * @param {
   {
    "BaseId": String,
    "RequestId": String,
    "Verify":{
      "Code": String
    }
  } data 申请的参数，包含基本信息和请求返回的两个id
 */
export function submitApply(data) {
  return request.post('/apply/Submit', data)
}

/**
 *  删除申请
 * @param {Object} params
 */
export function deleteApply({
  id, Auth
}) {
  return request.delete('/apply/Submit', {
    id,
    Auth
  })
}

/**
 * 保存申请
 * @param {String} id 申请的id
 */
export function save(id) {
  return request.put('/apply/Save', {
    id
  })
}

/**
 * 发布申请
 * @param {String} id 申请的id required
 */
export function publish(id) {
  return request.put('/apply/Publish', {
    id
  })
}

/**
 * 撤回申请
 * @param {String} id 申请的id required
 */
export function withdrew(id) {
  return request.put('/apply/Withdrew', {
    id
  })
}

/**
 *查询用户管辖单位下需要审核的申请
 *
 * @export
 * @param {json} data
 *      {string} data.code 单位代码
 *      {string} data.id 用户id
 * @returns
 */
export function toUser(data) {
  return request.get('/apply/toUser', {
    params: data
  })
}

/**
 *查询指定单位的申请
 * @param {*} companyCode
 */
export function fromCompany(companyCode) {
  const { code } = companyCode
  return request.get('/apply/fromCompany', {
    params: {
      code
    }
  })
}

/**
 *查询指定单位的申请
 * @returns
 */
export function getAllStatus() {
  return request.get('/apply/allStatus')
}

/**
 *查询需要指定单位审核的申请
 *
 * @export
 * @param {*} companyCode
 * @returns
 */
export function toCompany(companyCode) {
  const { code } = companyCode
  return request({
    url: '/apply/toCompany',
    method: 'get',
    params: {
      code
    }
  })
}

/**
 *批量审批
 *
 * @export
 * @param {Arr[json]} data
 *      data:{
 *        List:{
 *          id:
 *          action:
 *          remark:
 *        },
 *        ...
 *      }
 * @returns
 */
export function audit(data) {
  return request('/apply/audit', {
    params: {
      data
    }
  })
}

/**
 *查询申请详情
 *
 * @export
 * @param {*} id
 * @returns
 */
export function detail(id) {
  return request('/apply/detail', {
    params: {
      id
    }
  })
}
