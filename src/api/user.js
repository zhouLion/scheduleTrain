import request from '../utils/request'

/**
 * 基础信息
 * @description > ``` response
   {
    Id:"",//用户唯一标识号，可为身份号或身份证号,
    RealName:"姓名",
    Company:"单位名称",//后续可能拓展为单位基础信息,
    职务:"职务名称",
  }
  ```
 */
export function getUserBase() {
  return request.get('user/base')
}

/**
 * 社会关系 Get /User/social
 * @description
 ```
 {
    Home:{//家庭
		zipCode://邮编
        Address://详细地址
    },
    SettleDown:0-未结婚 1-异地 2-同地,//随军情况
    Phone:联系方式
}
```
 */
export function getUserSocial() {
  return request.get('user/duties')
}

/**
 * 职务信息 Get /User/duties
 * @description
 ```
 {
    id:101
    Name:"干事"
 }
```
 */
export function getUserDuties() {
  return request.get('user/duties')
}

/**
 * 单位信息 Get /User/company
 * @description
 ```
  {
      Company:{
          Name:"单位名称",
        Code:"ADJC1A22",
        Parent:"上级单位名称"
      },
      Duties:"职务名称"
  }
 ```
 */
export function getUserCompany() {
  return request.get('user/company')
}

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
