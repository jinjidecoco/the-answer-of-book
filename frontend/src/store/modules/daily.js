/**
 * 每日一言模块状态管理
 */

import { defineStore } from 'pinia';
import request from '@/utils/request';

export const useDailyStore = defineStore('daily', {
  state: () => ({
    // 当前每日一言
    dailyQuote: null,
    // 上次获取时间
    lastFetchTime: null,
    // 加载状态
    loading: false,
    // 错误信息
    error: null
  }),

  getters: {
    // 是否有每日一言
    hasQuote: (state) => !!state.dailyQuote,
    // 是否是今天的一言
    isTodayQuote: (state) => {
      if (!state.lastFetchTime) return false;

      const today = new Date();
      const lastFetch = new Date(state.lastFetchTime);

      return today.getDate() === lastFetch.getDate() &&
             today.getMonth() === lastFetch.getMonth() &&
             today.getFullYear() === lastFetch.getFullYear();
    }
  },

  actions: {
    /**
     * 获取每日一言
     * @param {Boolean} force 是否强制刷新
     */
    async getDailyQuote(force = false) {
      // 如果已经获取过今天的一言且不强制刷新，则直接返回
      if (this.isTodayQuote && !force) {
        return this.dailyQuote;
      }

      this.loading = true;
      this.error = null;

      try {
        // 实际项目中应该调用API
        // const result = await request.get('/daily-quotes/today');

        // 模拟API调用
        const quotes = [
          { id: 1, content: '生活中最重要的不是你所处的位置，而是你所朝的方向。', author: '奥利弗·温德尔·霍姆斯', source: '' },
          { id: 2, content: '不要等待机会，而要创造机会。', author: '林肯', source: '' },
          { id: 3, content: '人生就像骑自行车，为了保持平衡，你必须保持运动。', author: '爱因斯坦', source: '' },
          { id: 4, content: '世上只有一种英雄主义，就是在认清生活真相之后依然热爱生活。', author: '罗曼·罗兰', source: '《巨人三传》' },
          { id: 5, content: '如果你不给自己烦恼，别人也永远不可能给你烦恼。', author: '佚名', source: '' }
        ];

        // 随机选择一条
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const result = quotes[randomIndex];

        // 设置当前每日一言
        this.dailyQuote = {
          id: result.id,
          content: result.content,
          author: result.author,
          source: result.source,
          date: new Date().toISOString().split('T')[0]
        };

        // 更新获取时间
        this.lastFetchTime = new Date().toISOString();

        return this.dailyQuote;
      } catch (error) {
        this.error = error.message || '获取每日一言失败';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * 清空每日一言
     */
    clearDailyQuote() {
      this.dailyQuote = null;
      this.lastFetchTime = null;
    }
  }
});