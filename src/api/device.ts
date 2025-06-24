import request from '@/utils/request';

export interface TestDeviceApiParams {
  action: string;
  code: string;
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
     
      throw err;
    });
}
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
