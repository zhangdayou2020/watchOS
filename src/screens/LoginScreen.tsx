import React, {useState} from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import WheelPicker from 'react-native-wheel-picker-expo';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {testDeviceApi} from '@/api/device';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const DIGIT_OPTIONS = Array.from({length: 10}, (_, i) => i.toString());

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [digits, setDigits] = useState(Array(6).fill('0'));
  const [loading, setLoading] = useState(false);

  // 点击配对
  const handlePair = async () => {
    setLoading(true);
    try {
      const inputCode = digits.join('');
      const res = await testDeviceApi({action: 'login', pm: inputCode});
      if (res.status === 'SUCCESS') {
        Alert.alert('配对成功', '正在进入主页', [
          {
            text: '确定',
            onPress: () => navigation.replace('Home'),
          },
        ]);
      } else {
        Alert.alert('配对失败', res.reason || '配对码错误，请重新输入');
      }
    } catch (e) {
      Alert.alert('配对失败', '网络异常，请重试');
    }
    setLoading(false);
  };

  // 渲染6个数字滑轮
  const renderWheels = () => (
    <View style={styles.wheelRow}>
      {digits.map((digit, idx) => (
        <View key={idx} style={styles.wheelWrapper}>
          <Text style={styles.wheelDigit}>{digit}</Text>
          <WheelPicker
            selectedIndex={parseInt(digit, 10)}
            options={DIGIT_OPTIONS}
            onChange={({index}) => {
              const newDigits = [...digits];
              newDigits[idx] = index.toString();
              setDigits(newDigits);
            }}
            containerStyle={styles.wheel}
            itemStyle={styles.wheelItem}
            selectedIndicatorStyle={styles.selectedIndicator}
          />
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>请输入6位配对码</Text>
      {renderWheels()}
      <View style={styles.buttonBox}>
        <TouchableOpacity
          style={styles.pairButton}
          onPress={handlePair}
          disabled={loading}
          activeOpacity={0.7}>
          <Text style={styles.pairButtonText}>
            {loading ? '配对中...' : '配对'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    marginTop: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  wheelRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  wheelWrapper: {
    marginHorizontal: 2,
    alignItems: 'center',
  },
  wheelDigit: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: -4,
  },
  wheel: {
    width: 32,
    height: 90,
    backgroundColor: 'transparent',
  },
  wheelItem: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
  },
  selectedIndicator: {
    backgroundColor: 'transparent',
  },
  buttonBox: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  pairButton: {
    backgroundColor: '#2196f3',
    borderRadius: 22,
    paddingVertical: 8,
    paddingHorizontal: 32,
    minWidth: 100,
    alignItems: 'center',
  },
  pairButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default LoginScreen;
