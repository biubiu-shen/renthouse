<template>
  <div>
    <van-nav-bar title="已发布房屋">
      <template #left>
        <van-icon name="arrow-left" @click="$router.go(-1)" />
      </template>
    </van-nav-bar>
    <House :allHouseList="houseLL"></House>
  </div>
</template>

<script>
import House from '@/views/Search/house.vue'
import { lookSellHouse } from '@/api/house.js'
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
        const res = await lookSellHouse()
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
