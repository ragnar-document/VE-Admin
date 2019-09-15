<template>
  <div>
    <el-main>
      <el-table :data="applylesson" style="width: 100%">
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column prop="user_name" label="用户"> </el-table-column>
        <el-table-column prop="lesson_id" label="课程号"> </el-table-column>
        <el-table-column prop="class_name" label="班级"> </el-table-column>
        <el-table-column prop="create_time" label="请假时间"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-select v-model="scope.row.status" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope)"
              >确认</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>

<script>
import applyLesson from "../global/service/applyList.js";

export default {
  data() {
    return {
      applylesson: [],
      options: [
        {
          value: 1,
          label: "请假"
        },
        {
          value: 2,
          label: "打卡"
        }
      ],
      selectValue: []
    };
  },
  created() {
    applyLesson.list().then(res => {
      this.applylesson = res.datas;
      console.log(res);
    });
  },
  methods: {
    handleEdit(scope) {
      let lesson_id = scope.row.lesson_id;
      let user_id = scope.row.user_id;
      let status = scope.row.status;
      console.log(scope.row);
      applyLesson
        .edit({ lesson_id, user_id, status })
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    }
  },
  components: {}
};
</script>

<style></style>
