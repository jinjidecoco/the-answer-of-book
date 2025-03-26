<template>
  <view class="answer-container">
    <view class="book-container">
      <view class="book-page" :class="{ 'page-flipped': isPageFlipped }">
        <view class="page-front">
          <text class="page-hint">正在寻找答案...</text>
          <view class="loading-animation">
            <view class="spinner"></view>
          </view>
        </view>
        <view class="page-back">
          <view class="answer-content">
            <text class="answer-text">{{ answer.content }}</text>
            <view class="answer-actions">
              <button class="action-button try-again" @click="tryAgain">再试一次</button>
              <button class="action-button share" @click="shareAnswer">分享</button>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

// 状态变量
const isPageFlipped = ref(false);
const answer = ref({
  id: null,
  content: '',
  created_at: ''
});

// 问题参数
let question = '';

// 页面加载
onLoad((options) => {
  // 获取传递的问题参数
  if (options.question) {
    question = decodeURIComponent(options.question);
  }

  // 获取随机答案
  fetchRandomAnswer();
});

// 获取随机答案
const fetchRandomAnswer = () => {
  // 重置翻页状态
  isPageFlipped.value = false;

  // 实际项目中应该调用API
  // 这里使用模拟数据
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
    { id: 10, content: '放手去做' }
  ];

  // 随机选择一条
  const randomIndex = Math.floor(Math.random() * answers.length);

  // 模拟加载延迟
  setTimeout(() => {
    answer.value = answers[randomIndex];
    // 翻页动画
    setTimeout(() => {
      isPageFlipped.value = true;
    }, 500);
  }, 2000);

  // TODO: 实际项目中应该调用API
  // uni.request({
  //   url: 'https://api.example.com/answers/random',
  //   method: 'GET',
  //   data: {
  //     question: question
  //   },
  //   success: (res) => {
  //     if (res.data.code === 0) {
  //       answer.value = res.data.data;
  //       // 翻页动画
  //       setTimeout(() => {
  //         isPageFlipped.value = true;
  //       }, 500);
  //     }
  //   }
  // });
};

// 再试一次
const tryAgain = () => {
  // 重置翻页状态
  isPageFlipped.value = false;
  // 获取新答案
  fetchRandomAnswer();
};

// 分享答案
const shareAnswer = () => {
  // 显示分享菜单
  uni.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  });

  // 生成分享海报（实际项目中可以调用绘图API生成海报）
  uni.showToast({
    title: '已生成分享海报',
    icon: 'success',
    duration: 2000
  });
};

// 定义分享内容
onShareAppMessage(() => {
  return {
    title: `答案之书告诉我：${answer.value.content}`,
    path: `/pages/index/index`,
    imageUrl: '/static/images/share-image.png', // 分享图片
    success: function() {
      uni.showToast({
        title: '分享成功',
        icon: 'success'
      });
    }
  };
});

// 定义分享到朋友圈
uni.onShareTimeline(() => {
  return {
    title: `答案之书告诉我：${answer.value.content}`,
    query: '',
    imageUrl: '/static/images/share-image.png'
  };
});
</script>

<style>
.answer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
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

.book-page {
  width: 80%;
  height: 80%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1.5s ease;
}

.page-flipped {
  transform: rotateY(-180deg);
}

.page-front, .page-back {
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
  padding: 40rpx;
  box-sizing: border-box;
}

.page-front {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
}

.page-back {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  transform: rotateY(180deg);
}

.page-hint {
  font-size: 32rpx;
  color: #333;
  margin-bottom: 40rpx;
}

.loading-animation {
  width: 100rpx;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  width: 80rpx;
  height: 80rpx;
  border: 8rpx solid rgba(0, 0, 0, 0.1);
  border-top-color: #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.answer-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.answer-text {
  font-size: 48rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 60rpx;
}

.answer-actions {
  display: flex;
  justify-content: center;
  gap: 30rpx;
  margin-top: 40rpx;
}

.action-button {
  padding: 20rpx 40rpx;
  border-radius: 50rpx;
  font-size: 28rpx;
  border: none;
  color: white;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
  box-shadow: 0 5rpx 15rpx rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.action-button:active {
  transform: scale(0.95);
  box-shadow: 0 2rpx 5rpx rgba(0, 0, 0, 0.2);
}

.try-again {
  background: linear-gradient(45deg, #3498db, #2980b9);
}

.share {
  background: linear-gradient(45deg, #f39c12, #e67e22);
}
</style>