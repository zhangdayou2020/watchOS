import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
const { width, height } = Dimensions.get('window');
const safeSize = Math.min(width, height);

interface SettingItemProps {
  onEnterDetail?: () => void;
}

const SettingItem: React.FC<SettingItemProps> = ({ onEnterDetail }) => {
  return (
    <TouchableOpacity
      onPress={onEnterDetail}
      style={[styles.entry, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}
      activeOpacity={0.7}
    >
      <Text style={styles.title}>设置</Text>
      <Icon
        name="chevron-right"
        size={safeSize * 0.07}
        color="#2196f3"
        style={{ marginLeft: safeSize * 0.03 }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  entry: {
    padding: safeSize * 0.06,
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

export default SettingItem;
