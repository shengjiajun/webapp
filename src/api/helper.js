import axios from 'axios'

const baseUrl = '/'
const ERROR_OK = 0

export function get (url) {
  return (params = {}) => {
    return axios.get(baseUrl + url, {
      params
    }).then((res) => {
      const { errno, data } = res.data
      if (errno === ERROR_OK) {
        return data
      }
    }).catch((e) => {

    })
  }
}
