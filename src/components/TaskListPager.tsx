import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;

interface ApiTask {
  tid?: string;
  taskName?: string;
  taskCategory?: string;
  taskIntegral?: string;
  complete?: string;
  title?: string;
  desc?: string;
  reward?: string | number;
  [key: string]: any;
}

interface TaskListPagerProps {
  type: 'unfinished' | 'finished';
}

const TaskCard: React.FC<{ task: ApiTask }> = ({ task }) => (
  <View style={[
    styles.card,
    task.complete === 'Y' ? styles.cardDone : styles.cardTodo
  ]}>
    <Text style={styles.title}>{task.taskName || task.title || '无任务名'}</Text>
    <Text style={styles.category}>{task.taskCategory || task.desc || '无分类'}</Text>
    <View style={styles.row}>
      <View style={[
        styles.statusDot,
        task.complete === 'Y' ? styles.dotDone : styles.dotTodo
      ]} />
      <Text style={styles.statusText}>
        {task.complete === 'Y' ? '已完成' : '未完成'}
      </Text>
      <Text style={styles.integral}>+{task.taskIntegral || Number(task.reward) || 0} 积分</Text>
    </View>
  </View>
);

const TaskListPager: React.FC<TaskListPagerProps> = ({type}) => {
  const tasks =
    useSelector((state: RootState) =>
      type === 'unfinished' ? state.tasks.unfinished : state.tasks.finished,
    ) || [];

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item, index) => (item as any).tid ? String((item as any).tid) : (item as any).id ? String((item as any).id) : String(index)}
      contentContainerStyle={styles.listContent}
      renderItem={({item}) => <TaskCard task={item} />}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContent: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#fff',
    borderRadius: 24,
    marginVertical: 10,
    paddingVertical: 18,
    paddingHorizontal: 18,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  cardDone: {
    backgroundColor: '#e8f5e9',
  },
  cardTodo: {
    backgroundColor: '#e3f2fd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 6,
    textAlign: 'center',
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  dotDone: {
    backgroundColor: '#4caf50',
  },
  dotTodo: {
    backgroundColor: '#f44336',
  },
  statusText: {
    fontSize: 15,
    marginRight: 12,
    color: '#333',
  },
  integral: {
    fontSize: 15,
    color: '#ff9800',
    fontWeight: 'bold',
  },
});

export default TaskListPager;
