<template>
  <div>
    <div style="padding:10px;overflow:hidden;background:#eee">
      <h1 style="float:left;">管理员列表</h1>
      <el-button style="float:right;" size="mini" @click="addManager()"
        >添加管理员</el-button
      >
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="id" prop="id"> </el-table-column>
      <el-table-column label="名字" prop="name"> </el-table-column>
      <el-table-column label="手机号" prop="phone"> </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="mini"  @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import managerModel from "@/global/service/manager";

export default {
  data() {
    return {
      currentPage: 1,
      tableData: [],
      search: "",
      total: 0
    };
  },
  created() {
    this.render();
  },
  methods: {
    render() {
      managerModel.list().then(res => {
        this.tableData = res.datas;
        let totalNum = res.datas.length;
        this.total = totalNum;
      });
    },
    addManager() {
      this.$router.push({ name: "managerAdd" });
    },
    handleEdit(scope) {
      let id = scope.id;
      this.$router.push({ name: "managerInfo", params: { id } });
    },
    handleDelete(scope) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = scope.row.id;
        managerModel.delete(id).then(() => {
          this.$message.success("删除成功"), this.render();
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    }
  },
  components: {}
};
</script>

<style scoped>
h1 {
  float: left;
}
.pageItem {
  float: right;
}
</style>
