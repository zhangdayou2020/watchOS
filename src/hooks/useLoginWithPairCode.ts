import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {testDeviceApi} from '@/api/device';
import {setUserInfo} from '@/store/userSlice';
import type {AppDispatch} from '@/store';

export function useLoginWithPairCode() {
  const dispatch = useDispatch<AppDispatch>();
  
  return useCallback(
    async (code: string) => {
      const res = await testDeviceApi({action: 'verifyChildCode', code: code});
      console.log('配对接口返回:', res);
      
      // 如果配对成功，直接在这里处理用户信息设置
      if (res.status === 'SUCCESS' && res.data) {
        dispatch(setUserInfo(res.data));
      }
      
      return res; // 返回完整结构 {status, reason, data}
    },
    [dispatch],
  );
}
