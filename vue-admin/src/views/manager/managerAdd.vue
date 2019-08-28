<template>
  <div>
    <h1 style="margin-bottom:40px">添加新管理员</h1>
    <el-form
      status-icon
      :model="managerForm"
      ref="managerForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名字">
        <el-input v-model="managerForm.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="用户号码">
        <el-input v-model="managerForm.phone" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="managerForm.password" placeholder=""></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addmanager()">提交</el-button>
        <el-button @click="resetForm('managerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import managerModel from "./../../model/manager";

export default {
  data() {
    return {
      managerForm: {
        name: "",
        phone: "",
        password: ""
      }
    };
  },
  methods: {
    addmanager() {
      let name = this.managerForm.name;
      let phone = this.managerForm.phone;
      let password = this.managerForm.password;

      if (!name || !phone || !password) {
        this.$message.error("缺少参数");
        return;
      }

      managerModel
        .add({ name, phone, password })
        .then(res => {
          console.log(res);
          this.$router.replace({ name: "managerList" });
          this.$message.success("创建成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style></style>
