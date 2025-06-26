import React from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

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
      style={{
        padding: safeSize * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: disabled ? 0.4 : 1,
      }}
      onPress={disabled ? undefined : onEnterDetail}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Text style={{
        fontSize: safeSize * 0.065,
        fontWeight: 'bold',
        color: disabled ? '#aaa' : '#1976d2',
      }}>奖励（{count}）</Text>
    </TouchableOpacity>
  );
};

export default RewardItem;
