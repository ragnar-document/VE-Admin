<template>
  <div>
    <h1>消费列表</h1>
    <el-table
      :data="
        tableData.filter(
          data =>
            !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="消费用户" prop="name"> </el-table-column>
      <el-table-column label="消费金额" prop="total"> </el-table-column>
      <el-table-column label="消费时间" prop="created_time"> </el-table-column>
      <el-table-column label="备注" prop="remark"> </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import consumerModel from "@/global/service/consumer";
export default {
  data() {
    return {
      tableData: [],
      search: ""
    };
  },
  created() {
    consumerModel.list().then(res => {
      this.tableData = res.datas.data;
    });
  },
  components: {}
};
</script>

<style></style>
