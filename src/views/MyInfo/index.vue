<template>
  <div>
    <!-- 头部区 -->
    <div class="top">
      <img src="../../assets/bg.png" alt="" />
      <div class="loginIn">
        <div class="touxiang">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
        </div>
        <p>游客</p>
        <van-button type="primary" @click="loginTo">去登录</van-button>
      </div>
    </div>
    <!-- 内容区 -->
    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in list"
        :key="item.id"
        :icon="item.icon"
        :text="item.text"
      />
    </van-grid>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      list: [{
        id: 1,
        icon: 'star-o',
        text: '我的收藏'
      }, {
        id: 2,
        icon: 'home-o',
        text: '我的出租'
      }, {
        id: 3,
        icon: 'clock-o',
        text: '看房记录'
      }, {
        id: 4,
        icon: 'more-o',
        text: '成为房主'
      }, {
        id: 5,
        icon: 'user-o',
        text: '个人资料'
      }, {
        id: 6,
        icon: 'service-o',
        text: '联系我们'
      }]
    }
  },
  methods: {
    loginTo (e) {
      e.preventDefault()
      this.$router.replace('/login')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.top {
  width: 100%;
  height: 600px;
  margin-bottom: 30px;
  // background-image: url("http://liufusong.top:8080/img/profile/bg.png");
  // background-size: contain;
  img {
    width: 100%;
    height: 400px;
  }
}
.loginIn {
  width: 640px;
  height: 320px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
  position: absolute;
  top: 300px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  box-shadow: 0 0 10px 3px #ddd;

  .touxiang {
    width: 148px;
    height: 148px;
    position: absolute;
    text-align: center;
    padding-top: 10px;
    box-shadow: 0 2px 2px #bdbdbd;
    top: -60px;
    background-color: #fff;
    border-radius: 50%;
    img {
      width: 128px;
      height: 128px;
    }
  }
  p {
    font-size: 13px;
    padding-top: 70px;
  }
  button {
    font-size: 13px;
    width: 140px;
    height: 60px;
    line-height: 30px;
    padding: 0 15px;
    border-radius: 10px;
  }
}
</style>
