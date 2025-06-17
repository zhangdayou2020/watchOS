import AsyncStorage from '@react-native-async-storage/async-storage';
import type {UserInfo} from '@/store/userSlice';

const USER_KEY = 'USER_INFO';

export const saveUserToStorage = async (user: UserInfo) => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserFromStorage = async (): Promise<UserInfo | null> => {
  const str = await AsyncStorage.getItem(USER_KEY);
  return str ? JSON.parse(str) : null;
};

export const clearUserFromStorage = async () => {
  await AsyncStorage.removeItem(USER_KEY);
};
