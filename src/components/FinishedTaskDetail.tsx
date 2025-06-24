import React, {useRef, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import WearOSGestureHandler from './WearOSGestureHandler';
import { getWidthPercent, getFontSize } from '@/utils/size';

const { height } = Dimensions.get('window');

const FinishedTaskDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const tasks = useSelector((state: RootState) => state.tasks.finished);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onMomentumScrollEnd = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.y / height);
    setCurrentIndex(idx);
  };

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < tasks.length) {
      flatListRef.current?.scrollToIndex({index, animated: true});
      setCurrentIndex(index);
    }
  };

  return (
    <WearOSGestureHandler onBack={onBack}>
      <View style={styles.container}>
        {/* 滑动指示器文本 */}
        {tasks && tasks.length > 1 && (
          <View style={styles.scrollIndicator}>
            <Text style={styles.scrollIndicatorText}>
              {currentIndex + 1} / {tasks.length}
            </Text>
          </View>
        )}
        <FlatList
          ref={flatListRef}
          data={tasks}
          keyExtractor={item => (item as any).tid || (item as any).id}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>没有已完成的任务</Text>
            </View>
          }
          renderItem={({item}) => (
            <View style={[styles.page, {height}]}> 
              <View style={styles.contentBox}>
                <Text
                  style={styles.title}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {(item as any).taskName || (item as any).title || '无任务名'}
                </Text>
                <View style={{ height: 10 }} />
                <Text style={styles.category}>{(item as any).taskCategory || '无分类'}</Text>
                <Text style={styles.integral}>+{(item as any).taskIntegral || 0} 积分</Text>
                <Text style={styles.statusDone}>已完成</Text>
              </View>
            </View>
          )}
          getItemLayout={(_, index) => ({
            length: height,
            offset: height * index,
            index,
          })}
        />
      </View>
    </WearOSGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollIndicator: {
    position: 'absolute',
    top: getWidthPercent(0.02),
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: getWidthPercent(0.03),
    paddingHorizontal: getWidthPercent(0.03),
    paddingVertical: getWidthPercent(0.012),
    zIndex: 16,
  },
  scrollIndicatorText: {
    color: '#fff',
    fontSize: getFontSize(0.04),
    fontWeight: 'bold',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: getWidthPercent(0.09),
  },
  contentBox: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: getWidthPercent(0.3),
    paddingTop: getWidthPercent(0.15),
    paddingBottom: getWidthPercent(0.04),
  },
  title: {
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: getWidthPercent(0.035),
    lineHeight: getFontSize(0.06),
    maxWidth: '90%',
    alignSelf: 'center',
    fontSize: getFontSize(0.055),
  },
  category: {
    fontSize: getFontSize(0.045),
    color: '#888',
    textAlign: 'center',
    marginBottom: getWidthPercent(0.01),
  },
  integral: {
    fontSize: getFontSize(0.045),
    color: '#ff9800',
    textAlign: 'center',
    marginBottom: getWidthPercent(0.01),
    fontWeight: '500',
  },
  statusDone: {
    fontSize: getFontSize(0.045),
    color: '#4caf50',
    textAlign: 'center',
    marginTop: getWidthPercent(0.005),
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    height: getWidthPercent(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: getFontSize(0.06),
    color: '#888',
  },
});

export default FinishedTaskDetail; 