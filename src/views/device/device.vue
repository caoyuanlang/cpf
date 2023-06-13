<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-17 10:09:22
 * @LastEditors: caoyuanling a2607954957@foxmail.com
 * @LastEditTime: 2023-06-13 16:05:52
 * @FilePath: \vue - v2.0\src\views\device\device.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <comTableList
      :tableData="tableData"
      :columnObj="columnObj"
      :paginationShow="false"
      :single="true"
      @currentChange="currentChange"
    >
      <template slot="button">
        <el-button @click="synchronous" slot="button">同步</el-button>
        <el-button @click="binding" :disabled="disabled">绑定</el-button>
        <el-input
          v-model="seachList.deptName"
          placeholder="所属机构"
        ></el-input>
        <el-input
          v-model="seachList.locationName"
          placeholder="所属区域"
        ></el-input>
        <el-input
          v-model="seachList.projectName"
          placeholder="所属项目"
        ></el-input>
        <el-input v-model="seachList.dvName" placeholder="设备名称"></el-input>
        <el-select v-model="seachList.status" placeholder="状态">
          <el-option
            v-for="item in [
              {
                value: '0',
                label: '离线',
              },
              {
                value: '1',
                label: '在线',
              },
            ]"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button type="primary" size="mini" @click="deviceList"
          >查询</el-button
        >
        <el-button size="mini" @click="resetting">重置</el-button>
      </template>
    </comTableList>

    <el-dialog title="设备绑定" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="区域编码" prop="regionCode">
          <el-select v-model="ruleForm.regionCode" placeholder="请选择">
            <el-option
              v-for="(item, index) in regions"
              :key="index"
              :label="item.regionName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择机构" prop="orgCode">
          <el-select v-model="ruleForm.orgCode" placeholder="请选择">
            <el-option
              v-for="(item, index) in org"
              :key="index"
              :label="item.deptName"
              :value="item.deptId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择区域" prop="location">
          <el-select v-model="ruleForm.location" placeholder="请选择">
            <el-option
              v-for="(item, index) in location"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择项目" prop="projectId">
          <el-select v-model="ruleForm.projectId" placeholder="请选择">
            <el-option
              v-for="(item, index) in projects"
              :key="index"
              :label="item.projectName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备描述">
          <el-input
            type="textarea"
            :rows="2"
            maxlength="50"
            placeholder="请输入内容"
            v-model="ruleForm.discribe"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="bin">绑 定</el-button>
      </span>
    </el-dialog>
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
      dialogVisible: false,
      seachList: {},
      tableData: [],
      disabled: true,
      columnObj: {
        columnData: [
          { prop: "userName", label: "管理员", width: "" },
          { prop: "deptName", label: "所属机构", width: "" },
          { prop: "locationName", label: "所属区域", width: "" },
          { prop: "projectName", label: "所属项目", width: "" },
          { prop: "dvName", label: "设备名称", width: "" },
          { prop: "dvCode", label: "设备编码", width: "" },
          {
            prop: "status",
            label: "设备状态",
            render: (h, { row, index, column }) => {
              return [<span>{row.status === "0" ? "离线" : "在线"}</span>];
            },
          }, //1在线 0离线
          { prop: "ip", label: "IP", width: "" },
          { prop: "port", label: "端口", width: "" },
          { prop: "discribe", label: "设备描述", width: "" },
          // { label: "操作", width: "" },
        ],
      },
      regions: [],
      row: {},
      ruleForm: {
        regionCode: "",
        orgCode: "",
        location: "",
        projectId: "",
        id: "",
        discribe: "",
      },
      rules: {
        regionCode: [
          { required: true, message: "请选择区域编码", trigger: "blur" },
        ],
        orgCode: [
          { required: true, message: "请选择组织编码", trigger: "blur" },
        ],
        location: [{ required: true, message: "请选择区域", trigger: "blur" }],
        projectId: [
          { required: true, message: "请选择项目编码", trigger: "blur" },
        ],
      },
      org: [],
      location: [],
      projects: [],
    };
  },
  mounted() {
    this.deviceList();
  },
  methods: {
    /**
     * @函数功能: 获取所有设备
     * @出口参数:
     * @函数备注:
     */
    async deviceList() {
      try {
        let res = await this.$http.post(
          this.$util.prodBaseUrl + "/api/dvInfo/list",
          this.seachList
        );
        if (res.code) {
          this.tableData = res.data;
        }
      } catch (error) {}
    },
    /**
     * @函数功能: 设备同步
     * @出口参数:
     * @函数备注: 同步后从ICC平台拉取所有设备
     */
    async synchronous() {
      try {
        let res = await this.$http.post(
          this.$util.prodBaseUrl + "/api/dvInfo/getAllDv"
        );
        if (res.code === 200) {
          this.$message.success("同步成功！");
          // 同步完调 获取所有设备 接口刷新页面数据
          this.deviceList();
        } else {
          this.$message.success("同步失败！");
        }
      } catch (error) {}
    },

    /**
     * @函数功能: 获取区域编码
     * @param {*}
     * @出口参数:
     * @函数备注:
     */
    async getRegionCode() {
      let res = await axios({
        url: this.$util.prodBaseUrl + "/api/regionInfo/getAllRegion",
        method: "post",
      });
      if (res.data.code === 200) {
        let request = await axios({
          url: this.$util.prodBaseUrl + "/api/regionInfo/list",
          method: "post",
        });
        this.regions = request.data;
      }
    },
    /**
     * @函数功能: 获取区域
     * @param {*}
     * @出口参数:
     * @函数备注:
     */
    async getInstitution() {
      let res = await this.$http.post(
        this.$util.prodBaseUrl + "/api/dict/list?TYPE=LOCATION"
      );
      this.location = res;
    },
    /**
     * @函数功能: 获取机构
     * @param {*}
     * @出口参数:
     * @函数备注:
     */
    async getRegions() {
      let res = await axios({
        url: this.$util.prodBaseUrl + "/system/dept/list",
        method: "get",
      });
      if (res.data.code === 200) {
        this.org = res.data.data;
      }
    },
    /**
     * @函数功能: 获取项目
     * @param {*}
     * @出口参数:
     * @函数备注:
     */
    async getproject() {
      let res = await this.$http.post(
        this.$util.prodBaseUrl + "/api/projectInfo/list",
        {}
      );
      this.$nextTick(() => {
        this.projects = res.rows;
      });
    },
    binding() {
      this.dialogVisible = true;
      this.getRegionCode();
      this.getRegions();
      this.getInstitution();
      this.getproject();
      this.$nextTick(() => {
        this.ruleForm.regionCode = this.row.regionCode;
        this.ruleForm.orgCode = this.row.orgCode;
        this.ruleForm.location = this.row.location;
        this.ruleForm.projectId = this.row.projectId;
        this.ruleForm.discribe = this.row.discribe;
      });
    },

    currentChange(row) {
      this.disabled = false;
      this.row.regionCode = row.regionCode;
      this.row.orgCode = row.orgCode ? parseInt(row.orgCode) : row.orgCode;
      this.row.location = row.location;
      this.row.projectId = row.projectId;
      this.ruleForm.id = row.id;
      this.row.id = row.id;
      this.row.discribe = row.discribe;
    },

    /**
     * @函数功能: 绑定
     * @出口参数:
     * @函数备注:
     */
    bin() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          let res = await this.$http.post(
            this.$util.prodBaseUrl + "/api/dvInfo/bind",
            this.ruleForm
          );
          this.deviceList();
          this.resetForm("ruleForm");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
      this.disabled = true;
    },

    resetting() {
      this.seachList = {};
      this.deviceList();
    },
  },
};
</script>

<style scoped>
>>> .el-select,
>>> .el-input {
  width: 100%;
}
</style>
