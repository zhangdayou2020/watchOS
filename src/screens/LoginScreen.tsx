import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import QRCode from 'react-native-qrcode-svg';

// 定义导航参数类型
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const CODE_EXPIRE_SECONDS = 60;

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && code) {
      setCode('');
    }
    return () => clearTimeout(timer);
  }, [countdown, code]);

  const generateCode = () => {
    setLoading(true);
    setTimeout(() => {
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      setCode(newCode);
      setCountdown(CODE_EXPIRE_SECONDS);
      setLoading(false);
    }, 1000);
  };

  // 模拟扫码成功
  const mockScanSuccess = () => {
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wear OS 登录</Text>
      <Button
        title={loading ? '加载中...' : code ? '重新生成验证码' : '生成验证码'}
        onPress={generateCode}
        disabled={loading}
      />
      {code ? (
        <View style={styles.qrBox}>
          <Text style={styles.code}>{code}</Text>
          <QRCode value={code} size={80} />
          <Text style={styles.qrTip}>
            请用家长端扫码登录（{countdown}秒后失效）
          </Text>
          <View style={styles.mockScanButtonContainer}>
            <Button
              title="模拟扫码成功"
              onPress={mockScanSuccess}
              color="#4CAF50"
            />
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  qrBox: {
    alignItems: 'center',
    marginTop: 16,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    width: 180,
  },
  code: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  qrTip: {
    marginTop: 8,
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  mockScanButtonContainer: {
    marginTop: 10,
    width: '90%',
  },
});

export default LoginScreen;
