import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import WearOSGestureHandler from './WearOSGestureHandler';

const { height } = Dimensions.get('window');

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
          keyExtractor={item => item.aid}
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
            <View style={[styles.page, {height}]}> 
              <View style={styles.squareCard}>
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
                    <View style={styles.placeholderBox}>
                      <Text style={styles.placeholderIcon}>🎁</Text>
                    </View>
                  </View>
                )}
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
    </WearOSGestureHandler>
  );
};

const CARD_SIZE = 150;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollIndicator: {
    position: 'absolute',
    top: 8,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  squareCard: {
    width: CARD_SIZE,
    height: CARD_SIZE,
    backgroundColor: '#fff',
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    padding: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
    lineHeight: 22,
    maxWidth: '90%',
  },
  cardIntegral: {
    fontSize: 14,
    color: '#ff9800',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  cardImgWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f8fafd',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: 4,
  },
  cardImg: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f8fafd',
  },
  placeholderBox: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: 22,
    color: '#c5cbe3',
  },
  emptyContainer: {
    flex: 1,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});

export default GiftDetail; 