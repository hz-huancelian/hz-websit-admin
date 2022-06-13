import request from '@/utils/request'

// 登陆
export function login(data) {
  return request({
    url: '/wUser/login',
    method: 'post',
    data
  })
}

// 密码修改
export function userUpdatePassword(data) {
  return request({
    url: '/wUser/userUpdatePassword',
    method: 'post',
    data
  })
}
