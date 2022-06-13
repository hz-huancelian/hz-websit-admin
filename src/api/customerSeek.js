import request from '@/utils/request'

// 首页快速报价
export function findPageList(params) {
  return request({
    url: '/wCustomerSeek/findPageList',
    method: 'get',
    params
  })
}

// 记录删除
export function delCustomerSeek(id) {
  return request({
    url: `/wCustomerSeek/delete/${id}`,
    method: 'get'
  })
}

