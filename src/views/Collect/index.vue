<template>
  <div>
    <van-nav-bar title="收藏列表">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </van-nav-bar>
    <House :allHouseList="houseLL"></House>
  </div>
</template>

<script>
import House from '@/views/Search/house.vue'
import { collectHouse } from '@/api/house.js'
export default {
  created () {
    this.getHouseSee()
  },
  data () {
    return {
      houseLL: []
    }
  },
  methods: {
    async getHouseSee () {
      try {
        const res = await collectHouse()
        this.houseLL = res.data.body
        console.log(this.houseLL)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    House
  }
}
</script>

<style scoped>
</style>
