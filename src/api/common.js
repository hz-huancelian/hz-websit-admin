import request from '@/utils/request'

// 图片上传
export function uploadImage(data) {
  return request({
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: '/common/img/upload',
    method: 'post',
    data: data
  })
}

// 视频上传
export function uploadVideo(data) {
  return request({
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    url: '/common/video/upload',
    method: 'post',
    data: data
  })
}
