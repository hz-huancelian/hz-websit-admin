import request from '@/utils/request'

// 首页快速报价
export function findPageList(params) {
  return request({
    url: '/wQuoteMiddle/findPageList',
    method: 'get',
    params
  })
}

// 记录添加
export function saveQuoteMiddle(data) {
  return request({
    url: '/wQuoteMiddle/save',
    method: 'post',
    data
  })
}

// 记录修改
export function updateQuoteMiddle(data) {
  return request({
    url: '/wQuoteMiddle/update',
    method: 'post',
    data
  })
}

// 记录删除
export function delQuoteMiddle(id) {
  return request({
    url: `/wQuoteMiddle/delete/${id}`,
    method: 'get'
  })
}

