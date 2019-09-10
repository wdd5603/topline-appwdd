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
// 获取文章详情
export const getArticleDetail = (target) => {
  return axios.get(`/app/v1_0/articles/${target}`)
}

// 关注用户
export const fllowingUser = (target) => {
  return axios.post('/app/v1_0/user/followings', {
    target
  })
}
// 取消关注用户
export const unFllowingUser = (target) => {
  return axios.delete(`/app/v1_0/user/followings/${target}`, {
    target
  })
}
// 点赞文章
export const approveArticle = (target) => {
  return axios.post('/app/v1_0/article/likings', {
    target
  })
}
// 取消点赞文章
export const disapprovalArticle = (target) => {
  return axios.delete(`/app/v1_0/article/likings/${target}`, {
    target
  })
}
// 不喜欢文章
export const dislikeArticle = (target) => {
  return axios.post('/app/v1_0/article/dislikes', {
    target
  })
}
// 取消不喜欢文章
export const likeArticle = (target) => {
  return axios.delete(`/app/v1_0/article/dislikes/${target}`, {
    target
  })
}
// 获取所有频道
export const allChannels = () => {
  return axios.get('/app/v1_0/channels')
}
