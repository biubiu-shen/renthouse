<template>
  <div class="nav-bar-color">
    <div class="nav-bar-small">
      <span @click="ToCity">北京</span>
      <van-icon name="arrow-down" class="iconVant" />
      <van-icon name="search" class="iconVant" />
      <span>请输入小区或者地址</span>
    </div>
    <van-icon name="location-o" class="iconMap" />
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {
      value: ''
    }
  },
  methods: {
    ToCity () {
      this.$router.replace('/city')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.nav-bar-color {
  z-index: 2;
  position: fixed;
  display: flex;
  align-items: center;
  width: 100%;
  height: 120px;
  top: 0;
  background-color: transparent;
  text-align: center;
  padding-top: 62px;
  .iconMap {
    margin-right: 22px;
    color: #fff;
  }
  .nav-bar-small {
    margin: 0 auto;
    width: 80%;
    height: 68px;
    display: flex;
    border-radius: 5px;
    background-color: #fff;
    .iconVant {
      font-size: 28px;
      padding: 20px 10px 0;
    }
    span {
      font-size: 28px;
      text-align: center;
      line-height: 68px;
      color: #666;
      display: inline-block;
      padding-left: 18px;
      cursor: pointer;
    }
  }
}
</style>
