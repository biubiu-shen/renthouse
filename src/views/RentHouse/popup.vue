<template>
  <!--  eslint-disable-next-line vue/no-mutating-props -->
  <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
    <van-picker
      show-toolbar
      :columns="columns"
      @cancel="onCancel"
      @confirm="onConfirm"
    />
  </van-popup>
</template>

<script>
export default {
  created () { },
  props: {
    show: {
      type: Boolean,
      required: true
    },
    columns: {
      type: Array
      // required: true
    }
    // num: {
    //   type: Number,
    //   required: true
    // }
  },
  data () {
    return {
    }
  },
  methods: {
    onConfirm (value, index) {
      // console.log(value)
      this.$emit('closePop', value)
    },
    // onChange (picker, value, index) {
    //   this.$Toast(`当前值：${value}, 当前索引：${index}`)
    // },
    onCancel () {
      this.$emit('closePop')
    }
  },
  computed: {

  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped>
</style>
