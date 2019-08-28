<template>
  <div>
     <div style="padding:10px;overflow:hidden;background:#eee">
      <h1 style="float:left;">用户列表</h1>
      <el-button style="float:right;" size="mini" @click="addUser">添加新用户</el-button>
    </div>
    <el-table
      :data="
        tableData.filter(
          data =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.phone.toLowerCase().includes(search.toLowerCase()) ||
            data.created_at.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      v-loading="loading"
      element-loading-text="拼命加载中"
    >
      <el-table-column label="创建时间" prop="created_at"> </el-table-column>
      <el-table-column label="名字" prop="name"> </el-table-column>
      <el-table-column label="手机号" prop="phone"> </el-table-column>
      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handleInfo(scope)">详情 </el-button>
          <el-button type="text" size="mini"  @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
       <el-pagination
        class="pageItem"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :total="total"
      >
      </el-pagination>
  </div>
</template>

<script>
import userModel from "./../../model/user";

export default {
  data() {
    return {
      currentPage: 1,
      tableData: [],
      search: "",
      total: 0,
      loading: true,
    };
  },
  created() {
    this.render();
  },
  methods: {
    render() {
      userModel.list().then(res => {
        this.tableData = res.data.data;
        let totalNum = res.data.pagination.total;
        this.total = totalNum;
        setTimeout(()=>{
          this.loading = false
        },300)
      });
    },
    addUser(){
      this.$router.push({ name:"userAdd" })
    },
    handleCurrentChange(e) {
      let pageIndex = e;
      console.log(pageIndex);
      userModel
        .list({ pageIndex })
        .then(res => {
          this.tableData = res.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleInfo(scope) {
      let id = scope.row.id;
      this.$router.push({ name: "userInfo", params: { id } });
    },
    handleDelete(scope) {
      let id = scope.row.id;
      userModel.delete(id).then(() => {
        this.$message.success("删除成功");
        this.render();
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
