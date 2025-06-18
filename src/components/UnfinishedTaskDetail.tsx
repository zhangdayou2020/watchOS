import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  PanResponder,
} from 'react-native';
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';

const {height} = Dimensions.get('window');

const UnfinishedTaskDetail: React.FC<{onBack: () => void}> = ({onBack}) => {
  const tasks = useSelector((state: RootState) => state.tasks.unfinished);

  // 监听左滑手势返回菜单
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        gestureState.dx < -20,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -40) {
          onBack();
        }
      },
    }),
  ).current;

  return (
    <View style={{flex: 1}} {...panResponder.panHandlers}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height * 0.7}
        decelerationRate="fast"
        renderItem={({item}) => (
          <View style={styles.page}>
            <Text style={styles.title}>{item.title}</Text>
            {item.desc && <Text style={styles.desc}>{item.desc}</Text>}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    height: height * 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    color: '#666',
  },
});

export default UnfinishedTaskDetail;
