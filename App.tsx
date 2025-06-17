import * as React from 'react';
import {useEffect} from 'react';
import LoginScreen from '@/screens/LoginScreen';
import HomeScreen from '@/screens/HomeScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider, useDispatch} from 'react-redux';
import store from '@/store';
import {getUserFromStorage} from '@/utils/storage';
import {setUserInfo} from '@/store/userSlice';

const Stack = createNativeStackNavigator();

function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    // 启动时自动同步本地用户信息到 Redux
    getUserFromStorage().then(user => {
      if (user) {
        dispatch(setUserInfo(user));
      }
    });
  }, [dispatch]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}
