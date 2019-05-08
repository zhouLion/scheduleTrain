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
  return request({
    url: '/apply/fromUser',
    method: 'get',
    userid
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
  return request({
    url: '/apply/toUser',
    method: 'get',
    data
  })
}

/**
 *查询指定单位的申请
 *
 * @export
 * @param {*} companyCode
 * @returns
 */
export function fromCompany(companyCode) {
  return request({
    url: '/apply/fromUser',
    method: 'get',
    companyCode
  })
}

/**
 *查询需要指定单位审核的申请
 *
 * @export
 * @param {*} companyCode
 * @returns
 */
export function toCompany(companyCode) {
  return request({
    url: '/apply/toCompany',
    method: 'get',
    companyCode
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
  return request({
    url: '/apply/detail',
    method: 'get',
    id
  })
}
