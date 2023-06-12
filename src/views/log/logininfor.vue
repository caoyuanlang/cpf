<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-17 10:09:22
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-12 10:10:42
 * @FilePath: \vue - v2.0\src\views\device\device.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <comTableList
      :tableData="tableData"
      :columnObj="columnObj"
      @reset="reset"
      @search="getLog"
      :total="total"
      @handleSizeChange="
        (val) => {
          query.pageSize = val;
          getLog();
        }
      "
      @handleCurrentChange="
        (val) => {
          query.pageNum = val;
          getLog();
        }
      "
    >
      <!-- <el-input
        class="input"
        slot="searchs"
        placeholder="请输入内容"
        v-model="query.ipaddr"
        size="mini"
      >
        <template slot="prepend">登陆地址</template>
      </el-input>
      <el-input
        class="input"
        slot="searchs"
        placeholder="请输入内容"
        v-model="query.userName"
        size="mini"
      >
        <template slot="prepend">用户名称</template>
      </el-input>

      <el-select
        class="input"
        v-model="query.status"
        placeholder="请选择"
        slot="searchs"
        size="mini"
      >
        <el-option
          v-for="item in [
            { value: '0', label: '在线' },
            { value: '1', label: '离线' },
          ]"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select> -->

      <!-- <el-input
        class="input"
        slot="searchs"
        placeholder="请输入内容"
        v-model="query"
        size="mini"
      >
        <template slot="prepend">登陆地址</template>
      </el-input> -->
    </comTableList>
  </div>
</template>
<script>
import axios from "axios";
import comTableList from "../components/comTableList.vue";

export default {
  components: {
    comTableList,
  },
  data() {
    return {
      tableData: [],
      columnObj: {
        columnData: [
          { prop: "infoId", label: "访问编号", width: "" },
          { prop: "userName", label: "用户名称", width: "" },
          { prop: "ipaddr", label: "登陆地址", width: "120" },
          { prop: "browser", label: "浏览器", width: "" },
          { prop: "os", label: "操作系统", width: "" },
          {
            prop: "status",
            label: "登录状态",
            render: (h, { row, index, column }) => {
              return [<span>{row.status === '0' ? "成功" : "失败"}</span>];
            },
          }, //1在线 0离线
          { prop: "msg", label: "操作信息", width: "" },
          { prop: "loginTime", label: "登录日期", width: "150" },
        ],
      },
      query: {
        ipaddr: "",
        userName: "",
        status: "",
        time: null,
        pageNum: 1,
        pageSize: 10,
      },
      total: 10,
    };
  },
  mounted() {
    this.getLog();
  },
  methods: {
    /**
     * @函数功能: 获取登录日志
     * @出口参数:
     * @函数备注:
     */
    async getLog() {
      let res = await axios({
        url: this.$util.prodBaseUrl + "/monitor/logininfor/list",
        method: "get",
        params: this.query,
      });
      if (res.data.code === 200) {
        this.tableData = res.data.rows;
        this.total = res.data.total;
      }
    },
    /**
     * @函数功能: 查询重置
     * @出口参数:
     * @函数备注:
     */
    reset() {
      this.query = {
        ipaddr: "",
        userName: "",
        status: "",
        time: null,
        pageNum: 1,
        pageSize: 10,
      };
      this.getLog();
    },
  },
};
</script>

<style scoped>
.input {
  width: 200px;
}
</style>
