import {useCallback} from 'react';
import {testDeviceApi} from '@/api/device';
import {setToken} from '@/store/tokenSlice';
import {useDispatch} from 'react-redux';

export function useLoginWithPairCode() {
  const dispatch = useDispatch();

  return useCallback(
    async (code: string) => {
    
      const res = await testDeviceApi({action: 'verifyChildCode', code: code});
      console.log('配对接口返回:', res);
      if (res.status === 'SUCCESS') {
       
        dispatch(setToken(res.data.token));
       
        return res.data;
      } else {
        console.warn('配对失败:', res.reason);
        throw new Error(res.reason || '配对码错误，请重新输入');
      }
    },
    [dispatch],
  );
}
