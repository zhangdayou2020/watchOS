import React from 'react';
import PagerView from 'react-native-pager-view';
import {View, Text, StyleSheet} from 'react-native';
import TaskListPager from './TaskListPager';
import RewardItem from './RewardItem';
import SettingItem from './SettingItem';

const MenuPager: React.FC = () => {
  return (
    <PagerView style={styles.pagerView} orientation="vertical" initialPage={0}>
      <View key="1" style={styles.page}>
        <Text style={styles.title}>未完成任务</Text>
        <TaskListPager type="unfinished" />
      </View>
      <View key="2" style={styles.page}>
        <Text style={styles.title}>已完成任务</Text>
        <TaskListPager type="finished" />
      </View>
      <View key="3" style={styles.page}>
        <Text style={styles.title}>奖励</Text>
        <RewardItem />
      </View>
      <View key="4" style={styles.page}>
        <Text style={styles.title}>设置</Text>
        <SettingItem />
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1976d2',
  },
});

export default MenuPager;
