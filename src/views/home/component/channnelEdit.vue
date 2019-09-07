<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    closeable
    close-icon="close"
    :style="{ height: '90%' }"
  >
    <van-cell :border="false" title="我的频道" size="large">
      <van-button round type="danger" size="mini">编辑</van-button>
    </van-cell>
    <!-- 我的频道列表 -->
    <van-grid :gutter="10">
      <van-grid-item v-for="channel in userChannels" :key="channel.id" :text="channel.name" />
    </van-grid>
    <van-cell :border="false" title="推荐频道" size="large"/>
    <!-- 推荐频道列表 -->
    <van-grid :column-num="5" :gutter="10">
      <van-grid-item v-for="value in 8" :key="value" text="+文字" />
    </van-grid>
  </van-popup>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      required: true
    },
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      show: true
    }
  },
  created () {
    console.log(this.channels)
  }
}
</script>

<style>
</style>
