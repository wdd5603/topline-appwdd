<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="user.mobile" placeholder="请输入手机号" left-icon="phone-o" />
      <van-field v-model="user.code" placeholder="请输入验证码" left-icon="browsing-history-o">
        <van-button round slot="button" size="small" color="#ccc">获取验证码</van-button>
      </van-field>
      <div class="login_btn">
        <van-button class="van_button" type="info" @click="haddleLogin">登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
// @ is an alias to /src
import { login } from '../api/login'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async haddleLogin () {
      try {
        await login(this.user)
        this.$router.push('/')
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast('用户名或密码有误')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login_btn {
  padding: 20px;
  .van_button {
    width: 100%;
    border-radius: 5px;
  }
}
</style>
