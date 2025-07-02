import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { clearUserInfo } from '@/store/userSlice';
import { clearTasks } from '@/store/tasksSlice';
import { clearAwards } from '@/store/giftSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const safeSize = Math.min(width, height);

interface SettingDetailProps {
  onBack?: () => void;
}

const SettingDetail: React.FC<SettingDetailProps> = ({ onBack }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = async () => {
    Alert.alert(
      '确认退出',
      '确定要退出登录吗？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '确定',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            dispatch(clearUserInfo());
            dispatch(clearTasks());
            dispatch(clearAwards());
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' as never }],
            });
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={onBack} style={styles.arrowBtn}>
          <Icon name="chevron-left" size={safeSize * 0.08} color="#2196f3" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.centerBtn}
          activeOpacity={0.7}
        >
          <Text style={styles.title}>退出登录</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogout}
          style={styles.arrowBtn}
          activeOpacity={0.7}
        >
          <Icon
            name="chevron-right"
            size={safeSize * 0.07}
            color="#2196f3"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  arrowBtn: {
    padding: safeSize * 0.04,
  },
  centerBtn: {
    paddingVertical: safeSize * 0.06,
    paddingHorizontal: safeSize * 0.12,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7,
  },
  title: {
    fontSize: safeSize * 0.07,
    fontWeight: 'bold',
    color: '#1976d2',
  },
});

export default SettingDetail; 