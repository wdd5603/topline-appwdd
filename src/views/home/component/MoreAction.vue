<template>
  <div>
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      closeOnClickOverlay
      :showConfirmButton="false"
    >
      <van-cell-group v-show="showAction">
        <van-cell value="不感兴趣" icon="closed-eye" @click="disLike" />
        <van-cell value="反馈垃圾内容" is-link icon="info-o" @click="showAction=false" />
        <van-cell value="拉黑作者" icon="delete" @click="blackList" />
      </van-cell-group>
      <van-cell-group v-show="!showAction">
        <van-cell icon="arrow-left" @click="showAction=true" />
        <van-cell
          v-for="item in garbageContent"
          :title="item.title"
          :key="item.type"
          @click="feedback(item.type)"
        />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
import { disLikeArticle, pullBlackList, feedbackArticle } from '@/api/login'
export default {
  data () {
    return {
      showAction: true,

      // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，
      // 6-内容不实，7-涉嫌违法犯罪，8-侵权'
      garbageContent: [
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '侵权', type: 8 },
        { title: '其他问题', type: 0 }
      ]
    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    article: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 文章不感兴趣
    async disLike () {
      /**
     * 操作前需进行是否登录判断：
       已登陆:调用接口后台正常记录
       未登录：将本条内容从内容列表移除，并以上弹窗的形式提醒"将减少类似内容，登陆后推荐更准确"
     */
      if (this.$store.state.token) {
        await disLikeArticle(this.article.art_id)
        this.$emit('moreSuccess')
      } else {
        this.$notify('将减少类似内容，登陆后推荐更准确')
        this.$emit('moreSuccess')
      }
    },
    // 将作者拉入黑名单
    async blackList () {
      try {
        if (this.$store.state.token) {
          await pullBlackList(this.article.aut_id)
          this.$emit('moreSuccess')
          this.$toast('操作成功')
        } else {
          this.$notify('将减少类似内容，登陆后推荐更准确')
          this.$emit('moreSuccess')
          this.$toast('操作成功')
        }
      } catch (error) {
        this.$toast('操作失败')
      }
    },
    // 反馈垃圾内容
    async feedback (type) {
      try {
        if (this.$store.state.token) {
          await feedbackArticle(this.article.art_id, type)
          this.$emit('input', false)
          this.$toast('操作成功')
        } else {
          this.$notify('将减少类似内容，登陆后推荐更准确')
          this.$emit('moreSuccess')
          this.$toast('操作成功')
        }
      } catch (error) {
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style>
</style>
