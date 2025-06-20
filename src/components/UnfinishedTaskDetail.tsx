import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  PanResponder,
} from 'react-native';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import type {RootState} from '@/store';

const {height} = Dimensions.get('window');

const UnfinishedTaskDetail: React.FC<{onBack: () => void}> = ({onBack}) => {
  const tasks = useSelector((state: RootState) => state.tasks.unfinished);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 手势优化：只在靠近屏幕左侧1/3区域时才触发左滑返回，避免误触
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) =>
        gestureState.moveX < 120 &&
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        gestureState.dx < -10,
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.moveX < 120 && gestureState.dx < -30) {
          onBack();
        }
      },
    }),
  ).current;

  const onMomentumScrollEnd = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.y / height);
    setCurrentIndex(idx);
  };

  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < tasks.length) {
      flatListRef.current?.scrollToIndex({index, animated: true});
      setCurrentIndex(index);
    }
  };

  return (
    <View
      style={{flex: 1, backgroundColor: '#fff'}}
      {...panResponder.panHandlers}>
      {/* 返回菜单按钮 */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={onBack}
        activeOpacity={0.7}>
        <MaterialIcons name="arrow-back-ios" size={22} color="#1976d2" />
        <Text style={styles.backText}>返回菜单</Text>
      </TouchableOpacity>
      {/* 上箭头 */}
      <TouchableOpacity
        style={[styles.arrowBtn, styles.arrowUp]}
        onPress={() => scrollToIndex(currentIndex - 1)}
        disabled={currentIndex === 0}
        activeOpacity={0.7}>
        <MaterialIcons
          name="keyboard-arrow-up"
          size={32}
          color={currentIndex === 0 ? '#ccc' : '#1976d2'}
        />
      </TouchableOpacity>
      {/* 下箭头 */}
      <TouchableOpacity
        style={[styles.arrowBtn, styles.arrowDown]}
        onPress={() => scrollToIndex(currentIndex + 1)}
        disabled={currentIndex === tasks.length - 1}
        activeOpacity={0.7}>
        <MaterialIcons
          name="keyboard-arrow-down"
          size={32}
          color={currentIndex === tasks.length - 1 ? '#ccc' : '#1976d2'}
        />
      </TouchableOpacity>
      {/* 纵向分页任务详情 */}
      <FlatList
        ref={flatListRef}
        data={tasks}
        keyExtractor={item => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        renderItem={({item}) => (
          <View style={[styles.page, {height}]}>
            <View style={styles.contentBox}>
              <Text style={styles.title}>{item.title}</Text>
              {item.desc && <Text style={styles.desc}>{item.desc}</Text>}
            </View>
          </View>
        )}
        getItemLayout={(_, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  backBtn: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  backText: {
    fontSize: 16,
    color: '#1976d2',
    fontWeight: 'bold',
    marginLeft: 2,
  },
  arrowBtn: {
    position: 'absolute',
    left: '50%',
    marginLeft: -18,
    backgroundColor: 'rgba(25, 118, 210, 0.08)',
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  arrowUp: {
    top: 60,
  },
  arrowDown: {
    bottom: 60,
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 8,
    marginVertical: 4,
    elevation: 2,
    flex: 1,
  },
  contentBox: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    minHeight: 120,
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
