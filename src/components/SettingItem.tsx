import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import { getWidthPercent, getFontSize } from '@/utils/size';

interface TaskItemProps {
  title?: string;
  desc?: string;
  status?: 'unfinished' | 'finished';
  reward?: string;
}

const { width, height } = Dimensions.get('window');
const safeSize = Math.min(width, height);

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
    padding: safeSize * 0.04,
    borderRadius: safeSize * 0.025,
    backgroundColor: '#f8fafd',
    marginVertical: safeSize * 0.02,
    marginHorizontal: safeSize * 0.03,
    elevation: 1,
  },
  title: {
    fontSize: safeSize * 0.05,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: safeSize * 0.01,
  },
  finished: {
    fontSize: safeSize * 0.04,
    color: '#4CAF50',
    fontWeight: 'normal',
  },
  desc: {
    fontSize: safeSize * 0.045,
    color: '#444',
    marginBottom: safeSize * 0.01,
  },
  reward: {
    fontSize: safeSize * 0.04,
    color: '#ff9800',
  },
});

export default TaskItem;
