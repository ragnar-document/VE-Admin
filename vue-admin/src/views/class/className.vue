<template>
  <div class="page-container">
    <div class="page-content" v-loading="loading">
      <h3>课时信息</h3>
      <el-form inline label-position="left" label-width="80px">
        <el-form-item label="开始时间" style="width:240px;">
          {{ lesson.start_time }}
        </el-form-item>
        <el-form-item label="结束时间" style="width:240px;">
          {{ lesson.end_time }}
        </el-form-item>
        <el-form-item style="width:280px;">
          <el-select
            v-model="lesson.status"
            size="mini"
            @change="handleChangeStatus"
            placeholder="课时状态"
          >
            <el-option :label="'已结束'" :value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <h3>报名学员</h3>
      <el-table
        :data="users"
        @selection-change="handleSelectionChange"
        style="width: 100%"
        class="mb-20"
      >
        <el-table-column
          type="selection"
          :selectable="row => !row.status"
          width="55"
        >
        </el-table-column>
        <el-table-column prop="name" label="学员名称"></el-table-column>
        <el-table-column label="点名情况">
          <template slot-scope="scope">
            <el-tag v-if="!scope.row.status" type="info">未点名</el-tag>
            <el-tag v-if="scope.row.status === 1" type="">请假</el-tag>
            <el-tag v-if="scope.row.status === 2" type="success">已点名</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="finish_at" label="时间"> </el-table-column>
      </el-table>
      <div style="margin-top:20px; float:right">
        <el-button
          type="primary"
          @click="handleSubmit"
          :disabled="!selectUsersId.length"
          >点名</el-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import lessonModel from "@/global/service/lesson.js";
import classModel from "@/global/service/class";

export default {
  data() {
    return {
      loading: false,
      users: [],
      selectUsersId: [],
      lesson: {
        status: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      lessonModel.list(id).then(res => {
        console.log(res);
        this.users = res.data.users;
        this.lesson = res.data.lesson;
      });
    },
    handleChangeStatus() {
      let id = this.$route.params.id;
      console.log(this.lesson.status);
      let params = { status: this.lesson.status };
      classModel.setLesson(id, { params: params, lesson_id: id }).then(res => {
        if (res.code === 200) {
          this.$message.success("成功修改课时状态！");
        }
      });
    },
    handleSelectionChange(row) {
      this.selectUsersId = row
        .filter(data => !data.status)
        .map(data => data.id);
    },
    handleSubmit: async function() {
      let id = this.$route.params.id;
      let selectUsersId = this.selectUsersId;

      if (!this.selectUsersId.length) {
        return this.$message.error("还没选择点名用户");
      }

      try {
        selectUsersId.forEach(async user_id => {
          await lessonModel.call(id, { user_id });
          this.getData();
        });
      } catch (error) {
        console.log(error);
      }
    },
    handleResetUsers() {}
  }
};
</script>

<style type="text/css" lang="less" scoped></style>
