import React, { useEffect, useMemo } from 'react';
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
import { usePolling } from '@/hooks/usePolling';

const { width, height } = Dimensions.get('window');
const safeSize = Math.min(width, height);

const HomeScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const cid = user?.cid;
  const awards = useSelector((state: RootState) => state.gifts);
  const isFocused = useIsFocused();

  // 用 useMemo 缓存轮询任务，避免死循环
  const pollingTasks = useMemo(() => [
    {
      key: 'tasks',
      fn: () => {
        if (!cid) return;
        console.log('[轮询] 触发 getTodayTaskByChild');
        getTodayTaskByChild({ action: 'getTodyTaskByChild', cid, from: 'watch' })
          .then(res => {
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
      },
      interval: 60 * 1000, // 1分钟
    },
    {
      key: 'rewards',
      fn: () => {
        if (!cid) return;
        console.log('[轮询] 触发 getAwardListByCid');
        getAwardListByCid({ action: 'getAwardListByCid', cid })
          .then(res => {
            if (res.status === 'SUCCESS') {
              dispatch(setAwards(res.data));
            }
          })
          .catch(err => {
            console.log('获取奖励失败', err);
          });
      },
      interval: 30 * 60 * 1000, // 30分钟
    }
  ], [cid, dispatch]);

  // 只在页面聚焦时轮询
  usePolling(isFocused ? pollingTasks : []);

  // 页面聚焦时首次请求（菜单返回时也会触发）
  useEffect(() => {
    if (!isFocused || !cid) return;
    console.log('[聚焦] HomeScreen 聚焦，主动请求 getTodayTaskByChild');
    getTodayTaskByChild({ action: 'getTodyTaskByChild', cid, from: 'watch' })
      .then(res => {
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
    console.log('[聚焦] HomeScreen 聚焦，主动请求 getAwardListByCid');
    getAwardListByCid({ action: 'getAwardListByCid', cid })
      .then(res => {
        if (res.status === 'SUCCESS') {
          dispatch(setAwards(res.data));
        }
      })
      .catch(err => {
        console.log('获取奖励失败', err);
      });
  }, [isFocused, cid, dispatch]);

  const handleMenuShow = () => {
    if (!cid) return;
    console.log('[菜单返回] 主动请求 getTodayTaskByChild');
    getTodayTaskByChild({ action: 'getTodyTaskByChild', cid, from: 'watch' })
      .then(res => {
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
    console.log('[菜单返回] 主动请求 getAwardListByCid');
    getAwardListByCid({ action: 'getAwardListByCid', cid })
      .then(res => {
        if (res.status === 'SUCCESS') {
          dispatch(setAwards(res.data));
        }
      })
      .catch(err => {
        console.log('获取奖励失败', err);
      });
  };

  return (
    <View style={styles.container}>
      <MenuPager onMenuShow={handleMenuShow} />
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
