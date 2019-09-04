<template>
  <div>
    <van-cell-group class="top_nav">
      <van-field left-icon="search" />
      <div class="riguht_icon">
        <van-icon name="photograph" size="30" color="#fff" />
        <p>发布</p>
      </div>
    </van-cell-group>
    <van-tabs>
      <van-tab v-for="item in chaList" :title="item.name" :key="item.id">内容 {{ item.name }}</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/login'
export default {
  data () {
    return {
      chaList: []
    }
  },
  methods: {
    async getUserCha () {
      this.chaList = (await getUserChannels()).channels
    }
  },
  created () {
    this.getUserCha()
  }
}
</script>

<style lang="less" scoped>
.top_nav {
  display: flex;
  background-color: #3296fa;
  padding: 5px 20px 5px 20px;
  .riguht_icon {
    height: 54px;
    font-size: 14px;
    margin-left: 20px;
    p {
      margin: 0;
      color: #fff;
    }
  }
}
</style>
