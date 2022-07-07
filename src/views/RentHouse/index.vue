<template>
  <div class="rentmain">
    <!-- title -->

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
          name="area"
          label="小区名称"
          :value="$store.state.area"
          @click="$router.push('/rentsearch')"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <template #extra>
            <span
              >{{ $store.state.area ? $store.state.area : "请输入小区名称" }}
              <van-icon name="arrow" />
            </span>
          </template>
        </van-field>
        <van-field
          name="pirce"
          v-model="pirce"
          label="租金"
          placeholder="请输入租金/月"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <template #extra>
            <span>￥/月</span>
          </template>
        </van-field>
        <van-field
          name="size"
          v-model="size"
          label="建筑面积"
          placeholder="请输入建筑面积"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <template #extra>
            <span>㎡</span>
          </template>
        </van-field>
        <Picker :arrs="houseList.floor" name="floor" nameC="楼层"></Picker>
        <Picker
          :arrs="houseList.oriented"
          name="oriented"
          nameC="朝向"
        ></Picker>
        <Picker
          :arrs="houseList.roomType"
          name="roomType"
          nameC="户型"
        ></Picker>
        <p class="houseinfos">房屋标题</p>
        <van-field
          name="title"
          v-model="value4"
          placeholder="请输入标题，（例如整租 小区名 2室 5000元）"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
        </van-field>

        <van-field
          name="houseImg"
          label="文件上传"
          :rules="[{ required: false }]"
        >
          <template #input>
            <van-uploader v-model="uploader" />
            <!-- <div
              @click="$refs.ipt.click()"
              style="width: 100px; height: 100px; background-color: red"
            >
              <img :src="imgSrc" alt="" />
              <input type="file" style="display: none" ref="ipt" />
            </div> -->
          </template>
        </van-field>

        <p class="houseinfos">房屋配置</p>

        <!-- fuxuan -->
        <van-field name="supporting">
          <template #input>
            <van-checkbox-group v-model="supporting" direction="horizontal">
              <!-- <van-grid
                :column-num="5"
                v-for="(item, index) in houseList.supporting"
                :key="index"
                @click="choose(item)"
              >
                <van-grid-item icon="photo-o" :text="item.label" />
              </van-grid> -->
              <van-checkbox
                :name="item.label"
                shape="square"
                v-for="(item, index) in houseList.supporting"
                :key="index"
                ><van-grid :column-num="5">
                  <van-grid-item icon="photo-o" :text="item.label" /> </van-grid
              ></van-checkbox>
            </van-checkbox-group>
          </template>
        </van-field>
        <!-- fuxuan -->
        <p class="houseinfos">房屋描述</p>
        <van-field
          placeholder="请输入房屋描述信息"
          name="description"
          v-model="description"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
        </van-field>
        <div style="margin: 16px">
          <van-button native-type="button" @click="cancelHouse"
            >取消</van-button
          >
          <van-button type="info" native-type="submit">提交</van-button>
        </div>
      </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import Picker from './picker.vue'
import { houseInfo } from '@/api/home'
import { sellHouse } from '@/api/house'
// import { houseImg } from '@/api/house'
export default {

  created () {
    this.getHouse()
  },
  data () {
    return {
      pirce: '',
      size: '',
      description: '',
      value4: '',
      imgSrc: '',
      // show: false,
      houseList: [],
      uploader: [{ url: 'https://img01.yzcdn.cn/vant/leaf.jpg' }],
      checkbox: false,
      supporting: []
    }
  },

  mounted () {
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
    async getHouse () {
      try {
        const res = await houseInfo()
        this.houseList = res.data.body
        console.log(this.houseList)
      } catch (res) {
        console.log(res)
      }
    },
    async onSubmit (values) {
      // const fd = new FormData()
      // fd.append('file', this.$refs.ipt.files[0])
      // console.log(fd)
      // try {
      //   const res = await houseImg(fd)
      //   console.log(res)
      // } catch (err) {
      //   console.log(err)
      // }
      try {
        const res = await sellHouse(values)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
      // this.$dialog.confirm({
      //   message: '确定提交房屋信息吗？'
      // }).then(() => { }).catch(() => { })
      console.log('submit', values)
    },
    cancelHouse () {
      // this.$dialog.confirm({
      //   message: '确定要放弃编辑吗？'
      // }).then(() => {

      // }).catch(() => {

      // })
    },
    choose (item) {
      console.log('ss')
      this.supporting.push(item.label)
      console.log(this.supporting)
    }
  },
  computed: {
    // imgSrc () {
    //   const url = window.URL.createObjectURL(this.$refs.ipt.files[0])
    //   return url
    // }
  },
  watch: {},
  filters: {},
  components: {
    // popup,
    Picker
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
