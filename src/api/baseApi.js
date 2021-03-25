import axios from 'axios'
// axios.defaults.crossDomain = false;
// axios.defaults.withCredentials = false; // 设置crose， 访问权限，允许携带cookie
// post 新增  get 拉取  put  delete 删除 patch 更新
// 添加有ajax请求就显示模态框
export const downloadFn = (url, params,showLoading) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    responseType: 'blob',
    headers: {
      'content-type': 'application/json',
    },
    showLoading
  });
}
export const postRequest = (url, params,showLoading) => {
  console.log("data:",params)
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    /*transformRequest: [function (data) {
      return data
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],*/
    /*transformRequest: [function (data, headers) {
      // Do whatever you want to transform the data
      delete headers.common['Content-Lenth']
      return data;
    }],*/
    headers: {
      // 'content-type': 'app/json',
      'content-type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    showLoading
  });
}
export const patchRequest = (url, params,showLoading) => {
  return axios({
    method: 'patch',
    url: `${url}`,
    data: params,
    // transformRequest: [function (data) {
    //   let ret = ''
    //   for (let it in data) {
    //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
    //   }
    //   return ret
    // }],
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading
  });
}
export const uploadFileRequest = (url, params,showLoading) => {
  return axios({
    method: 'post',
    url: `${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    showLoading
  });
}
export const putRequest = (url, params,showLoading) => {
  return axios({
    method: 'put',
    url: `${url}`,
    data: params,
    /*transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],*/
    headers: {
      'Content-Type': 'application/json'
    },
    showLoading
  });
}
// 将参数放入url中的put方法
export const putRequestData = (url, params,showLoading) => {
  return axios({
    method: 'put',
    url: `${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
    params,
    showLoading
  });
}
export const deleteRequest = (url, params, showLoading) => {
  return axios({
    method: 'delete',
    url: `${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
    params,
    showLoading
  });
}

export const deleteRequestData = (url, params, showLoading) => {
  return axios({
    method: 'delete',
    url: `${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: params,
    showLoading
  });
}

export const getRequest = (url, params, showLoading) => {
  // console.log('url',url)
  // console.log('params',params)
  return axios({
    method: 'get',
    timeout: 10000,
    url: `${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
    params,
    showLoading
  });
}

export const getRequestData = (url, params, showLoading) => {

  return axios({
    method: 'get',
    url: `${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data: params,
    showLoading
  });
}

// post 新增  get 拉取  put  delete 删除 patch 更新

export const getFn = (url, data, showLoading = true) => getRequest(url, data, showLoading)
export const getDataFn = (url, data, showLoading = true) => getRequestData(url, data, showLoading)
export const deleteFn = (url, data, showLoading = true) => deleteRequest(url, data, showLoading)
export const deleteDataFn = (url, data, showLoading = true) => deleteRequestData(url, data, showLoading)
export const postFn = (url, data, showLoading = true) => postRequest(url, data, showLoading)
export const putFn = (url, data, showLoading = true) => putRequest(url, data, showLoading)
export const putDataFn = (url, data, showLoading = true) => putRequestData(url, data, showLoading)
export const patchFn = (url, data, showLoading = true) => patchRequest(url, data, showLoading)
