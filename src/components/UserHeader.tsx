import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';
import { getWidthPercent, getFontSize } from '@/utils/size';

const defaultAvatar = require('@/assets/images/avatar.png');

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
    paddingTop: getWidthPercent(0.025),
    paddingBottom: getWidthPercent(0.01),
    backgroundColor: '#fff',
  },
  avatar: {
    width: getWidthPercent(0.18),
    height: getWidthPercent(0.18),
    borderRadius: getWidthPercent(0.09),
    backgroundColor: '#eee',
    marginBottom: getWidthPercent(0.02),
  },
  name: {
    fontSize: getFontSize(0.055),
    fontWeight: 'bold',
    color: '#222',
    marginBottom: getWidthPercent(0.01),
    textAlign: 'center',
  },
  gp: {
    fontSize: getFontSize(0.04),
    color: '#4CAF50',
    marginBottom: getWidthPercent(0.01),
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default UserHeader;
