import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import WearOSGestureHandler from './WearOSGestureHandler';

const { width, height } = Dimensions.get('window');
const isRound = Math.abs(width - height) < 10; // 近似判断为圆盘
const safeSize = isRound ? Math.min(width, height) : Math.max(width, height);
const ITEM_HEIGHT = isRound ? safeSize - safeSize * 0.12 : height * 0.88;

const GiftDetail: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const gifts = useSelector((state: RootState) => state.gifts);
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onMomentumScrollEnd = (e: any) => {
    const idx = Math.round(e.nativeEvent.contentOffset.y / height);
    setCurrentIndex(idx);
  };

  return (
    <WearOSGestureHandler onBack={onBack}>
      <View style={styles.container}>
        {/* 顶部编号指示器 */}
        {gifts && gifts.length > 1 && (
          <View style={styles.scrollIndicator}>
            <Text style={styles.scrollIndicatorText}>
              {currentIndex + 1} / {gifts.length}
            </Text>
          </View>
        )}
        <FlatList
          ref={flatListRef}
          data={gifts}
          keyExtractor={(item, index) => item.aid ? String(item.aid) : String(index)}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          scrollEventThrottle={16}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>暂无奖励</Text>
            </View>
          }
          renderItem={({item}) => (
            <View style={{height: ITEM_HEIGHT, alignItems: 'center', justifyContent: 'center', width: '100%', backgroundColor: 'transparent'}}>
              <Text style={styles.cardTitle} numberOfLines={2} ellipsizeMode="tail">
                {item.aname || '无奖励名'}
              </Text>
              <Text style={styles.cardIntegral}>+{item.integral} 积分</Text>
              {item.img ? (
                <View style={styles.cardImgWrapper}>
                  <Image
                    source={{ uri: item.img.startsWith('http') ? item.img : `https://pmuat.handlebook.com.hk/pm/${item.img.replace(/\\/g, '/')}` }}
                    style={[styles.cardImg, { width: isRound ? safeSize * 0.18 : width * 0.22, height: isRound ? safeSize * 0.18 : width * 0.22, borderRadius: isRound ? safeSize * 0.04 : width * 0.04 }]}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View style={styles.cardImgWrapper}>
                  <View style={{ width: isRound ? safeSize * 0.18 : width * 0.22, height: isRound ? safeSize * 0.18 : width * 0.22, borderRadius: isRound ? safeSize * 0.04 : width * 0.04, backgroundColor: '#f0f2f5', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: isRound ? safeSize * 0.11 : width * 0.13, color: '#c5cbe3' }}>🎁</Text>
                  </View>
                </View>
              )}
            </View>
          )}
          getItemLayout={(_, index) => ({
            length: height,
            offset: height * index,
            index,
          })}
        />
        <Text style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 13,
          color: 'red',
          zIndex: 100,
          backgroundColor: 'rgba(255,255,255,0.7)',
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 8,
          overflow: 'hidden',
        }}>
          width: {width}, height: {height}, safeSize: {safeSize} | {isRound ? '圆盘' : '方盘'}
        </Text>
      </View>
    </WearOSGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollIndicator: {
    position: 'absolute',
    top: isRound ? safeSize * 0.02 : height * 0.02,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: isRound ? safeSize * 0.03 : width * 0.03,
    paddingHorizontal: isRound ? safeSize * 0.03 : width * 0.03,
    paddingVertical: isRound ? safeSize * 0.012 : height * 0.012,
    zIndex: 16,
  },
  scrollIndicatorText: {
    color: '#fff',
    fontSize: isRound ? safeSize * 0.04 : width * 0.045,
    fontWeight: 'bold',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    padding: isRound ? safeSize * 0.06 : width * 0.06,
  },
  squareCard: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 0,
    backgroundColor: 'transparent',
    elevation: 0,
    shadowColor: 'transparent',
    shadowOpacity: 0,
    shadowRadius: 0,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    fontSize: isRound ? safeSize * 0.07 : width * 0.08,
    marginBottom: isRound ? safeSize * 0.03 : height * 0.03,
    lineHeight: isRound ? safeSize * 0.09 : height * 0.09,
    maxWidth: '90%',
  },
  cardIntegral: {
    fontSize: isRound ? safeSize * 0.05 : width * 0.055,
    color: '#ff9800',
    textAlign: 'center',
    marginBottom: isRound ? safeSize * 0.03 : height * 0.03,
    fontWeight: 'bold',
  },
  cardImgWrapper: {
    width: isRound ? safeSize * 0.22 : width * 0.25,
    height: isRound ? safeSize * 0.22 : width * 0.25,
    borderRadius: isRound ? safeSize * 0.06 : width * 0.06,
    backgroundColor: '#f8fafd',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: isRound ? safeSize * 0.02 : height * 0.02,
  },
  cardImg: {
    borderRadius: isRound ? safeSize * 0.04 : width * 0.04,
    backgroundColor: '#f8fafd',
  },
  emptyContainer: {
    flex: 1,
    height: isRound ? safeSize : height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: isRound ? 18 : 20,
    color: '#888',
  },
});

export default GiftDetail; 