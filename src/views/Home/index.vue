<template>
  <div class="home">
    <!-- 搜索区 -->
    <NavBar></NavBar>
    <!-- 轮播图 -->
    <van-swipe :autoplay="3000" class="swipehome">
      <van-swipe-item v-for="item in images" :key="item.id">
        <img v-lazy="baseUrl + item.imgSrc" class="imgSwipe" />
      </van-swipe-item>
    </van-swipe>
    <!-- 四个选项 -->
    <van-grid :border="false" :column-num="4" class="four">
      <van-grid-item>
        <div class="green">
          <van-icon
            name="wap-home-o"
            color="#7fd6b2"
            size="1.0rem"
            class="greebnIcon"
          />
        </div>
        <p>整租</p>
      </van-grid-item>
      <van-grid-item>
        <div class="green">
          <van-icon
            name="friends-o"
            color="#7fd6b2"
            size="1.0rem"
            class="greebnIcon"
          />
        </div>
        <p>合租</p>
      </van-grid-item>
      <van-grid-item @click="$router.push('/map')">
        <div class="green">
          <van-icon
            name="location-o"
            color="#7fd6b2"
            size="1.0rem"
            class="greebnIcon"
          />
        </div>
        <p>地图找房</p>
      </van-grid-item>
      <van-grid-item>
        <div class="green" @click="toRent">
          <van-icon
            name="balance-o"
            color="#7fd6b2"
            size="1.0rem"
            class="greebnIcon"
          />
        </div>
        <p>去出租</p>
      </van-grid-item>
    </van-grid>
    <!-- 内容区 -->
    <div class="rent">
      <div class="title">
        <h2>租房小组</h2>
        <span>更多</span>
      </div>
      <van-grid :gutter="6" direction="horizontal" :column-num="2">
        <van-grid-item v-for="item in list" :key="item.id" class="small-grid">
          <template #text>
            <div>
              <p>{{ item.desc }}</p>
              <p>{{ item.title }}</p>
            </div>
          </template>
          <template #icon>
            <img :src="baseUrl + item.imgSrc" alt="" />
          </template>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { swipe, rentGroups } from '@/api/home'
import NavBar from '@/components/NavBar'
export default {
  created () {
    this.getSwipe()
    this.getRentGroups()
  },
  data () {
    return {
      baseUrl: 'http://liufusong.top:8080',
      images: [],
      list: []
    }
  },
  methods: {
    async getSwipe () {
      try {
        const res = await swipe()
        this.images = res.data.body
        // console.log(this.images)
      } catch (err) {
        console.log(err)
      }
    },
    async getRentGroups () {
      try {
        const res = await rentGroups()
        this.list = res.data.body
        console.log(this.list)
      } catch (err) {
        console.log(err)
      }
    },
    toRent () {
      // console.log('ss')
      this.$router.push('/rent')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    NavBar
  }
}
</script>

<style scoped lang='less'>
// .home {
//   padding-bottom: 90px;
// }
.swipehome {
  width: 100%;
  height: 424px;
  .imgSwipe {
    width: 100%;
    height: 100%;
  }
}
.four {
  p {
    font-size: 28px;
  }
  .green {
    border-radius: 50%;
    background-color: #f2fbf7;
    width: 120px;
    height: 120px;
    text-align: center;
    line-height: 130px;
    // /deep/ .greenIcon{
    //   // font-size: 40px!important;
    // }
    margin-bottom: 30px;
  }
}
.rent {
  padding-bottom: 30px;
  background-color: #f6f5f6;
  h2 {
    padding: 40px 20px;
    font-size: 28px;
  }
  img {
    width: 100px;
    height: 100px;
  }
  p {
    font-size: 28px;
  }
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    padding-right: 30px;
    font-size: 28px;
    color: #787d82;
  }
}
</style>
