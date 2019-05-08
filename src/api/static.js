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
 * @param {string} id 行政区划id
 * @returns
 * {array} list:
 *  {json} list[i]:
 *      {string} list[i].name:"东城区"
 *      {int} list[i].code:110101
 */
export function locationChildren(id) {
  return request({
    url: '/static/locationChildren',
    method: 'get',
    params: { id }
  })
}

/**
 *行政区划详情
 *
 * @export
 * @param {string} id
 * @returns
 *    {string} list[i].name:"东城区"
 *    {int} list[i].code:110101
 */
export function location(id) {
  return request({
    url: '/static/location',
    method: 'get',
    id
  })
}
