import Axios from 'axios'
import Store from './store'

/* eslint-disable */
console.log(Store);

const http = Axios.create({
    baseURL: 'http://localhost:3200',
    headers: {
        Authorization: 'какой то токен'
    }
});

export default http;