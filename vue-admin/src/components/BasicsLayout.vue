<template>
  <div class="home">
    <el-container style="height: 100vh; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: #fff">
        <Sidebar></Sidebar>
      </el-aside>

      <el-container style="background-color: #eef1f6">
        <el-header
          style="text-align: right; font-size: 12px; background-color:#fff;"
        >
          <Breadcrumb
            style="display: inline-block;float: left;margin-top:20px;"
          />
          <el-dropdown @command="handleCommand">
            <i class="el-icon-s-operation" style="margin-right: 15px"></i>
            <el-dropdown-menu  slot="dropdown" >
              <el-dropdown-item command="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{managerData.name}}</span>
        </el-header>
        <transition name="el-fade-in-linear">
          <el-main class="home-main" v-show="show">
            <router-view></router-view>
          </el-main>
        </transition>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Breadcrumb from "./BasicsBreadcrumb.vue";
import Sidebar from "./BasicsSidebar";
import login from "./../global/service/login"
export default {
  data: () => ({
    show: false,
    managerData:[]
  }),
  created() {
    setTimeout(() => {
      this.show = true;
    }, 1000);
    this.render();
  },
  methods: {
    render(){
      let token = localStorage.getItem('token');
      login.getManger(token).then(res=>{
        console.log(res.data[0])
        this.managerData = res.data[0];
      })
    },
    handleCommand(command){
      if (command == 'logout') {
        localStorage.clear();
        this.$router.replace({ name: 'login'});
      }
    }
  },
  components: {
    Sidebar,
    Breadcrumb
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.home-main {
  margin: 20px;
  background-color: #fff;
}
</style>
