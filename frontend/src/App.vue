<script setup>
// App.vue作为应用入口
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';

// 应用生命周期
onLaunch(() => {
  console.log('App Launch');
  // 初始化主题
  initTheme();
});

onShow(() => {
  console.log('App Show');
});

onHide(() => {
  console.log('App Hide');
});

// 初始化主题
const initTheme = () => {
  // 从本地存储获取主题设置
  const savedTheme = uni.getStorageSync('theme') || 'default';
  // 设置文档主题属性
  document.documentElement.setAttribute('data-theme', savedTheme);
};
</script>

<style>
/* 导入主题样式 */
@import './static/css/theme.css';

/* 全局样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 页面容器 */
page {
  font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Segoe UI, Arial, Roboto, 'PingFang SC', 'miui', 'Hiragino Sans GB', 'Microsoft Yahei', sans-serif;
  font-size: var(--font-size-normal);
  line-height: 1.5;
  color: var(--text-color);
  background-color: var(--background-color);
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  transition: background-color var(--animation-speed-normal) ease;
}

/* 通用动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes scaleIn {
  from { transform: scale(0.8); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

@keyframes slideInUp {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

@keyframes slideInDown {
  from { transform: translateY(-100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* 全局过渡效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--animation-speed-normal) ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>