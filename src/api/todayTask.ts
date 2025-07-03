import request from '@/utils/request';

/**
 * 获取今日任务参数类型
 * @property action 固定为 'getTodyTaskByChild'
 * @property cid 孩子ID
 * @property from 来源（如 'watch'）
 */
export interface GetTodayTaskParams {
  action: string; // 'getTodyTaskByChild'
  cid: string;
  from: string; // 'watch'
}

/**
 * 获取今日任务列表（根据孩子ID）
 * @param params GetTodayTaskParams
 * @returns Promise<any>
 */
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

/**
 * 完成任务操作参数类型
 * @property action 固定为 'operateComplete'
 * @property cid 孩子ID
 * @property from 来源（如 'watch'）
 * @property tid 任务ID
 * @property status 状态（如 'C' 表示完成）
 */
export interface OperateCompleteParams {
  action: string; // 'operateComplete'
  cid: string;
  from: string; // 'watch'
  tid: string;
  status: string; // 'C'
}

/**
 * 完成任务操作（手表端）
 * @param params OperateCompleteParams
 * @returns Promise<any>
 * @description 提交任务完成操作，需传递 action/cid/from/tid/status 五个参数
 */
export function operateComplete(params: OperateCompleteParams) {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value);
  });
  // 调试用，打印 cid 和 tid
  console.log('[operateComplete] cid:', params.cid, 'tid:', params.tid);
  return request
    .post('/pm/php/data.php', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    })
    .then(res => {
      console.log('operateComplete success:', res);
      return res;
    })
    .catch(err => {
      console.log('[API][operateComplete] 请求失败', { params, err });
      throw err;
    });
}
