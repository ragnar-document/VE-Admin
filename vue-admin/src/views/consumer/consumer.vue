<template>
  <div>
    <div style="padding:10px;overflow:hidden;background:#eee">
      <h1 style="float:left">消费列表</h1>
      <el-date-picker
        style="float:right"
        size="mini"
        @change="selectTimeMethod"
        v-model="selectTime"
        type="datetimerange"
        format="yyyy 年 MM 月 dd 日"
        value-format="yyyy-MM-dd"
        start-placeholder="2018-08-13"
        end-placeholder="2018-08-15"
        :default-time="['12:00:00']">
      </el-date-picker>
    </div>
    <!-- v-if="selectShow" -->
    <el-table :data="tableData"  v-loading="loading"  style="width: 100%">
      <el-table-column label="消费用户" prop="name"> </el-table-column>
      <el-table-column label="消费金额" prop="total"> </el-table-column>
      <el-table-column label="消费时间" prop="created_time"> </el-table-column>
      <el-table-column label="备注" prop="remark"> </el-table-column>
    </el-table>


    <el-pagination
      v-show="numb >= 10"
      class="pageItem"
      layout="prev, pager, next"
      @current-change="handleCurrentChange"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
import consumerModel from "@/global/service/consumer";
export default {
  data() {
    return {
      tableData: [],
      selectShow:true,
      selectTime: ["2019-08-13", "2019-08-15"],
      numb:0,
      total: 0,
      loading: true
    };
  },
  created() {
    consumerModel.list().then(res => {
      this.tableData = res.datas.data;
      let totalNum = res.datas.total;
      this.numb = res.datas.data.length;
      this.total = totalNum;
      setTimeout(() => {
          this.loading = false;
      }, 300);
    });
  },
  methods: {
    selectTimeMethod(){
 
     if (this.selectTime == null) {
       this.selectTime = ["2010-08-13", "2100-08-15"]
     }

     let start_at = this.selectTime[0];
     let end_at = this.selectTime[1];

     consumerModel
        .list({ start_at,end_at })
        .then(res => {
          this.tableData = res.datas.data;
          this.numb = res.datas.data.length;
          let totalNum = res.datas.total;
          this.total = totalNum;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleCurrentChange(e){
      let pageIndex = e;
      consumerModel
        .list({ pageIndex })
        .then(res => {
          console.log(res)
          this.tableData = res.datas.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {}
};
</script>

<style></style>
