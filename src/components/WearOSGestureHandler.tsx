import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Vibration,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getWidthPercent } from '@/utils/size';

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
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  touchZoneLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: getWidthPercent(0.18),
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  touchZoneRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: getWidthPercent(0.18),
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  indicator: {
    padding: getWidthPercent(0.01),
    borderRadius: getWidthPercent(0.08),
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginLeft: getWidthPercent(0.01),
    marginRight: getWidthPercent(0.01),
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WearOSGestureHandler; 