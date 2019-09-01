import request from "./../request/request.js";
import API from "./../request/api.js";

export default {
  list(id, params) {
    return request.get(API.lessonItem(id), params);
  },
  call(id, params) {
    return request.post(API.lessonCall(id), params);
  }
};
