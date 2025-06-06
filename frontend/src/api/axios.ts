import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.18.95:3000',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoxLCJpYXQiOjE3NDg2NDc3NzYsImV4cCI6MTc1MTIzOTc3NiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDozMDAwIn0.eDGOgpqdWdC59E8ObMvVGw-10x4_eweuoVvDesObCAI',
    'Content-Type': 'application/json',
  },
})


export default api;