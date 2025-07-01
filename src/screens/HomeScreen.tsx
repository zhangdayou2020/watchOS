import React, { useEffect } from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MenuPager from '@/components/MenuPager';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '@/store/tasksSlice';
import { getTodayTaskByChild } from '@/api/todayTask';
import type { RootState } from '@/store';
import { getAwardListByCid } from '@/api/gift';
import { setAwards } from '@/store/giftSlice';
import { getWidthPercent } from '@/utils/size';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const safeSize = Math.min(width, height);

const HomeScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const cid = user?.cid;
  const awards = useSelector((state: RootState) => state.gifts);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;
    console.log('HomeScreen 页面聚焦，开始获取任务和奖励数据，cid:', cid);
    if (!cid) return;
    getTodayTaskByChild({ action: 'getTodyTaskByChild', cid, from: 'watch' })
      .then(res => {
        console.log('getTodayTaskByChild返回:', res);
        const allTasks = Array.isArray(res.data)
          ? res.data.filter((task: any) => task.type !== 'S')
          : [];
        const unfinished = allTasks.filter((task: any) => task.complete !== 'Y');
        const finished = allTasks.filter((task: any) => task.complete === 'Y');
        dispatch(setTasks({ unfinished, finished }));
      })
      .catch(err => {
        console.log('获取任务失败', err);
      });
    getAwardListByCid({ action: 'getAwardListByCid', cid })
      .then(res => {
        console.log('getAwardListByCid返回:', res);
        if (res.status === 'SUCCESS') {
          dispatch(setAwards(res.data));
        }
      })
      .catch(err => {
        console.log('获取奖励失败', err);
      });
  }, [isFocused, cid]);

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
    paddingHorizontal: safeSize * 0.03,
    paddingTop: safeSize * 0.03,
  },
});

export default HomeScreen;
