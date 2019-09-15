const PREFIX = "/api";
export default {
  login: PREFIX + "/login",
  user: PREFIX + "/user",
  userInfo: id => `${PREFIX}/user/${id}`,
  userApply: id => `${PREFIX}/class/${id}/adduser`,
  userRecharge: id => `${PREFIX}/user/${id}/recharge`,
  userRecover: id => `${PREFIX}/user/recover/${id}`,
  payment: PREFIX + "/payment",
  course: PREFIX + "/course",
  courseInfo: id => `${PREFIX}/course/${id}`,
  manager: PREFIX + "/manager",
  managerInfo: id => `${PREFIX}/manager/${id}`,
  class: PREFIX + "/class",
  classInfo: id => `${PREFIX}/class/${id}`,
  classSetTime: id => `${PREFIX}/class/${id}/course`,
  lessonCall: id => `${PREFIX}/lesson/${id}/user`,
  lessonItem: id => `${PREFIX}/lesson/${id}`,
  applyList: PREFIX + "/applyList",
  applyListEdit: PREFIX + "/applyEdit",
  getManager: PREFIX + '/getManager'
};
