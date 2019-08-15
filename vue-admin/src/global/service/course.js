import request from "./../request/request.js";
import API from "./../request/api.js";

export default {
  list() {
    return request.get(API.course);
  },
  add(params) {
    return request.post(API.course, params);
  },
  single(id) {
    return request.get(API.courseInfo(id));
  },
  update(id, params) {
    return request.put(API.courseInfo(id), params);
  },
  delete(id) {
    return request.delete(API.courseInfo(id));
  }
};
