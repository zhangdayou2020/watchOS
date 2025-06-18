import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {useLoginWithPairCode} from '@/hooks/useLoginWithPairCode';
import {setUserInfo} from '@/store/userSlice';
import {saveUserToStorage} from '@/utils/storage';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
};

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['del', '0', 'ok'],
];

const LoginScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useDispatch();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const loginWithPairCode = useLoginWithPairCode();

  const handlePress = (key: string) => {
    if (key === 'del') {
      setCode(code.slice(0, -1));
    } else if (key === 'ok') {
      if (code.length === 6) {
        handlePair();
      } else {
        Alert.alert('请输入6位配对码');
      }
    } else if (code.length < 6) {
      setCode(code + key);
    }
  };

  const handlePair = async () => {
    setLoading(true);
    try {
      const userData = await loginWithPairCode(code);
      dispatch(setUserInfo(userData));
      // const tasks = await getTodayTaskByChild({});
      // dispatch(setTasks(tasks));

      saveUserToStorage(userData);
      Alert.alert('配对成功', '正在进入主页', [
        {text: '确定', onPress: () => navigation.replace('Home')},
      ]);
      console.log('配对成功，用户数据:', userData);
    } catch (e: any) {
      Alert.alert('配对失败', e.message || '网络异常，请重试');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.codeBox}>
        {Array.from({length: 6}).map((_, idx) => (
          <View key={idx} style={styles.codeDigitBox}>
            <Text style={styles.codeDigit}>{code[idx] ? code[idx] : '_'}</Text>
          </View>
        ))}
      </View>
      <View style={styles.keyboard}>
        {KEYS.map((row, rowIdx) => (
          <View key={rowIdx} style={styles.keyRow}>
            {row.map(key => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.key,
                  key === 'ok'
                    ? styles.okKey
                    : key === 'del'
                    ? styles.delKey
                    : null,
                  key === 'ok' && code.length !== 6 ? styles.keyDisabled : null,
                ]}
                onPress={() => handlePress(key)}
                disabled={loading || (key === 'ok' && code.length !== 6)}
                activeOpacity={0.7}>
                <Text
                  style={[
                    styles.keyText,
                    key === 'ok'
                      ? styles.okKeyText
                      : key === 'del'
                      ? styles.delKeyText
                      : null,
                  ]}>
                  {key === 'del' ? '⌫' : key === 'ok' ? '配对' : key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
  },
  codeBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 2,
  },
  codeDigitBox: {
    width: 18,
    height: 22,
    marginHorizontal: 1,
    borderBottomWidth: 2,
    borderColor: '#1976d2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#f8fafd',
    elevation: 1,
  },
  codeDigit: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#1976d2',
    textAlign: 'center',
  },
  keyboard: {
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  key: {
    width: 30,
    height: 30,
    marginHorizontal: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  keyText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  okKey: {
    backgroundColor: '#2196f3',
    borderRadius: 15,
  },
  okKeyText: {
    color: '#fff',
    fontSize: 14,
    letterSpacing: 1,
  },
  delKey: {
    backgroundColor: '#eee',
    borderRadius: 15,
  },
  delKeyText: {
    color: '#888',
    fontSize: 15,
  },
  keyDisabled: {
    backgroundColor: '#b0c4de',
  },
});

export default LoginScreen;
