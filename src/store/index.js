import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    token: '',
    cityID: 'AREA|88cff55c-aaa4-e2e0',
    cityName: '北京',
    area: '',
    community: '',
    allHouseList: [],
    arr: [],
    allCity: [],
    houseCode: '',
    more: []

  },
  getters: {
  },
  mutations: {
    // 城市id
    setCityId (state, payload) {
      state.cityID = payload.id
      state.cityName = payload.name
    },
    // 身份标识
    getUserToken (state, payload) {
      console.log(payload)
      state.token = payload
    },
    // 获取所有区域信息（网卡不想每次都请求）
    conArea (state, payload) {
      state.area = payload.communityName
      state.community = payload.community
    },
    // 存放找房页面关于找房条件所有详细信息
    // setList (state, payload) {
    //   state.allList = payload
    // },
    // 存放所有房子信息
    setLists (state, payload) {
      state.allHouseList = payload
    },
    // 筛选部分多选的数组存放
    setArr (state, payload) {
      if (state.arr.findIndex(i => i === payload.label) !== -1) {
        const index = state.arr.findIndex(i => i === payload.label)
        const index1 = state.more.findIndex(i => i === payload.value)
        state.arr.splice(index, 1)
        state.more.splice(index1, 1)
      } else {
        state.arr.push(payload.label)
        state.more.push(payload.value)
      }
      if (payload === 'clear') {
        state.arr = []
        state.more = []
      }
    },
    // 所有城市列表
    setC (state, payload) {
      state.allCity = payload
    },
    // housecode
    getHouseCode (state, payload) {
      state.houseCode = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
