/**
 * 网络请求工具函数
 * 封装uni.request方法，统一处理请求和响应
 */

// API基础URL
const BASE_URL = 'https://api.answerbook.example.com/v1';

// 请求超时时间
const TIMEOUT = 10000;

// 请求方法
const HTTP_METHOD = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

// 获取存储的token
const getToken = () => {
  return uni.getStorageSync('token') || '';
};

/**
 * 请求拦截器
 * @param {Object} config 请求配置
 * @returns {Object} 处理后的请求配置
 */
const requestInterceptor = (config) => {
  // 添加token认证
  const token = getToken();
  if (token) {
    config.header = {
      ...config.header,
      'Authorization': `Bearer ${token}`
    };
  }

  // 添加内容类型
  if (config.method === HTTP_METHOD.POST || config.method === HTTP_METHOD.PUT) {
    config.header = {
      ...config.header,
      'Content-Type': 'application/json'
    };
  }

  return config;
};

/**
 * 响应拦截器
 * @param {Object} response 响应数据
 * @returns {Object|Promise} 处理后的响应数据或错误
 */
const responseInterceptor = (response) => {
  // 请求成功
  if (response.statusCode >= 200 && response.statusCode < 300) {
    // 业务状态判断
    if (response.data.code === 0) {
      return response.data.data;
    } else {
      // 业务错误
      const error = new Error(response.data.message || '请求失败');
      error.code = response.data.code;
      return Promise.reject(error);
    }
  } else {
    // HTTP错误
    const error = new Error(response.data.message || '网络请求失败');
    error.statusCode = response.statusCode;
    return Promise.reject(error);
  }
};

/**
 * 统一请求方法
 * @param {Object} options 请求配置
 * @returns {Promise} 请求Promise
 */
const request = (options) => {
  // 合并默认配置
  const config = {
    url: `${BASE_URL}${options.url}`,
    method: options.method || HTTP_METHOD.GET,
    data: options.data,
    header: options.header || {},
    timeout: TIMEOUT,
    ...options
  };

  // 请求拦截
  const interceptedConfig = requestInterceptor(config);

  // 发起请求
  return new Promise((resolve, reject) => {
    uni.request({
      ...interceptedConfig,
      success: (res) => {
        try {
          const result = responseInterceptor(res);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      },
      fail: (err) => {
        const error = new Error(err.errMsg || '网络请求失败');
        reject(error);
      }
    });
  });
};

/**
 * GET请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 * @returns {Promise} 请求Promise
 */
const get = (url, data = {}, options = {}) => {
  return request({
    url,
    method: HTTP_METHOD.GET,
    data,
    ...options
  });
};

/**
 * POST请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 * @returns {Promise} 请求Promise
 */
const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: HTTP_METHOD.POST,
    data,
    ...options
  });
};

/**
 * PUT请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 * @returns {Promise} 请求Promise
 */
const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: HTTP_METHOD.PUT,
    data,
    ...options
  });
};

/**
 * DELETE请求
 * @param {String} url 请求地址
 * @param {Object} data 请求参数
 * @param {Object} options 其他配置
 * @returns {Promise} 请求Promise
 */
const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: HTTP_METHOD.DELETE,
    data,
    ...options
  });
};

export default {
  get,
  post,
  put,
  del
};