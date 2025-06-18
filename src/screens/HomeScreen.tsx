import React from 'react';
import {View, StyleSheet} from 'react-native';
import MenuPager from '@/components/MenuPager';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <MenuPager />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
