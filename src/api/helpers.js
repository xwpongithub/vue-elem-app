import axios from 'axios'

const ERR_OK = 0

const urlMap = {
  development: '/',
  production: 'http://ustbhuangyi.com/sell/'
}

const baseUrl = urlMap[process.env.NODE_ENV]

export function get(url) {
  return function(params) {
    return axios.get(baseUrl + url, {
      params
    }).then(res => {
      const {errno, data} = res.data
      if (errno === ERR_OK) return data
    }).catch(e => {})
  }
}
