<template>
  <view class="quick-help">
    <view class="help-section">
      <text class="help-title">如何使用答案之书</text>
      <view class="help-item">
        <text class="help-step">1. </text>
        <text class="help-text">打开小程序，在心中默想一个问题</text>
      </view>
      <view class="help-item">
        <text class="help-step">2. </text>
        <text class="help-text">长按图腾3秒钟，等待图腾旋转</text>
      </view>
      <view class="help-item">
        <text class="help-step">3. </text>
        <text class="help-text">系统将随机生成一个答案</text>
      </view>
      <view class="help-item">
        <text class="help-step">4. </text>
        <text class="help-text">点击"再试一次"可以重新获取答案</text>
      </view>
      <view class="help-item">
        <text class="help-step">5. </text>
        <text class="help-text">点击"分享"可以将答案分享给好友</text>
      </view>
    </view>
    
    <view class="help-section">
      <text class="help-title">主题切换</text>
      <text class="help-text">点击右下角的主题按钮，可以切换不同的主题风格。</text>
    </view>
    
    <view class="help-section">
      <text class="help-title">每日一言</text>
      <text class="help-text">点击首页底部的每日一言，可以查看今日推荐的哲理语录。</text>
    </view>
  </view>
</template>

<script setup>
// 帮助组件，无需额外逻辑
</script>

<style>
.quick-help {
  padding: 20rpx 0;
}

.help-section {
  margin-bottom: 30rpx;
}

.help-title {
  font-size: var(--font-size-medium);
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 20rpx;
  display: block;
}

.help-item {
  display: flex;
  margin-bottom: 15rpx;
}

.help-step {
  font-weight: bold;
  margin-right: 10rpx;
  color: var(--accent-color);
}

.help-text {
  font-size: var(--font-size-normal);
  color: var(--text-color);
  line-height: 1.5;
}
</style>