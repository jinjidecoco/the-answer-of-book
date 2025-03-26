/**
 * 认证相关工具函数
 * 处理用户登录和token管理
 */

import request from './request';

// Token存储键名
const TOKEN_KEY = 'token';
// Token过期时间存储键名
const TOKEN_EXPIRES_KEY = 'token_expires';

/**
 * 保存token信息
 * @param {String} token 用户token
 * @param {Number} expiresIn 过期时间(秒)
 */
const saveToken = (token, expiresIn) => {
  // 保存token
  uni.setStorageSync(TOKEN_KEY, token);

  // 计算过期时间戳
  const expiresTime = Date.now() + expiresIn * 1000;
  uni.setStorageSync(TOKEN_EXPIRES_KEY, expiresTime);
};

/**
 * 获取token
 * @returns {String} 用户token
 */
const getToken = () => {
  return uni.getStorageSync(TOKEN_KEY) || '';
};

/**
 * 清除token
 */
const removeToken = () => {
  uni.removeStorageSync(TOKEN_KEY);
  uni.removeStorageSync(TOKEN_EXPIRES_KEY);
};

/**
 * 检查token是否有效
 * @returns {Boolean} token是否有效
 */
const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;

  const expiresTime = uni.getStorageSync(TOKEN_EXPIRES_KEY);
  if (!expiresTime) return false;

  // 判断是否过期（预留30秒缓冲时间）
  return Date.now() < expiresTime - 30000;
};

/**
 * 微信登录
 * @returns {Promise} 登录结果Promise
 */
const wxLogin = () => {
  return new Promise((resolve, reject) => {
    // 获取微信登录凭证
    uni.login({
      provider: 'weixin',
      success: (loginRes) => {
        if (loginRes.code) {
          // 发送code到后端换取token
          request.post('/auth/login', {
            code: loginRes.code
          }).then(res => {
            // 保存token信息
            saveToken(res.token, res.expires_in);
            resolve(res);
          }).catch(err => {
            reject(err);
          });
        } else {
          reject(new Error('微信登录失败'));
        }
      },
      fail: (err) => {
        reject(new Error(err.errMsg || '微信登录失败'));
      }
    });
  });
};

/**
 * 检查登录状态，如果未登录或token过期则自动登录
 * @returns {Promise} 登录状态Promise
 */
const checkLogin = () => {
  return new Promise((resolve, reject) => {
    if (isTokenValid()) {
      // token有效，直接返回成功
      resolve(true);
    } else {
      // token无效，尝试重新登录
      wxLogin().then(() => {
        resolve(true);
      }).catch(err => {
        reject(err);
      });
    }
  });
};

/**
 * 退出登录
 */
const logout = () => {
  removeToken();
};

export default {
  wxLogin,
  checkLogin,
  logout,
  getToken,
  isTokenValid
};