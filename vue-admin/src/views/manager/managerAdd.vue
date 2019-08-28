<template>
  <div>
    <h1 style="margin-bottom:40px">添加新管理员</h1>
    <el-form
      status-icon
      :model="managerForm"
      :rules="rules"
      ref="managerForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名字" prop="name">
        <el-input v-model="managerForm.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="用户号码" prop="phone">
        <el-input v-model="managerForm.phone" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
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
import managerModel from "@/global/service/manager";

export default {
  data() {
    return {
      managerForm: {
        name: "",
        phone: "",
        password: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "目前只支持中国大陆的手机号码",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            pattern: /^[\w_-]{6,16}$/,
            message:
              "最短6位，最长16位 可以包含小写大母 [a-z] 和大写字母 [A-Z]可以包含数字 [0-9]可以包含下划线 [ _ ] 和减号 [ - ]",
            trigger: "blur"
          }
        ],
        name: [{ required: true, message: "请输入你的名字", trigger: "blur" }]
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
        .then(() => {
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
