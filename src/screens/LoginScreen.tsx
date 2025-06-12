import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // 新增

const LoginScreen = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const generateCode = () => {
    setLoading(true);
    setTimeout(() => {
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      setCode(newCode);
      setLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wear OS 登录</Text>
      <Button
        title={loading ? '加载中...' : '生成验证码'}
        onPress={generateCode}
        disabled={loading}
      />
      {code ? (
        <>
          <Text style={styles.code}>{code}</Text>
          <QRCode value={code} size={180} />
          <Text style={styles.qrTip}>请用家长端扫码登录</Text>
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
