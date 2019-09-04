<template>
  <div>
    <van-cell-group class="top_nav">
      <van-field left-icon="search" />
      <div class="riguht_icon">
        <van-icon name="photograph" size="30" color="#fff" />
        <p>发布</p>
      </div>
    </van-cell-group>
    <van-tabs  @click="switchChannel">
      <van-tab v-for="item in chaList" :title="item.name" :name="item.id" :key="item.id">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title" />{{item.art_id}}
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels, getUserArticle } from '@/api/login'
export default {
  data () {
    return {
      chaList: [], // 频道列表
      loading: false,
      finished: false,
      articleParams: { // 根据频道获取内容参数
        channelId: 0,
        withTop: 1
      },
      articleList: [], // 根据频道获取到的内容列表
      page: {
        page: 1,
        per_page: 5
      }
    }
  },
  methods: {
    // 切换频道获取相应内容
    switchChannel (name) {
      this.articleParams.channelId = name
      this.getUserArticle()
    },
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    },
    // 获取当前用户频道列表
    async getUserCha () {
      this.chaList = (await getUserChannels()).channels
    },
    // 获取频道文章列表
    async getUserArticle () {
      let { channelId, withTop } = this.articleParams
      this.articleList = (await getUserArticle(
        channelId,
        withTop,
        Date.now()
      )).results
    }
  },
  created () {
    this.getUserCha()
    this.getUserArticle()
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
