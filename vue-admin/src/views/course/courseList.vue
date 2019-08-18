<template>
  <div>
    <div style="padding:10px;overflow:hidden;background:#eee">
      <h1 style="float:left;">课程列表</h1>
      <el-button style="float:right;" size="mini" @click="addCourse"
        >添加课程</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column label="课程名称" prop="name"> </el-table-column>
      <el-table-column label="任课老师" prop="teacher"> </el-table-column>
      <el-table-column label="手机号" prop="teacher_phone"> </el-table-column>
      <el-table-column label="课程简介" prop="description"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope)"
            >编辑</el-button
          >
          <el-button type="text" size="mini" @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import courseModel from "@/global/service/course";

export default {
  data() {
    return {
      tableData: [],
      search: "",
      loading: true
    };
  },
  created() {
    this.render();
  },
  methods: {
    render() {
      courseModel.list().then(res => {
        this.tableData = res.datas;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      });
    },
    addCourse() {
      this.$router.push({ name: "courseAdd" });
    },
    handleEdit(scope) {
      let id = scope.row.id;
      this.$router.push({ name: "courseInfo", params: { id } });
    },
    handleDelete(scope) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = scope.row.id;
          courseModel
            .delete(id)
            .then(() => {
              this.render();
              this.$message.success("删除成功");
            })
            .catch(err => {
              console.log(err);
              this.$message.error("删除失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  components: {}
};
</script>

<style></style>
