<template>
  <view class="index-container">
    <view class="book-container" @touchstart="handleTouchStart" @touchend="handleTouchEnd">
      <view class="book" :class="{ 'book-open': isBookOpen }">
        <view class="book-cover">
          <text class="book-title">答案之书</text>
          <text class="book-subtitle">The Book of Answers</text>
        </view>
        <view class="book-page">
          <text class="page-hint">长按图腾寻找答案</text>
          <view class="totem" :class="{ 'totem-active': isTotemActive }" @longpress="activateTotem">
            <image class="totem-image" src="/static/images/totem.png" mode="aspectFit"></image>
          </view>
        </view>
      </view>
    </view>
    <view class="daily-quote" @click="navigateToDaily">
      <text class="daily-quote-text">{{ dailyQuote.content }}</text>
      <text class="daily-quote-author" v-if="dailyQuote.author">—— {{ dailyQuote.author }}</text>
    </view>
    
    <!-- 帮助按钮 -->
    <view class="help-button" @click="showHelp">
      <text class="help-icon">?</text>
    </view>
    
    <!-- 主题切换组件 -->
    <ThemeSwitcher />
    
    <!-- 帮助悬浮窗 -->
    <FloatingWindow 
      title="使用帮助" 
      :visible="isHelpVisible" 
      @update:visible="isHelpVisible = $event"
      @close="isHelpVisible = false">
      <QuickHelp />
    </FloatingWindow>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onShow } from '@dcloudio/uni-app';

// 导入组件
import ThemeSwitcher from '@/components/ThemeSwitcher.vue';
import FloatingWindow from '@/components/FloatingWindow.vue';
import QuickHelp from '@/components/QuickHelp.vue';

// 状态变量
const isBookOpen = ref(false);
const isTotemActive = ref(false);
const isHelpVisible = ref(false);
const dailyQuote = ref({
  content: '加载中...',
  author: ''
});

// 长按计时器
let pressTimer = null;
const pressTime = 3000; // 3秒长按时间

// 打开书本
const openBook = () => {
  isBookOpen.value = true;
};

// 长按图腾
const activateTotem = () => {
  isTotemActive.value = true;
  setTimeout(() => {
    // 跳转到答案页
    uni.navigateTo({
      url: '/pages/answer/index'
    });
    // 重置状态
    setTimeout(() => {
      isTotemActive.value = false;
    }, 500);
  }, pressTime);
};

// 触摸开始
const handleTouchStart = () => {
  if (!isBookOpen.value) {
    pressTimer = setTimeout(() => {
      openBook();
    }, 500);
  }
};

// 触摸结束
const handleTouchEnd = () => {
  if (pressTimer) {
    clearTimeout(pressTimer);
    pressTimer = null;
  }
};

// 跳转到每日一言页面
const navigateToDaily = () => {
  uni.navigateTo({
    url: '/pages/daily/index'
  });
};

// 显示帮助悬浮窗
const showHelp = () => {
  isHelpVisible.value = true;
};

// 获取每日一言
const fetchDailyQuote = () => {
  // 实际项目中应该调用API
  // 这里使用模拟数据
  const quotes = [
    { content: '生活中最重要的不是你所处的位置，而是你所朝的方向。', author: '奥利弗·温德尔·霍姆斯' },
    { content: '不要等待机会，而要创造机会。', author: '林肯' },
    { content: '人生就像骑自行车，为了保持平衡，你必须保持运动。', author: '爱因斯坦' },
    { content: '世上只有一种英雄主义，就是在认清生活真相之后依然热爱生活。', author: '罗曼·罗兰' },
    { content: '如果你不给自己烦恼，别人也永远不可能给你烦恼。', author: '佚名' }
  ];

  // 随机选择一条
  const randomIndex = Math.floor(Math.random() * quotes.length);
  dailyQuote.value = quotes[randomIndex];

  // TODO: 实际项目中应该调用API
  // uni.request({
  //   url: 'https://api.example.com/daily-quotes/today',
  //   method: 'GET',
  //   success: (res) => {
  //     if (res.data.code === 0) {
  //       dailyQuote.value = res.data.data;
  //     }
  //   }
  // });
};

// 页面加载
onMounted(() => {
  // 延迟一点时间自动打开书本，增强体验
  setTimeout(() => {
    openBook();
  }, 1000);

  // 获取每日一言
  fetchDailyQuote();
});

// 每次显示页面时
onShow(() => {
  // 重置图腾状态
  isTotemActive.value = false;
});
</script>

<style>
.index-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color), var(--accent-color));
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  padding: 30rpx;
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.book-container {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  perspective: 1500px;
}

.book {
  width: 80%;
  height: 80%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(10deg);
  transition: transform 1s ease;
}

.book-open {
  transform: rotateX(10deg) rotateY(-180deg);
}

.book-cover, .book-page {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 15rpx 30rpx rgba(0, 0, 0, 0.3);
}

/* 帮助按钮 */
.help-button {
  position: fixed;
  left: 30rpx;
  bottom: 120rpx;
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.help-icon {
  font-size: 40rpx;
  font-weight: bold;
  color: var(--primary-color);
}

.book-cover {
  background: linear-gradient(45deg, #2c3e50, #4a69bd);
  color: white;
  padding: 40rpx;
  box-sizing: border-box;
}

.book-title {
  font-size: 60rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
  text-shadow: 2rpx 2rpx 4rpx rgba(0, 0, 0, 0.5);
}

.book-subtitle {
  font-size: 32rpx;
  opacity: 0.8;
}

.book-page {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  transform: rotateY(180deg);
  padding: 40rpx;
  box-sizing: border-box;
}

.page-hint {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 40rpx;
}

.totem {
  width: 200rpx;
  height: 200rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.totem-active {
  transform: rotate(360deg) scale(1.2);
  box-shadow: 0 0 30rpx rgba(255, 215, 0, 0.8);
}

.totem-image {
  width: 150rpx;
  height: 150rpx;
}

.daily-quote {
  margin-top: 40rpx;
  padding: 30rpx;
  width: 80%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20rpx;
  box-shadow: 0 8rpx 16rpx rgba(0, 0, 0, 0.1);
}

.daily-quote-text {
  font-size: 28rpx;
  color: white;
  line-height: 1.5;
  text-align: center;
}

.daily-quote-author {
  font-size: 24rpx;
  color: rgba(255, 255, 255, 0.8);
  text-align: right;
  margin-top: 20rpx;
}
</style>