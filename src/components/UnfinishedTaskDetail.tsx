import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import WearOSGestureHandler from './WearOSGestureHandler';
import type {RootState} from '@/store';

const {width, height} = Dimensions.get('window');
const isRound = Math.abs(width - height) < 10; // 近似判断为圆盘
const safeSize = isRound ? Math.min(width, height) : Math.max(width, height);
const ITEM_HEIGHT = isRound ? safeSize - safeSize * 0.12 : height * 0.88;

const UnfinishedTaskDetail: React.FC<{onBack: () => void}> = ({onBack}) => {
  const tasks = useSelector((state: RootState) => state.tasks.unfinished);
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
    <WearOSGestureHandler
      onBack={onBack}>
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
          keyExtractor={(item, index) => item.id ? String(item.id) : String(index)}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>没有未完成的任务</Text>
            </View>
          }
          renderItem={({item}) => (
            <View style={{height: ITEM_HEIGHT, alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: 'transparent'}}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {item.taskName || item.title || '无任务名'}
              </Text>
              <View style={{height: safeSize * 0.02}} />
              <Text style={styles.category}>{item.taskCategory || item.desc || '无分类'}</Text>
              <Text style={styles.integral}>+{item.taskIntegral || item.reward || 0} 积分</Text>
              <Text style={styles.statusTodo}>{item.complete === 'Y' ? '已完成' : '未完成'}</Text>
            </View>
          )}
          getItemLayout={(_, index) => ({
            length: height,
            offset: height * index,
            index,
          })}
        />

        <Text style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 13,
          color: 'red',
          zIndex: 100,
          backgroundColor: 'rgba(255,255,255,0.7)',
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 8,
          overflow: 'hidden',
        }}>
          width: {width}, height: {height}, safeSize: {safeSize} | {isRound ? '圆盘' : '方盘'}
        </Text>
      </View>
    </WearOSGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // 滑动指示器
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
  statusTodo: {
    fontSize: isRound ? safeSize * 0.045 : width * 0.05,
    color: '#1976d2',
    textAlign: 'center',
    marginTop: isRound ? safeSize * 0.005 : height * 0.005,
    fontWeight: '500',
  },
});

export default UnfinishedTaskDetail;
