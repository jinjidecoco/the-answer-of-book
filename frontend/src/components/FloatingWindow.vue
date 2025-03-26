<template>
  <view class="floating-window" :class="{ 'show': isVisible }" :style="positionStyle">
    <view class="floating-window-header">
      <text class="floating-window-title">{{ title }}</text>
      <view class="floating-window-close" @click="close">×</view>
    </view>
    <view class="floating-window-content">
      <slot></slot>
    </view>
  </view>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';

// 定义属性
const props = defineProps({
  title: {
    type: String,
    default: '提示'
  },
  visible: {
    type: Boolean,
    default: false
  },
  position: {
    type: Object,
    default: () => ({ top: '50%', left: '50%' })
  }
});

// 定义事件
const emit = defineEmits(['update:visible', 'close']);

// 控制窗口显示状态
const isVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val)
});

// 计算位置样式
const positionStyle = computed(() => {
  return {
    top: props.position.top || '50%',
    left: props.position.left || '50%',
    transform: 'translate(-50%, -50%)'
  };
});

// 关闭窗口
const close = () => {
  isVisible.value = false;
  emit('close');
};
</script>

<style>
.floating-window {
  position: fixed;
  z-index: 999;
  min-width: 300rpx;
  max-width: 600rpx;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.8);
  transition: all 0.3s ease;
  pointer-events: none;
}

.floating-window.show {
  opacity: 1;
  transform: translate(-50%, -50%) scale(1);
  pointer-events: auto;
}

.floating-window-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.floating-window-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #333;
}

.floating-window-close {
  font-size: 40rpx;
  color: #999;
  cursor: pointer;
  height: 40rpx;
  width: 40rpx;
  line-height: 36rpx;
  text-align: center;
}

.floating-window-content {
  padding: 30rpx;
  max-height: 60vh;
  overflow-y: auto;
}
</style>