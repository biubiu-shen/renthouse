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
    // 做完城市页面需要将其改成动态
    cityID: 'AREA|88cff55c-aaa4-e2e0',
    area: '',
    allList: {},
    allHouseList: [],
    arr: []

  },
  getters: {
  },
  mutations: {
    getUserToken (state, payload) {
      console.log(payload)
      state.token = payload
    },
    conArea (state, payload) {
      state.area = payload
    },
    // 存放找房页面关于找房条件所有详细信息
    setList (state, payload) {
      state.allList = payload
    },
    // 存放所有房子信息
    setLists (state, payload) {
      state.allHouseList = payload
    },
    // 筛选部分多选的数组存放
    setArr (state, payload) {
      if (state.arr.findIndex(i => i === payload) !== -1) {
        const index = state.arr.findIndex(i => i === payload)
        state.arr.splice(index, 1)
      } else {
        state.arr.push(payload)
      }
      if (payload === 'clear') {
        state.arr = []
      }
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
