import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import WearOSGestureHandler from './WearOSGestureHandler';

const { width, height } = Dimensions.get('window');
const safeSize = Math.min(width, height);
const ITEM_HEIGHT = safeSize - safeSize * 0.12;

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
                    style={styles.cardImg}
                    resizeMode="contain"
                  />
                </View>
              ) : (
                <View style={styles.cardImgWrapper}>
                  <View style={{ width: safeSize * 0.18, height: safeSize * 0.18, borderRadius: safeSize * 0.04, backgroundColor: '#f0f2f5', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: safeSize * 0.11, color: '#c5cbe3' }}>🎁</Text>
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
          width: {width}, height: {height}, safeSize: {safeSize}
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
    top: safeSize * 0.02,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: safeSize * 0.03,
    paddingHorizontal: safeSize * 0.03,
    paddingVertical: safeSize * 0.012,
    zIndex: 16,
  },
  scrollIndicatorText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 'bold',
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    padding: safeSize * 0.06,
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
    fontSize: safeSize * 0.07,
    marginBottom: safeSize * 0.03,
    lineHeight: safeSize * 0.09,
    maxWidth: '90%',
  },
  cardIntegral: {
    fontSize: safeSize * 0.05,
    color: '#ff9800',
    textAlign: 'center',
    marginBottom: safeSize * 0.03,
    fontWeight: 'bold',
  },
  cardImgWrapper: {
    width: safeSize * 0.22,
    height: safeSize * 0.22,
    borderRadius: safeSize * 0.06,
    backgroundColor: '#f8fafd',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: safeSize * 0.02,
  },
  cardImg: {
    width: safeSize * 0.18,
    height: safeSize * 0.18,
    borderRadius: safeSize * 0.04,
    backgroundColor: '#f8fafd',
  },
  emptyContainer: {
    flex: 1,
    height: safeSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default GiftDetail; 