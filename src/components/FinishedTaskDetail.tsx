import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import WearOSGestureHandler from './WearOSGestureHandler';

const { height } = Dimensions.get('window');

const FinishedTaskDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const tasks = useSelector((state: RootState) => state.tasks.finished);

  const firstTask = tasks && tasks.length > 0 ? tasks[0] : null;

  return (
    <WearOSGestureHandler onBack={onBack}>
      <View style={styles.container}>
        {firstTask ? (
          <View style={styles.contentBox}>
            <Text
              style={styles.title}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {(firstTask as any).taskName || (firstTask as any).title || '无任务名'}
            </Text>
            <View style={{ height: 10 }} />
            <Text style={styles.category}>{(firstTask as any).taskCategory || '无分类'}</Text>
            <Text style={styles.integral}>+{(firstTask as any).taskIntegral || 0} 积分</Text>
            <Text style={styles.statusDone}>已完成</Text>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>没有已完成的任务</Text>
          </View>
        )}
      </View>
    </WearOSGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  contentBox: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 120,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 22,
    maxWidth: '90%',
    alignSelf: 'center',
  },
  category: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginBottom: 4,
  },
  integral: {
    fontSize: 16,
    color: '#ff9800',
    textAlign: 'center',
    marginBottom: 4,
    fontWeight: '500',
  },
  statusDone: {
    fontSize: 16,
    color: '#4caf50',
    textAlign: 'center',
    marginTop: 2,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
  backBtn: {
    marginTop: 18,
    backgroundColor: '#e3f2fd',
    borderRadius: 16,
    paddingHorizontal: 18,
    paddingVertical: 8,
    alignSelf: 'center',
  },
  backBtnText: {
    color: '#1976d2',
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default FinishedTaskDetail; 