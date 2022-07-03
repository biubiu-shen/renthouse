<template>
  <div>
    <router-view class="main" />

<van-tabbar route>
  <van-tabbar-item replace to="/home" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item replace to="/search" icon="search">找房</van-tabbar-item>
  <van-tabbar-item replace to="/ask" icon="newspaper-o">资讯</van-tabbar-item>
  <van-tabbar-item replace to="/my" icon="user-o">{{$store.state.token?'我的':'未登录'}}</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>

export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.main{
  padding-bottom: 100px;
}
// /deep/.van-tabbar{
//   position:fixed;
//   bottom: 0;
// }
</style>
