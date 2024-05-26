import axios from 'axios';

//const API= axios.create({baseURL:REACT_APP_BASEURL})
const API = axios.create({
    baseURL: process.env.REACT_APP_BASEURL || 'http://default-base-url.com' // Fallback in case the env variable is not set
  });

API.interceptors.request.use((req)=>{
      if(localStorage.getItem('token')){
        req.headers.Authorization=`Bearer ${localStorage.getItem('token')}`
      }
      return req;
});


export default API;