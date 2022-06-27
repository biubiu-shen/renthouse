import axios from 'axios'
export const request = axios.create({
  baseURL: 'http://liufusong.top:8080/',
  timeout: 5000
})
