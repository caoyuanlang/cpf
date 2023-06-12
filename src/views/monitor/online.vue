<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-17 10:09:22
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-08 11:02:46
 * @FilePath: \vue - v2.0\src\views\device\device.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <comTableList
      :tableData="tableData"
      :columnObj="columnObj"
      :paginationShow="false"
    >
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
        columnData: (() => {
          return [
            { prop: "tokenId", label: "会话编号",showOverflow:true },
            { prop: "userName", label: "登录名称", width: "" },
            { prop: "deptName", label: "部门名称", width: "150" },
            { prop: "ipaddr", label: "主机", width: "120" },
            { prop: "browser", label: "浏览器", width: "" }, //1在线 0离线
            { prop: "os", label: "操作系统", width: "100" },
            {
              prop: "loginTime",
              label: "登陆时间",
              width:"150",
              render: (h, { row, index, column }) => {
                return [
                  <div>
                    {this.$utils.toDateString(
                      row.loginTime,
                      "yyyy-MM-dd HH:mm:ss"
                    )}
                  </div>,
                ];
              },
            },
            {
              label: "操作",
              render: (h, { row, index, column }) => {
                return [
                  <el-button
                    size="mini"
                    onClick={() => {
                      this.forcedRetreat(row);
                    }}
                  >
                    强退
                  </el-button>,
                ];
              },
            },
          ];
        })(),
      },
    };
  },
  mounted() {
    this.getOnlineUsers();
  },
  methods: {
    /**
     * @函数功能: 获取在线用户
     * @出口参数:
     * @函数备注:
     */
    async getOnlineUsers() {
      try {
        let res = await this.$http.get(
          this.$util.prodBaseUrl + "/monitor/online/list"
        );
        if (res.code === 200) {
          this.tableData = res.rows;
        }
      } catch (error) {}
    },
    /**
     * @函数功能: 强制退出用户登录
     * @param {*} row
     * @出口参数:
     * @函数备注:
     */
    async forcedRetreat(row) {
      this.$confirm("是否强制退出此用户登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await axios({
            url: this.$util.prodBaseUrl + "/monitor/online/" + row.tokenId,
            method: "DELETE",
          });

          this.$message({
            type: "success",
            message: "操作成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
    },
  },
};
</script>
