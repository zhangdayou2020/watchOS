import React, {useState} from 'react';
import PagerView from 'react-native-pager-view';
import {View, StyleSheet, Dimensions} from 'react-native';
import TaskMenuEntry from './TaskMenuEntry';
import RewardItem from './RewardItem';
import SettingItem from './SettingItem';
import UnfinishedTaskDetail from './UnfinishedTaskDetail';
import FinishedTaskDetail from './FinishedTaskDetail';
import UserHeader from './UserHeader';
import { getWidthPercent } from '@/utils/size';

const { width, height } = Dimensions.get('window');
const safeSize = Math.min(width, height);

const MenuPager: React.FC = () => {
  const [showUnfinishedDetail, setShowUnfinishedDetail] = useState(false);
  const [showFinishedDetail, setShowFinishedDetail] = useState(false);
  const [showRewardDetail, setShowRewardDetail] = useState(false);

  // 进入未完成任务详情页
  if (showUnfinishedDetail) {
    return (
      <UnfinishedTaskDetail onBack={() => setShowUnfinishedDetail(false)} />
    );
  }

  // 进入已完成任务详情页
  if (showFinishedDetail) {
    return (
      <FinishedTaskDetail onBack={() => setShowFinishedDetail(false)} />
    );
  }

  // 进入奖励详情页
  if (showRewardDetail) {
    const GiftDetail = require('./GiftDetail').default;
    return <GiftDetail onBack={() => setShowRewardDetail(false)} />;
  }

  // 菜单页（上下滑动切换）
  return (
    <PagerView style={styles.pagerView} orientation="vertical" initialPage={0}>
      <View key="1" style={styles.page}>
        <UserHeader />
        <TaskMenuEntry
          type="unfinished"
          onEnterDetail={() => setShowUnfinishedDetail(true)}
        />
      </View>
      <View key="2" style={styles.page}>
        <UserHeader />
        <TaskMenuEntry type="finished" onEnterDetail={() => setShowFinishedDetail(true)} />
      </View>
      <View key="3" style={styles.page}>
        <UserHeader />
        <RewardItem onEnterDetail={() => setShowRewardDetail(true)} />
      </View>
      <View key="4" style={styles.page}>
        <UserHeader />
        <SettingItem />
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {flex: 1},
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: safeSize * 0.07,
    paddingBottom: safeSize * 0.03,
  },
});

export default MenuPager;
