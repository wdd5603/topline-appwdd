export default {
  install (Vue) {
    Vue.prototype.$checkLogin = function () {
      if (!this.$store.state.token) {
        this.$dialog.confirm({
          title: '登录提示',
          message: '是否跳转登录'
        }).then(() => {
          this.$router.push({ path: '/login', query: { direct: this.$route.fullPath } })
        }
        )
        return false
      }
      return true
    }
  }
}
