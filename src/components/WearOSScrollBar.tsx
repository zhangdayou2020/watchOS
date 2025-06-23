import React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

interface WearOSScrollBarProps {
  progress: number; // 0-1之间的进度
  totalItems: number;
  currentIndex: number;
  onScrollToIndex: (index: number) => void;
  orientation?: 'vertical' | 'horizontal';
}

const WearOSScrollBar: React.FC<WearOSScrollBarProps> = ({
  progress,
  totalItems,
  currentIndex,
  onScrollToIndex,
  orientation = 'vertical',
}) => {
  const isVertical = orientation === 'vertical';

  // 计算滑动条尺寸
  const scrollBarLength = isVertical ? height - 120 : width - 120; // 调整以适应UI
  const thumbSize = isVertical ? 60 : 40;
  
  // 计算滑块位置
  const thumbPosition = progress * (scrollBarLength - thumbSize);
  
  // 处理点击跳转
  const handleScrollBarPress = (event: any) => {
    const {locationX, locationY} = event.nativeEvent;
    
    if (isVertical) {
      // 垂直滑动条
      const relativePosition = locationY / scrollBarLength;
      const targetIndex = Math.round(relativePosition * (totalItems - 1));
      onScrollToIndex(Math.max(0, Math.min(targetIndex, totalItems - 1)));
    } else {
      // 水平滑动条
      const relativePosition = locationX / scrollBarLength;
      const targetIndex = Math.round(relativePosition * (totalItems - 1));
      onScrollToIndex(Math.max(0, Math.min(targetIndex, totalItems - 1)));
    }
  };

  // 生成指示点
  const renderDots = () => {
    if (totalItems <= 1 || totalItems > 15) return null; // 太多点会混乱
    
    const dots = [];
    for (let i = 0; i < totalItems; i++) {
      const dotPosition = (i / (totalItems - 1)) * (scrollBarLength - 4);
      const isActive = i === currentIndex;
      
      dots.push(
        <View
          key={i}
          style={[
            styles.dot,
            isVertical ? {top: dotPosition} : {left: dotPosition},
            isActive && styles.activeDot,
          ]}
        />
      );
    }
    return dots;
  };

  // 如果只有一个项目，不显示滑动条
  if (totalItems <= 1) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isVertical ? styles.verticalContainer : styles.horizontalContainer,
      ]}
      onPress={handleScrollBarPress}
      activeOpacity={0.8}>
      <View
        style={[
          styles.track,
          isVertical ? styles.verticalTrack : styles.horizontalTrack,
        ]}>
        {/* 指示点 */}
        {renderDots()}
        
        {/* 滑块 */}
        <View
          style={[
            styles.thumb,
            isVertical ? styles.verticalThumb : styles.horizontalThumb,
            isVertical
              ? {top: thumbPosition, height: thumbSize}
              : {left: thumbPosition, width: thumbSize},
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 15,
  },
  verticalContainer: {
    right: 5,
    top: 60,
    bottom: 60,
    width: 4,
  },
  horizontalContainer: {
    top: 5,
    left: 60,
    right: 60,
    height: 4,
  },
  track: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 2,
    position: 'relative',
  },
  verticalTrack: {},
  horizontalTrack: {},
  thumb: {
    position: 'absolute',
    backgroundColor: '#1976d2',
    borderRadius: 2,
    shadowColor: '#1976d2',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  verticalThumb: {
    width: 4,
  },
  horizontalThumb: {
    height: 4,
  },
  dot: {
    position: 'absolute',
    width: 4,
    height: 4,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 2,
  },
  activeDot: {
    backgroundColor: '#1976d2',
    transform: [{scale: 1.5}],
  },
});

export default WearOSScrollBar; 