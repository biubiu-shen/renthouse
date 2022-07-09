// import store from '@/store'
import request from '@/utils/request'
/**
 *发布房屋
 * @param {*} param0
 * @returns
 */
export const sellHouse = ({ title, description, houseImg, oriented, supporting, price, roomType, size, floor, community }) => {
  return request({
    method: 'post',
    url: '/user/houses',
    data: {
      title,
      description,
      houseImg,
      oriented,
      supporting,
      price,
      roomType,
      size,
      floor,
      community
    }
  })
}
/**
 *
 * @returns 查看收藏列表
 */
export const collectHouse = () => {
  return request({
    url: '/user/favorites'
  })
}
/**
 *
 * @returns 查看已发布的房源
 */
export const lookSellHouse = () => {
  return request({
    url: '/user/houses'
  })
}
/**
 *收藏房屋
 * @param {*} id
 * @returns
 */
export const houseCollect = (id) => {
  return request({
    method: 'post',
    url: `/user/favorites/${id}`
  })
}
/**
 *取消收藏
 * @param {*} id
 * @returns
 */
export const delCollect = (id) => {
  return request({
    method: 'delete',
    url: `/user/favorites/${id}`
  })
}
/**
 *查看房屋是否被收藏
 * @param {*} id
 * @returns
 */
export const seeCollect = (id) => {
  return request({
    url: `/user/favorites/${id}`
  })
}
/**
 *houseImg 需要formdata格式
 * @param {*} file
 * @returns
 */
export const houseImg = (data) => {
  return request({
    method: 'post',
    url: '/houses/image',
    data// 直接传formdate实例即可，实例在append的时候会推入对接口相关的属性名
  })
}
