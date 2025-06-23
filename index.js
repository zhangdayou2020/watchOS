/**
 * @format
 */

import 'react-native-gesture-handler'; // 必须在最顶部导入
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
