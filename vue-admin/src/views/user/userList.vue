<template>
  <div>
    <div style="padding:10px;overflow:hidden;background:#eee">
      <h1 style="float:left;">用户列表</h1>
      <el-button style="float:right;" size="mini" @click="addUser"
        >添加新用户</el-button
      >
      <el-badge :value="recondDate.length" class="item">
        <el-popover placement="left" width="400" trigger="click">
          <el-table :data="recondDate">
            <el-table-column label="名字" prop="name"> </el-table-column>
            <el-table-column label="手机号" prop="phone"> </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button type="text" @click="recover(scope)">
                  恢复
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-button slot="reference" size="mini">删除记录</el-button>
        </el-popover>
      </el-badge>
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
          <el-button
            type="text"
            size="mini"
            icon="el-icon-user"
            @click="handleApply(scope)"
            >用户报班
          </el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-edit-outline"
            @click="handleInfo(scope)"
            >详情
          </el-button>
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            @click="handleDelete(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-show="numb == 10"
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
import userModel from "@/global/service/user";

export default {
  data() {
    return {
      currentPage: 1,
      tableData: [],
      recondDate: [],
      search: "",
      total: 0,
      numb: 0,
      loading: true
    };
  },
  created() {
    this.render();
  },
  methods: {
    render() {
      userModel.list().then(res => {
        this.tableData = res.data.data;
        this.recondDate = res.data.pagination.recondDate;
        let totalNum = res.data.pagination.total;
        this.numb = res.data.data.length;
        this.total = totalNum;
        setTimeout(() => {
          this.loading = false;
        }, 300);
      });
    },
    addUser() {
      this.$router.push({ name: "userAdd" });
    },
    recover(e) {
      let index = e.$index;
      let recoverList = this.recondDate;
      let recoverMainId = recoverList[index].id;

      this.$confirm("恢复该删除用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          userModel
            .recover(recoverMainId)
            .then(() => {
              this.$message.success("恢复成功");
              this.render();
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleCurrentChange(e) {
      let pageIndex = e;
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
    handleApply(scope) {
      let id = scope.row.id;
      this.$router.push({ name: "userApply", params: { id } });
    },
    handleDelete(scope) {
      this.$confirm("危险动作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let id = scope.row.id;
          userModel.delete(id).then(() => {
            this.$notify({
              title: "删除成功",
              message: "已经正常删除用户",
              type: "success"
            });
            this.render();
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

<style scoped>
h1 {
  float: left;
}
.pageItem {
  float: right;
}
.item {
  margin-right: 20px;
  float: right;
}
</style>
