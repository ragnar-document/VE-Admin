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
          <el-button type="text" size="mini" @click="handleEdit(scope.row)"
            >编辑</el-button
          >
          <el-button type="text" size="mini" @click="deleteManager(scope.row)"
            >删除</el-button
          >
          <el-dialog
            :title="'此操作将无法恢复/'.concat(oldName)"
            :visible.sync="centerDialogVisible"
            modal
            width="30%"
            center
          >
            <span style="color:red;" v-if="awesome">请输入删除项的名字</span>
            <span style="color:green;" v-else>输入正确</span>
            <el-input v-model="newName" placeholder=""></el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="sureDelete">确 定</el-button>
            </span>
          </el-dialog>
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
      centerDialogVisible: false,
      currentPage: 1,
      tableData: [],
      search: "",
      total: 0,
      oldName: "",
      newName: "",
      deleteId: "",
      awesome: true
    };
  },
  created() {
    this.render();
  },
  watch: {
    newName: function() {
      if (this.newName == this.oldName) {
        this.awesome = false;
      } else {
        this.awesome = true;
      }
    }
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
    deleteManager(data) {
      this.centerDialogVisible = true;
      this.oldName = data.name;
      this.deleteId = data.id;
    },
    sureDelete() {
      let oldName = this.oldName;
      let newName = this.newName;
      let deleteId = this.deleteId;

      if (oldName == newName) {
        managerModel.delete(deleteId).then(() => {
          this.$message.success("删除成功"), this.render();
        });
        this.centerDialogVisible = false;
      } else {
        this.centerDialogVisible = false;
        this.$message.error("与删除的项目名称不符合！");
      }
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
