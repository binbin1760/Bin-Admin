import request from '@/unitls/request'

export function getPorjectList(params: { page: number; pageSize: number }) {
  return request.get('/api/getProjectList', params)
}

export function updateSheetData(parmas: Array<Record<string, any>>) {
  return request.post('/api/updateProjectList', parmas)
}
