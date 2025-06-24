import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';
import { getWidthPercent, getFontSize } from '@/utils/size';

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
  const disabled = count === 0;
  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onEnterDetail}
      style={[styles.entry, disabled && styles.disabled]}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Text style={[styles.title, disabled && styles.disabledText]}>
        {type === 'unfinished' ? '未完成任务' : '已完成任务'}（{count}）
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  entry: {padding: getWidthPercent(0.07)},
  title: {fontSize: getFontSize(0.065), fontWeight: 'bold', color: '#1976d2'},
  disabled: {opacity: 0.4},
  disabledText: {color: '#aaa'},
});

export default TaskMenuEntry;
