<template>
  <view class="quick-help">
    <view class="help-steps">
      <view class="step-item" v-for="(step, index) in steps" :key="index">
        <view class="step-number">{{ index + 1 }}</view>
        <view class="step-content">
          <text class="step-text">{{ step }}</text>
        </view>
      </view>
    </view>

    <view class="totem-container">
      <image class="totem-image" src="/static/images/totem.svg" mode="aspectFit"></image>
    </view>

    <view class="help-features">
      <view class="feature-item">
        <view class="feature-icon theme-icon"></view>
        <text class="feature-text">点击右下角图标切换主题</text>
      </view>

      <view class="feature-item">
        <view class="feature-icon quote-icon"></view>
        <text class="feature-text">点击底部卡片查看每日一言</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

// 使用步骤列表
const steps = ref([
  '在心中默想一个问题',
  '点击"寻找答案"按钮',
  '长按图腾3秒钟',
  '系统将随机生成一个答案',
  '点击"再试一次"重新获取',
  '点击"分享"可以发送给好友'
]);
</script>

<style>
.quick-help {
  padding: 20rpx;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20rpx;
  display: flex;
  flex-direction: column;
  gap: 40rpx;
}

.help-steps {
  display: flex;
  flex-direction: column;
  gap: 24rpx;
}

.step-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.step-number {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 26rpx;
  font-weight: bold;
  flex-shrink: 0;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
}

.step-content {
  flex: 1;
  padding: 6rpx 0;
}

.step-text {
  font-size: 28rpx;
  color: var(--text-color);
  line-height: 1.5;
}

.totem-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10rpx 0;
  position: relative;
}

.totem-container:before {
  content: '';
  position: absolute;
  width: 160rpx;
  height: 160rpx;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(var(--primary-color-rgb), 0.1) 0%, rgba(var(--primary-color-rgb), 0) 70%);
  z-index: -1;
}

.totem-image {
  width: 120rpx;
  height: 120rpx;
  filter: drop-shadow(0 4rpx 6rpx rgba(0, 0, 0, 0.2));
}

.help-features {
  display: flex;
  flex-direction: column;
  gap: 16rpx;
  margin-top: 10rpx;
  padding-top: 20rpx;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.feature-icon {
  width: 40rpx;
  height: 40rpx;
  border-radius: 8rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
}

.theme-icon:after {
  content: '';
  width: 24rpx;
  height: 24rpx;
  border-radius: 50%;
  background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%);
}

.quote-icon:after {
  content: '"';
  color: var(--primary-color);
  font-size: 32rpx;
  font-weight: bold;
  line-height: 1;
}

.feature-text {
  font-size: 26rpx;
  color: var(--text-color);
  opacity: 0.9;
}
</style>