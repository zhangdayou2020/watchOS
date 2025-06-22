import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import type {RootState} from '@/store';

const {height} = Dimensions.get('window');

const UnfinishedTaskDetail: React.FC<{onBack: () => void}> = ({onBack}) => {
  const tasks = useSelector((state: RootState) => state.tasks.unfinished);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // 👇 左滑手势：用于触发返回菜单
  const backSwipe = Gesture.Pan().onEnd(e => {
    if (
      e.translationX < -30 &&
      Math.abs(e.translationX) > Math.abs(e.translationY)
    ) {
      onBack();
    }
  });

  return (
    <GestureDetector gesture={backSwipe}>
      <View style={styles.container}>
        <MaterialIcons name="home" size={40} color="#1976d2" />
        {/* 返回菜单按钮 */}
        <TouchableOpacity
          style={styles.backBtn}
          onPress={onBack}
          activeOpacity={0.7}>
          <MaterialIcons name="arrow-back-ios" size={20} color="#1976d2" />
          <Text style={styles.backText}>返回菜单</Text>
        </TouchableOpacity>
        {/* 上箭头 */}
        <TouchableOpacity
          style={[styles.arrowBtn, styles.arrowUp]}
          onPress={() => scrollToIndex(currentIndex - 1)}
          disabled={currentIndex === 0}
          activeOpacity={0.7}>
          <MaterialIcons
            name="expand-less"
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
            name="expand-more"
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
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backBtn: {
    position: 'absolute',
    top: 18,
    left: 18,
    zIndex: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: '#1976d2',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
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
    marginLeft: -22,
    backgroundColor: 'rgba(25, 118, 210, 0.13)',
    borderRadius: 22,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    shadowColor: '#1976d2',
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  arrowUp: {
    top: 38,
  },
  arrowDown: {
    bottom: 38,
  },
  page: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 12,
    marginVertical: 8,
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
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  desc: {
    fontSize: 18,
    color: '#666',
  },
});

export default UnfinishedTaskDetail;
