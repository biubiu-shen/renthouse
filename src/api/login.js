import request from '@/utils/request'
// import store from '@/store'
export const LoginApi = ({ username, password }) => {
  return request({
    method: 'POST',
    url: '/user/login',
    data: { username, password }
  })
}
/**
 *
 * @returns 用户信息
 */
export const getUserInfo = () => {
  return request({
    url: '/user'
    // headers: {
    //   authorization: store.state.token
    // }
    // token: store.state.token

  })
}
