import React, {useState} from 'react';
import PagerView from 'react-native-pager-view';
import {View, StyleSheet} from 'react-native';
import TaskMenuEntry from './TaskMenuEntry';
import RewardItem from './RewardItem';
import SettingItem from './SettingItem';
import UnfinishedTaskDetail from './UnfinishedTaskDetail';

const MenuPager: React.FC = () => {
  const [showUnfinishedDetail, setShowUnfinishedDetail] = useState(false);

  // 进入未完成任务详情页
  if (showUnfinishedDetail) {
    return (
      <UnfinishedTaskDetail onBack={() => setShowUnfinishedDetail(false)} />
    );
  }

  // 菜单页（上下滑动切换）
  return (
    <PagerView style={styles.pagerView} orientation="vertical" initialPage={0}>
      <View key="1" style={styles.page}>
        <TaskMenuEntry
          type="unfinished"
          onEnterDetail={() => setShowUnfinishedDetail(true)}
        />
      </View>
      <View key="2" style={styles.page}>
        <TaskMenuEntry type="finished" />
      </View>
      <View key="3" style={styles.page}>
        <RewardItem />
      </View>
      <View key="4" style={styles.page}>
        <SettingItem />
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {flex: 1},
  page: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

export default MenuPager;
