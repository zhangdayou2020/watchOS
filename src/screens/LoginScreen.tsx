import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useDispatch} from 'react-redux';
import {useLoginWithPairCode} from '@/hooks/useLoginWithPairCode';
import {setUserInfo} from '@/store/userSlice';
import {saveUserToStorage} from '@/utils/storage';
import { getWidthPercent, getHeightPercent, getFontSize } from '@/utils/size';
import Toast from 'react-native-root-toast';

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

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const isRound = Math.abs(SCREEN_WIDTH - SCREEN_HEIGHT) < 10; // 近似判断为圆盘
const safeSize = isRound ? Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) : Math.max(SCREEN_WIDTH, SCREEN_HEIGHT);
const CODE_BOX_WIDTH = isRound ? safeSize * 0.6 : SCREEN_WIDTH * 0.8;
const CODE_DIGIT_SIZE = isRound ? safeSize * 0.075 : SCREEN_WIDTH * 0.09;
const KEY_SIZE = isRound ? safeSize * 0.13 : SCREEN_WIDTH * 0.18;
const KEY_FONT_SIZE = isRound ? safeSize * 0.055 : SCREEN_WIDTH * 0.06;
const CODE_FONT_SIZE = isRound ? safeSize * 0.055 : SCREEN_WIDTH * 0.06;

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
      const res = await loginWithPairCode(code);
      console.log('配对接口返回:', res);
      if (res.status === 'SUCCESS') {
        dispatch(setUserInfo(res.data));
        saveUserToStorage(res.data);
        Toast.show('配对成功，正在进入主页', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
        });
        setTimeout(() => {
          navigation.replace('Home');
        }, 1500);
        console.log('配对成功，用户数据:', res.data);
      } else {
        Alert.alert('配对失败', res.reason || '网络异常，请重试');
      }
    } catch (e: any) {
      Alert.alert('配对失败', e.message || '网络异常，请重试');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
                    { width: KEY_SIZE, height: KEY_SIZE, borderRadius: KEY_SIZE / 2 },
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
                      { fontSize: KEY_FONT_SIZE },
                    ]}>
                    {key === 'del' ? '⌫' : key === 'ok' ? '配对' : key}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </View>
      {/* 尺寸调试信息 */}
      <View
        pointerEvents="none"
        style={{
          position: 'absolute',
          bottom: 10,
          left: 0,
          right: 0,
          alignItems: 'center',
          opacity: 0.5,
          zIndex: 999,
        }}
      >
        <Text style={{ fontSize: 12, color: '#333' }}>
          width: {SCREEN_WIDTH} | height: {SCREEN_HEIGHT} | safeSize: {safeSize} | {isRound ? '圆盘' : '方盘'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: isRound ? safeSize * 0.07 : SCREEN_WIDTH * 0.05,
  },
  codeBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: isRound ? safeSize * 0.04 : SCREEN_HEIGHT * 0.03,
    marginTop: isRound ? safeSize * 0.10 : SCREEN_HEIGHT * 0.08,
    width: CODE_BOX_WIDTH,
  },
  codeDigitBox: {
    width: CODE_DIGIT_SIZE,
    height: CODE_DIGIT_SIZE * 1.2,
    marginHorizontal: isRound ? safeSize * 0.01 : SCREEN_WIDTH * 0.01,
    borderBottomWidth: 2,
    borderColor: '#1976d2',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#f8fafd',
    elevation: 1,
  },
  codeDigit: {
    fontSize: CODE_FONT_SIZE,
    fontWeight: 'bold',
    color: '#1976d2',
    textAlign: 'center',
  },
  keyboard: {
    width: CODE_BOX_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: isRound ? safeSize * 0.01 : SCREEN_HEIGHT * 0.01,
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: isRound ? safeSize * 0.025 : SCREEN_HEIGHT * 0.015,
  },
  key: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
  },
  keyText: {
    fontWeight: 'bold',
    color: '#1976d2',
  },
  okKey: {
    backgroundColor: '#2196f3',
  },
  okKeyText: {
    color: '#fff',
    fontSize: KEY_FONT_SIZE * 0.93,
  },
  delKey: {
    backgroundColor: '#eee',
  },
  delKeyText: {
    color: '#888',
  },
  keyDisabled: {
    backgroundColor: '#b0c4de',
  },
});

export default LoginScreen;
