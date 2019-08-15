import request from "./../request/request.js";
import API from "./../request/api.js";

export default {
  list() {
    return request.get(API.class);
  },
  add(params) {
    return request.post(API.class, params);
  },
  single(id) {
    return request.get(API.classInfo(id));
  }
};
