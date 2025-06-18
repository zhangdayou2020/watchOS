import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';

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
      {/* <Text style={styles.name}>{user?.cname || '未登录'}</Text>
      <Text style={styles.gp}>{user ? `${user.grade || 0} GP` : '-- GP'}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
    paddingBottom: 4,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 18,
    backgroundColor: '#eee',
    marginBottom: 3,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
    textAlign: 'center',
  },
  gp: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 2,
    textAlign: 'center',
  },
});

export default UserHeader;
