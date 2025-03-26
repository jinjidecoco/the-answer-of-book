<template>
  <view class="theme-switcher">
    <view class="theme-switcher-toggle" @click="toggleThemePanel">
      <view class="theme-icon" :class="currentTheme"></view>
    </view>
    <view class="theme-panel" v-if="isPanelVisible">
      <view class="theme-option"
            v-for="theme in themes"
            :key="theme.name"
            :class="{ 'active': currentTheme === theme.name }"
            @click="selectTheme(theme.name)">
        <view class="theme-color" :style="{ backgroundColor: theme.primaryColor }"></view>
        <text class="theme-name">{{ theme.label }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

// 主题列表 - 简化为只有默认和暗黑两种主题
const themes = [
  { name: 'default', label: '默认', primaryColor: '#1a2a6c' },
  { name: 'dark', label: '暗黑', primaryColor: '#121212' }
];

// 面板显示状态
const isPanelVisible = ref(false);

// 当前主题
const currentTheme = ref('default');

// 切换主题面板显示
const toggleThemePanel = () => {
  isPanelVisible.value = !isPanelVisible.value;
};

// 选择主题
const selectTheme = (themeName) => {
  currentTheme.value = themeName;
  applyTheme(themeName);
  isPanelVisible.value = false;

  // 保存主题设置到本地存储
  uni.setStorageSync('theme', themeName);
};

// 应用主题
const applyTheme = (themeName) => {
  // 获取选中的主题
  const theme = themes.find(t => t.name === themeName);
  if (!theme) return;

  // 根据主题设置状态栏样式
  uni.setNavigationBarColor({
    frontColor: themeName === 'dark' ? '#ffffff' : '#000000',
    backgroundColor: themeName === 'dark' ? '#121212' : theme.primaryColor
  });

  // 获取系统主题
  uni.getSystemInfo({
    success: (res) => {
      const systemTheme = res.theme || themeName;
      uni.setStorageSync('theme', systemTheme);
    }
  })
};

// 组件挂载时初始化主题
onMounted(() => {
  // 从本地存储获取主题设置
  const savedTheme = uni.getStorageSync('theme');
  if (savedTheme) {
    currentTheme.value = savedTheme;
    applyTheme(savedTheme);
  }
});
</script>

<style>
.theme-switcher {
  position: fixed;
  right: 30rpx;
  bottom: 120rpx;
  z-index: 99;
}

.theme-switcher-toggle {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.theme-icon {
  width: 40rpx;
  height: 40rpx;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}

.theme-icon.default {
  background: linear-gradient(135deg, #1a2a6c 0%, #b21f1f 50%, #fdbb2d 100%);
}

.theme-icon.dark {
  background: #121212;
  border: 2rpx solid #444;
}

/* 只保留默认和暗黑主题图标 */

.theme-panel {
  position: absolute;
  bottom: 100rpx;
  right: 0;
  width: 240rpx;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 16rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.15);
  padding: 20rpx;
  transform-origin: bottom right;
  animation: scaleIn 0.2s ease-out;
}

@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.theme-option {
  display: flex;
  align-items: center;
  padding: 16rpx;
  border-radius: 8rpx;
  margin-bottom: 10rpx;
  cursor: pointer;
}

.theme-option:last-child {
  margin-bottom: 0;
}

.theme-option.active {
  background: rgba(0, 0, 0, 0.05);
}

.theme-color {
  width: 30rpx;
  height: 30rpx;
  border-radius: 50%;
  margin-right: 16rpx;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.theme-name {
  font-size: 28rpx;
  color: #333;
}
</style>