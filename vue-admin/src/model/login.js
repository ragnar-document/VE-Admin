import request from "./request.js";
import API from "./api.js";

export default {
  login(params) {
    return request.get(API.login, params);
  }
};
