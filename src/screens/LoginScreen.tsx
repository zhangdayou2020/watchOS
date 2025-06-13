import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const CODE_EXPIRE_SECONDS = 60;

const LoginScreen = () => {
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wear OS 登录</Text>
      <Button
        title={loading ? '加载中...' : code ? '重新生成验证码' : '生成验证码'}
        onPress={generateCode}
        disabled={loading}
      />
      {code ? (
        <>
          <Text style={styles.code}>{code}</Text>
          <QRCode value={code} size={100} />
          <Text style={styles.qrTip}>
            请用家长端扫码登录（{countdown}秒后失效）
          </Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  code: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#333',
  },
  qrTip: {
    marginTop: 10,
    color: '#888',
  },
});

export default LoginScreen;
