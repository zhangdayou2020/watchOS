import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';
import { getWidthPercent, getFontSize } from '@/utils/size';

const defaultAvatar = require('@/assets/images/avatar.png');
const { width, height } = Dimensions.get('window');
const safeSize = Math.min(width, height);

const UserHeader = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <View style={styles.container}>
      <Image
        source={user?.img ? {uri: user.img} : defaultAvatar}
        style={styles.avatar}
        resizeMode="cover"
      />
      <Text style={styles.name}>{user?.cname || '未登录'}</Text>
      <Text style={styles.gp}>{user ? `${user.grade || 0} GP` : '-- GP'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: safeSize * 0.025,
    paddingBottom: safeSize * 0.01,
    backgroundColor: '#fff',
  },
  avatar: {
    width: safeSize * 0.18,
    height: safeSize * 0.18,
    borderRadius: safeSize * 0.09,
    backgroundColor: '#eee',
    marginBottom: safeSize * 0.02,
  },
  name: {
    fontSize: safeSize * 0.055,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: safeSize * 0.01,
    textAlign: 'center',
  },
  gp: {
    fontSize: safeSize * 0.04,
    color: '#4CAF50',
    marginBottom: safeSize * 0.01,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default UserHeader;
