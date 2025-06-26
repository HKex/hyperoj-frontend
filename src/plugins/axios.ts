//add interceptor
import axios from "axios";

axios.defaults.withCredentials = true;

axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    //do sth with request error
    return Promise.reject(error);
  }
);

//add response interceptor
axios.interceptors.response.use(
  function (response) {
    //do sth with response data
    return response;
  },
  function (error) {
    //do sth with response error
    return Promise.reject(error);
  }
);
