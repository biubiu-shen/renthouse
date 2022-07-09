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
          name="community"
          label="小区名称"
          :value="$store.state.community"
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
            <van-uploader
              v-model="uploader"
              ref="ipt"
              @change="imgForm"
              :after-read="afterRead1"
            />
          </template>
        </van-field>

        <p class="houseinfos">房屋配置</p>

        <!-- fuxuan -->
        <van-field name="supporting">
          <template #input>
            <van-checkbox-group v-model="supporting" direction="horizontal">
              <van-checkbox
                :name="item.label"
                shape="square"
                v-for="(item, index) in houseList.supporting"
                :key="index"
              >
                <template #icon>
                  <img class="img-icon" />
                </template>
                <van-grid :column-num="5">
                  <van-grid-item
                    icon="photo-o"
                    :text="item.label"
                    :class="
                      gridShow.findIndex((i) => i === index) !== -1
                        ? 'active'
                        : ''
                    "
                    @click="pickMore(index)"
                  />
                </van-grid>
              </van-checkbox>
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
import { sellHouse, houseImg } from '@/api/house'
// import { mapState } from 'vuex'
// import {  } from '@/api/house'
export default {

  created () {
    this.getHouse()
    // console.log(this.$store.state.houseList)
  },
  data () {
    return {
      gridShow: [],
      pirce: '',
      size: '',
      description: '',
      value4: '',
      imgSrc: '',
      // show: false,
      houseList: [],
      uploader: [],
      checkbox: false,
      supporting: [],
      img: null
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
    // afterRead1 (file) {
    //   // 此时可以自行将文件上传至服务器
    //   console.log(file)
    // },
    async getHouse () {
      try {
        const res = await houseInfo()
        // this.$store.commit('setList', res.data.body)
        this.houseList = res.data.body
        console.log(this.houseList)
      } catch (res) {
        console.log(res)
      }
    },
    onSubmit (values) {
      this.$dialog.confirm({
        message: '确定提交房屋信息吗？'
      }).then(async () => {
        try {
          if (values.supporting && values.supporting.length !== 0) {
            values.supporting = values.supporting.join('|')
          }
          if (this.img && this.img.length !== 0) {
            values.houseImg = this.img.join('|')
          }
          const res = await sellHouse(values)
          this.$toast.success('成功发布')
          console.log(res)
        } catch (err) {
          this.$toast.fail('发布失败')
          console.log(err)
        }
      }).catch(() => {
        return false
      })
      // console.log('submit', values)
    },
    cancelHouse () {
      this.$dialog.confirm({
        message: '确定要放弃编辑吗？'
      }).then(() => {
        this.$router.push('/home')
      }).catch(() => {

      })
    },
    choose (item) {
      console.log('ss')
      this.supporting.push(item.label)
      console.log(this.supporting)
    },
    async afterRead1 (file) {
      // let that = this
      const fd = new FormData()
      // console.log(file.file)
      fd.append('file', file.file)
      // console.log('fd', fd)
      try {
        const res = await houseImg(fd)
        this.img = res.data.body
        console.log(this.img)
        console.log(res)
      } catch (err) {
        console.log(err)
      }
      // console.log(file)
    },
    imgForm () {
      console.log('click')
    },
    pickMore (val) {
      if (this.gridShow.findIndex(i => i === val) === -1) {
        this.gridShow.push(val)
      } else {
        const it = this.gridShow.findIndex(i => i === val)
        this.gridShow.splice(it, 1)
      }
    }
  },
  computed: {
    // {...mapState.houseList }
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
/deep/.van-field__control {
  color: #fff;
  &:nth-last-child(2) {
    color: #000;
  }
  &:nth-last-child(7) {
    color: #000;
  }
}

.img-icon {
  height: 20px;
}
.active {
  color: #21b97a;
}
</style>
