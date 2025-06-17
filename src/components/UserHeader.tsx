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
      <View style={styles.info}>
        <Text style={styles.name}>{user?.cname || '未登录'}</Text>
        <Text style={styles.gp}>
          {user ? `${user.grade || 0} GP` : '-- GP'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eee',
  },
  info: {
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  gp: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 2,
  },
});

export default UserHeader;
