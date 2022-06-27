import { request } from '@/utils/request'
export const LoginApi = ({ username, password }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: { username, password }
  })
}
