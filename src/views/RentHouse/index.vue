<template>
  <div class="rentmain">
    <!-- title -->
    <!-- {{ area ? area : "请输入小区名称" }} -->
    <van-nav-bar title="发布房源">
      <template #left>
        <van-icon name="arrow-left" @click="$router.push('/home')" />
      </template>
    </van-nav-bar>
    <!-- <van-field readonly label="房源信息"> </van-field> -->
    <!-- mian -->
    <van-form @submit="onSubmit">
      <van-cell-group>
        <p class="van-house">房源信息</p>

        <van-field
          readonly
          label="小区名称"
          @click="$router.push('/rentsearch')"
        >
          <template #extra>
            <span
              >{{ $store.state.area ? $store.state.area : "请输入小区名称" }}
              <van-icon name="arrow" />
            </span>
          </template>
        </van-field>
        <van-field v-model="value" label="租金" placeholder="请输入租金/月">
          <template #extra>
            <span>￥/月</span>
          </template>
        </van-field>
        <van-field
          v-model="value1"
          label="建筑面积"
          placeholder="请输入建筑面积"
        >
          <template #extra>
            <span>㎡</span>
          </template>
        </van-field>

        <van-field readonly label="户型" @click="typeHouse(0)">
          <template #extra>
            <span
              >{{ roomType ? roomType : "请选择" }}
              <van-icon name="arrow" />
            </span>
          </template>
        </van-field>
        <van-field readonly label="所在楼层" @click="typeHouse(1)">
          <template #extra>
            <span
              >{{ floor ? floor : "请选择" }}
              <van-icon name="arrow" />
            </span>
          </template>
        </van-field>
        <van-field readonly label="朝向" @click="typeHouse(2)">
          <template #extra>
            <span
              >{{ oriented ? oriented : "请选择" }}
              <van-icon name="arrow" />
            </span>
          </template>
        </van-field>
        <p class="houseinfos">房屋标题</p>
        <van-field placeholder="请输入标题，（例如整租 小区名 2室 5000元）">
        </van-field>
        <van-field readonly label="房屋图像"> </van-field>
        <van-uploader :after-read="afterRead">
          <div class="updateImg">+</div>
        </van-uploader>

        <p class="houseinfos">房屋配置</p>

        <van-grid :column-num="5">
          <van-grid-item
            v-for="(item, index) in houseList.supporting"
            :key="index"
            icon="photo-o"
            :text="item.label"
          />
        </van-grid>

        <p class="houseinfos">房屋描述</p>
        <van-field placeholder="请输入房屋描述信息"> </van-field>
        <div style="margin: 16px">
          <van-button native-type="button" @click="cancelHouse"
            >取消</van-button
          >
          <van-button type="info" native-type="submit">提交</van-button>
        </div>
      </van-cell-group>
    </van-form>
    <!-- 弹出层 -->
    <popup
      :show="show"
      @closePop="closeP($event)"
      :columns="columns[num]"
    ></popup>
  </div>
</template>

<script>
import { houseInfo } from '@/api/home'
import popup from './popup.vue'
// import EventBus from '@/EventBus/index'
export default {
  created () {
    this.getHouse()
    // EventBus.$on('conArea', (val) => {
    //   this.area = 'ss'
    //   console.log(typeof val)
    //   console.log('guazai', this.area, val)
    // })
  },
  data () {
    return {
      value: '',
      value1: '',
      show: false,
      num: 0,
      columns: [],
      houseList: [],
      roomType: '',
      floor: '',
      oriented: ''
      // area: ''
    }
  },

  mounted () {
    // EventBus.$on('conArea', (val) => {
    //   this.area = val
    //   console.log('guazai', this.area)
    // })
  },
  beforeDestroy () {
    this.$store.commit('conArea', '')
  },
  methods: {
    text () {
      console.log('ss')
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    closeP (val) {
      if (this.num === 0) {
        this.roomType = val
      } else if (this.num === 1) {
        this.floor = val
      } else {
        this.oriented = val
      }
      console.log(val)
      this.show = false
    },
    typeHouse (mat) {
      this.show = true
      this.num = mat
    },
    async getHouse () {
      try {
        const res = await houseInfo()
        this.houseList = res.data.body
        let arr = []
        this.houseList.roomType.forEach(item => arr.push(item.label))
        this.columns.push(arr)
        arr = []
        this.houseList.floor.forEach(item => arr.push(item.label))
        this.columns.push(arr)
        arr = []
        this.houseList.oriented.forEach(item => arr.push(item.label))
        this.columns.push(arr)
        console.log(this.columns)
        // console.log(this.houseList.floor)
        console.log(this.houseList)
      } catch (err) {
        console.log(err)
      }
    },
    onSubmit (values) {
      this.$dialog.confirm({
        message: '确定提交房屋信息吗？'
      }).then(() => { }).catch(() => { })
      console.log('submit', values)
    },
    cancelHouse () {
      this.$dialog.confirm({
        message: '确定要放弃编辑吗？'
      }).then(() => {

      }).catch(() => {

      })
    }
  },
  computed: {

  },
  watch: {},
  filters: {},
  components: {
    popup
  }
}
</script>

<style scoped lang='less'>
.rentmain {
  padding-bottom: 140px;
  background-color: #f6f5f6;
}
.van-icon-arrow-left {
  color: #fff;
}
.updateImg {
  width: 166px;
  height: 166px;
  font-weight: 100;
  text-align: center;
  line-height: 162px;
  color: #767676;
  font-size: 100px;
  border: 1px solid #767676;
  margin-left: 16px;
}
.van-cell-group {
  /deep/.van-house {
    color: #21b97a;
    font-size: 30px;
    padding: 18px 30px;
    border-bottom: 1px solid #ddd;
  }
}
/deep/.van-field {
  color: #888;
}
/deep/.van-field__label {
  span {
    display: inline-block;
    width: 120px;
    text-align-last: justify;
  }
}
.houseinfos {
  font-size: 29px;
  padding: 18px 30px;
  border-bottom: 1px solid #ddd;
}
/deep/.van-icon-arrow {
  font-size: 36px;
  font-weight: 400;
  color: #999;
}
/deep/.van-button {
  position: fixed;
  bottom: 0;
  border-radius: 0;
  width: 50%;
  z-index: 2;
  font-size: 30px;
  &:nth-child(1) {
    left: 0;
    color: #21b97a;
  }
  &:nth-child(2) {
    right: 0;
    background-color: #21b97a;
  }
}
// /deep/.van-grid{
//   margin-bottom: 100px;
// }
</style>
