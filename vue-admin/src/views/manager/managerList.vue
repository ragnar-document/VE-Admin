<template>
  <div>
    <div>
      <h1>管理员列表</h1>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="id" prop="id"> </el-table-column>
        <el-table-column label="名字" prop="name"> </el-table-column>
        <el-table-column label="手机号" prop="phone"> </el-table-column>
        <el-table-column align="right">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
import managerModel from "./../../model/manager";

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
    handleEdit(scope){
      let id = scope.id;
      this.$router.push({ name: "managerInfo", params: { id } });
    },
    handleDelete(scope){
       let id = scope.row.id;
       managerModel.delete(id).then(()=>{
         this.$message.success('删除成功'),
         this.render()
       })
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
