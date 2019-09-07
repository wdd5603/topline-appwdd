import axios from '@/utils/require'

export let login = ({ mobile, code }) => {
  return axios({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

export const getUserChannels = () => {
  return axios({
    method: 'get',
    url: '/app/v1_0/user/channels'
  })
}
export const getUserArticle = ({ channelId, withTop, timestamp }) => {
  return axios({
    url: '/app/v1_1/articles',
    params: {
      with_top: withTop,
      channel_id: channelId,
      timestamp: timestamp
    }
  })
}
// 文章不喜欢
export const disLikeArticle = (target) => {
  return axios.post('/app/v1_0/article/dislikes', { target })
}
// 拉黑作者
export const pullBlackList = (target) => {
  return axios.post('/app/v1_0/user/blacklists', { target })
}
// 反馈文章内容

export const feedbackArticle = (target, type) => {
  return axios.post('/app/v1_0/article/reports', { target, type })
}
