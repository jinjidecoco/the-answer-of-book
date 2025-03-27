"use strict";
const common_vendor = require("../common/vendor.js");
const BASE_URL = "http://localhost:8088/api";
const TIMEOUT = 1e4;
const HTTP_METHOD = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE"
};
const getToken = () => {
  return common_vendor.index.getStorageSync("token") || "";
};
const requestInterceptor = (config) => {
  const token = getToken();
  if (token) {
    config.header = {
      ...config.header,
      "Authorization": `Bearer ${token}`
    };
  }
  if (config.method === HTTP_METHOD.POST || config.method === HTTP_METHOD.PUT) {
    config.header = {
      ...config.header,
      "Content-Type": "application/json"
    };
  }
  return config;
};
const responseInterceptor = (response) => {
  if (response.statusCode >= 200 && response.statusCode < 300) {
    if (response.data.code === 0) {
      return response.data.data;
    } else {
      const error = new Error(response.data.message || "请求失败");
      error.code = response.data.code;
      return Promise.reject(error);
    }
  } else {
    const error = new Error(response.data.message || "网络请求失败");
    error.statusCode = response.statusCode;
    return Promise.reject(error);
  }
};
const request = (options) => {
  const config = {
    url: `${BASE_URL}${options.url}`,
    method: options.method || HTTP_METHOD.GET,
    data: options.data,
    header: options.header || {},
    timeout: TIMEOUT,
    ...options
  };
  const interceptedConfig = requestInterceptor(config);
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
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
        const error = new Error(err.errMsg || "网络请求失败");
        reject(error);
      }
    });
  });
};
const get = (url, data = {}, options = {}) => {
  return request({
    url,
    method: HTTP_METHOD.GET,
    data,
    ...options
  });
};
const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: HTTP_METHOD.POST,
    data,
    ...options
  });
};
const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: HTTP_METHOD.PUT,
    data,
    ...options
  });
};
const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: HTTP_METHOD.DELETE,
    data,
    ...options
  });
};
const request$1 = {
  get,
  post,
  put,
  del
};
exports.request = request$1;
