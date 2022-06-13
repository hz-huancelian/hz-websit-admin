import request from '@/utils/request'

// 首页快速报价
export function findPageList(params) {
  return request({
    url: '/wCustomer/findPageList',
    method: 'get',
    params
  })
}

// 记录添加
export function saveCustomer(data) {
  return request({
    url: '/wCustomer/save',
    method: 'post',
    data
  })
}

// 记录修改
export function updateCustomer(data) {
  return request({
    url: '/wCustomer/update',
    method: 'post',
    data
  })
}

// 记录删除
export function delCustomer(id) {
  return request({
    url: `/wCustomer/delete/${id}`,
    method: 'get'
  })
}

