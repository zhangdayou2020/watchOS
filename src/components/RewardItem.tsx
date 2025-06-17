import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

// 示例静态奖励图片
const defaultRewardImg = require('@/assets/images/reward.png');

interface RewardItemProps {
  title?: string;
  desc?: string;
  img?: string;
  gp?: number;
}

const RewardItem: React.FC<RewardItemProps> = ({
  title = '奖励名称',
  desc = '奖励描述',
  img,
  gp = 0,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={img ? {uri: img} : defaultRewardImg}
        style={styles.img}
        resizeMode="cover"
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.gp}>{gp} GP</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#f8fafd',
    borderRadius: 12,
    margin: 16,
    elevation: 1,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  gp: {
    fontSize: 15,
    color: '#4CAF50',
    marginBottom: 4,
  },
  desc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default RewardItem;
