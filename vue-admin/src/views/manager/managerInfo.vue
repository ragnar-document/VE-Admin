<template>
  <div>
    <h1 style="margin-bottom:40px">管理员详情</h1>
    <el-form
      status-icon
      :model="managerForm"
      ref="managerForm"
      label-width="100px"
      class="demo-ruleForm"
      style="width:50%"
    >
      <el-form-item label="用户名字">
        <el-input
          v-model="managerForm.name"
          placeholder=""
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户号码">
        <el-input
          v-model="managerForm.phone"
          placeholder=""
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          v-model="managerForm.password"
          placeholder=""
          :disabled="disabled"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addmanager()">保存</el-button>
        <el-button @click="handleEdit()">编辑</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import managerModel from "@/global/service/manager";

export default {
  data() {
    return {
      disabled: true,
      managerForm: {}
    };
  },
  created() {
    let id = Number(this.$route.params.id);
    managerModel
      .single(id)
      .then(res => {
        console.log(res);
        this.managerForm = res.data[0];
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    handleEdit() {
      if (this.disabled) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    addmanager() {
      let id = Number(this.$route.params.id);
      let name = this.managerForm.name;
      let phone = this.managerForm.phone;
      let password = this.managerForm.password;

      if (!name || !phone || !password) {
        this.$message.error("缺少参数");
        return;
      }

      managerModel
        .update(id, { name, phone, password })
        .then(res => {
          console.log(res);
          this.$router.replace({ name: "managerList" });
          this.$message.success("保存成功");
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
