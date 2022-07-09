<!-- eslint-disable vue/no-side-effects-in-computed-properties -->
<template>
  <div class="mmm">
    <div class="nav-bar-title">
      <van-icon name="arrow-left" @click="$router.push('/home')" />
      <div class="title">
        <span class="area-find" @click="$router.push('/city')"
          >{{ $store.state.cityName }}<van-icon name="arrow-down"
        /></span>
        <span><van-icon name="search" />请输入小区地址</span>
      </div>

      <van-icon name="location-o" />
    </div>
    <!-- tabbar -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" title="区域" ref="item">
        <van-picker
          :columns="columns"
          value-key="label"
          :columns-placeholder="['请选择', '请选择', '请选择']"
        >
          <template #columns-bottom>
            <btn @cancel="$refs.item.toggle()"></btn>
          </template>
        </van-picker>
      </van-dropdown-item>

      <van-dropdown-item v-model="value2" title="方式">
        <van-picker :columns="allList.rentType" value-key="label" ref="item1">
          <template #columns-bottom>
            <btn @cancel="$refs.item1.toggle()"></btn>
          </template>
        </van-picker>
      </van-dropdown-item>
      <van-dropdown-item v-model="value3" title="租金">
        <van-picker :columns="allList.price" value-key="label" ref="item2">
          <template #columns-bottom>
            <btn @cancel="$refs.item2.toggle()"></btn>
          </template>
        </van-picker>
      </van-dropdown-item>
      <van-dropdown-item v-model="value4">
        <template #title>
          <span @click="showPop">筛选</span>
        </template>
      </van-dropdown-item>
    </van-dropdown-menu>
    <van-popup v-model="show" position="right" :style="{ width: '80%' }">
      <selectSkill label="户型" :list="allList.roomType"></selectSkill>
      <selectSkill label="朝向" :list="allList.oriented"></selectSkill>
      <selectSkill label="楼层" :list="allList.floor"></selectSkill>
      <selectSkill
        label="房屋亮点"
        :list="allList.characteristic"
      ></selectSkill>
      <div class="btnbottom">
        <van-button type="default" class="btn" @click="clearArr"
          >清除</van-button
        >
        <van-button type="primary" class="btn" @click="submit">确定</van-button>
      </div>
    </van-popup>

    <House :allHouseList="list.length === 0 ? allHouseList : list"></House>
  </div>
</template>

<script>
import { searchAreaFind, getHouseListFind, selectHouse } from '@/api/search'
import House from './house.vue'
import btn from './btn.vue'
import selectSkill from './selectSkill.vue'
import { mapState } from 'vuex'
export default {
  created () {
    this.getHouseAll()
    this.getAreaFind()
  },
  data () {
    return {
      show: false,
      value1: 0,
      value2: 'a',
      value3: 'a',
      value4: 'a',
      allList: [],
      columns: [],
      obj: {
        area: null,
        subway: null,
        rentType: null,
        price: null,
        more: null,
        roomType: null,
        oriented: null,
        characteristic: null,
        floor: null
      },
      list: []
    }
  },
  methods: {

    async getAreaFind () {
      try {
        const res = await searchAreaFind()
        this.allList = res.data.body
        // this.$store.commit('setList', res.data.body)
        // vant级联有一个问题，数组中同级的必须格式一致，比如说如果这个列表有三级，那么第二级必须都有children，不然只会显示一列
        // delete this.allList.area.children[0]
        this.allList.area.children[0].children = [{ label: '' }]
        this.allList.subway.children[0].children = [{ label: '' }]
        this.columns = [this.allList.area, this.allList.subway]
        console.log('sub', this.columns)
      } catch (err) {
        console.log('err', err)
      }
    },
    async getHouseAll () {
      try {
        const res = await getHouseListFind()
        // this.allHouse = res.data.body.list
        this.$store.commit('setLists', res.data.body.list)
        // console.log(this.allHouse)
      } catch (err) {
        console.log('house', err)
      }
    },
    showPop () {
      // this.$refs.pop.style.display = 'block'
      this.show = true
    },
    clearArr () {
      this.$store.commit('setArr', 'clear')
    },
    async submit () {
      try {
        console.log(this.$store.state.more)
        this.obj.more = this.$store.state.more.join('|')
        const res = await selectHouse(this.obj)
        this.list = res.data.body.list
        console.log(res)
      } catch (err) {
        console.log(err)
      }
      this.show = false
      this.$store.commit('setArr', 'clear')
    }
  },
  computed: {
    ...mapState(['allHouseList'])
    // columns () {
    //   let arr = []
    //   // vant级联有一个问题，数组中同级的必须格式一致，比如说如果这个列表有三级，那么第二级必须都有children，不然只会显示一列
    //   // delete this.allList.area.children[0]
    //   this.allList.area.children[0].children = [{ label: '' }]
    //   this.allList.subway.children[0].children = [{ label: '' }]
    //   arr = [this.allList.area, this.allList.subway]
    //   console.log('sub', arr)
    //   return arr
    // }

  },
  watch: {},
  filters: {},
  components: {
    House,
    selectSkill,
    btn
  }
}
</script>

<style scoped lang="less">
.mmm {
  padding: unset;
  padding-top: 200px;
}
.nav-bar-title {
  position: fixed;
  top: 0;
  left: 0;
  width: 750px;
  height: 100px;
  display: flex;
  background-color: #21b97a;
  justify-content: space-between;
  align-items: center;
  padding: 0 18px;
}
/deep/.van-icon {
  font-size: 50px;
  color: #fff;
}
.title {
  // z-index: 2;
  width: 580px;
  line-height: 70px;
  // max-width: unset;
  font-weight: 500;
  height: 70px;
  background-color: #fff;
  color: #333;
  font-size: 26px;
  border-radius: 5px;
  padding: 3px 10px;
  box-sizing: border-box;
  /deep/.van-icon {
    color: #333;
    font-size: 30px;
    margin-right: 10px;
  }
  .area-find {
    padding-right: 20px;
    margin-right: 20px;
    border-right: 1px solid #9c9fa1;
  }
}
/deep/.van-dropdown-menu {
  position: fixed;
  top: 100px;
  width: 750px;
}
/deep/.van-picker {
  width: 750px !important;
}
/deep/.van-dropdown-menu__title--active {
  color: #21b97a;
}
// /deep/.van-popup {
//   height: 100vh !important;
//   overflow: visible;
//   .btnbottom {
//     width: 100%;
//     // background-color: pink;
//    .btn {
//       position: fixed;
//       font-weight: 500;
//       bottom: 0;
//       border-radius: 0;
//       &:nth-child(1) {
//         width: 35%;
//         left: 0;
//         bottom: 0;
//         color: #21b97a;
//         // color: red;
//       }
//       &:nth-child(2) {
//         width: 65%;
//         right: 0;
//         bottom: 0;
//       }
//     }
//   }
// }
.btnbottom {
  .btn {
    // position: fixed;
    // bottom: 0;
    border: none;
    &:nth-child(1) {
      width: 35%;
      color: #21b97a;
      left: 0;
    }
    &:nth-child(2) {
      width: 65%;
      right: 0;
    }
  }
}
</style>
