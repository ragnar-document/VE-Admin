<template>
  <div>
    <el-breadcrumb
      separator-class="el-icon-arrow-right"
      v-if="breadcrumbValue.length > 2"
    >
      <template v-for="item in breadcrumbValue">
        <el-breadcrumb-item
          v-if="item.to"
          :replace="true"
          :key="item.name"
          :to="item.to"
          >{{ item.name }}</el-breadcrumb-item
        >
        <el-breadcrumb-item v-else :key="item.name">{{
          item.name
        }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    breadcrumb: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  computed: {
    breadcrumbValue() {
      const { breadcrumb } = this;
      if (breadcrumb.length) {
        return breadcrumb;
      }
      return this.$route.matched
        .filter(data => data.meta && data.meta.breadcrumb)
        .map(data => ({
          name: data.meta.breadcrumb.title,
          to: data.meta.breadcrumb.replace ? { name: data.name } : undefined
        }));
    }
  },
  components: {}
};
</script>

<style></style>
