import axios from "axios";

axios.interceptors.response.use(
  res => {
    return res.data;
  },
  error => {
    return Promise.reject(error);
  }
);

export default {
  post: function(url = "", data = {}, config) {
    return axios.post(url, data, config);
  },

  put: function(url = "", data = {}, config) {
    return axios.put(url, data, config);
  },

  get: function(url, params = {}, config) {
    let OPTIONS = Object.assign({ params }, config);
    return axios.get(url, OPTIONS);
  },

  delete: function(url = "", params = {}, config) {
    let OPTIONS = Object.assign({ params }, config);
    return axios.delete(url, OPTIONS);
  }
};
