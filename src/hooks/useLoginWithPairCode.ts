import {useCallback} from 'react';
import {testDeviceApi} from '@/api/device';

export function useLoginWithPairCode() {
  return useCallback(
    async (code: string) => {
      const res = await testDeviceApi({action: 'verifyChildCode', code: code});
      console.log('配对接口返回:', res);
      return res; // 返回完整结构 {status, reason, data}
    },
    [],
  );
}
