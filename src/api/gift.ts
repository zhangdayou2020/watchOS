import request from '@/utils/request';

export interface GetAwardListParams {
  action: string; // 'getAwardListByCid'
  cid: string;
}

export function getAwardListByCid(params: GetAwardListParams) {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return request
    .post('/pm/php/data.php', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    .then(res => {
      console.log('getAwardListByCid success:', res);
      return res;
    })
    .catch(err => {
      console.log('[API][getAwardListByCid] 请求失败', { params, err });
      throw err;
    });
}
