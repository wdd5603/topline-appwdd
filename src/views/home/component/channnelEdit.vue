<template>
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    position="bottom"
    closeable
    close-icon="close"
    :style="{ height: '90%' }"
  >
  <van-cell icon="cross"/>
    <van-cell :border="false" title="我的频道" size="large">
      <van-button v-show="!isEdit" round type="danger" size="mini" @click="isEdit=!isEdit">编辑</van-button>
      <van-button v-show="isEdit" round type="danger" size="mini" @click="isEdit=!isEdit">完成</van-button>
    </van-cell>
    <!-- 我的频道列表 -->
    <van-grid :gutter="10">
      <van-grid-item

        v-for="channel in userChannels"
        :key="channel.id"
        :text="channel.name"
      >
        <van-icon v-show="isEdit" class="close_icon" slot="icon" name="close"></van-icon>
      </van-grid-item>
    </van-grid>
    <van-cell :border="false" title="推荐频道" size="large" />
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
      isEdit: false
    }
  },
  created () {
    console.log(this.channels)
  }
}
</script>

<style lang="less" scoped>
  .close_icon {
    position: absolute;
    right: -5px;
    top: -5px;
  }
</style>
