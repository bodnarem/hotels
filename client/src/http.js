import axios from 'axios'
import store from './store/index'

const http = axios.create({
    baseURL: 'http://localhost:3200/api/v1/',
    headers: {
        Authorization: store.getters.token
    }
})

export default http;