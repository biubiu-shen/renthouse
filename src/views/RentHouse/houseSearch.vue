<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入小区或者地址"
        @search="onSearch"
        @cancel="$router.go(-1)"
      />
    </form>
    <template v-if="resultList.length !== 0">
      <div
        class="result"
        v-for="(item, index) in resultList"
        :key="index"
        @click="confirmArea(item.communityName)"
      >
        {{ item.communityName }}
      </div>
    </template>
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
// import EventBus from '@/EventBus'
export default {
  created () { },

  data () {
    return {
      value: '',
      resultList: []
    }
  },
  methods: {
    async onSearch () {
      try {
        // console.log({ name: this.value, id: this.$store.state.cityID })
        const res = await getSearch({ name: this.value, id: this.$store.state.cityID })
        this.resultList = res.data.body
        console.log(this.resultList)
      } catch (err) {
        console.log(err)
      }
    },
    confirmArea (val) {
      // EventBus.$emit('conArea', val)
      this.$store.commit('conArea', val)
      this.$router.push('/rent')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.result {
  height: 102px;
  font-size: 28px;
  padding-left: 20px;
  line-height: 102px;
  border-bottom: 1px solid #f6f5f9;
}
</style>
