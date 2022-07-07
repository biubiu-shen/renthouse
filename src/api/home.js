/**
 * 轮播图
 */
import store from '@/store'
import request from '@/utils/request'
export const swipe = () => {
  return request({
    url: '/home/swiper'
  })
}
/**
 *首页的租房小组
 * @returns
 */
export const rentGroups = () => {
  return request({
    url: '/home/groups',
    area: store.state.cityID
  })
}
/**
 *城市列表所有一级城市
 * @returns
 */
export const SearchCity = () => {
  return request({
    url: '/area/city',
    params: {

      level: 1
    }
  })
}
/**
 *
 * @returns 城市列表的热门城市
 */
export const hotCity = () => {
  return request({
    url: '/area/hot'
  })
}
/**
 *
 * @returns
 */
export const houseInfo = () => {
  return request({
    url: '/houses/params'
  })
}
