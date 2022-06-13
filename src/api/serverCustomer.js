import request from '@/utils/request'

// 首页快速报价
export function findPageList(params) {
  return request({
    url: '/wServerCustomer/findPageList',
    method: 'get',
    params
  })
}

// 记录添加
export function saveCustomer(data) {
  return request({
    url: '/wServerCustomer/save',
    method: 'post',
    data
  })
}

// 记录修改
export function updateCustomer(data) {
  return request({
    url: '/wServerCustomer/update',
    method: 'post',
    data
  })
}

// 记录删除
export function delCustomer(id) {
  return request({
    url: `/wServerCustomer/delete/${id}`,
    method: 'get'
  })
}

