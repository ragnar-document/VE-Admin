import axios from "axios";
// 添加一个请求拦截器（ 一般用于鉴权 )
axios.interceptors.request.use(
  config => {
    const newConfig = { ...config };
    const TOKEN = localStorage.getItem('token');
    if (TOKEN) {
      newConfig.headers.Authorization = `${TOKEN}`;
    }
    return newConfig;
  },
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default {
  post: function (url = "", data = {}, config) {
    return axios.post(url, data, config);
  },

  put: function(url = "", data = {}, config) {
    return axios.put(url, data, config);
  },

  get: function (url, params = {}, config) {
    console.log(config)
    let OPTIONS = Object.assign({ params }, config);
    return axios.get(url, OPTIONS);
  },

  delete: function(url = "", params = {}, config) {
    let OPTIONS = Object.assign({ params }, config);
    return axios.delete(url, OPTIONS);
  }
};
