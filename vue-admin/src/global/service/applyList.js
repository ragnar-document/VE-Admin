import request from "./../request/request.js";
import API from "./../request/api.js";

export default {
  list(params) {
    return request.get(API.applyList, params);
  },
  edit(params) {
    console.log(params);
    return request.put(API.applyListEdit, params);
  }
};
