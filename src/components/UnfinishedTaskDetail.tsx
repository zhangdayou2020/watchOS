import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ActivityIndicator} from 'react-native';
import {useSelector} from 'react-redux';
import WearOSGestureHandler from './WearOSGestureHandler';
import type {RootState} from '@/store';

const {width, height} = Dimensions.get('window');
const isRound = Math.abs(width - height) < 10;
const safeSize = isRound ? Math.min(width, height) : Math.max(width, height);
const ITEM_HEIGHT = height; // 统一使用屏幕高度

const UnfinishedTaskDetail: React.FC<{onBack: () => void}> = ({onBack}) => {
  const tasks = useSelector((state: RootState) => state.tasks.unfinished);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const onMomentumScrollEnd = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setCurrentIndex(index);
    
    // 确保滚动到精确位置
    if (Math.abs(offsetY - index * ITEM_HEIGHT) > 1) {
      flatListRef.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated: true
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < tasks.length) {
      flatListRef.current?.scrollToIndex({index, animated: true});
      setCurrentIndex(index);
    }
  };

  // 预留完成任务逻辑
  const handleFinishTask = async (task: any) => {
    setLoadingId(task.id);
    // TODO: 调用后端 finishTask 接口
    // await finishTask({ tid: task.id });
    // TODO: 调用刷新任务列表逻辑（如 getTodayTaskByChild）
    setTimeout(() => {
      setLoadingId(null);
      // Toast.show('已推送完成请求', ...)
    }, 1000);
  };

  return (
    <WearOSGestureHandler
      onBack={onBack}>
      <View style={{flex: 1}}>
        {/* 指示器绝对定位在顶部 */}
        {tasks && tasks.length > 0 && (
          <View style={{ 
            position: 'absolute', 
            top: safeSize * 0.06, 
            left: 0, 
            right: 0, 
            alignItems: 'center', 
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            paddingHorizontal: safeSize * 0.03,
            paddingVertical: safeSize * 0.01,
            borderRadius: safeSize * 0.02
          }}>
            <Text style={styles.scrollIndicatorText}>
              {currentIndex + 1} / {tasks.length}
            </Text>
          </View>
        )}
        <FlatList
          ref={flatListRef}
          data={tasks}
          keyExtractor={(item, index) => item.id ? String(item.id) : String(index)}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          style={{flex: 1}}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          decelerationRate="fast"
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>没有未完成的任务</Text>
            </View>
          }
          renderItem={({item}) => (
            <View style={{height: ITEM_HEIGHT, width: '100%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {item.taskName || item.title || '无任务名'}
              </Text>
              <View style={{height: safeSize * 0.02}} />
              <Text style={styles.category}>{item.taskCategory || item.desc || '无分类'}</Text>
              <Text style={styles.integral}>+{item.taskIntegral || item.reward || 0} 积分</Text>
              <Text style={styles.statusTodo}>{item.complete === 'Y' ? '已完成' : '未完成'}</Text>
              {/* 完成按钮 */}
              {item.complete !== 'Y' && (
                <TouchableOpacity
                  style={styles.finishBtn}
                  onPress={() => handleFinishTask(item)}
                  disabled={loadingId === item.id}
                  activeOpacity={0.7}
                >
                  {loadingId === item.id ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.finishBtnText}>完成</Text>
                  )}
                </TouchableOpacity>
              )}
            </View>
          )}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>
    </WearOSGestureHandler>
  );
};

const styles = StyleSheet.create({
  scrollIndicatorText: {
    color: '#fff',
    fontSize: isRound ? safeSize * 0.04 : width * 0.045,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    height: ITEM_HEIGHT,
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
  finishBtn: {
    marginTop: safeSize * 0.04,
    backgroundColor: '#1976d2',
    borderRadius: safeSize * 0.04,
    paddingVertical: safeSize * 0.025,
    paddingHorizontal: safeSize * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishBtnText: {
    color: '#fff',
    fontSize: safeSize * 0.055,
    fontWeight: 'bold',
  },
});

export default UnfinishedTaskDetail;
