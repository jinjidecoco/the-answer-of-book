<template>
  <view class="daily-container">
    <view class="quote-card">
      <view class="quote-content">
        <text class="quote-text">{{ quote.content }}</text>
        <text class="quote-author" v-if="quote.author">—— {{ quote.author }}</text>
        <text class="quote-source" v-if="quote.source">{{ quote.source }}</text>
      </view>
      <view class="quote-date">
        <text class="date-text">{{ formattedDate }}</text>
      </view>
    </view>
    <view class="action-buttons">
      <button class="action-button refresh" @click="refreshQuote">换一条</button>
      <button class="action-button share" @click="shareQuote">分享</button>
    </view>
    <view class="back-button" @click="goBack">
      <text class="back-text">返回首页</text>
    </view>

    <!-- 错误提示 -->
    <view class="error-toast" v-if="showError">
      <text class="error-text">{{ errorMessage }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import request from '@/utils/request';

// 状态变量
const quote = ref({
  id: null,
  content: '',
  author: '',
  source: '',
  date: ''
});
const isLoading = ref(false);
const showError = ref(false);
const errorMessage = ref('');

// 格式化日期
const formattedDate = computed(() => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}年${month}月${day}日`;
});

// 显示错误信息
const showErrorMessage = (message) => {
  errorMessage.value = message;
  showError.value = true;
  setTimeout(() => {
    showError.value = false;
  }, 3000);
};

// 获取每日一言
const fetchDailyQuote = async () => {
  isLoading.value = true;

  try {
    // 尝试从后端获取数据
    const result = await request.get('/quotes/daily');
    if (result) {
      quote.value = result;
    } else {
      throw new Error('未获取到数据');
    }
  } catch (error) {
    console.error('获取每日一言失败:', error);

    // 后端接口失败时使用本地数据
    const quotes = [
      { id: 1, content: '生活中最重要的不是你所处的位置，而是你所朝的方向。', author: '奥利弗·温德尔·霍姆斯', source: '' },
      { id: 2, content: '不要等待机会，而要创造机会。', author: '林肯', source: '' },
      { id: 3, content: '人生就像骑自行车，为了保持平衡，你必须保持运动。', author: '爱因斯坦', source: '' },
      { id: 4, content: '世上只有一种英雄主义，就是在认清生活真相之后依然热爱生活。', author: '罗曼·罗兰', source: '《巨人三传》' },
      { id: 5, content: '如果你不给自己烦恼，别人也永远不可能给你烦恼。', author: '佚名', source: '' },
      { id: 6, content: '成功不是最终的，失败也不是最糟糕的，关键是你是否还在努力。', author: '约翰·肯尼迪', source: '' },
      { id: 8, content: '生命就像一把刀，用它来切割一切。', author: '佚名', source: '' },
      { id: 9, content: '生命的意义在于体验，而不是等待结果。', author: '约翰·冯·诺依曼', source: '' },
      { id: 10, content: '生命的意义在于享受，而不是等待。', author: '佚名', source: '' },
      { id: 11, content: '生命就像一把刀，用它来切割一切。', author: '佚名', source: '' },
    ];

    // 随机选择一条
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quote.value = quotes[randomIndex];
  } finally {
    isLoading.value = false;
  }
};

// 刷新一言
const refreshQuote = () => {
  if (isLoading.value) return; // 防止重复点击
  fetchDailyQuote();
};

// 分享一言
const shareQuote = () => {
  if (isLoading.value) return; // 防止在加载状态下分享

  try {
    // 显示分享菜单
    uni.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  } catch (error) {
    console.error('分享功能调用失败:', error);
    showErrorMessage('分享功能调用失败，请重试');
  }
};

// 返回首页
const goBack = () => {
  uni.navigateBack({
    fail: () => {
      // 如果无法返回上一页（例如直接打开此页），则重定向到首页
      uni.redirectTo({
        url: '/pages/index/index'
      });
    }
  });
};

// 定义页面分享行为
defineExpose({
  onShareAppMessage() {
    return {
      title: `今日一言：${quote.value.content}`,
      path: `/pages/daily/index`,
      imageUrl: '/static/images/daily-share.png', // 分享图片
      success: function() {
        uni.showToast({
          title: '分享成功',
          icon: 'success'
        });
      },
      fail: function() {
        showErrorMessage('分享失败，请重试');
      }
    };
  },
  onShareTimeline() {
    return {
      title: `今日一言：${quote.value.content}`,
      query: '',
      imageUrl: '/static/images/daily-share.png'
    };
  }
});

// 页面加载
onMounted(() => {
  fetchDailyQuote();
});
</script>

<style>
.daily-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #4a69bd, #6a89cc, #7f9cf5);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  padding: 30rpx;
  position: relative;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.quote-card {
  width: 85%;
  padding: 40rpx;
  border-radius: 20rpx;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin-bottom: 40rpx;
  min-height: 300rpx;
  transition: all 0.3s ease;
}

.quote-card.loading {
  background: rgba(255, 255, 255, 0.1);
}

.quote-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30rpx;
  min-height: 200rpx;
  justify-content: center;
}

.quote-text {
  font-size: 36rpx;
  color: white;
  line-height: 1.6;
  text-align: center;
  margin-bottom: 30rpx;
  font-weight: 500;
}

.quote-author {
  font-size: 28rpx;
  color: rgba(255, 255, 255, 0.8);
  text-align: right;
  align-self: flex-end;
}

.quote-source {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.6);
  text-align: right;
  align-self: flex-end;
  margin-top: 10rpx;
}

.quote-date {
  align-self: center;
  margin-top: 20rpx;
  padding: 10rpx 30rpx;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 30rpx;
}

.date-text {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 30rpx;
  margin-top: 40rpx;
  width: 85%;
}

.action-button {
  flex: 1;
  padding: 20rpx 0;
  border-radius: 50rpx;
  font-size: 28rpx;
  border: none;
  color: white;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(5px);
  box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  max-width: 200rpx;
}

.action-button:active {
  transform: scale(0.95);
  box-shadow: 0 2rpx 5rpx rgba(0, 0, 0, 0.2);
}

.action-button[disabled] {
  opacity: 0.5;
  transform: none;
}

.refresh {
  background: linear-gradient(45deg, #3498db, #2980b9);
}

.share {
  background: linear-gradient(45deg, #f39c12, #e67e22);
}

.back-button {
  margin-top: 60rpx;
  padding: 15rpx 40rpx;
  border-radius: 40rpx;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
}

.back-text {
  font-size: 28rpx;
  color: white;
}

.error-toast {
  position: fixed;
  top: 80rpx;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  padding: 20rpx 40rpx;
  border-radius: 10rpx;
  z-index: 999;
  animation: fadeIn 0.3s ease;
}

.error-text {
  color: #fff;
  font-size: 28rpx;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translate(-50%, -20rpx); }
  to { opacity: 1; transform: translate(-50%, 0); }
}
</style>