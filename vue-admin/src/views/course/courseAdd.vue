<template>
  <div>
    <h1 style="margin-bottom:40px">添加课程</h1>
    <el-form
      :model="courseForm"
      status-icon
      ref="courseForm"
      label-width="100px"
      class="demo-courseForm"
    >
      <el-form-item label="课程名称">
        <el-input v-model="courseForm.name" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="任课老师">
        <el-input v-model="courseForm.teacher" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="老师电话">
        <el-input v-model="courseForm.teacher_phone" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input
          type="textarea"
          v-model="courseForm.description"
          placeholder=""
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addCourse('courseForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('courseForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import courseModel from "@/global/service/course";

export default {
  data() {
    return {
      courseForm: {
        name: "例如：JavaScript面试解析",
        teacher_phone: "13711111111",
        teacher: "例如：伽利略",
        description: "例如：大部分面试所问到的题目解析"
      }
    };
  },
  methods: {
    addCourse() {
      let name = this.courseForm.name;
      let teacher_phone = this.courseForm.teacher_phone;
      let teacher = this.courseForm.teacher;
      let description = this.courseForm.description;

      if (!name || !teacher_phone || !teacher || !description) {
        this.$message.error("参数缺少");
      }

      courseModel
        .add({ name, teacher_phone, teacher, description })
        .then(() => {
          this.$message.success("添加成功");
          this.$router.replace({ name: "courseList" });
        });
    },
    resetForm() {
      this.courseForm = {
        name: "",
        teacher_phone: "",
        teacher: "",
        description: ""
      };
    }
  }
};
</script>

<style></style>
