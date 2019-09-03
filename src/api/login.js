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
