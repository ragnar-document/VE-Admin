import request from "./request.js";
import API from "./api.js";

export default {
  list() {
    return request.get(API.payment);
  }
};
