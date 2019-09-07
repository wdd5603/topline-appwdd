import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '../utils/localStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getItem('user')
  },
  mutations: {
    setUserToken (state, token) {
      state.token = token
      // 返回的用户信息存储在本地
      setItem('user', token)
    }

  },
  actions: {

  }
})
