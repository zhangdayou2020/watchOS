import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import WearOSGestureHandler from './WearOSGestureHandler';
import { getWidthPercent, getFontSize } from '@/utils/size';

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

const CARD_SIZE = getWidthPercent(0.45);
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
    borderRadius: getWidthPercent(0.08),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: getWidthPercent(0.025),
    elevation: 3,
    padding: getWidthPercent(0.03),
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    fontSize: getFontSize(0.055),
    marginBottom: getWidthPercent(0.02),
    lineHeight: getFontSize(0.07),
    maxWidth: '90%',
  },
  cardIntegral: {
    fontSize: getFontSize(0.04),
    color: '#ff9800',
    textAlign: 'center',
    marginBottom: getWidthPercent(0.02),
    fontWeight: 'bold',
  },
  cardImgWrapper: {
    width: getWidthPercent(0.13),
    height: getWidthPercent(0.13),
    borderRadius: getWidthPercent(0.035),
    backgroundColor: '#f8fafd',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginTop: getWidthPercent(0.01),
  },
  cardImg: {
    width: getWidthPercent(0.11),
    height: getWidthPercent(0.11),
    borderRadius: getWidthPercent(0.02),
    backgroundColor: '#f8fafd',
  },
  placeholderBox: {
    width: getWidthPercent(0.11),
    height: getWidthPercent(0.11),
    borderRadius: getWidthPercent(0.02),
    backgroundColor: '#f0f2f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderIcon: {
    fontSize: getFontSize(0.07),
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