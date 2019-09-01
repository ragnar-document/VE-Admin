<template>
  <div>
    <div style="padding:10px;overflow:hidden;background:#eee">
      <h1 style="float:left">消费列表</h1>
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
    </div>

    <el-table :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column label="消费用户" prop="name"> </el-table-column>
      <el-table-column label="消费金额" prop="total"> </el-table-column>
      <el-table-column label="消费时间" prop="created_at"> </el-table-column>
      <el-table-column label="类型">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1">充值</el-tag>
          <el-tag v-if="scope.row.status === 2" type="danger">消费</el-tag>
          <el-tag v-if="scope.row.status === 3" type="success">赠送</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
    </el-table>

    <el-pagination
      hide-on-single-page
      class="pageItem"
      layout="prev, pager, next"
      :current-page.sync="pagination.pageIndex"
      :page-size="pagination.pageSize"
      @current-change="paginationChange"
      :total="pagination.total"
    ></el-pagination>
  </div>
</template>

<script>
import consumerModel from "@/global/service/consumer";
export default {
  data() {
    return {
      tableData: [],
      selectShow: true,
      //查找数据
      findModel: {
        selectTime: [], //时间选择
        optionValue: "" //status状态
      },
      //分页数据
      pagination: {
        total: 0, //数据数量
        pageIndex: 1, //页码
        pageSize: 10 //需要数据条数
      },
      loading: true, //加载圈,
      options: [
        {
          value: "1",
          label: "充值"
        },
        {
          value: "2",
          label: "消费"
        },
        {
          value: "3",
          label: "赠送"
        }
      ]
    };
  },
  watch: {
    "findModel.selectTime": function() {
      let selectTime = this.findModel.selectTime;
      //监听清除事件防止element组件报错
      if (this.findModel.selectTime == null) {
        const end = new Date();
        const start = new Date();
        this.findModel.selectTime = [start, end];
      }
    }
  },
  created() {
    this.paginationChange();
  },
  methods: {
    // 分页组件事件
    paginationChange() {
      //查询当前页，以及设置返回数据到数量
      let params = {
        pageSize: this.pagination.pageSize,
        pageIndex: this.pagination.pageIndex
      };
      let findModel = this.findModel;
      let start_at = findModel.selectTime[0];
      let end_at = findModel.selectTime[1];
      let status = findModel.optionValue;

      if (start_at) params.start_at = start_at;
      if (end_at) params.end_at = end_at;
      if (status) params.status = status;

      //发送数据请求渲染到data中
      consumerModel.list(params).then(res => {
        this.tableData = res.datas.data;
        this.pagination.total = res.datas.total; //传递数据total
        this.loading = false;
      });
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

      consumerModel.list(params).then(res => {
        console.log(res);
        this.tableData = res.datas.data;
        this.pagination.total = res.datas.total; //传递数据total
        this.loading = false;
      });
    },
    resetContent() {
      this.findModel.selectTime = [];
      this.findModel.optionValue = "";
      this.paginationChange();
    }
  },
  components: {}
};
</script>

<style></style>
