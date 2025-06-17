import React from 'react';
import PagerView from 'react-native-pager-view';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';

interface TaskListPagerProps {
  type: 'unfinished' | 'finished';
}

const TaskListPager: React.FC<TaskListPagerProps> = ({type}) => {
  // 假设 Redux 里有 tasks: { unfinished: Task[], finished: Task[] }
  const tasks =
    useSelector((state: RootState) =>
      type === 'unfinished' ? state.tasks?.unfinished : state.tasks?.finished,
    ) || [];

  if (tasks.length === 0) {
    return (
      <View style={styles.emptyBox}>
        <Text style={styles.emptyText}>
          暂无{type === 'unfinished' ? '未完成' : '已完成'}任务
        </Text>
      </View>
    );
  }

  return (
    <PagerView style={styles.pagerView} initialPage={0}>
      {tasks.map((task: any, idx: number) => (
        <View key={task.id || idx} style={styles.page}>
          <Text style={styles.title}>{task.title || `任务${idx + 1}`}</Text>
          <Text style={styles.desc}>{task.desc || '暂无描述'}</Text>
          {/* 可扩展更多任务详情 */}
        </View>
      ))}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    width: '100%',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1976d2',
  },
  desc: {
    fontSize: 15,
    color: '#444',
  },
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#aaa',
  },
});

export default TaskListPager;
