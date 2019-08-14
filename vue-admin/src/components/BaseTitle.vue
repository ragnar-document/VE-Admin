<template>
    <div style="padding:10px;overflow:hidden;background:#eee">
      <h1 style="float:left;">班级列表</h1>
      <el-button style="float:right;" size="mini" @click="addClass">添加班级</el-button>
    </div>
</template>

<script>
 export default {
   props: {
    baseTitle: {
      type: Array,
      default: () => []
    }
  },
 }
</script>

<style>

 
</style>
