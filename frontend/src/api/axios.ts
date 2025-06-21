import axios from 'axios'

const api = axios.create({
  //baseURL: 'http://192.168.18.95:3000', // casa
  baseURL: 'http://192.168.1.10:3000', // manoel
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TOKEN}` ,
    'Content-Type': 'application/json',
  },
})


export default api;