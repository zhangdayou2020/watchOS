import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface TaskItemProps {
  title?: string;
  desc?: string;
  status?: 'unfinished' | 'finished';
  reward?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({title, desc, status, reward}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title ? title : '设置'}
        {status === 'finished' && (
          <Text style={styles.finished}>（已完成）</Text>
        )}
      </Text>
      {desc ? <Text style={styles.desc}>{desc}</Text> : null}
      {reward ? <Text style={styles.reward}>奖励：{reward}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: '#f8fafd',
    marginVertical: 8,
    marginHorizontal: 12,
    elevation: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  finished: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: 'normal',
  },
  desc: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  reward: {
    fontSize: 13,
    color: '#ff9800',
  },
});

export default TaskItem;
