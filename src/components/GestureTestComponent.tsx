import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {GestureDetector} from 'react-native-gesture-handler';
import {createBackSwipeGesture} from '@/utils/gestureConfig';

const {width, height} = Dimensions.get('window');

const GestureTestComponent: React.FC = () => {
  const [gestureLog, setGestureLog] = useState<string[]>([]);

  const addLog = (message: string) => {
    setGestureLog(prev => [...prev.slice(-4), message]); // 只保留最近5条
  };

  const handleBack = () => {
    addLog('左滑手势触发 - 返回');
  };

  const backSwipe = createBackSwipeGesture(handleBack);

  return (
    <GestureDetector gesture={backSwipe}>
      <View style={styles.container}>
        <Text style={styles.title}>手势测试</Text>
        <Text style={styles.instruction}>尝试左滑来测试返回手势</Text>
        
        <View style={styles.logContainer}>
          <Text style={styles.logTitle}>手势日志:</Text>
          {gestureLog.map((log, index) => (
            <Text key={index} style={styles.logItem}>
              {log}
            </Text>
          ))}
        </View>
      </View>
    </GestureDetector>
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
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  logContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: width - 40,
    maxHeight: 200,
  },
  logTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  logItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default GestureTestComponent; 