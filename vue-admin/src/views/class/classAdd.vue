<template>
  <div>
    <h1 style="margin-bottom:40px">新建班级</h1>
    <el-form
      status-icon
      :v-model="classForm"
      ref="classForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="班级名称">
        <el-input v-model="classForm.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="班级描述">
        <el-input
          type="textarea"
          v-model="classForm.description"
          placeholder="暂无详情"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程 ID">
        <el-input v-model="classForm.course_id" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="课程总价">
        <el-input v-model="classForm.price" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="课程课时总数">
        <el-input v-model="classForm.lesson_count" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="课程状态">
        <el-input
          v-model="classForm.status"
          placeholder=" 1: 进行中 2: 已完成"
        ></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="classForm.start_at"
          type="date"
          format="timestamp"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="classForm.end_at"
          type="date"
          format="timestamp"
          placeholder="选择日期"
        >
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addUser()">提交</el-button>
        <el-button @click="resetForm('classForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import classModel from "@/global/service/class.js";

export default {
  data() {
    return {
      classForm: {
        name: "",
        description: "暂无详情",
        course_id: "",
        price: "",
        lesson_count: "",
        status: "1",
        start_at: "",
        end_at: ""
      }
    };
  },
  methods: {
    addUser() {
      let name = this.classForm.name;
      let description = this.classForm.description;
      let course_id = this.classForm.course_id;
      let price = this.classForm.price;
      let lesson_count = this.classForm.lesson_count;
      let status = this.classForm.status;
      let start_at = this.classForm.start_at;
      let end_at = this.classForm.end_at;

      if (
        !name ||
        !description ||
        !course_id ||
        !lesson_count ||
        !status ||
        !price ||
        !start_at ||
        !end_at
      ) {
        this.$message.error("缺少参数");
        return;
      }

      classModel
        .add({
          name,
          description,
          course_id,
          lesson_count,
          status,
          price,
          start_at,
          end_at
        })
        .then(() => {
          this.$router.replace({ name: "classList" });
          this.$message.success("创建成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    resetForm() {
      this.classForm = {
        name: "",
        description: "",
        course_id: "",
        price: "",
        lesson_count: "",
        status: "",
        start_at: "",
        end_at: ""
      };
    }
  }
};
</script>

<style></style>
