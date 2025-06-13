import request from '@/utils/request';

export function testDeviceApi(params: {action: string; pm: string}) {
  const formData = new FormData();
  Object.entries(params).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return request.post('/pm/php/data.php', formData, {
    headers: {'Content-Type': 'multipart/form-data'},
  });
}
