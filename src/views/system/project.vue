<!--
 * @Author: caoyuanling a2607954957@foxmail.com
 * @Date: 2023-06-13 10:12:52
 * @LastEditors: caoyuanling a2607954957@foxmail.com
 * @LastEditTime: 2023-06-13 16:47:11
 * @FilePath: \vue - v2.0\src\views\system\project.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <comTableListVue
      :tableData="tableData"
      :columnObj="columnObj"
      :total="total"
      :searchShow="true"
      @handleSizeChange="
        (val) => {
          searchData.pageSize = val;
          getTableData();
        }
      "
      @handleCurrentChange="
        (val) => {
          searchData.pageNum = val;
          getTableData();
        }
      "
      @search="search"
      @reset="reset"
    >
      <div slot="searchs" class="searchs">
        <el-input
          v-model.trim="searchData.projectName"
          placeholder="项目名称"
        ></el-input>
        <el-input
          v-model.trim="searchData.orgName"
          placeholder="机构名称"
        ></el-input>
        <el-input
          v-model.trim="searchData.location"
          placeholder="所在区域"
        ></el-input>
      </div>

      <div slot="button" style="margin-top: 10px">
        <el-button @click="open">添加</el-button>
      </div>
    </comTableListVue>

    <!-- 弹窗 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="项目名称" prop="projectName">
          <el-input
            v-model="formData.projectName"
            placeholder="请输入项目名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="机构名称" prop="orgName">
          <el-select v-model="formData.orgNameCopy" placeholder="请选择机构">
            <el-option
              v-for="(item, index) in org"
              :key="index"
              :label="item.deptName"
              :value="[item.deptId, item.deptName]"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在区域" prop="location">
          <el-select v-model="formData.location" placeholder="请选择区域">
            <el-option
              v-for="(item, index) in location"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="increase">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import comTableListVue from "../components/comTableList.vue";

export default {
  components: {
    comTableListVue,
  },
  data() {
    return {
      tableData: [],
      title: "添加",
      dialogVisible: false,
      columnObj: {
        columnData: [
          { prop: "projectName", label: "项目名称" },
          {
            prop: "orgName",
            label: "机构名称",
          },
          {
            prop: "location",
            label: "所在区域",
          },
        ],
      },
      total: 0,
      searchData: {
        pageNum: 1,
        pageSize: 10,
        projectName: "",
        orgName: "",
        location: "",
      },
      org: [],
      location: [],
      formData: { projectName: "", orgName: "", location: "" },
      rules: {
        projectName: {
          required: true,
          message: "请输入项目名称",
          trigger: "blur",
        },
        orgName: {
          required: true,
          message: "请选择机构名称",
          trigger: "blur",
        },
        location: {
          required: true,
          message: "请选择所在区域",
          trigger: "blur",
        },
      },
    };
  },
  mounted() {
    //  获取项目管理列表
    this.getTableData();
  },
  methods: {
    /**
     * @函数功能: 获取项目管理列表
     * @出口参数:
     * @函数备注:
     */
    async getTableData() {
      let res = await this.$http.post(
        this.$util.prodBaseUrl + "/api/projectInfo/list",
        this.searchData
      );
      if (res.code === 200) {
        this.tableData = res.rows;
        this.total = res.total;
      }
    },
    /**
     * @函数功能: 查询
     * @出口参数:
     * @函数备注:
     */
    search() {
      this.getTableData();
    },
    /**
     * @函数功能:重置
     * @出口参数:
     * @函数备注:
     */
    reset() {
      (this.searchData.projectName = ""),
        (this.searchData.orgName = ""),
        (this.searchData.location = "");
      this.getTableData();
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
      let res = await this.$http.get(
        this.$util.prodBaseUrl + "/system/dept/list"
      );

      if (res.code === 200) {
        this.org = res.data;
      }
    },

    open() {
      this.dialogVisible = true;

      this.getInstitution();
      this.getRegions();
    },

    /**
     * @函数功能: 添加项目
     * @出口参数:
     * @函数备注:
     */
    async increase() {
      this.formData.orgName = this.formData.orgNameCopy[1];
      this.formData.orgId = this.formData.orgNameCopy[0];

      let res = await this.$http.post(
        this.$util.prodBaseUrl + "/api/projectInfo/add",
        this.formData
      );
      this.dialogVisible = false;

      if (res.data.code === 200) {
      }
      this.initialization();
    },

    initialization() {
      this.formData = { projectName: "", orgName: "", location: "" };
    },
  },
};
</script>

<style scoped>
.searchs {
  display: flex;
  gap: 10px;
}
.searchs >>> .el-input {
  width: 200px;
}

.demo-ruleForm >>> .el-select {
  width: 100%;
}
</style>
