import request from '@/utils/request'

// fofa相关

// 获取查询结果
export function getQuery(params) {
  return request({ url: '/information/fofa/query', method: 'get' ,data: params})
}


// 修改配置信息
export function saveConfig(params) {
  return request({ url: '/information/fofa/config', method: 'post', data: params })
}

//查看查询历史
export function getQueryHistory(params) {
  return request({ url: '/information/fofa/history', method: 'get', data: params })
}

// 导出查询结果
export function doExport(params) {
    return request({ url: '/information/fofa/export', method: 'get', data: params })
  }
