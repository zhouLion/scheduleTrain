import request from '../utils/request'

export function getApplyToUser(userid) {
  return request.get('apply')
}
