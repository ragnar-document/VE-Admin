<template>
  <div>
    <el-steps :active="active" align-center style="margin:50px 0 70px 0">
      <el-step title="步骤 1 : 选择报名到班级" icon="el-icon-edit"></el-step>
      <el-step
        title="步骤 2 : 结算课程金额"
        icon="el-icon-shopping-cart-1"
      ></el-step>
    </el-steps>
    <div style="width:80%;margin:0 auto;">
      <el-card shadow="never" v-if="next">
        <el-checkbox-group v-model="data">
          <el-checkbox
            v-for="item in checkedCities"
            :key="item.id"
            style="margin:10px"
            :label="item.id"
            border
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
        <el-divider></el-divider>
        <el-button
          type="primary"
          style="float:right;margin:0px 0px 20px 40px;"
          @click="nextEdit"
          plain
          >下一步</el-button
        >
      </el-card>
      <el-card shadow="never" v-else>
        <div style="display:flex;flex-direction:column">
          <div>
            <el-button
              type="text"
              @click="
                next = true;
                active = 1;
              "
              >⬅返回上一步</el-button
            >
          </div>
          <h1 style="align-self:center">结算页面</h1>
        </div>

        <div style="width: 80%;margin:0 auto;">
          <el-table :data="classGather" size="medium" fit>
            <el-table-column prop="name" label="班级名称"> </el-table-column>
            <el-table-column prop="price" label="金额"> </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click.native.prevent="deleteRow(scope.$index, classGather)"
                  ><i class="el-icon-close"></i
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-divider></el-divider>
        <el-button
          type="primary"
          v-if="next"
          style="float:right;margin:0px 0px 20px 40px;"
          @click="nextEdit"
          plain
          >下一步</el-button
        >
        <div
          style="display:flex;justify-content: flex-end;align-items: center;"
          v-else
        >
          <div>
            <h1>
              总价:<span style="color:#F56C6C">{{ total }}</span
              >元
            </h1>
          </div>
          <el-button
            type="primary"
            style="float:right;margin-left:20px"
            @click="closeMoney"
            plain
            >结算</el-button
          >
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import classModel from "@/global/service/class";

export default {
  data() {
    return {
      active: 1,
      checkedCities: [],
      classGather: [],
      data: [],
      next: true,
      total: 0
    };
  },
  created() {
    this.render();
  },
  watch: {
    data: function() {
      if (!this.data.length) {
        this.active = 1;
        this.next = true;
      }
    }
  },
  methods: {
    render() {
      classModel.list().then(res => {
        res.datas.data.forEach(data => {
          this.checkedCities.push(data);
        });
      });
    },
    deleteRow(index, rows) {
      let classId = rows[index].id;
      this.data.splice(index, 1);
      rows.splice(index, 1);
    },
    nextEdit() {
      this.active = 2;
      this.next = false;
      let classGather = [];
      this.checkedCities.filter(datas => {
        this.data.forEach(data => {
          if (data == datas.id) {
            classGather.push(datas);
          }
        });
      });
      console.log(classGather);
      this.classGather = classGather;
      console.log(this.classGather);
      let total = null;
      this.classGather.forEach(data => {
        console.log(data.price);
        total += data.price;
      });
      this.total = total;
    },
    closeMoney() {
      let user_id = Number(this.$route.params.id);
      let class_id = this.classGather;

      if (!class_id.length) {
        return this.$message({
          type: "error",
          message: "你还未选择课程!"
        });
      }
      this.$confirm("报班金额结算, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          class_id.forEach(data => {
            console.log(user_id, data.id);
            let classs_id = data.id;
            console.log(classs_id);
            classModel
              .addUser(classs_id, { user_id: user_id })
              .then(() => {})
              .catch(err => {
                console.log(err);
              });
          });
          this.data = [];
          this.active = 1;
          this.next = true;
          this.$message({
            type: "success",
            message: "结算成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消结算"
          });
        });
    }
  },
  components: {}
};
</script>

<style></style>
