<template>
  <div class="mainsamll">
    <h2>{{ label }}</h2>
    <div class="bottom">
      <span
        v-for="(item, index) in list"
        :key="index"
        @click="isAct(item.label)"
        :class="
          $store.state.arr.findIndex((it) => it === item.label) === -1
            ? ''
            : 'active'
        "
        >{{ item.label }}</span
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  name: 'selectSkill',
  created () { },
  data () {
    return {
      arr: []
    }
  },
  methods: {
    isAct (val) {
      this.$store.commit('setArr', val)
      // if (this.arr.findIndex(item => item === val) !== -1) {
      //   const index = this.arr.findIndex(item => item === val)
      //   this.arr.splice(index, 1)
      // } else {
      //   this.arr.push(val)
      // }
    }
  },
  computed: {
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.mainsamll {
  padding: 30px 30px 100px;
  // box-sizing: border-box;
  h2 {
    font-size: 30px;
  }
  .bottom {
    display: flex;
    flex-wrap: wrap;
    margin-left: 80px;
    padding-right: 50px;
    padding-bottom: 25px;
    border-bottom: 1px solid #ddd;
    span {
      display: inline-block;
      width: 140px;
      height: 64px;
      font-size: 24px;
      border: 1px solid #ddd;
      color: #888;
      border-radius: 3px;
      text-align: center;
      line-height: 64px;
      margin: 10px 18px;
    }
  }
}
.active {
  border: 1px solid #21b97a;
  color: #21b97a !important;
  background-color: #defaef;
}
</style>
