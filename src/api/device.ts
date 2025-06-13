import request from '@/utils/request';

export interface TestDeviceApiParams {
  action: string;
  pm: string;
}

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
      console.log('api error:', err);
      throw err;
    });
}
