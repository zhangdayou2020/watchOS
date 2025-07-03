import request from '@/utils/request';

/**
 * 获取奖励列表参数类型
 * @property action 固定为 'getAwardListByCid'
 * @property cid 孩子ID
 */
export interface GetAwardListParams {
  action: string; // 'getAwardListByCid'
  cid: string;
}

/**
 * 获取奖励列表（根据孩子ID）
 * @param params GetAwardListParams
 * @returns Promise<any>
 * @description 获取指定孩子的奖励列表，action 通常为 'getAwardListByCid'
 */
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
