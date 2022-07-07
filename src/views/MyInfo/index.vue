<template>
  <div>
    <!-- 头部区 -->
    <div class="top">
      <img src="../../assets/bg.png" alt="" />
      <div class="loginIn" v-if="!$store.state.token">
        <div class="touxiang">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
        </div>
        <p>游客</p>
        <van-button type="primary" @click="loginTo">去登录</van-button>
      </div>
      <!-- 登陆后 -->
      <div class="loginIn loginOut" v-else>
        <div class="touxiang">
          <img :src="'http://liufusong.top:8080' + userList.avatar" alt="" />
        </div>
        <p>{{ userList.nickname }}</p>
        <van-button type="primary" @click="quit" class="quit">退出</van-button>
        <p class="edit">编辑个人资料</p>
      </div>
    </div>
    <!-- 内容区 -->
    <van-grid :column-num="3">
      <van-grid-item
        v-for="item in list"
        :key="item.id"
        :icon="item.icon"
        :text="item.text"
        @click="goTo(item.id)"
      />
    </van-grid>
    <!-- 下面背景图 -->
    <div class="join">
      <img src="../../assets/join.png" alt="" />
    </div>
  </div>
</template>

<script>
// import store from '@/store'
import { getUserInfo } from '@/api/login'
export default {
  created () {
    this.getUser()
  },
  data () {
    return {
      // isShow: true,
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
      }],
      userList: {}
    }
  },
  methods: {
    loginTo (e) {
      e.preventDefault()
      this.$router.replace('/login')
    },
    quit () {
      this.$store.commit('getUserToken', '')
    },
    async getUser () {
      try {
        const res = await getUserInfo()
        this.userList = res.data.body
        console.log('user', this.userList)
      } catch (err) {
        console.log(err)
      }
    },
    goTo (val) {
      if (val === 1) {
        this.$router.push('/collect')
      } else if (val === 2) {
        this.$router.push('/seehouse')
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
.top {
  width: 100%;
  height: 700px;
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
.join {
  text-align: center;
  padding-top: 30px;
  img {
    width: 690px;
    height: 170px;
    border-radius: 10px;
  }
}
.edit {
  font-size: 15px;
  color: #999;
}
.loginOut {
  height: 416px;
  .quit {
    width: 100px;
    height: 40px;
  }
  // .edit{
  // position: absolute;
  // top: 150px;
  // }
}
</style>
