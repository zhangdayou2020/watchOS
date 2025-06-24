import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const getWidthPercent = (percent: number) => width * percent;
export const getHeightPercent = (percent: number) => height * percent;
export const getFontSize = (percent: number) => width * percent;

// 判断是否为圆形表盘（宽高比接近1且宽高差较小）
export const isRoundScreen = Math.abs(width - height) < 10;

export { width, height }; 