import request from '@/utils/request';

/**
 * 设备配对接口参数类型
 * @property action 操作类型（如 'verifyChildCode'）
 * @property code 配对码
 */
export interface TestDeviceApiParams {
  action: string;
  code: string;
}

/**
 * 设备配对接口（通过配对码验证）
 * @param params TestDeviceApiParams
 * @returns Promise<any>
 * @description 用于手表端配对，action 通常为 'verifyChildCode'
 */
export function testDeviceApi(params: TestDeviceApiParams) {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value);
  });
 
  return request
    .post('/pm/php/data.php', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    .then(res => {
      console.log('api success:', res);
      return res;
    })
    .catch(err => {
     
      throw err;
    });
}

/**
 * 手表测试接口参数类型
 * @property action 操作类型
 * @property pm 设备标识或其它参数
 */
export function testWatchApi(params: {action: string; pm: string}) {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return request
    .post('/pm/php/data.php', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    .then(res => {
  
      return res;
    })
    .catch(err => {
      
      throw err;
    });
}
