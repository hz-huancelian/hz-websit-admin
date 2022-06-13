import request from '@/utils/request'

// 广告
export function findList() {
  return request({
    url: '/wAdver/findList',
    method: 'get'
  })
}

// 记录添加
export function saveAdver(data) {
  return request({
    url: '/wAdver/save',
    method: 'post',
    data
  })
}

// 记录修改
export function updateAdver(data) {
  return request({
    url: '/wAdver/update',
    method: 'post',
    data
  })
}

// 记录删除
export function delAdver(id) {
  return request({
    url: `/wAdver/delete/${id}`,
    method: 'get'
  })
}

