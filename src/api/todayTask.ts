import request from '@/utils/request';

export interface GetTodayTaskParams {
  action: string; // 'getTodyTaskByChild'
  cid: string;
  from: string; // 'watch'
}

export function getTodayTaskByChild(params: GetTodayTaskParams) {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return request
    .post('/pm/php/data.php', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    .then(res => {
      console.log('getTodayTaskByChild success:', res);
      return res;
    })
    .catch(err => {
      console.log('[API][getTodayTaskByChild] 请求失败', { params, err });
      throw err;
    });
}
