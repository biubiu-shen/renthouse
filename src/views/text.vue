<template>
  <div>
    <van-picker
      show-toolbar
      title="标题"
      :columns="$store.state.allList.area.children"
      value-key="label"
    />
    <!-- {{ $store.state.allList.area.children }} -->
    <van-picker show-toolbar title="标题" :columns="columns" />
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$store.state.allList.area)
  },
  data () {
    return {
      columns: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州'

            },
            {
              text: '温州',
              children: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
              children: [{ text: '鼓楼区' }, { text: '台江区' }]
            },
            {
              text: '厦门',
              children: [{ text: '思明区' }, { text: '海沧区' }]
            }
          ]
        }
      ]
    }
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
