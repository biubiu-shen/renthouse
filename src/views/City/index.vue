<template>
  <div class="mianss">
    <van-nav-bar title="城市列表">
      <template #left>
        <van-icon
          name="arrow-left"
          color="white"
          @click="$router.back()"
        />
      </template>
    </van-nav-bar>
    <!--  城市区域 -->
    <!-- <van-index-bar :index-list="indexList"> -->
    <van-index-bar>
      <van-index-anchor index="当前城市" />
      <van-cell title="北京" />
      <van-index-anchor index="热门城市" />
      <van-cell
        v-for="(item, index) in cityHot"
        :key="index * 100"
        :title="item.label"
      />

      <!-- <van-index-anchor index="A" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" /> -->
      <template v-for="(item, index) in useCity">
        <van-index-anchor :index="item.index" :key="index" />
        <van-cell
          :title="it.label"
          v-for="it in item.data"
          :key="it.value"
          @click="ToHome({ id: it.value, name: it.label })"
        />
      </template>
    </van-index-bar>
    <!-- {{ useCity }} -->
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
      indexList: [],
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
        // this.AllCity = res.data.body
        this.$store.commit('setC', res.data.body)
        // console.log(this.AllCity)
      } catch (err) {
        console.log(err)
      }
    },
    ToHome (val) {
      this.$store.commit('setCityId', val)
      console.log('ee')
      this.$router.push('/home')
      console.log('ss')
    }
  },
  computed: {
    // 拿到26个字母的数组
    List () {
      const arr = []
      for (let i = 0; i < 26; i++) {
        arr.push(String.fromCharCode(65 + i))
      }
      return arr
    },
    useCity () {
      const arr = []
      this.List.forEach(item => {
        const obj = {}
        obj.data = []
        obj.index = item
        this.$store.state.allCity.forEach((it) => {
          if (it.short.substr(0, 1).toUpperCase() === item) {
            obj.data.push(it)
          }
        })
        arr.push(obj)
      })

      return arr
    }
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.mianss {
  padding-top: 100px;
  /deep/.van-index-bar {
    margin-top: 100px;
  }
}
/deep/.van-nav-bar {
  position: fixed;
  z-index: 4;
  width: 100%;
  top: 0;
}
</style>
