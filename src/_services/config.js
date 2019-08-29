import axios from 'axios'

export const url ='http://localhost:8080/api/';

export const http = axios.create({
    baseURL: 'http://localhost:8080/api/'
})