<template>
  <div>
    <van-field
      readonly
      clickable
      :name="name"
      :value="value.value"
      :label="nameC"
      @click="showPicker = true"
      :rules="[{ required: false }]"
    >
      <template #extra>
        <span
          >{{ value.length !== 0 ? value.label : "请选择" }}
          <van-icon name="arrow" />
        </span> </template
    ></van-field>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="arrs"
        value-key="label"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'Picker',
  created () { },
  props: ['arrs', 'name', 'nameC'],
  // props: {
  //   arrs: {
  //     type: Array,
  //     required: true
  //   }
  // },
  data () {
    return {
      value: [],
      showPicker: false
    }
  },
  methods: {
    onConfirm (value) {
      this.value = value
      this.showPicker = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
/deep/.van-field__control{
  color: #fff;
}
</style>
