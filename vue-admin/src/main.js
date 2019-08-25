import Vue from "vue";
import App from "./App.vue";
import router from "./routes/index.js";
import "./plugins/element.js";
import VXETable from "vxe-table"; //表格插件
import "vxe-table/lib/index.css";
import TrendChart from "vue-trend-chart"; //线性图插件

Vue.use(TrendChart);
Vue.use(VXETable);

import axios from "axios";
Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
