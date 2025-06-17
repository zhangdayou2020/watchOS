import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, Alert} from 'react-native';
import PagerView from 'react-native-pager-view';
import {testWatchApi} from '@/api/device';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';

const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const [_page, setPage] = useState(0);
  const token = useSelector((state: RootState) => state.token.token);

  useEffect(() => {
    console.log('当前 token:', token);
    // 这里 pm 参数请替换为实际需要的配对码
    testWatchApi({action: 'testWatchAPI', pm: '603434'})
      .then(res => {
        Alert.alert('验证token接口返回', JSON.stringify(res));
        console.log('验证token接口返回:', res);
      })
      .catch(err => {
        Alert.alert('验证token接口出错', err?.message || '未知错误');
        console.log('验证token接口出错:', err);
      });
  }, [token]);

  return (
    <PagerView
      style={styles.pagerView}
      initialPage={0}
      onPageSelected={e => setPage(e.nativeEvent.position)}>
      <View key="1" style={styles.page}>
        <Text style={styles.title}>未完成任务</Text>
        <Text style={styles.content}>暂无未完成任务</Text>
      </View>
      <View key="2" style={styles.page}>
        <Text style={styles.title}>已完成任务</Text>
        <Text style={styles.content}>暂无已完成任务</Text>
      </View>
      <View key="3" style={styles.page}>
        <Text style={styles.title}>剩余GP</Text>
        <Text style={styles.gp}>100</Text>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: '#666',
  },
  gp: {
    fontSize: 36,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
