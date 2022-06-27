<template>
  <div>
    <router-view />

<van-tabbar route>
  <van-tabbar-item replace to="/layout/home" icon="home-o">首页</van-tabbar-item>
  <van-tabbar-item replace to="/layout/search" icon="search">找房</van-tabbar-item>
  <van-tabbar-item replace to="/layout/ask" icon="newspaper-o">资讯</van-tabbar-item>
  <van-tabbar-item replace to="/layout/my" icon="user-o">我的</van-tabbar-item>
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

<style scoped>
</style>
