import request from '../utils/request'
/**
 * 获取单位的子单位
 *
 * @export
 * @param {string} id 单位id
 * @returns
 * {array} list:
 *  {json} list[i]:
 *      {string} list[i].name:"中央军委联合参谋部第一通信团政治处组织干部股"
 *      {string} list[i].code:"ADJC1AH121"
 */
export function child(id) {
  return request({
    url: '/company/child',
    method: 'get',
    id
  })
}

/**
 *获取单位主管列表
 *
 * @export
 * @param {string} id 单位id
 * @returns
* {array} list:
 *  {json} list[i]:
 *      {string} list[i].realName:"测试管理员"
 *      {string} list[i].duties:"助理工程师"
 *      {string} list[i].company:"中央军委联合参谋部第一通信团政治处宣传股"
 *      {string} list[i].id:"1000000"
 */
export function Managers(id) {
  return request({
    url: '/company/Managers',
    method: 'get',
    id
  })
}
