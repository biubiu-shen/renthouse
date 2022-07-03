<template>
  <div class="mmm">
    <div class="nav-bar-title">
      <van-icon name="arrow-left" @click="$router.push('/home')" />
      <div class="title">
        <span class="area-find">北京 <van-icon name="arrow-down" /></span>
        <span><van-icon name="search" />请输入小区地址</span>
      </div>

      <van-icon name="location-o" />
    </div>
    <!-- tabbar -->
    <van-dropdown-menu>
      <van-dropdown-item v-model="value1" title="区域" ref="item">
        <van-picker :columns="areaList" value-key="label">
          <template #columns-bottom>
            <btn></btn>
          </template>
        </van-picker>
      </van-dropdown-item>

      <van-dropdown-item v-model="value2" title="方式" ref="item">
        <van-picker :columns="rentType">
          <template #columns-bottom>
            <btn></btn>
          </template>
        </van-picker>
      </van-dropdown-item>
      <van-dropdown-item v-model="value3" title="租金" ref="item">
        <van-picker :columns="price">
          <template #columns-bottom>
            <btn></btn>
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
      <selectSkill
        label="户型"
        :list="$store.state.allList.roomType"
      ></selectSkill>
      <selectSkill
        label="朝向"
        :list="$store.state.allList.oriented"
      ></selectSkill>
      <selectSkill
        label="楼层"
        :list="$store.state.allList.floor"
      ></selectSkill>
      <selectSkill
        label="房屋亮点"
        :list="$store.state.allList.characteristic"
      ></selectSkill>
      <div class="btnbottom">
        <van-button type="default" class="btn" @click="clearArr"
          >清除</van-button
        >
        <van-button type="primary" class="btn">确定</van-button>
      </div>
    </van-popup>

    <House :allHouseList="allHouseList"></House>
  </div>
</template>

<script>
import { searchAreaFind, getHouseListFind } from '@/api/search'
import House from './house.vue'
import btn from './btn.vue'
import selectSkill from './selectSkill.vue'
import { mapState } from 'vuex'
export default {
  created () {
    // this.getHouseAll()
    // this.getAreaFind()
  },
  data () {
    return {
      show: false,
      value1: 0,
      value2: 'a',
      value3: 'a',
      value4: 'a'
    }
  },
  methods: {
    onCancel () {
      this.$refs.item.toggle()
    },
    onConfirm () {
      this.$refs.item.toggle()
    },
    async getAreaFind () {
      try {
        const res = await searchAreaFind()
        // this.allList = res.data.body
        this.$store.commit('setList', res.data.body)

        // console.log(this.allList)
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
    }
  },
  computed: {
    ...mapState(['allList', 'allHouseList']),
    areaList () {
      const arr = []
      arr[0] = this.allList.area
      // arr[0].children = this.allList.area.children.map(item => item)
      arr[1] = this.allList.subway
      console.log('sub', arr)
      return arr
    },
    rentType () {
      let arr = []
      // arr.push(this.allList.rentType)
      arr = this.allList.rentType.map(item => item.label)
      console.log('arr', arr)
      return arr
    },
    price () {
      let arr = []
      arr = this.allList.price.map(item => item.label)
      return arr
    }

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
