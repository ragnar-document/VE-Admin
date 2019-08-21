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
  },
  update(id, params) {
    return request.put(API.classInfo(id), params);
  },
  addUser(id, params) {
    return request.post(API.userApply(id), params);
  },
  clickName(id, params) {
    return request.put(API.clickName(id), params);
  }
};
