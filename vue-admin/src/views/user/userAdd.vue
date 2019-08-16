<template>
  <div>
    <h1 style="margin-bottom:40px">添加新用户</h1>
    <el-form
      status-icon
      :v-model="userForm"
      ref="userForm"
      label-width="100px"
      class="demo-ruleForm"
      :rules="rules"
    >
      <el-form-item label="用户名字" prop="name">
        <el-input v-model="userForm.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="用户号码" prop="phone">
        <el-input v-model="userForm.phone" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="紧急联系人">
        <el-input v-model="userForm.sms_name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="紧急联系电话">
        <el-input v-model="userForm.sms_phone" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="用户性别">
        <el-radio-group v-model="userForm.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="用户生日">
        <el-date-picker
          v-model="userForm.birthday"
          type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addUser()">提交</el-button>
        <el-button @click="resetForm('userForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import userModel from "@/global/service/user";

export default {
  data() {
    return {
      userForm: {
        name: "",
        phone: "",
        sex: "",
        birthday: "",
        sms_name: "",
        sms_phone: ""
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
            message: "最短6位，最长16位 可以包含小写大母 [a-z] 和大写字母 [A-Z]可以包含数字 [0-9]可以包含下划线 [ _ ] 和减号 [ - ]",
            trigger: "blur"
          }
        ],
        name : [
          { required: true, message: "请输入你的名字", trigger:"blur"}
        ]
      }
    };
  },
  methods: {
    addUser() {
      let name = this.userForm.name;
      let phone = this.userForm.phone;
      let sex = this.userForm.sex;
      let birthday = this.userForm.birthday;
      let sms_name = this.userForm.sms_name;
      let sms_phone = this.userForm.sms_phone;
      console.log(name, phone, sex, birthday, sms_name, sms_phone);

      if (!name || !phone || !sex || !sms_name || !sms_phone) {
        this.$message.error("缺少参数");
        return;
      }

      userModel
        .add({ name, phone, sex, birthday, sms_name, sms_phone })
        .then(res => {
          console.log(res);
          this.$router.replace({ name: "userList" });
          this.$message.success("创建成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    resetForm(formName) {
      this.userForm = {
        name: "",
        phone: "",
        sex: "",
        birthday: "",
        sms_name: "",
        sms_phone: ""
      };
    }
  }
};
</script>

<style></style>
