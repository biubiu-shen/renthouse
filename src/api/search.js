import request from '@/utils/request'
import store from '@/store/index'
export const getSearch = ({ name, id }) => {
  return request({
    url: '/area/community',
    params: { name, id }
  })
}
/**
 *找房下拉菜单区域部分
 * @returns
 */
export const searchAreaFind = () => {
  return request({
    url: '/houses/condition',
    params: {
      id: store.state.cityID
    }
  })
}
/**
 *查询该地区所有房屋
 * @returns
 */
export const getHouseListFind = () => {
  return request({
    url: '/houses',
    params: {
      cityId: store.state.cityID
    }
  })
}
