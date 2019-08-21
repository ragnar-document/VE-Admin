<template>
  <el-container style="flex-direction:column">
    <el-main class="header-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="个人详情" name="first">
          <el-main>
            <el-card class="box-card" shadow="never">
              <div
                style="overflow:hidden; height:40px; border-bottom:1px solid #eee; margin-bottom:20px;"
              >
                <h1 style="display:inline-block; line-height:40px;">
                  个人信息
                </h1>
                <el-link
                  type="primary"
                  style="float:right;margin:10px;"
                  @click="show1 = !show1"
                  >收起</el-link
                >
                <el-link
                  type="primary"
                  style="float:right;margin:10px;"
                  @click="editItem"
                  >编辑用户</el-link
                >
              </div>
              <el-collapse-transition>
                <el-form
                  v-show="show1"
                  status-icon
                  :data="userForm"
                  ref="userForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="用户名字">
                    <el-input
                      v-model="userForm.name"
                      :disabled="disabled"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="用户余额(元)">
                    <el-input
                      v-model="userForm.balance"
                      :disabled="true"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="用户号码">
                    <el-input
                      v-model="userForm.phone"
                      :disabled="disabled"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="紧急联系人">
                    <el-input
                      v-model="userForm.sms_name"
                      :disabled="disabled"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="紧急联系电话">
                    <el-input
                      v-model="userForm.sms_phone"
                      :disabled="disabled"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="用户性别">
                    <el-input
                      v-model="userForm.sex"
                      :disabled="disabled"
                      placeholder=""
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="用户生日">
                    <el-input
                      v-model="userForm.birthday"
                      :disabled="disabled"
                      placeholder=""
                    ></el-input>
                    <el-button
                      type="primary"
                      round
                      v-show="!disabled"
                      style="float: right; margin-top: 20px;"
                      @click="saveItem"
                      >保存</el-button
                    >
                  </el-form-item>
                </el-form>
              </el-collapse-transition>
            </el-card>
          </el-main>
        </el-tab-pane>
        <el-tab-pane label="报班详情" name="second">
          <el-main class="main-container">
            <el-table :data="tableData" border style="width: 100%">
              <el-table-column prop="name" label="所在班级" width="180">
              </el-table-column>
              <el-table-column prop="lesson_count" label="课时" width="180">
              </el-table-column>
              <el-table-column prop="start_at" label="开始时间">
              </el-table-column>
              <el-table-column prop="end_at" label="结束时间">
              </el-table-column>
              <el-table-column
                ><el-button type="text" @click="skipInfo"
                  >详情</el-button
                ></el-table-column
              >
            </el-table>
          </el-main>
        </el-tab-pane>
        <el-tab-pane label="消费详情" name="third">
          <el-main class="main-container">
            <el-table :data="paymentTable" border style="width: 100%">
              <el-table-column prop="created_time" label="消费时间" width="180">
              </el-table-column>
              <el-table-column prop="remark" label="备注" width="180">
              </el-table-column>
              <el-table-column prop="total" label="金额(元)"> </el-table-column>
              <el-table-column prop="status" label="用户收支">
              </el-table-column>
            </el-table>
          </el-main>
        </el-tab-pane>
        <el-tab-pane label="我的课程" name="fourth">
          <el-main> </el-main>
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import userModel from "@/global/service/user";

export default {
  data() {
    return {
      show1: true,
      disabled: true,
      activeName: "first",
      userForm: {
        name: "",
        phone: "",
        sex: "",
        birthday: "",
        sms_name: "",
        sms_phone: "",
        balance: ""
      },
      tableData: [],
      paymentTable: []
    };
  },
  created() {
    let pathId = Number(this.$route.params.id);
    userModel.single(pathId).then(res => {
      this.userForm = res.datas.single[0];
      this.tableData = res.datas.intro;

      if (res.datas.single[0].sex == 1) {
        this.userForm.sex = "男";
      } else {
        this.userForm.sex = "女";
      }

      let paymentTable = res.datas.payment;
      paymentTable.forEach(data => {
        if (data.status == 1) {
          data.status = "充值";
        } else if (data.status == 2) {
          data.status = "消费";
        }
      });
      this.paymentTable = paymentTable;
    });
  },
  methods: {
    skipInfo() {
      let id = this.tableData[0].course_id;
      this.$router.push({ name: "classInfo", params: { id } });
    },
    editItem() {
      if (this.disabled) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    saveItem() {
      let pathId = Number(this.$route.params.id);
      let newItem = this.userForm;
      console.log(newItem);
      userModel
        .update(pathId, newItem)
        .then(() => {
          this.disabled = true;
          this.$message.success("编辑成功");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
.box-card {
  width: 90%;
}
</style>
