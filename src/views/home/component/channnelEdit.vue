<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    closeable
    round
    close-icon="close"
    :style="{ height: '90%' }"
  >
    <van-cell icon="cross" />
    <van-cell :border="false" title="我的频道" size="large">
      <van-button v-show="!isEdit" round type="danger" size="mini" @click="isEdit=!isEdit">编辑</van-button>
      <van-button v-show="isEdit" round type="danger" size="mini" @click="isEdit=!isEdit">完成</van-button>
    </van-cell>
    <!-- 我的频道列表 -->
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel,index) in userChannels"
        :key="channel.id"
        @click="handleUserClick(index)"
      >
      <div slot="text" class="van-grid-item__text" :class="{active:activeIndex===index}">{{channel.name}}</div>
        <!-- 删除我的频道关闭按钮 -->
        <van-icon v-if="isEdit && channel.id !== 0" class="close_icon" slot="icon" name="close"></van-icon>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false" title="推荐频道" size="large" />
    <!-- 推荐频道列表 -->
    <van-grid :column-num="5" :gutter="10">
      <van-grid-item v-for="channel in recommendChannels" :key="channel.id" :text="channel.name" />
    </van-grid>
  </van-popup>
</template>

<script>
import { allChannels } from '@/api/login'
export default {
  name: 'ChannelEdit',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userChannels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEdit: false,
      channels: [] // 所有频道列表
    }
  },
  methods: {
    // 获取所有频道列表
    async getAllChannels () {
      try {
        this.channels = (await allChannels()).channels
      } catch (error) {
        this.$toast.fail('获取数据信息失败')
        // throw error
      }
    },
    handleUserClick (index) {
      // 在非编辑模式下
      if (!this.isEdit) {
        this.$emit('chaEditIndex', index)
        this.$emit('input', false)
      }
    }
  },
  computed: {
    recommendChannels () {
      // 获取我的频道的所有频道id
      const ids = this.userChannels.map(item => {
        return item.id
      })
      return this.channels.filter(channel => {
        return !ids.includes(channel.id)
      })
    }
  },
  created () {
    this.getAllChannels()
  }
}
</script>

<style lang="less" scoped>
.close_icon {
  position: absolute;
  right: -5px;
  top: -5px;
}
.active {
  color: red;
}
</style>
