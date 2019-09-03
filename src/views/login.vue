<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field v-model="user.phoneNumber"  placeholder="请输入手机号" left-icon="phone-o" />
      <van-field v-model="user.passCode" placeholder="请输入验证码" left-icon="browsing-history-o">
        <van-button round slot="button" size="small" color="#ccc">获取验证码</van-button>
      </van-field>
      <div class="login_btn">
        <van-button class="van_button" type="info">登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'login',
  data () {
    return {
      user: {
        phoneNumber: '13911111111',
        passCode: '246810'
      }
    }
  },
  components: {}
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
