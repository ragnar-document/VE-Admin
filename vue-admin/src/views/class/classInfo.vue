<template>
  <el-container style="flex-direction:column">
    <el-tabs v-model="activeName">
      <el-tab-pane label="班级详情" name="first">
        <el-main class="header-container">
          <el-card class="box-card" shadow="never">
            <div
              style="overflow:hidden; height:40px; border-bottom:1px solid #eee; margin-bottom:20px;"
            >
              <h1 style="display:inline-block; line-height:40px;">班级详情</h1>
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
            <el-form
              v-show="show1"
              status-icon
              :v-model="classForm"
              ref="classForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="班级名称">
                <el-input
                  v-model="classForm.name"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="班级描述">
                <el-input
                  type="textarea"
                  v-model="classForm.description"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="课程 ID">
                <el-input
                  v-model="classForm.course_id"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="课程总价">
                <el-input
                  v-model="classForm.price"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="课程课时总数">
                <el-input
                  v-model="classForm.lesson_count"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="课程状态">
                <el-input
                  v-model="classForm.status"
                  :disabled="disabled"
                ></el-input>
              </el-form-item>
              <el-form-item label="开始时间">
                <el-date-picker
                  v-model="classForm.start_at"
                  type="date"
                  :disabled="disabled"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间">
                <el-date-picker
                  v-model="classForm.end_at"
                  type="date"
                  :disabled="disabled"
                >
                </el-date-picker>
              </el-form-item>

              <el-form-item>
                <el-button v-show="!disabled" type="primary" @click="addUser()"
                  >提交</el-button
                >
              </el-form-item>
            </el-form>
          </el-card>
        </el-main>
      </el-tab-pane>
      <el-tab-pane label="班级成员" name="second">
        <el-main class="main-container">
          <el-card class="box-card" shadow="never">
            <template>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form
                      label-position="left"
                      inline
                      class="demo-table-expand"
                    >
                      <el-form-item label="名字">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item label="性别">
                        <span>{{ props.row.sex }}</span>
                      </el-form-item>
                      <el-form-item label="手机号">
                        <span>{{ props.row.phone }}</span>
                      </el-form-item>
                      <el-form-item label="创建时间">
                        <span>{{ props.row.created_at }}</span>
                      </el-form-item>
                      <el-form-item label="学生详情">
                        <router-link :to="{ path: `/userInfo/${props.row.id}` }"
                          >点击跳转</router-link
                        >
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="班级成员" prop="name">
                </el-table-column>
              </el-table>
            </template>
          </el-card>
        </el-main>
      </el-tab-pane>
      <el-tab-pane label="班级课程安排" name="third">
        <el-main>
          <el-table :data="calendar" border style="width: 100%">
            <el-table-column prop="date" label="星期一" width="180">
            </el-table-column>
            <el-table-column prop="name" label="星期二" width="180">
            </el-table-column>
            <el-table-column prop="address" label="星期三"> </el-table-column>
            <el-table-column prop="address" label="星期四"> </el-table-column>
            <el-table-column prop="address" label="星期五"> </el-table-column>
            <el-table-column prop="address" label="星期六"> </el-table-column>
            <el-table-column prop="address" label="星期日"> </el-table-column>
          </el-table>
        </el-main>
      </el-tab-pane>
      <el-tab-pane label="班级点名" name="four">
        <el-divider content-position="left"
          >点击勾选为上课，不勾选默认为请假</el-divider
        >
        <el-main>
          <el-checkbox-group v-model="studentData">
            <el-checkbox
              v-for="item in tableData"
              :key="item.id"
              style="margin:10px"
              :label="item.id"
              border
              >{{ item.name }}</el-checkbox
            >
          </el-checkbox-group>
          <el-divider></el-divider>
          <el-button type="primary" @click="clickName">点名</el-button>
        </el-main>
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>

<script>
import classModel from "@/global/service/class";

export default {
  data() {
    return {
      show1: true,
      disabled: true,
      activeName: "first",
      classForm: {
        name: "",
        description: "",
        course_id: "",
        price: "",
        lesson_count: "",
        status: "",
        start_at: "",
        end_at: ""
      },
      tableData: [],
      studentData: [],
      calendar: []
    };
  },
  created() {
    this.render();
  },
  methods: {
    render() {
      let id = Number(this.$route.params.id);
      classModel.single(id).then(res => {
        console.log(res);
        this.classForm = res.data.classes[0];
        this.tableData = res.data.classStudy;
      });
    },
    editItem() {
      if (this.disabled) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    addUser() {
      let id = Number(this.$route.params.id);
      let name = this.classForm.name;
      let description = this.classForm.description;
      let course_id = this.classForm.course_id;
      let price = this.classForm.price;
      let lesson_count = this.classForm.lesson_count;
      let status = this.classForm.status;
      let start_at = this.classForm.start_at;
      let end_at = this.classForm.end_at;

      if (
        !name ||
        !description ||
        !course_id ||
        !lesson_count ||
        !status ||
        !price ||
        !start_at ||
        !end_at
      ) {
        this.$message.error("缺少参数");
        return;
      }

      classModel
        .update(id, {
          name,
          description,
          course_id,
          lesson_count,
          status,
          price,
          start_at,
          end_at
        })
        .then(res => {
          console.log(res);
          this.$router.replace({ name: "classList" });
          this.$message.success("创建成功");
        })
        .catch(() => {
          this.$message.error("添加失败");
        });
    },
    clickName() {
      let class_id = Number(this.$route.params.id);
      let clickNameData = this.studentData;
      //上课发送
      clickNameData.forEach(data => {
        classModel
          .clickName(class_id, { user_id: data, status: 2 })
          .then(() => {});
      });

      let clickNameDatas = [];
      this.tableData.filter(datas => {
        clickNameData.forEach(data => {
          if (datas.id != data) {
            clickNameDatas.push(datas.id);
          }
        });
      });
      //请假发送
      clickNameDatas.forEach(data => {
        classModel
          .clickName(class_id, { user_id: data, status: 1 })
          .then(() => {});
      });

      this.$message.success("点名成功");
    },
    resetForm() {
      this.classForm = {
        name: "",
        description: "",
        course_id: "",
        price: "",
        lesson_count: "",
        status: "",
        start_at: "",
        end_at: ""
      };
    }
  }
};
</script>

<style>
.box-card {
  width: 100%;
}

.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
