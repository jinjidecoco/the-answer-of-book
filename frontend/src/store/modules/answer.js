/**
 * 答案模块状态管理
 */

import { defineStore } from 'pinia';
import request from '@/utils/request';

export const useAnswerStore = defineStore('answer', {
  state: () => ({
    // 当前答案
    currentAnswer: null,
    // 历史答案列表
    historyAnswers: [],
    // 加载状态
    loading: false,
    // 错误信息
    error: null
  }),

  getters: {
    // 是否有答案
    hasAnswer: (state) => !!state.currentAnswer,
    // 历史答案数量
    historyCount: (state) => state.historyAnswers.length
  },

  actions: {
    /**
     * 获取随机答案
     * @param {String} question 问题内容
     */
    async getRandomAnswer(question = '') {
      this.loading = true;
      this.error = null;

      try {
        // 实际项目中应该调用API
        // const result = await request.get('/answers/random', { question });

        // 模拟API调用
        const answers = [
          { id: 1, content: '是的' },
          { id: 2, content: '不是' },
          { id: 3, content: '也许吧' },
          { id: 4, content: '绝对不是' },
          { id: 5, content: '毫无疑问' },
          { id: 6, content: '不要犹豫' },
          { id: 7, content: '再等等看' },
          { id: 8, content: '相信你的直觉' },
          { id: 9, content: '现在不是时候' },
          { id: 10, content: '放手去做' },
          { id: 11, content: '不要犹豫' },
          { id: 12, content: '相信你的直觉' },
          { id: 13, content: '现在不是时候' }
        ];

        // 随机选择一条
        const randomIndex = Math.floor(Math.random() * answers.length);
        const result = answers[randomIndex];

        // 设置当前答案
        this.currentAnswer = {
          id: result.id,
          content: result.content,
          question,
          created_at: new Date().toISOString()
        };

        // 添加到历史记录
        if (question) {
          this.historyAnswers.unshift(this.currentAnswer);
          // 只保留最近10条记录
          if (this.historyAnswers.length > 10) {
            this.historyAnswers.pop();
          }
        }

        return this.currentAnswer;
      } catch (error) {
        this.error = error.message || '获取答案失败';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    /**
     * 清空当前答案
     */
    clearCurrentAnswer() {
      this.currentAnswer = null;
    },

    /**
     * 清空历史记录
     */
    clearHistory() {
      this.historyAnswers = [];
    }
  }
});