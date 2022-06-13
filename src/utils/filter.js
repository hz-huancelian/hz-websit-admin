import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('NumberFormat', function(value) {
  if (!value) {
    return '0'
  }
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('MoneyFormat', function(value) {
  if (!value) {
    return '0.00 元'
  }
  const intPartFormat = Number(value).toFixed(2) // 将整数部分逢三一断
  return intPartFormat + ' 元'
})

Vue.filter('WeightFormat', function(value) {
  if (!value) {
    return '0.000'
  }
  const intPartFormat = Number(value).toFixed(3) // 将整数部分逢三一断
  return intPartFormat
})

Vue.filter('moment', function(dataStr, pattern = 'YYYY-MM-DD') {
  if (!dataStr) {
    return ''
  }
  return dayjs(dataStr).format(pattern)
})

Vue.filter('TimeFormat', function(dataStr, pattern = 'YYYY.MM.DD') {
  if (!dataStr) {
    return ''
  }
  return dayjs(dataStr).format(pattern)
})

/** 字符串超长截取省略号显示 */
Vue.filter('ellipsis', function(value, vlength = 8) {
  if (!value) {
    return ''
  }
  if (value.length > vlength) {
    return value.slice(0, vlength) + '...'
  }
  return value
})
