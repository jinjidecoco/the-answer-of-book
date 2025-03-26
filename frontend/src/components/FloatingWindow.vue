<template>
  <view class="floating-window-overlay" :class="{ 'show': isVisible }" @click.stop="closeOnOverlay">
    <view class="floating-window" :class="{ 'show': isVisible }" :style="positionStyle" @click.stop>
      <view class="floating-window-header">
        <text class="floating-window-title">{{ title }}</text>
        <view class="floating-window-close" @click="close">
          <text class="close-icon">×</text>
        </view>
      </view>
      <view class="floating-window-content">
        <slot></slot>
      </view>
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
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true
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

// 点击背景关闭窗口
const closeOnOverlay = (e) => {
  if (props.closeOnBackdrop) {
    close();
  }
};

// 关闭窗口
const close = () => {
  isVisible.value = false;
  emit('close');
};
</script>

<style>
.floating-window-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 998;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.floating-window-overlay.show {
  opacity: 1;
  pointer-events: auto;
}

.floating-window {
  position: fixed;
  z-index: 999;
  width: 85%;
  max-width: 650rpx;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24rpx;
  box-shadow: 0 20rpx 40rpx rgba(0, 0, 0, 0.2);
  overflow: hidden;
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.85);
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
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
  padding: 28rpx 30rpx;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
}

.floating-window-title {
  font-size: 32rpx;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.floating-window-close {
  width: 44rpx;
  height: 44rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.2s ease;
}

.floating-window-close:active {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(0.95);
}

.close-icon {
  color: #fff;
  font-size: 36rpx;
  line-height: 1;
  font-weight: 300;
}

.floating-window-content {
  padding: 30rpx;
  max-height: 65vh;
  overflow-y: auto;
}
</style>