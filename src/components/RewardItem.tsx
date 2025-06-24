import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import GiftDetail from './GiftDetail';
import { getWidthPercent, getFontSize } from '@/utils/size';

interface RewardItemProps {
  onEnterDetail?: () => void;
}

const RewardItem: React.FC<RewardItemProps> = ({ onEnterDetail }) => {
  const count = useSelector((state: RootState) => state.gifts.length);
  const disabled = count === 0;

  return (
    <TouchableOpacity
      style={[styles.entry, disabled && styles.disabled]}
      onPress={disabled ? undefined : onEnterDetail}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Text style={[styles.title, disabled && styles.disabledText]}>奖励（{count}）</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  entry: {
    padding: getWidthPercent(0.07),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: getFontSize(0.065),
    fontWeight: 'bold',
    color: '#1976d2',
  },
  disabled: {opacity: 0.4},
  disabledText: {color: '#aaa'},
});

export default RewardItem;
