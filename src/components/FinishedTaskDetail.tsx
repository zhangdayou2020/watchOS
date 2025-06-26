import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import WearOSGestureHandler from './WearOSGestureHandler';
import type {RootState} from '@/store';

const { width, height } = Dimensions.get('window');
const isRound = Math.abs(width - height) < 10; // 近似判断为圆盘
const safeSize = isRound ? Math.min(width, height) : Math.max(width, height);
const CARD_SIZE = isRound ? safeSize * 0.85 : width * 0.92;
const ITEM_HEIGHT = isRound ? safeSize - safeSize * 0.12 : height * 0.88;

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
        {/* 调试信息 */}
        <Text style={{ position: 'absolute', top: 0, left: 0, fontSize: 12, color: 'red', zIndex: 100 }}>
          width: {width}, height: {height}, safeSize: {safeSize} | {isRound ? '圆盘' : '方盘'}
        </Text>
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
          keyExtractor={(item, index) => (item as any).tid ? String((item as any).tid) : (item as any).id ? String((item as any).id) : String(index)}
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
            <View style={{height: ITEM_HEIGHT, alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: 'transparent'}}>
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
    backgroundColor: '#fff',
  },
  scrollIndicator: {
    position: 'absolute',
    top: isRound ? safeSize * 0.02 : height * 0.02,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: isRound ? safeSize * 0.03 : width * 0.03,
    paddingHorizontal: isRound ? safeSize * 0.03 : width * 0.03,
    paddingVertical: isRound ? safeSize * 0.012 : height * 0.012,
    zIndex: 16,
  },
  scrollIndicatorText: {
    color: '#fff',
    fontSize: isRound ? safeSize * 0.04 : width * 0.045,
    fontWeight: 'bold',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    padding: isRound ? safeSize * 0.06 : width * 0.06,
  },
  contentBox: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 0,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: isRound ? safeSize * 0.035 : height * 0.03,
    lineHeight: isRound ? safeSize * 0.06 : height * 0.06,
    maxWidth: '90%',
    alignSelf: 'center',
    fontSize: isRound ? safeSize * 0.055 : width * 0.06,
  },
  category: {
    fontSize: isRound ? safeSize * 0.045 : width * 0.05,
    color: '#888',
    textAlign: 'center',
    marginBottom: isRound ? safeSize * 0.01 : height * 0.01,
  },
  integral: {
    fontSize: isRound ? safeSize * 0.045 : width * 0.05,
    color: '#ff9800',
    textAlign: 'center',
    marginBottom: isRound ? safeSize * 0.01 : height * 0.01,
    fontWeight: '500',
  },
  statusDone: {
    fontSize: isRound ? safeSize * 0.045 : width * 0.05,
    color: '#4caf50',
    textAlign: 'center',
    marginTop: isRound ? safeSize * 0.005 : height * 0.005,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    height: isRound ? safeSize : height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: isRound ? safeSize * 0.06 : width * 0.07,
    color: '#888',
  },
});

export default FinishedTaskDetail; 