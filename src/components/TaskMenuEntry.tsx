import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';
import { getWidthPercent, getFontSize } from '@/utils/size';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  type: 'unfinished' | 'finished';
  onEnterDetail?: () => void;
}

const { width, height } = Dimensions.get('window');
const safeSize = Math.min(width, height);

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
      style={[styles.entry, disabled && styles.disabled, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Text style={[styles.title, disabled && styles.disabledText]}>
        {type === 'unfinished' ? '未完成任务' : '已完成任务'}（{count}）
      </Text>
      {!disabled && (
        <Icon
          name="chevron-right"
          size={28}
          color="#2196f3"
          style={{ marginLeft: 8 }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  entry: {padding: safeSize * 0.07},
  title: {fontSize: safeSize * 0.065, fontWeight: 'bold', color: '#1976d2'},
  disabled: {opacity: 0.4},
  disabledText: {color: '#aaa'},
});

export default TaskMenuEntry;
