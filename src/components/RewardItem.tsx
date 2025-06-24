import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import GiftDetail from './GiftDetail';

const RewardItem: React.FC = () => {
  const [showDetail, setShowDetail] = React.useState(false);
  const count = useSelector((state: RootState) => state.gifts.length);
  const disabled = count === 0;

  if (showDetail) {
    return <GiftDetail onBack={() => setShowDetail(false)} />;
  }

  return (
    <TouchableOpacity
      style={[styles.entry, disabled && styles.disabled]}
      onPress={disabled ? undefined : () => setShowDetail(true)}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Text style={[styles.title, disabled && styles.disabledText]}>奖励（{count}）</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  entry: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  disabled: {opacity: 0.4},
  disabledText: {color: '#aaa'},
});

export default RewardItem;
