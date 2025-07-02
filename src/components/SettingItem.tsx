import React from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert} from 'react-native';
import { getWidthPercent, getFontSize } from '@/utils/size';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { clearUserInfo } from '@/store/userSlice';
import { clearTasks } from '@/store/tasksSlice';
import { clearAwards } from '@/store/giftSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface TaskItemProps {
  title?: string;
  desc?: string;
  status?: 'unfinished' | 'finished';
  reward?: string;
}

interface SettingItemProps {
  onEnterDetail?: () => void;
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

const SettingItem: React.FC<SettingItemProps> = ({ onEnterDetail }) => {
  return (
    <TouchableOpacity
      onPress={onEnterDetail}
      style={[styles.entry, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>设置</Text>
      <Icon
        name="chevron-right"
        size={28}
        color="#2196f3"
        style={{ marginLeft: 8 }}
      />
    </TouchableOpacity>
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
    fontSize: safeSize * 0.07,
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
  entry: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
});

export default SettingItem;
