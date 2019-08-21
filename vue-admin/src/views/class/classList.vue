<template>
  <div>
    <div style="padding:10px;overflow:hidden;background:#eee">
      <h1 style="float:left;">班级列表</h1>
      <el-button style="float:right;" size="mini" @click="addClass"
        >添加班级</el-button
      >
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column label="班级名称" prop="name"> </el-table-column>
      <el-table-column label="课程 ID" prop="id"> </el-table-column>
      <el-table-column label="课程总价(元)" prop="price"> </el-table-column>
      <el-table-column label="课程课时总数" prop="lesson_count">
      </el-table-column>
      <el-table-column label="课程状态" prop="status"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleEdit(scope)"
            >进入班级</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import classModel from "@/global/service/class";

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
      classModel.list().then(res => {
        let tableData = res.datas.data;
        tableData.forEach(data => {
          if (data.status == 1) {
            data.status = "正在进行";
          } else if (data.status == 2) {
            data.status = "已完成";
          }
        });
        this.tableData = tableData;
        setTimeout(() => {
          this.loading = false;
        }, 200);
      });
    },
    addClass() {
      this.$router.push({ name: "classAdd" });
    },
    handleEdit(scope) {
      let id = scope.row.id;
      this.$router.push({ name: "classInfo", params: { id } });
    }
  }
};
</script>

<style></style>
