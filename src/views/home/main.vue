<template>
  <div>
    <!-- 搜索框 -->
    <van-search
      class="van_search"
      v-model="keyWords"
      placeholder="请输入搜索关键词"
      background="#3296fa"
      clearable
    >
      <div slot="right-icon">
        <van-icon name="photograph" />
      </div>
    </van-search>
    <!-- 频道列表 -->
    <van-tabs v-model="activeIndex">
      <van-tab v-for="channel in chaList" :title="channel.name" :key="channel.id">
        <!-- 下拉刷新组件 -->
        <van-pull-refresh
          :success-text="successText"
          v-model="currentChannel.loading"
          @refresh="onRefresh"
        >
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="loadArticles"
          >
            <van-cell
              v-for="item in currentChannel.articleList"
              :key="item.art_id.toString()"
              :title="item.title"
            >
              <template slot="label">
                <van-grid v-if="item.cover.type" :border="false" :column-num="3">
                  <van-grid-item v-for="(image,index) in item.cover.images" :key="image+index">
                    <van-image lazy-load :src="image" height="100px">
                      <!-- 加载中提示 -->
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <span>{{ item.aut_name }}</span>&nbsp;
                <span>{{ item.comm_count }}评论</span>&nbsp;
                <span>{{ item.pubdate | relaTime }}</span>
                <van-icon name="close" style="float:right" @click="showPopup(item)" />
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <channel-edit></channel-edit>
    <more-action
      v-if="currentArticle"
      :article="currentArticle"
      @moreSuccess="moreSuccess"
      v-model="showAction"
    ></more-action>
  </div>
</template>

<script>
import { getUserChannels, getUserArticle } from '@/api/login'
import MoreAction from './component/MoreAction'
import { getItem, setItem } from '@/utils/localStorage'
import channelEdit from './component/channnelEdit'
export default {
  name: 'home',
  components: {
    MoreAction,
    channelEdit
  },
  data () {
    return {
      keyWords: '',
      chaList: [], // 频道列表
      activeIndex: 0, // 当前被点击的频道索引
      successText: '',
      showAction: false, // 控制更多操作显示与隐藏
      currentArticle: null
    }
  },
  computed: {
    currentChannel () {
      return this.chaList[this.activeIndex]
    }
  },
  methods: {
    // 获取频道文章列表
    async loadArticles () {
      let result = await getUserArticle({
        channelId: this.currentChannel.id,
        withTop: 1,
        timestamp: this.currentChannel.timestamp || Date.now()
      })
      // 记录前请求回来的时间戳，下次请求使用
      this.currentChannel.timestamp = result.pre_timestamp
      // 将获取回来的对象数组列表解构到当前频道的内容列表
      this.currentChannel.articleList.push(...result.results)
      // “加载中”设置为隐藏
      this.currentChannel.loading = false
      // 当频道中的数据加载完成后，显示“没有更多了”
      if (result.results.lenght === 0) {
        this.currentChannel.finished = true
      }
    },
    // 获取频道列表
    async getUserCha () {
      let channels = []
      if (this.$store.state.token) {
        channels = (await getUserChannels()).channels
      } else {
        channels = getItem('channel')
        if (!channels) {
          let defaultChannels = (await getUserChannels()).channels
          setItem('channel', defaultChannels)
          channels = defaultChannels
        }
      }
      channels.forEach(channel => {
        channel.timestamp = null
        channel.articleList = []
        channel.finished = false
        channel.loading = false
      })
      this.chaList = channels
    },
    // 下拉刷新
    async onRefresh () {
      const result = await getUserArticle({
        channelId: this.currentChannel.id,
        withTop: 1,
        timestamp: Date.now()
      })
      this.currentChannel.articleList.unshift(...result.results)
      this.currentChannel.loading = false
      this.successText = `成功加载了${result.results.length}条数据`
    },
    showPopup (article) {
      this.showAction = true
      this.currentArticle = article
    },
    moreSuccess () {
      try {
        this.showAction = false
        const index = this.currentChannel.articleList.findIndex((article) => {
          return this.currentArticle.art_id === article.art_id
        })
        this.currentChannel.articleList.splice(index, 1)
        this.$toast('操作成功')
      } catch (error) {
        this.$toast('操作失败')
      }
    }
  },

  created () {
    this.getUserCha()
  }
}
</script>

<style lang="less" scoped>
.van_search {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
}
.van-tabs {
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 54px;
    left: 0;
    z-index: 20;
    width: 100%;
  }
  /deep/.van-tabs__content {
    // margin-bottom: 80px;
    margin-top: 98px;
  }
}
</style>
