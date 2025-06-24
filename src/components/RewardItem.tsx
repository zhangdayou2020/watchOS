import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import GiftDetail from './GiftDetail';

const RewardItem: React.FC = () => {
  const [showDetail, setShowDetail] = React.useState(false);

  if (showDetail) {
    return <GiftDetail onBack={() => setShowDetail(false)} />;
  }

  return (
    <TouchableOpacity style={styles.entry} onPress={() => setShowDetail(true)} activeOpacity={0.7}>
      <Text style={styles.title}>奖励</Text>
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
});

export default RewardItem;
