import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';

const {width} = Dimensions.get('window');

interface TaskListPagerProps {
  type: 'unfinished' | 'finished';
}

const TaskListPager: React.FC<TaskListPagerProps> = ({type}) => {
  const tasks =
    useSelector((state: RootState) =>
      type === 'unfinished' ? state.tasks.unfinished : state.tasks.finished,
    ) || [];

  // 汇总页 + 任务详情页
  const data = [
    {
      id: 'summary',
      title: type === 'unfinished' ? '未完成任务' : '已完成任务',
      color: '#eee',
    },
    ...tasks.map((task, idx) => ({
      ...task,
      color: idx % 2 === 0 ? '#f99' : '#9f9', // 仅示例用不同颜色
    })),
  ];

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({item}) => (
        <View style={[styles.page, {backgroundColor: item.color, width}]}>
          <Text style={styles.title}>{item.title}</Text>
          {item.desc && <Text style={styles.desc}>{item.desc}</Text>}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    color: '#666',
  },
});

export default TaskListPager;
