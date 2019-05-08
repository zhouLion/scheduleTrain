import request from '../utils/request'
import {
  getUserBase,
  getUserCompany,
  getUserDuties,
  getUserSocial
} from '../api/userinfo'
export function getOnMyManage() {
  return request.get('user/onMyManage')
}

/**
 * 新增管辖单位
 * @param { {
 * code: String,
 * id: String,
 * Auth: {
 *   Code: String,
 *   AuthByUserID: String
 * }
 * } } params 新增参数
 */
export function addMyManage(params) {
  return request.post('user/onMyManage', params)
}

/**
 * 移除管辖单位
 * @param {{
 * code: String,
 * id: String,
 * Auth: {
 *   Code: String,
 *   AuthByUserID: String
 * }
 * } } params 新增参数
 */
export function removeMyManage(params) {
  return request.delete('user/onMyMange', params)
}

/**
 * 一次性获取user所有的信息
 */
export function getUserInfo() {
  return new Promise((resolve, reject) => {
    Promise.all([
      getUserBase(),
      getUserCompany(),
      getUserDuties(),
      getUserSocial()
    ]).then(([base, company, duties, social]) => {
      const UserInfoes = {
        base,
        company,
        duties,
        social
      }
      resolve(UserInfoes)
    }).catch(reject)
  })
}
