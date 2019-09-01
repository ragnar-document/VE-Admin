<template>
  <div>
    <div style="padding:10px;overflow:hidden;background:#eee">
      <h1 style="float:left;">班级列表</h1>
      <div style="float:right">
        <el-date-picker
          style="width:200px"
          size="mini"
          v-model="findModel.selectTime"
          type="daterange"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
        <el-select
          v-model="findModel.optionValue"
          placeholder="请选择"
          style="width:100px"
          size="mini"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button size="mini" @click="findContent">查询</el-button>
        <el-button size="mini" @click="resetContent" style="margin-left:0px"
          >重置</el-button
        >
      </div>
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
      <el-table-column label="课程分类" prop="course_name"> </el-table-column>
      <el-table-column label="课程 ID" prop="id"> </el-table-column>
      <el-table-column label="课程总价(元)" prop="price"> </el-table-column>
      <el-table-column label="开始时间" prop="start_at"> </el-table-column>
      <el-table-column label="结束时间" prop="end_at"> </el-table-column>
      <el-table-column label="课程状态">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 1 ? 'info' : ''">
            {{ scope.row.status === 1 ? "未开始" : "进行中" }}</el-tag
          >
        </template>
      </el-table-column>
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
      findModel: {
        selectTime: [], //时间选择
        optionValue: "" //status状态
      },
      search: "",
      loading: true,
      options: [
        {
          value: "1",
          label: "未开始"
        },
        {
          value: "2",
          label: "进行中"
        }
      ]
    };
  },
  created() {
    this.render();
    console.log(123);
  },
  methods: {
    render() {
      classModel.list().then(res => {
        console.log(res);
        let tableData = res.datas.data;
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
    },
    // 查询按钮事件
    findContent() {
      let findModel = this.findModel;
      let params = {};
      let start_at = findModel.selectTime[0];
      let end_at = findModel.selectTime[1];
      let status = findModel.optionValue;

      if (start_at) params.start_at = start_at;
      if (end_at) params.end_at = end_at;
      if (status) params.status = status;

      console.log(params);

      classModel.list(params).then(res => {
        console.log(res);
        this.tableData = res.datas.data;
        this.loading = false;
      });
    },
    resetContent() {
      this.findModel.selectTime = [];
      this.findModel.optionValue = "";
      this.render();
    }
  }
};
</script>

<style></style>
