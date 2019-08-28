<template>
  <div>
    <div style="overflow: hidden;">
      <h1 style="margin-bottom:40px">课程详情</h1>
      <el-link type="primary" style="float:right;margin:10px;" @click="editItem"
        >编辑用户</el-link
      >
    </div>
    <el-form
      :model="courseForm"
      status-icon
      ref="courseForm"
      label-width="100px"
      class="demo-courseForm"
    >
      <el-form-item label="课程名称">
        <el-input
          v-model="courseForm.name"
          placeholder=""
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="任课老师">
        <el-input
          v-model="courseForm.teacher"
          placeholder=""
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="老师电话">
        <el-input
          v-model="courseForm.teacher_phone"
          placeholder=""
          :disabled="disabled"
        ></el-input>
      </el-form-item>
      <el-form-item label="课程简介">
        <el-input
          type="textarea"
          v-model="courseForm.description"
          placeholder=""
          :disabled="disabled"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="addCourse('courseForm')"
          >保存</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import courseModel from "@/global/service/course";

export default {
  data() {
    return {
      disabled: true,
      courseForm: {
        name: "",
        teacher_phone: "",
        teacher: "",
        description: ""
      }
    };
  },
  created() {
    let pathId = Number(this.$route.params.id);

    courseModel
      .single(pathId)
      .then(res => {
        this.courseForm = res.datas[0];
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    addCourse() {
      let id = Number(this.$route.params.id);
      let name = this.courseForm.name;
      let teacher_phone = this.courseForm.teacher_phone;
      let teacher = this.courseForm.teacher;
      let description = this.courseForm.description;

      if (!name || !teacher_phone || !teacher || !description) {
        this.$message.error("参数缺少");
      }

      courseModel
        .update(id, { name, teacher_phone, teacher, description })
        .then(() => {
          this.$message.success("保存成功");
          this.$router.replace({ name: "courseList" });
        });
    },
    editItem() {
      if (this.disabled) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  }
};
</script>

<style></style>
