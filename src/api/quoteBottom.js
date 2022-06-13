import request from '@/utils/request'

// 首页快速报价
export function findPageList(params) {
  return request({
    url: '/wQuoteBottom/findPageList',
    method: 'get',
    params
  })
}

// 记录添加
export function saveQuoteBottom(data) {
  return request({
    url: '/wQuoteBottom/save',
    method: 'post',
    data
  })
}

// 记录修改
export function updateQuoteBottom(data) {
  return request({
    url: '/wQuoteBottom/update',
    method: 'post',
    data
  })
}

// 记录删除
export function delQuoteBottom(id) {
  return request({
    url: `/wQuoteBottom/delete/${id}`,
    method: 'get'
  })
}

