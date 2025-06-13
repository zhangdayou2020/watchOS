import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TextInput, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [pairCode, setPairCode] = useState('');
  const [inputCode, setInputCode] = useState('');
  const [loading, setLoading] = useState(false);

  // 模拟获取配对码接口
  const fetchPairCode = async () => {
    setLoading(true);
    setTimeout(() => {
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setPairCode(code);
      setLoading(false);
    }, 1000);
  };

  // 模拟登录接口
  const handleLogin = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (inputCode.length === 6) {
        if (inputCode === pairCode) {
          Alert.alert('登录成功', '配对成功，正在进入主页', [
            {
              text: '确定',
              onPress: () => navigation.replace('Home'),
            },
          ]);
        } else {
          Alert.alert('登录失败', '配对码错误，请重新输入');
        }
      } else {
        Alert.alert('提示', '请输入6位配对码');
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wear OS 配对登录</Text>
      {!pairCode ? (
        <Button
          title={loading ? '获取中...' : '获取配对码'}
          onPress={fetchPairCode}
          disabled={loading}
        />
      ) : (
        <View style={styles.innerBox}>
          <Text style={styles.pairCode}>{pairCode}</Text>
          <Text style={styles.tip}>请让家长端输入此配对码</Text>
          <TextInput
            style={styles.input}
            value={inputCode}
            onChangeText={setInputCode}
            keyboardType="number-pad"
            maxLength={6}
            placeholder="输入家长端配对码"
            placeholderTextColor="#bbb"
          />
          <View style={styles.buttonBox}>
            <Button
              title={loading ? '登录中...' : '登录'}
              onPress={handleLogin}
              disabled={loading || inputCode.length !== 6}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  innerBox: {
    alignItems: 'center',
    width: 160,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
  pairCode: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 8,
    color: '#333',
  },
  tip: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    width: 110,
    height: 34,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 8,
    backgroundColor: '#f9f9f9',
  },
  buttonBox: {
    width: '100%',
    marginTop: 2,
  },
});

export default LoginScreen;
