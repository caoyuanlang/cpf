<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-16 14:52:44
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-11 16:30:36
 * @FilePath: \vue - v2.0\src\views\system\user.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div class="content">
      <treeList class="tree" :treeData="treeData" @nodeClick="nodeClick">
      </treeList>
      <comTableList
        class="tableList"
        :tableData="tableData"
        :columnObj="columnObj"
        :total="total"
        @handleSizeChange="
          (val) => {
            query.pageSize = val;
            getUsers();
          }
        "
        @handleCurrentChange="
          (val) => {
            query.pageNum = val;
            getUsers();
          }
        "
      >
        <el-button
          slot="button"
          @click="
            ((dialogVisible = true), (title = '添加用户')), (Edit = false)
          "
          >添加</el-button
        >
      </comTableList>
    </div>

    <el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="ruleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" v-if="!Edit" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="用户名称" v-if="!Edit" prop="userName">
          <el-input v-model="ruleForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input
            v-model="ruleForm.phonenumber"
            placeholder="请输入手机号码"
            maxlength="11"
          />
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select
            style="width: 100%"
            v-model="ruleForm.roleIds"
            multiple
            placeholder="请选择角色"
          >
            <el-option
              v-for="item in roleOptions"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
              :disabled="item.status == 1"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属部门" prop="deptId">
          <el-input
            v-model="input"
            @focus="treeShow = true"
            placeholder="请输入内容"
          ></el-input>
          <el-tree
            v-if="treeShow"
            :data="treeData"
            :props="defaultProps"
            @node-click="
              (data) => {
                ruleForm.deptId = data.id;
                input = data.label;
              }
            "
          ></el-tree>
        </el-form-item>
        <el-form-item label="部门状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="0">启用</el-radio>
            <el-radio label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import comTableList from "../components/comTableList";
import treeList from "../components/treeList.vue";
import columnData from "./columnObj/user";
import { use } from "echarts";
export default {
  components: {
    comTableList,
    treeList,
  },
  data() {
    return {
      title: "添加用户",
      dialogVisible: false,
      treeShow: false,
      tableData: [],
      Edit: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
      columnObj: {
        columnData: columnData(this),
      },
      treeData: [],
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      total: 1000,
      roleOptions: [],
      ruleForm: {
        nickName: "",
        deptId: "",
      },
      input: "",
      rules: {
        userName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "用户名称长度必须介于 2 和 20 之间",
            trigger: "blur",
          },
        ],
        deptId: [
          { required: true, message: "归属部门不能为空", trigger: "blur" },
        ],
        nickName: [
          { required: true, message: "用户昵称不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "用户密码不能为空", trigger: "blur" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度必须介于 5 和 20 之间",
            trigger: "blur",
          },
        ],
        phonenumber: [
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  mounted() {
    // 获取部门树
    this.deptTree();

    // 获取用户列表
    this.getUsers();
// 获取角色列表
    this.getUser();
  },
  methods: {
    /**
     * @函数功能: 获取部门树
     * @出口参数:
     * @函数备注:
     */
    async deptTree() {
      let res = await axios({
        url: this.$util.prodBaseUrl + "/system/user/deptTree",
        method: "get",
      });
      if (res.data.code === 200) {
        this.treeData = res.data.data;
      }
    },
    /**
     * @函数功能: 获取用户
     * @param {*} deptId:树节点
     * @出口参数:
     * @函数备注:
     */
    async getUsers(deptId = "") {
      let res = await axios({
        url: this.$util.prodBaseUrl + "/system/user/list",
        method: "get",
        params: deptId ? { ...this.query, deptId } : this.query,
      });
      if (res.data.code === 200) {
        this.tableData = res.data.rows;
        this.total = res.data.total;
      }
    },
    /**
     * @函数功能: 选中树节点触发查询
     * @param {*} data
     * @出口参数:
     * @函数备注:
     */
    nodeClick(data) {
      this.getUsers(data.id);
    },

    /**
     * @函数功能: 添加用户
     * @param {*} formName
     * @出口参数:
     * @函数备注:
     */
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let res = {};
          if (!this.Edit) {
            res = await axios({
              url: this.$util.prodBaseUrl + "/system/user",
              data: this.ruleForm,
              method: "post",
            });
          } else {
            res = await axios({
              url: this.$util.prodBaseUrl + "/system/user",
              data: this.ruleForm,
              method: "put",
            });
          }
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.getUsers();
          }
          this.resetForm(formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.ruleForm = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: [],
      };
      this.input = "";
      this.treeShow = false;
      this.dialogVisible = false;
      this.$refs[formName].resetFields();
    },
    userDel(userId) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await axios({
            url: this.$util.prodBaseUrl + "/system/user/" + userId,
            method: "delete",
          });
          this.getUsers();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    async getUser() {
      let res = await this.$http.get(this.$util.prodBaseUrl + "/system/user/");
      console.log(res.roles);
      this.roleOptions = res.roles;
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-evenly;
}
.tree {
  flex-basis: 12%;
}
.tableList {
  flex-basis: 80%;
}
</style>
