import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import WearOSGestureHandler from './WearOSGestureHandler';

const { width, height } = Dimensions.get('window');
const isRound = Math.abs(width - height) < 10; // 近似判断为圆盘
const safeSize = isRound ? Math.min(width, height) : Math.max(width, height);
const ITEM_HEIGHT = height; // 统一使用屏幕高度

const GiftDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const gifts = useSelector((state: RootState) => state.gifts);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onMomentumScrollEnd = (e: any) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setCurrentIndex(index);
    
    // 确保滚动到精确位置
    if (Math.abs(offsetY - index * ITEM_HEIGHT) > 1) {
      flatListRef.current?.scrollToOffset({
        offset: index * ITEM_HEIGHT,
        animated: true
      });
    }
  };

  return (
    <WearOSGestureHandler onBack={onBack}>
      <View style={{ flex: 1 }}>
        {/* 指示器绝对定位在顶部 */}
        {gifts && gifts.length > 0 && (
          <View style={{ 
            position: 'absolute', 
            top: safeSize * 0.06, 
            left: 0, 
            right: 0, 
            alignItems: 'center', 
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            paddingHorizontal: safeSize * 0.03,
            paddingVertical: safeSize * 0.01,
            borderRadius: safeSize * 0.02
          }}>
            <Text style={styles.scrollIndicatorText}>
              {currentIndex + 1} / {gifts.length}
            </Text>
          </View>
        )}
        <FlatList
          ref={flatListRef}
          data={gifts}
          keyExtractor={(item, index) => item.id ? String(item.id) : String(index)}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          style={{flex: 1}}
          snapToInterval={ITEM_HEIGHT}
          snapToAlignment="start"
          decelerationRate="fast"
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>没有奖励</Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={{ height: ITEM_HEIGHT, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{alignItems: 'center', justifyContent: 'center', width: '100%'}}>
                <Image
                  source={item.img ? { uri: item.img } : require('@/assets/images/reward.png')}
                  style={{
                    width: isRound ? safeSize * 0.18 : width * 0.22,
                    height: isRound ? safeSize * 0.18 : width * 0.22,
                    marginBottom: safeSize * 0.03,
                  }}
                  resizeMode="contain"
                />
                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                  {item.giftName || item.title || '无奖励名'}
                </Text>
                <Text style={styles.description}>{item.giftDesc || item.desc || '无描述'}</Text>
                <Text style={styles.points}>{item.giftPoints || item.points || 0} 积分</Text>
              </View>
            </View>
          )}
          getItemLayout={(_, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>
    </WearOSGestureHandler>
  );
};

const styles = StyleSheet.create({
  scrollIndicatorText: {
    color: '#fff',
    fontSize: isRound ? safeSize * 0.04 : width * 0.045,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    height: ITEM_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: isRound ? safeSize * 0.06 : width * 0.07,
    color: '#888',
  },
  giftImage: {
    width: isRound ? safeSize * 0.18 : width * 0.22,
    height: isRound ? safeSize * 0.18 : width * 0.22,
  },
  title: {
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: isRound ? safeSize * 0.02 : height * 0.02,
    lineHeight: isRound ? safeSize * 0.06 : height * 0.06,
    maxWidth: '90%',
    alignSelf: 'center',
    fontSize: isRound ? safeSize * 0.055 : width * 0.06,
  },
  description: {
    fontSize: isRound ? safeSize * 0.045 : width * 0.05,
    color: '#888',
    textAlign: 'center',
    marginBottom: isRound ? safeSize * 0.01 : height * 0.01,
  },
  points: {
    fontSize: isRound ? safeSize * 0.045 : width * 0.05,
    color: '#ff9800',
    textAlign: 'center',
    fontWeight: '500',
  },
});

export default GiftDetail; 