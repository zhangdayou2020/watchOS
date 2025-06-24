import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { getWidthPercent, getFontSize } from '@/utils/size';

interface TaskItemProps {
  title: string;
  desc?: string;
  status?: 'unfinished' | 'finished';
  reward?: string;
}

const TaskItem: React.FC<TaskItemProps> = ({title, desc, status, reward}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}
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
    padding: getWidthPercent(0.04),
    borderRadius: getWidthPercent(0.025),
    backgroundColor: '#f8fafd',
    marginVertical: getWidthPercent(0.02),
    marginHorizontal: getWidthPercent(0.03),
    elevation: 1,
  },
  title: {
    fontSize: getFontSize(0.05),
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: getWidthPercent(0.01),
  },
  finished: {
    fontSize: getFontSize(0.04),
    color: '#4CAF50',
    fontWeight: 'normal',
  },
  desc: {
    fontSize: getFontSize(0.045),
    color: '#444',
    marginBottom: getWidthPercent(0.01),
  },
  reward: {
    fontSize: getFontSize(0.04),
    color: '#ff9800',
  },
});

export default TaskItem;
