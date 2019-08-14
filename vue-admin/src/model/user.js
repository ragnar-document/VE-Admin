import request from "./request.js";
import API from "./api.js";

export default {
  list(params) {
    return request.get(API.user, params);
  },
  add(params) {
    return request.post(API.user, params);
  },
  single(id) {
    return request.get(API.userInfo(id));
  },
  update(id, params) {
    return request.put(API.userInfo(id), params);
  },
  delete(id) {
    return request.delete(API.userInfo(id));
  }
};
