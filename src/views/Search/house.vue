<template>
  <div class="root">
    <div class="comHouse" v-for="(item, index) in allHouseList" :key="index">
      <div class="left">
        <img :src="baseUrl + item.houseImg" alt="" />
      </div>
      <div class="right">
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <van-badge
          color="#e1f5f8"
          v-for="(item1, index1) in item.tags"
          :key="index1"
        >
          <template #content>
            <span class="bge">{{ item1 }}</span>
          </template>
        </van-badge>
        <p>
          <span>{{ item.price }}</span
          >元/月
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allHouseList: {
      type: Array,
      required: true
    }
  },
  created () { },
  data () {
    return {
      baseUrl: 'http://liufusong.top:8080'
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.root {
  padding: 0 18px;
  max-width: 750px;
  box-sizing: border-box;
}
.comHouse {
  width: 100%;
  height: 250px;
  border-bottom: 1px solid #9c9fa1;
  display: flex;
  align-items: center;
}
.left {
  img {
    width: 212px;
    height: 160px;
    margin-right: 16px;
  }
}
.right {
  font-size: 28px;
  h3 {
    // 需要将宽度写死，不允许换行，超出文本变省略号
    //不然会将真个屏幕宽度撑开，底部的导航栏也会失去fixed
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
  p {
    &:nth-child(2) {
      font-size: 24px;
      color: #afb2b3;
    }
    &:nth-child(4) {
      color: red;
      span {
        font-weight: 600;
        font-size: 30px;
        padding-right: 6px;
      }
    }
  }
  .bge {
    display: inline-block;
    border-radius: 0;
    padding: 6px;
    color: #39becd;
  }
}
</style>
