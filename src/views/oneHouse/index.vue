<template>
  <div class="mainONE">
    <van-nav-bar :title="houseInfo.title">
      <template #left>
        <van-icon name="arrow-left" color="#fff" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- swipe -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(it, ind) in houseInfo.houseImg" :key="ind">
        <img :src="baseUrl + it" class="imgSwipe" />
      </van-swipe-item>
    </van-swipe>
    <!-- art -->
    <div class="art">
      <!-- 标题部分 -->
      <h1>{{ houseInfo.community }}</h1>
      <!-- 租金部分 -->
      <div class="pritype">
        <div class="price tt">
          <p>{{ houseInfo.price }}/月</p>
          <span>租金</span>
        </div>
        <div class="roomType tt">
          <p>{{ houseInfo.roomType }}</p>
          <span>房型</span>
        </div>
        <div class="roomArea tt">
          <p>{{ houseInfo.size }}平米</p>
          <span>面积</span>
        </div>
      </div>
      <!-- 精装部分 -->
      <div class="fourinfo">
        <div class="onesmall ss">
          <p>装修：<span>精装</span></p>
          <p>
            楼层：<span>{{ houseInfo.floor }}</span>
          </p>
        </div>
        <div class="twosmall ss">
          <p>
            朝向：<span
              v-for="(i, index) in houseInfo.oriented"
              :key="index * 1000"
              >{{ i }}</span
            >
          </p>
          <p>类型：<span>普通祖宅</span></p>
        </div>
      </div>
    </div>
    <!-- foot -->
    <div class="bott">
      <van-button type="default" @click="isCollect"
        >收藏
        <template #icon>
          <van-icon :name="show?'star':'star-o'" />
        </template> </van-button
      ><van-button type="default">在线咨询</van-button
      ><van-button type="default">电话预约</van-button>
    </div>
  </div>
</template>

<script>
import { getOneHouse } from '@/api/search.js'
import { delCollect, seeCollect, houseCollect } from '@/api/house'
export default {
  created () {
    this.getOneHouse()
    this.seeCollect()
  },
  data () {
    return {
      show: false,
      houseInfo: [],
      baseUrl: 'http://liufusong.top:8080'
    }
  },
  methods: {
    async getOneHouse () {
      try {
        const res = await getOneHouse(this.$store.state.houseCode)
        this.houseInfo = res.data.body
        console.log(this.houseInfo)
      } catch (err) {
        console.log(err)
      }
    },
    async seeCollect () {
      try {
        const res = await seeCollect(this.$store.state.houseCode)
        this.show = res.data.body.isFavorite
        console.log('see', res)
      } catch (err) {
        console.log(err)
      }
    },
    async isCollect () {
      if (!this.show) {
        try {
          await houseCollect(this.$store.state.houseCode)
          this.$toast.success('收藏成功')
          this.show = true
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          await delCollect(this.$store.state.houseCode)
          this.$toast.fail('取消收藏')
          this.show = false
        } catch (err) {
          console.log(err)
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.mainONE {
  background-color: #d858d8;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.bott {
  position: fixed;
  display: flex;
  bottom: 0;
  height: 100px;
  width: 100%;
  .van-button {
    flex: 1;
    height: 100px;
    font-weight: 800;
    font-size: 34px;
    color: #999;
    &:nth-child(3) {
      background-color: #21b97a;
      color: #fff;
    }
  }
}
.art {
  padding: 0 24px;
  margin-bottom: 30px;
  background-color: #fff;
  h1 {
    padding: 45px 0;
    font-size: 32px;
    font-weight: 400;
    border-bottom: 1px solid #888;
  }
  .pritype {
    display: flex;
    height: 154px;
    justify-content: space-around;
    align-items: center;
    align-self: center;
    color: #afb2b3;
    border-bottom: 1px solid #888;
    span {
      font-size: 28px;
    }
    p {
      font-weight: 600;
      color: red;
      font-size: 36px;
    }
    .tt {
      display: flex;
      flex-direction: column;
      align-content: space-around;
    }
  }
  .fourinfo {
    display: flex;
    font-size: 28px;
    color: #afb2b3;
    height: 154px;
    border-bottom: 1px solid #888;
    justify-content: center;
    align-items: center;

    .ss {
      flex: 1;
      p {
        span {
          color: black;
        }
      }
    }
  }
}
</style>
