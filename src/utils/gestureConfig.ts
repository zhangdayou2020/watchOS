import {Gesture} from 'react-native-gesture-handler';

// WearOS手势配置常量 - 针对WearOS系统手势冲突优化
export const WEAROS_GESTURE_CONFIG = {
  // 左滑返回手势配置 - 更保守的参数避免系统冲突
  BACK_SWIPE: {
    MIN_DISTANCE: 120, // 大幅增加距离，避免误触
    MIN_VELOCITY: 500, // 增加速度要求，确保是主动滑动
    HORIZONTAL_RATIO: 3.0, // 确保非常明显的水平滑动
    ACTIVATION_OFFSET: 30, // 增加激活偏移量
    FAIL_OFFSET_Y: 80, // 增加垂直失败偏移量
  },
  // 垂直滑动配置
  VERTICAL_SWIPE: {
    MIN_DISTANCE: 50,
    MIN_VELOCITY: 300,
  },
};

// 创建优化的左滑返回手势 - 专门针对WearOS优化
export const createBackSwipeGesture = (onBack: () => void) => {
  const config = WEAROS_GESTURE_CONFIG.BACK_SWIPE;
  
  return Gesture.Pan()
    .onBegin(() => {
      // 手势开始时的处理
    })
    .onUpdate((e) => {
      // 实时检测，提供视觉反馈
      if (e.translationX < -50) {
        // 可以在这里添加视觉反馈
      }
    })
    .onEnd((e) => {
      // 更严格的左滑检测 - 专门针对WearOS
      const isLeftSwipe = e.translationX < -config.MIN_DISTANCE;
      const isHorizontalSwipe = Math.abs(e.translationX) > Math.abs(e.translationY) * config.HORIZONTAL_RATIO;
      const hasEnoughVelocity = e.velocityX < -config.MIN_VELOCITY;
      
      // 额外的安全检查：确保不是系统手势
      const isIntentionalSwipe = Math.abs(e.translationX) > 100 && Math.abs(e.velocityX) > 400;
      
      if (isLeftSwipe && isHorizontalSwipe && hasEnoughVelocity && isIntentionalSwipe) {
        onBack();
      }
    })
    .shouldCancelWhenOutside(true)
    .activeOffsetX([-config.ACTIVATION_OFFSET, config.ACTIVATION_OFFSET])
    .failOffsetY([-config.FAIL_OFFSET_Y, config.FAIL_OFFSET_Y])
    .minDistance(config.MIN_DISTANCE); // 添加最小距离限制
};

// 创建垂直滑动手势（用于任务切换）
export const createVerticalSwipeGesture = (
  onSwipeUp: () => void,
  onSwipeDown: () => void,
) => {
  return Gesture.Pan()
    .onEnd((e) => {
      const config = WEAROS_GESTURE_CONFIG.VERTICAL_SWIPE;
      
      const isVerticalSwipe = Math.abs(e.translationY) > Math.abs(e.translationX) * 2.0;
      const hasEnoughDistance = Math.abs(e.translationY) > config.MIN_DISTANCE;
      const hasEnoughVelocity = Math.abs(e.velocityY) > config.MIN_VELOCITY;
      
      if (isVerticalSwipe && hasEnoughDistance && hasEnoughVelocity) {
        if (e.translationY < 0) {
          onSwipeUp();
        } else {
          onSwipeDown();
        }
      }
    })
    .shouldCancelWhenOutside(true)
    .activeOffsetY([-30, 30])
    .failOffsetX([-50, 50]);
}; 