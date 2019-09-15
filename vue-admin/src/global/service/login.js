import request from "./../request/request.js";
import API from "./../request/api.js";

export default {
  login(params) {
    return request.get(API.login, params);
  },
  getManger(token) {
    return request.get(API.getManager, token);
  }
};
