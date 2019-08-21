const PREFIX = "/api";
export default {
  login: PREFIX + "/login",
  user: PREFIX + "/user",
  userInfo: id => `${PREFIX}/user/${id}`,
  userApply: id => `${PREFIX}/class/${id}/adduser`,
  userRecover: id => `${PREFIX}/user/recover/${id}`,
  payment: PREFIX + "/payment",
  course: PREFIX + "/course",
  courseInfo: id => `${PREFIX}/course/${id}`,
  manager: PREFIX + "/manager",
  managerInfo: id => `${PREFIX}/manager/${id}`,
  class: PREFIX + "/class",
  classInfo: id => `${PREFIX}/class/${id}`,
  clickName: id => `${PREFIX}/lesson/${id}/user`
};
