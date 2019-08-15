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
          <el-dropdown>
            <i class="el-icon-s-operation" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>王小虎</span>
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
export default {
  data: () => ({
    show: false
  }),
  created() {
    setTimeout(() => {
      this.show = true;
    }, 1000);
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
