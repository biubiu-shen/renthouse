<template>
  <div>
    <van-nav-bar title="登录">
      <template #left>
        <van-icon name="arrow-left" color="#fff" @click="jump" />
      </template>
    </van-nav-bar>
    <!-- 表单 -->
    <van-form @submit="onSubmit" class="formSub">
      <van-field
        v-model.trim="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model.trim="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请填写密码' },
          { pattern: /^\d{6}$/, message: '密码只能是六位' },
        ]"
      />
      <div style="margin: 16px">
        <van-button block native-type="submit" color="#21b97a">登录</van-button>
        <p class="login"><a href="#">还没有账号，去注册～</a></p>
      </div>
    </van-form>
  </div>
</template>

<script>
import { LoginApi } from '@/api/login'
export default {
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await LoginApi(values)
        this.$store.commit('getUserToken', res.data.body.token)
        console.log(res)
        this.$toast.success('登录成功')
        this.$router.replace('/layout')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
      }
      // console.log('submit', values)
    },
    jump () {
      this.$router.replace('/layout')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
/deep/ .formSub {
  padding-top: 60px;
}
.login {
  text-align: center;
  a {
    color: #666;
    font-size: 18px;
  }
}
</style>
