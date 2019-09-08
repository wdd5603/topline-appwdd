<template>
  <div>
    <van-row>
      <van-col span="4" offset="1">
        <van-image round width="50px" height="50px" :src="article.aut_photo" />
      </van-col>
      <van-col span="8">
        <span>{{ article.aut_name }}</span>
        <br />
        <span style="font-size:12px">{{ article.pubdate | relaTime }}</span>
      </van-col>
      <van-col span="6" offset="5">
        <van-button type="info" @click="followingOrNot">{{article.is_followed ? '已关注' : '+关注'}}</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { fllowingUser, unFllowingUser } from '@/api/login'
export default {

  props: ['article'],
  methods: {
    async followingOrNot () {
      // 判断是否登录
      // 。。。。。
      if (this.article.is_followed) {
        // 如果已经关注则取消关注
        await unFllowingUser(this.article.aut_id)
        this.article.is_followed = false
        return
      }
      // 如果未关注则添加关注
      await fllowingUser(this.article.aut_id)
      this.article.is_followed = true
    }
  }
}
</script>

<style>
</style>
