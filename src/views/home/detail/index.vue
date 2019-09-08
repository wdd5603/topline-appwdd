<template>
  <div>
    <van-nav-bar fixed left-text="返回" left-arrow>
      <van-icon name="ellipsis" slot="right" />
    </van-nav-bar>
    <h3 class="title">{{ article.title }}</h3>
    <!-- 作者信息 -->
    <author-info :article="article"></author-info>
    <p v-html="article.content" style="padding:15px"></p>
    <van-row type="flex" justify="space-around">
      <van-col span="6">
        <van-button
          icon="like"
          :class="{agree:article.attitude === 1}"
          round
          type="default"
          @click="toAgree"
        >点赞</van-button>
      </van-col>
      <van-col span="8">
        <van-button icon="closed-eye" round type="default">不喜欢</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {
  getArticleDetail,
  approveArticle,
  disapprovalArticle
} from '@/api/login'
import AuthorInfo from '../component/AuthorInfo'
export default {
  name: 'detail',
  data () {
    return {
      article: {}
    }
  },
  components: {
    AuthorInfo
  },
  props: ['id'],
  methods: {
    // 获取文章详情
    async getArticle () {
      try {
        this.article = await getArticleDetail(this.id)
      } catch (error) {
        this.$toast('获取文章数据失败')
      }
    },
    // 点赞文章
    // 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞
    async toAgree () {
      if (this.article.attitude === 1) {
        await disapprovalArticle(this.article.art_id)
        this.article.attitude = -1
        return
      }
      await approveArticle(this.article.art_id)
      this.article.attitude = 1
    }
  },
  created () {
    this.getArticle()
  }
}
</script>

<style lang="less" scoped>
.title {
  margin-top: 50px;
}
.agree {
  color: red;
}
</style>
