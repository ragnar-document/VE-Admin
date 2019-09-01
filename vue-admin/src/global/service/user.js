import request from "../request/request.js";
import API from "./../request/api.js";

export default {
  list(params) {
    console.log(API.user);
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
  userRecharge(id, params) {
    return request.put(API.userRecharge(id), params);
  },
  recover(id) {
    return request.put(API.userRecover(id));
  },
  delete(id) {
    return request.delete(API.userInfo(id));
  }
};
