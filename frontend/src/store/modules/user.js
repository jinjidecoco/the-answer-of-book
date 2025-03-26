/**
 * 用户模块状态管理
 */

import { defineStore } from 'pinia';
import auth from '@/utils/auth';
import request from '@/utils/request';

export const useUserStore = defineStore('user', {
  state: () => ({
    // 用户信息
    userInfo: null,
    // 是否已登录
    isLoggedIn: false,
    // 加载状态
    loading: false,
    // 错误信息
    error: null
  }),

  getters: {
    // 是否有用户信息
    hasUserInfo: (state) => !!state.userInfo,
    // 用户昵称
    nickname: (state) => state.userInfo?.nickname || '游客'
  },

  actions: {
    /**
     * 登录
     */
    async login() {
      this.loading = true;
      this.error = null;

      try {
        // 调用微信登录
        await auth.wxLogin();

        // 获取用户信息
        await this.getUserInfo();

        this.isLoggedIn = true;
        return true;
      } catch (error) {
        this.error = error.message || '登录失败';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * 获取用户信息
     */
    async getUserInfo() {
      this.loading = true;
      this.error = null;

      try {
        // 实际项目中应该调用API
        // const result = await request.get('/user/info');

        // 模拟API调用
        const result = {
          id: 1,
          nickname: '用户' + Math.floor(Math.random() * 1000),
          avatar_url: '',
          gender: 0
        };

        this.userInfo = result;
        return result;
      } catch (error) {
        this.error = error.message || '获取用户信息失败';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * 退出登录
     */
    logout() {
      // 清除token
      auth.logout();

      // 清除用户信息
      this.userInfo = null;
      this.isLoggedIn = false;
    },

    /**
     * 检查登录状态
     */
    async checkLoginStatus() {
      try {
        // 检查token是否有效
        if (auth.isTokenValid()) {
          // 获取用户信息
          await this.getUserInfo();
          this.isLoggedIn = true;
          return true;
        } else {
          this.isLoggedIn = false;
          return false;
        }
      } catch (error) {
        this.isLoggedIn = false;
        return false;
      }
    }
  }
});