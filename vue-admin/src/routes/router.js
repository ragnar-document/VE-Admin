const Home = () => import(/* webpackChunkName: "Home" */ "@/views/Home.vue");
const login = () => import(/* webpackChunkName: "login" */ "@/views/login.vue");
const classList = () =>
  import(/* webpackChunkName: "classList" */ "@/views/class/classList.vue");
const classAdd = () =>
  import(/* webpackChunkName: "classAdd" */ "@/views/class/classAdd.vue");
const classInfo = () =>
  import(/* webpackChunkName: "classInfo" */ "@/views/class/classInfo.vue");
const courseAdd = () =>
  import(/* webpackChunkName: "courseAdd" */ "@/views/course/courseAdd.vue");
const courseList = () =>
  import(/* webpackChunkName: "courseList" */ "@/views/course/courseList.vue");
const courseInfo = () =>
  import(/* webpackChunkName: "courseInfo" */ "@/views/course/courseInfo.vue");
const userList = () =>
  import(/* webpackChunkName: "userList" */ "@/views/user/userList.vue");
const userAdd = () =>
  import(/* webpackChunkName: "userAdd" */ "@/views/user/userAdd.vue");
const userInfo = () =>
  import(/* webpackChunkName: "userInfo" */ "@/views/user/userInfo.vue");
const userApply = () =>
  import(/* webpackChunkName: "userApply" */ "@/views/user/userApply.vue");
const managerList = () =>
  import(
    /* webpackChunkName: "managerList" */ "@/views/manager/managerList.vue"
  );
const managerAdd = () =>
  import(/* webpackChunkName: "managerAdd" */ "@/views/manager/managerAdd.vue");
const managerInfo = () =>
  import(
    /* webpackChunkName: "managerInfo" */ "@/views/manager/managerInfo.vue"
  );
const consumer = () =>
  import(/* webpackChunkName: "consumer" */ "@/views/consumer/consumer.vue");
const Layout = () =>
  import(/* webpackChunkName: "Layout" */ "@/components/BasicsLayout.vue");

export default [
  {
    path: "/login",
    name: "login",
    component: login
  },
  {
    path: "/",
    name: "Root",
    component: Layout,
    redirect: { name: "Home" },
    meta: {
      breadcrumb: {
        title: "根目录",
        replace: "/"
      }
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
          nav: {
            icon: "el-icon-pie-chart",
            title: "概况"
          },
          breadcrumb: {
            title: "概况"
          }
        }
      },
      {
        path: "/classList",
        name: "classListRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-s-grid",
            title: "班级"
          },
          breadcrumb: {
            title: "班级"
          }
        },
        children: [
          {
            path: "/classList",
            name: "classList",
            component: classList,
            meta: {
              nav: {
                icon: "el-icon-pie-chart",
                title: "班级列表"
              },
              breadcrumb: {
                title: "班级列表"
              }
            }
          },
          {
            path: "/classAdd",
            name: "classAdd",
            component: classAdd,
            meta: {
              breadcrumb: {
                title: "添加班级"
              }
            }
          },
          {
            path: "/class/:id",
            name: "classInfo",
            component: classInfo,
            meta: {
              breadcrumb: {
                title: "班级详情"
              }
            }
          }
        ]
      },
      {
        path: "/consumer",
        name: "consumer",
        component: consumer,
        meta: {
          nav: {
            icon: "el-icon-wallet",
            title: "消费"
          },
          breadcrumb: {
            title: "消费列表"
          }
        }
      },
      {
        path: "/courseList",
        name: "courseListRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-wallet",
            title: "课程"
          },
          breadcrumb: {
            title: "课程"
          }
        },
        children: [
          {
            path: "/courseList",
            name: "courseList",
            component: courseList,
            meta: {
              nav: {
                icon: "el-icon-edit-outline",
                title: "课程列表"
              },
              breadcrumb: {
                title: "课程列表"
              }
            }
          },
          {
            path: "/courseAdd",
            name: "courseAdd",
            component: courseAdd,
            meta: {
              breadcrumb: {
                title: "课程添加"
              }
            }
          },
          {
            path: "/course/:id",
            name: "courseInfo",
            component: courseInfo,
            meta: {
              breadcrumb: {
                title: "课程详情"
              }
            }
          }
        ]
      },
      {
        path: "/userList",
        name: "userListRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-s-custom",
            title: "用户"
          },
          breadcrumb: {
            title: "用户"
          }
        },
        children: [
          {
            path: "/userList",
            name: "userList",
            component: userList,
            meta: {
              nav: {
                icon: "el-icon-user",
                title: "用户列表"
              },
              breadcrumb: {
                title: "用户列表"
              }
            }
          },
          {
            path: "/userAdd",
            name: "userAdd",
            component: userAdd,
            meta: {
              breadcrumb: {
                title: "用户添加"
              }
            }
          },
          {
            path: "/userInfo/:id",
            name: "userInfo",
            component: userInfo,
            meta: {
              breadcrumb: {
                title: "用户详情"
              }
            }
          },
          {
            path: "/userApply/:id",
            name: "userApply",
            component: userApply,
            meta: {
              breadcrumb: {
                title: "用户报班"
              }
            }
          }
        ]
      },
      {
        path: "/managerList",
        name: "managerListRoot",
        component: { render: h => h("router-view") },
        meta: {
          nav: {
            icon: "el-icon-user",
            title: "管理员"
          },
          breadcrumb: {
            title: "管理员"
          }
        },
        children: [
          {
            path: "/managerList",
            name: "managerList",
            component: managerList,
            meta: {
              nav: {
                icon: "el-icon-pie-chart",
                title: "管理员列表"
              },
              breadcrumb: {
                title: "管理员列表"
              }
            }
          },
          {
            path: "/managerAdd",
            name: "managerAdd",
            component: managerAdd,
            meta: {
              breadcrumb: {
                title: "管理员添加"
              }
            }
          },
          {
            path: "/manager/:id",
            name: "managerInfo",
            component: managerInfo,
            meta: {
              breadcrumb: {
                title: "管理员详情"
              }
            }
          }
        ]
      }
    ]
  }
];
