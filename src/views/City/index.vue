<template>
  <div>
    <van-nav-bar title="城市列表">
      <template #left>
        <van-icon
          name="arrow-left"
          color="white"
          @click="$router.replace('/layout')"
        />
      </template>
    </van-nav-bar>
    <!--  城市区域 -->
    <van-index-bar>
      <van-index-anchor index="当前城市" />
      <van-cell title="北京" />
      <van-index-anchor index="热门城市" />
      <van-cell
        v-for="(item, index) in cityHot"
        :key="index"
        :title="item.label"
      />
      <van-index-anchor index="A" />

      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</template>

<script>
import { hotCity, SearchCity } from '@/api/home'
export default {
  created () {
    this.getHotCity()
    this.getAllCity()
  },
  data () {
    return {
      cityHot: [],
      AllCity: []
    }
  },
  methods: {
    async getHotCity () {
      try {
        const res = await hotCity()
        this.cityHot = res.data.body
        console.log(this.cityHot)
      } catch (err) {
        console.log(err)
      }
    },
    async getAllCity () {
      try {
        const res = await SearchCity()
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
