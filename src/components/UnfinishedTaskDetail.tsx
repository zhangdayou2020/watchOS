import React, {useRef, useState, useCallback} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import WearOSGestureHandler from './WearOSGestureHandler';
import type {RootState} from '@/store';
import { getWidthPercent, getFontSize } from '@/utils/size';

const {height} = Dimensions.get('window');

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
          keyExtractor={item => item.id}
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
            <View style={[styles.page, {height}]}> 
              <View style={styles.contentBox}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                  {item.taskName || item.title || '无任务名'}
                </Text>
                <View style={{height: getWidthPercent(0.02)}} />
                <Text style={styles.category}>{item.taskCategory || item.desc || '无分类'}</Text>
                <Text style={styles.integral}>+{item.taskIntegral || item.reward || 0} 积分</Text>
                <Text style={styles.statusTodo}>{item.complete === 'Y' ? '已完成' : '未完成'}</Text>
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
    backgroundColor: '#f0f2f5', // 使用柔和的背景色
  },
  // 滑动指示器
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
  desc: {
    fontSize: getFontSize(0.045),
    color: '#666',
    textAlign: 'center',
    lineHeight: getFontSize(0.06),
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
  statusTodo: {
    fontSize: getFontSize(0.045),
    color: '#1976d2',
    textAlign: 'center',
    marginTop: getWidthPercent(0.005),
    fontWeight: '500',
  },
});

export default UnfinishedTaskDetail;
