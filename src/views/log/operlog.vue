<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-17 10:09:22
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-09 16:54:29
 * @FilePath: \vue - v2.0\src\views\device\device.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <comTableList
      :tableData="tableData"
      :columnObj="columnObj"
      @search="getLog"
      @reset="reset"
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
        v-model="query.title"
        size="mini"
      >
        <template slot="prepend">系统模块</template>
      </el-input>
      <el-input
        class="input"
        slot="searchs"
        placeholder="请输入内容"
        v-model="query.operName"
        size="mini"
      >
        <template slot="prepend">操作人员</template>
      </el-input>

      <el-select
        class="input"
        v-model="query.businessType"
        placeholder="请选择"
        slot="searchs"
        size="mini"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

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
          { prop: "operId", label: "日志编号", width: "" },
          { prop: "title", label: "系统模块", width: "" },
          { prop: "businessType", label: "操作类型", width: "" },
          { prop: "operName", label: "操作人员", width: "" },
          { prop: "operIp", label: "操作地址", width: "" },
          {
            prop: "status",
            label: "操作状态",
            render: (h, { row, index, column }) => {
              return [<span>{row.status === 0 ? "成功" : "失败"}</span>];
            },
          }, //1在线 0离线
          { prop: "operTime", label: "操作日期", width: "150" },
          { prop: "costTime", label: "消耗时间", render: (h, { row, index, column }) => {
              return [<span>{row.costTime +"ms"}</span>];
            }, },
        ],
      },
      query: {
        pageNum: 1,
        pageSize: 10,
        title: "",
        operName: "",
        businessType: "",
        status: "",
        pageNum: 1,
        pageSize: 10,
      },
      total: 10,

      options: [
        { value: "1", label: "新增" },
        { value: "2", label: "修改" },
        { value: "3", label: "删除" },
        { value: "4", label: "授权" },
        { value: "5", label: "导出" },
        { value: "6", label: "导入" },
        { value: "7", label: "强推" },
        { value: "9", label: "清空数据" },
        { value: "0", label: "其他" },
      ],
    };
  },
  mounted() {
    this.getLog();
  },
  methods: {
    /**
     * @函数功能: 获取操作日志
     * @出口参数:
     * @函数备注:
     */
    async getLog() {
      let res = await axios({
        url: this.$util.prodBaseUrl + "/monitor/operlog/list",
        method: "get",
        params: this.query,
      });
      if (res.data.code === 200) {
        this.tableData = res.data.rows;
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
