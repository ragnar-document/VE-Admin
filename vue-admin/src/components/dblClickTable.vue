<template>
  <el-table
    :data="datas.calendar"
    fit
    border
    style="width: 100%"
    :row-class-name="tableRowClassName"
    @cell-click="dblclickTable"
  >
    <el-table-column prop="id" label="课程" width="180"> </el-table-column>
    <el-table-column label="开始时间" width="180">
      <template slot-scope="scope">
        <el-time-picker
          v-if="
            scope.row.index === tabClickIndex && tabClickLabel === '开始时间'
          "
          v-model="startTime"
          placeholder="任意时间点"
          @blur="saveEdit"
        >
        </el-time-picker>
        <span v-else>{{ scope.row.start_time }}</span>
      </template>
    </el-table-column>
    <el-table-column label="结束时间">
      <template slot-scope="scope">
        <el-time-picker
          v-if="
            scope.row.index === tabClickIndex && tabClickLabel === '结束时间'
          "
          v-model="startTime"
          placeholder="任意时间点"
          @blur="saveEdit"
        >
        </el-time-picker>
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
        <el-button type="text" @click="handleLink(scope.row)">去点名</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  props: {
    datas: {
      type: Object,
      default: () => []
    },
    tableTile: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      startTime: "",
      endTime: "",
      rowId: "", //储存单元格id
      tabClickIndex: null, // 点击的单元格
      tabClickLabel: "" // 当前点击的列名，
    };
  },
  created() {
    console.log(this.tableTile);
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      // 把每一行的索引放进row
      row.index = rowIndex;
    },
    dblclickTable(row, column) {
      this.rowId = row.id; //双击时存储点击的单元格ID
      switch (column.label) {
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
    handleLink(row) {
      this.$router.push({ name: "className", params: { id: row.id } });
    },
    saveEdit() {
      this.tabClickIndex = null; //离开输入框后保存
      this.tabClickLabel = "";
    }
  },
  components: {}
};
</script>

<style></style>
