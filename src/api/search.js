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
/**
 *ju具体的一个房子
 * @param {*} id
 * @returns
 */
export const getOneHouse = (id) => {
  return request({
    url: `/houses/${id}`
  })
}
/***
 * 按条件搜索房子
 */
export const selectHouse = ({
  area,
  subway,
  rentType,
  price,
  more,
  roomType,
  oriented,
  characteristic,
  floor
}) => {
  return request({
    url: '/houses',
    params: {
      cityId: store.state.cityID,
      area,
      subway,
      rentType,
      price,
      more,
      roomType,
      oriented,
      characteristic,
      floor,
      start: 1,
      end: 20

    }
  })
}
