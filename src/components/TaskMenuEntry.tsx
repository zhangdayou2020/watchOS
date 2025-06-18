import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';

interface Props {
  type: 'unfinished' | 'finished';
  onEnterDetail?: () => void;
}

const TaskMenuEntry: React.FC<Props> = ({type, onEnterDetail}) => {
  const count = useSelector((state: RootState) =>
    type === 'unfinished'
      ? state.tasks.unfinished.length
      : state.tasks.finished.length,
  );
  return (
    <TouchableOpacity onPress={onEnterDetail} style={styles.entry}>
      <Text style={styles.title}>
        {type === 'unfinished' ? '未完成任务' : '已完成任务'}（{count}）
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  entry: {padding: 24},
  title: {fontSize: 20, fontWeight: 'bold', color: '#1976d2'},
});

export default TaskMenuEntry;
