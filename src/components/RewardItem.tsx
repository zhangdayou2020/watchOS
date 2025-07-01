import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface RewardItemProps {
  onEnterDetail?: () => void;
}

const RewardItem: React.FC<RewardItemProps> = ({ onEnterDetail }) => {
  const count = useSelector((state: RootState) => state.gifts.length);
  const disabled = count === 0;
  const { width, height } = Dimensions.get('window');
  const safeSize = Math.min(width, height);

  return (
    <TouchableOpacity
      onPress={onEnterDetail}
      style={[styles.entry, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>奖励（{count}）</Text>
      <Icon
        name="chevron-right"
        size={28}
        color="#ff9800"
        style={{ marginLeft: 8 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  entry: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
  },
});

export default RewardItem;
