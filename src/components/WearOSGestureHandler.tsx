import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface WearOSGestureHandlerProps {
  onBack: () => void;
  children: React.ReactNode;
  onNext?: () => void;
  isNextDisabled?: boolean;
}

const WearOSGestureHandler: React.FC<WearOSGestureHandlerProps> = ({
  onBack,
  children,
  onNext,
  isNextDisabled = false,
}) => {
  const handleBack = () => {
    Vibration.vibrate(50);
    onBack();
  };

  const handleNext = () => {
    if (!isNextDisabled) {
      Vibration.vibrate(50);
      onNext?.();
    }
  };

  return (
    <View style={styles.container}>
      {/* 左侧返回区域 */}
      <TouchableOpacity
        style={styles.touchZoneLeft}
        onPress={handleBack}
        activeOpacity={0.2}>
        <View style={styles.indicator}>
          <MaterialIcons name="chevron-left" size={36} color="#555" />
        </View>
      </TouchableOpacity>

      {/* 右侧"下一项"区域 */}
      {onNext && (
        <TouchableOpacity
          style={styles.touchZoneRight}
          onPress={handleNext}
          activeOpacity={0.2}
          disabled={isNextDisabled}>
          <View style={styles.indicator}>
            <MaterialIcons
              name="chevron-right"
              size={36}
              color={isNextDisabled ? '#e0e0e0' : '#555'}
            />
          </View>
        </TouchableOpacity>
      )}

      {/* 主要内容 */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  touchZoneLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '25%', // 增大点击区域
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 4,
  },
  touchZoneRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '25%', // 增大点击区域
    zIndex: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  indicator: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
    borderRadius: 22,
  },
  content: {
    flex: 1,
  },
});

export default WearOSGestureHandler; 