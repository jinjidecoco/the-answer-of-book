/**
 * 动画工具函数
 * 用于实现翻书效果和图腾旋转动画
 */

/**
 * 创建翻书动画
 * @param {Number} duration 动画持续时间(ms)
 * @returns {Object} 动画实例
 */
const createFlipAnimation = (duration = 1500) => {
  const animation = uni.createAnimation({
    duration,
    timingFunction: 'ease',
    delay: 0
  });

  // 翻转动画
  animation.rotateY(180).step();

  return animation;
};

/**
 * 创建图腾旋转动画
 * @param {Number} duration 动画持续时间(ms)
 * @param {Number} rotateCount 旋转圈数
 * @returns {Object} 动画实例
 */
const createTotemRotateAnimation = (duration = 3000, rotateCount = 1) => {
  const animation = uni.createAnimation({
    duration,
    timingFunction: 'ease-in-out',
    delay: 0
  });

  // 旋转动画
  animation.rotate(360 * rotateCount).scale(1.2, 1.2).step();

  return animation;
};

/**
 * 创建文字渐显动画
 * @param {Number} duration 动画持续时间(ms)
 * @returns {Object} 动画实例
 */
const createTextFadeInAnimation = (duration = 1000) => {
  const animation = uni.createAnimation({
    duration,
    timingFunction: 'ease',
    delay: 0
  });

  // 透明度从0到1
  animation.opacity(0).step({ duration: 0 });
  animation.opacity(1).step({ duration });

  return animation;
};

/**
 * 创建书本打开动画
 * @param {Number} duration 动画持续时间(ms)
 * @returns {Object} 动画实例
 */
const createBookOpenAnimation = (duration = 1000) => {
  const animation = uni.createAnimation({
    duration,
    timingFunction: 'ease-out',
    delay: 0
  });

  // 书本打开动画
  animation.rotateX(10).rotateY(-180).step();

  return animation;
};

/**
 * 创建页面切换动画
 * @param {String} direction 方向：'left'|'right'|'top'|'bottom'
 * @param {Number} duration 动画持续时间(ms)
 * @returns {Object} 动画配置
 */
const createPageTransition = (direction = 'left', duration = 300) => {
  let animationType = 'slide-in-right';

  switch (direction) {
    case 'left':
      animationType = 'slide-in-right';
      break;
    case 'right':
      animationType = 'slide-in-left';
      break;
    case 'top':
      animationType = 'slide-in-bottom';
      break;
    case 'bottom':
      animationType = 'slide-in-top';
      break;
    default:
      animationType = 'slide-in-right';
  }

  return {
    animationType,
    animationDuration: duration
  };
};

export default {
  createFlipAnimation,
  createTotemRotateAnimation,
  createTextFadeInAnimation,
  createBookOpenAnimation,
  createPageTransition
};