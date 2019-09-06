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
