import request from '@/utils/request'

// 字典列表
export function findPageByCondition(params) {
  return request({
    url: `/sys/dict/findPageByCondition`,
    method: 'get',
    params
  })
}

// 根据父节点获取子节点集合
export function selectByDictKey(parentDictKey) {
  return request({
    url: `/sys/dict/findDictVosById/${parentDictKey}`,
    method: 'get'
  })
}

// 父节点创建
export function saveDict(params) {
  return request({
    url: `/sys/dict/addDictTree`,
    method: 'get',
    params
  })
}

// 父节点更新
export function updateDict(params) {
  return request({
    url: `/sys/dict/updateTreeById`,
    method: 'get',
    params
  })
}

// 子节点创建
export function saveChildDict(params) {
  return request({
    url: `/sys/dict/addLeafDict`,
    method: 'get',
    params
  })
}

// 子节点更新
export function updateChildDict(params) {
  return request({
    url: `/sys/dict/updateById`,
    method: 'get',
    params
  })
}

// 子节点删除
export function delChildDict(id) {
  return request({
    url: `/sys/dict/delById/${id}`,
    method: 'get'
  })
}

// 恢复叶子节点
export function enableById(id) {
  return request({
    url: `/sys/dict/enableById/${id}`,
    method: 'get'
  })
}

/** */
export function getDicKey(rootKey) {
  return request({
    url: `/sys/dict/findDictMap/${rootKey}`,
    method: 'get'
  })
}
