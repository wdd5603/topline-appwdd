<template>
  <div class="login">
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        v-validate="{required:true,regex:'^(1[3-9])\\d{9}$',digits:11}"
        name="mobile"
        placeholder="请输入手机号"
        left-icon="phone-o"
        :error-message="errors.first('mobile')"
      />
      <van-field
        v-model="user.code"
        v-validate="'required'"
        name="code"
        placeholder="请输入验证码"
        left-icon="browsing-history-o"
        :error-message="errors.first('code')"
      >
        <van-button round slot="button" size="small" color="#ccc">获取验证码</van-button>
      </van-field>
      <div class="login_btn">
        <van-button
          class="van_button"
          type="info"
          :loading="isLoading"
          loading-text="正在登录..."
          @click="haddleLogin"
        >登录</van-button>
      </div>
    </van-cell-group>
  </div>
</template>

<script>

import { login } from '@/api/login'
// import { mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      isLoading: false
    }
  },
  methods: {
    // ...mapMutations(['setUserToken']),
    async haddleLogin () {
      try {
        this.$validator.validate().then(async valid => {
          if (!valid) {
            return
          }
          this.isLoading = true
          // 登录成功返回token和fresh_token,需将token存储起来，分别存储在local storage以及vuex，
          let result = (await login(this.user))
          this.$store.commit('setUserToken', result)
          // this.setUserToken(result)
          this.isLoading = false
          // 用户在未登录状态下操作点赞，关注等功能会提示登录，登录后返回刚才操作的页面
          this.$router.push(this.$route.query.direct || '/')
        })
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast('用户名或密码有误')
          this.isLoading = false
        }
      }
    }
  },
  created () {
    const dict = {
      custom: {
        mobile: {
          required: '手机号不可为空',
          digits: '必须为0-9之间的11位数字',
          regex: '号码格式不正确'
        },
        code: {
          required: '验证码不可为空'
        }
      }
    }

    // or use the instance method
    this.$validator.localize('custom', dict)
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
