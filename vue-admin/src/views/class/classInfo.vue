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
                @click="fold = !fold"
                >收起</el-link
              >
              <el-link
                type="primary"
                style="float:right;margin:10px;"
                @click="editItem"
                >编辑</el-link
              >
            </div>
            <el-form
              v-show="fold"
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
              <el-form-item label="课程单价">
                {{ classForm.price }}/节
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
                <el-button v-show="!disabled" type="primary" @click="upDate()"
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
              <el-table :data="classInfoData" style="width: 100%">
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
          <el-table
            fit
            :data="calendar"
            :row-class-name="tableRowClassName"
            border
            style="width: 100%"
            @cell-click="dblclickTable"
          >
            <el-table-column prop="lesson_id" label="课" width="180">
            </el-table-column>
            <el-table-column label="日期" width="180">
              <template slot-scope="scope">
                <el-date-picker
                  v-if="
                    scope.row.index === tabClickIndex &&
                      tabClickLabel === '日期'
                  "
                  v-model="upTable.date"
                  type="datetime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  size="mini"
                  @blur="saveEdit"
                  placeholder=""
                ></el-date-picker>
                <span v-else>{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="开始时间" width="180">
              <template slot-scope="scope">
                <el-date-picker
                  v-if="
                    scope.row.index === tabClickIndex &&
                      tabClickLabel === '开始时间'
                  "
                  v-model="upTable.start_time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="mini"
                  @blur="saveEdit"
                  placeholder=""
                ></el-date-picker>
                <span v-else>{{ scope.row.start_time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="结束时间" width="180">
              <template slot-scope="scope">
                <el-date-picker
                  v-if="
                    scope.row.index === tabClickIndex &&
                      tabClickLabel === '结束时间'
                  "
                  v-model="upTable.end_time"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  size="mini"
                  @blur="saveEdit"
                  placeholder=""
                ></el-date-picker>
                <span v-else>{{ scope.row.end_time }}</span>
              </template>
            </el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <el-tag :type="scope.row.status === 1 ? 'success' : ''">
                  {{ scope.row.status === 1 ? "已结束" : "未开始" }}</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="text" @click="handleLink(scope.row)"
                  >去点名</el-button
                >
              </template>
            </el-table-column>
          </el-table>
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
      fold: true, //判断是否折叠
      disabled: true, //判断是否打开输入框
      activeName: "first", //tabs默认显示第几项
      lessonId: "",
      classForm: {
        name: "",
        description: "",
        course_id: "",
        price: "",
        lesson_count: "",
        status: "",
        start_at: "",
        end_at: "",
        single_price: ""
      },
      classInfoData: [],
      studentData: [],
      calendar: [],
      userLesson: [], //课数据
      options: [], //点名
      upTableId: "",
      upTable: {},
      tabClickIndex: null, // 点击的单元格
      tabClickLabel: "" // 当前点击的列名，
    };
  },
  created() {
    this.render();
  },
  methods: {
    handleLink(row) {
      this.$router.push({ name: "className", params: { id: row.id } });
    },
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
    dblclickTable(row, column) {
      this.upTableId = row.id; //双击时存储点击的单元格ID
      switch (column.label) {
        case "日期":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        case "开始时间":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        case "结束时间":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        case "状态":
          this.tabClickIndex = row.index;
          this.tabClickLabel = column.label;
          break;
        default:
          return;
      }
    },
    saveEdit() {
      this.tabClickIndex = null; //离开输入框后保存
      this.tabClickLabel = "";

      let lesson_id = this.upTableId; //获取点击课的id
      let class_id = Number(this.$route.params.id); //获取当前课的id
      let params = this.upTable; //修改后的值

      classModel
        .setLesson(class_id, { params: params, lesson_id: lesson_id })
        .then(() => {
          this.$message.success("编辑成功");
          this.upTable = {}; //成功后清除数据
          this.render(); //重新获取更新后的数据渲染上去
        })
        .catch(err => {
          console.log(err);
          this.$message.error("编辑失败");
        });
    },

    render() {
      let id = Number(this.$route.params.id); //获取当前url的ID
      classModel.single(id).then(res => {
        //获取当前ID下的详细信息并且渲染上去
        this.calendar = res.data.classLess; //班级课信息
        console.log(res.data.classLess);
        this.userLesson = res.data.userLesson; //用户课信息
        res.data.classLess.forEach((data, index) => {
          let id = index + 1;
          this.calendar[index].lesson_id = id; //把课程表的ID使用循环纠正
        });
        this.classForm = res.data.classes[0];
        this.classInfoData = res.data.classStudy;
        let arr = []; //点名下啦选择第几节课
        res.data.userLesson.filter(data => {
          arr.push(data.lesson_id);
        });
        arr = new Set(arr);
        this.options = arr;
      });
    },
    editItem() {
      //编辑打开输入事件
      if (this.disabled) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    upDate() {
      //更新用户数据时间
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
    resetForm() {
      //充值
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
  },
  components: {
    // dblTable:dblTable
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
