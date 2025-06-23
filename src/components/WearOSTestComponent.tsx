import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import WearOSGestureHandler from './WearOSGestureHandler';

const {width, height} = Dimensions.get('window');

const WearOSTestComponent: React.FC = () => {
  const [testCount, setTestCount] = useState(0);

  const handleBack = () => {
    setTestCount(prev => prev + 1);
    console.log('WearOS手势处理器测试 - 返回触发');
  };

  return (
    <WearOSGestureHandler onBack={handleBack}>
      <View style={styles.container}>
        <Text style={styles.title}>WearOS手势测试</Text>
        <Text style={styles.instruction}>
          尝试以下方式返回：
        </Text>
        <View style={styles.instructionList}>
          <Text style={styles.instructionItem}>• 点击左侧边缘区域</Text>
          <Text style={styles.instructionItem}>• 点击右侧边缘区域</Text>
          <Text style={styles.instructionItem}>• 点击底部返回按钮</Text>
          <Text style={styles.instructionItem}>• 长按左侧区域查看提示</Text>
        </View>
        
        <View style={styles.testInfo}>
          <Text style={styles.testTitle}>测试信息:</Text>
          <Text style={styles.testCount}>返回触发次数: {testCount}</Text>
          <Text style={styles.testNote}>
            注意：这个测试不会真正返回，只会增加计数
          </Text>
        </View>
      </View>
    </WearOSGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  instructionList: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: width - 120, // 避开左右返回区域
  },
  instructionItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  testInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: width - 120,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  testCount: {
    fontSize: 18,
    color: '#1976d2',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  testNote: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default WearOSTestComponent; 