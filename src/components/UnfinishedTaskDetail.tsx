import React, {useRef, useState, useCallback} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import WearOSGestureHandler from './WearOSGestureHandler';
import type {RootState} from '@/store';

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

  const firstTask = tasks && tasks.length > 0 ? tasks[0] : null;

  const taskName = (firstTask as any)?.taskName || (firstTask as any)?.title || '无任务名';
  const dynamicFontSize = taskName.length > 16 ? 15 : 18;

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

        {firstTask ? (
          <View style={styles.contentBox}>
            <Text
              style={[styles.title, {fontSize: dynamicFontSize}]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {taskName}
            </Text>
            <View style={{height: 10}} />
            <Text style={styles.category}>{(firstTask as any).taskCategory || '无分类'}</Text>
            <Text style={styles.integral}>+{(firstTask as any).taskIntegral || 0} 积分</Text>
            <Text style={styles.statusTodo}>
              {((firstTask as any).complete === 'Y') ? '已完成' : '未完成'}
            </Text>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>没有未完成的任务</Text>
          </View>
        )}

        {/* 纵向分页任务详情 */}
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
                <Text style={styles.title} numberOfLines={3}>
                  {item.title}
                </Text>
                {item.desc && (
                  <Text style={styles.desc} numberOfLines={4}>
                    {item.desc}
                  </Text>
                )}
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
    top: 8,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 16,
  },
  scrollIndicatorText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 35, // 增加内边距，避免文字太靠近边缘
  },
  contentBox: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 120,
    paddingTop: 60, // 让内容整体下移，避开顶部指示器
    paddingBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 22,
    maxWidth: '90%',
    alignSelf: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  emptyContainer: {
    flex: 1,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  category: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 4,
  },
  integral: {
    fontSize: 16,
    color: '#ff9800',
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '500',
  },
  statusTodo: {
    fontSize: 16,
    color: '#1976d2',
    textAlign: 'center',
    marginTop: 2,
    fontWeight: '500',
  },
});

export default UnfinishedTaskDetail;
