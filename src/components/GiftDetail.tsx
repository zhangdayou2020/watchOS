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
              <View style={styles.contentBox}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                  {item.aname || '无奖励名'}
                </Text>
                <View style={{ height: 10 }} />
                <Text style={styles.integral}>+{item.integral} 积分</Text>
                {item.img ? (
                  <Image
                    source={{ uri: item.img.startsWith('http') ? item.img : `https://pmuat.handlebook.com.hk/pm/${item.img.replace(/\\/g, '/')}` }}
                    style={styles.giftImg}
                    resizeMode="contain"
                  />
                ) : null}
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
    paddingHorizontal: 35,
  },
  contentBox: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    minHeight: 120,
    paddingTop: 60,
    paddingBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 22,
    maxWidth: '90%',
    alignSelf: 'center',
    fontSize: 20,
  },
  integral: {
    fontSize: 16,
    color: '#ff9800',
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '500',
  },
  giftImg: {
    width: 80,
    height: 80,
    marginTop: 10,
    borderRadius: 16,
    backgroundColor: '#fff',
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