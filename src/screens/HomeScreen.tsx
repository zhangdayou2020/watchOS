import React from 'react';
import {View, StyleSheet} from 'react-native';
import UserHeader from '@/components/UserHeader';
import MenuPager from '@/components/MenuPager';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <UserHeader />
      <View style={styles.menuPagerBox}>
        <MenuPager />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  menuPagerBox: {
    flex: 1,
  },
});

export default HomeScreen;
