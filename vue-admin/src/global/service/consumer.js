import request from "./../request/request.js";
import API from "./../request/api.js";

export default {
  list(params) {
    return request.get(API.payment, params);
  }
};
