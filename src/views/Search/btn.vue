<template>
  <div class="button-bottom">
    <van-button type="default">取消</van-button>
    <van-button type="primary">确定</van-button>
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
.button-bottom {
  width: 750px;
  /deep/.van-button {
    border-radius: 0;
    font-weight: 500;
    &:nth-child(1) {
      width: 35%;
      color: #21b97a;
    }
    &:nth-child(2) {
      width: 65%;
    }
  }
}
</style>
