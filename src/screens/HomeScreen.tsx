import React, { useEffect } from 'react';
import {View, StyleSheet} from 'react-native';
import MenuPager from '@/components/MenuPager';
import { useDispatch, useSelector } from 'react-redux';
import { setTasks } from '@/store/tasksSlice';
import { getTodayTaskByChild } from '@/api/todayTask';
import type { RootState } from '@/store';
import { getAwardListByCid } from '@/api/gift';
import { setAwards } from '@/store/giftSlice';
import { getWidthPercent } from '@/utils/size';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const cid = user?.cid;
  const awards = useSelector((state: RootState) => state.gifts);

  useEffect(() => {
    console.log('HomeScreen useEffect cid:', cid);
    if (!cid) return;
    getTodayTaskByChild({ action: 'getTodyTaskByChild', cid, from: 'watch' })
      .then(res => {
        console.log('getTodayTaskByChild返回:', res);
        // 只保留type不等于S的任务
        const allTasks = Array.isArray(res.data)
          ? res.data.filter((task: any) => task.type !== 'S')
          : [];
        const unfinished = allTasks.filter((task: any) => task.complete !== 'Y');
        const finished = allTasks.filter((task: any) => task.complete === 'Y');
        dispatch(setTasks({ unfinished, finished }));
      })
      .catch(err => {
        // 可以加Toast或Alert提示
        console.log('获取任务失败', err);
      });
  }, [cid]);

  useEffect(() => {
    if (!cid) return;
    getAwardListByCid({ action: 'getAwardListByCid', cid })
      .then(res => {
        if (res.status === 'SUCCESS') {
          dispatch(setAwards(res.data));
        }
      });
  }, [cid]);

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
    paddingHorizontal: getWidthPercent(0.03),
    paddingTop: getWidthPercent(0.03),
  },
});

export default HomeScreen;
