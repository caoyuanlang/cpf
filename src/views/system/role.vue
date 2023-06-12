<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-16 14:52:44
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-24 10:11:47
 * @FilePath: \vue - v2.0\src\views\system\user.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <comTableList
      :paginationShow="false"
      :tableData="tableData"
      :columnObj="columnObj"
    >
      <el-button slot="button" @click="dialogVisible = true">添加</el-button>
    </comTableList>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="ruleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="ruleForm.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input v-model="ruleForm.roleSort"></el-input>
        </el-form-item>
        <el-form-item label="菜单权限" prop="menuIds">
          <el-tree
            :data="treeData"
            :props="defaultProps"
            node-key="id"
            show-checkbox
            ref="tree"
            :default-checked-keys="keys"
            @check-change="getCheckedKeys"
          ></el-tree>
        </el-form-item>
        <el-form-item label="部门状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="0">正常</el-radio>
            <el-radio label="1">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm')">取 消</el-button>
        <el-button
          type="primary"
          @click="(dialogVisible = false), submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import comTableList from "../components/comTableList.vue";
import treeList from "../components/treeList.vue";
import columnData from "./columnObj/role";

export default {
  components: {
    comTableList,
    treeList,
  },
  data() {
    return {
      Edit: false,
      dialogVisible: false,
      tableData: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      columnObj: {
        columnData: columnData(this),
      },
      keys: [],
      treeData: [],
      query: {
        pageNum: 1,
        pageSize: 10,
      },
      ruleForm: {
        roleName: "",
        roleKey: "",
        roleSort: "",
        status: "0",
        menuIds: [],
        deptCheckStrictly: true,
        menuCheckStrictly: false,
      },
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" },
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    //  获取角色列表
    this.getRoleList();

    // 获取菜单树
    this.getTree();
  },
  methods: {
    /**
     * @函数功能: 获取角色列表
     * @出口参数:
     * @函数备注:
     */
    async getRoleList() {
      let res = await axios({
        url: this.$util.prodBaseUrl + "/system/role/list",
        method: "get",
        params: this.query,
      });
      if (res.data.code === 200) {
        this.tableData = res.data.rows;
      }
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    /**
     * @函数功能: 获取菜单树
     * @出口参数:
     * @函数备注:
     */
    async getTree() {
      let res = await axios({
        url: this.$util.prodBaseUrl + "/system/menu/treeselect",
        method: "get",
      });
      if (res.data.code === 200) {
        this.treeData = res.data.data;
      }
    },

    getCheckedKeys() {
      this.ruleForm.menuIds = this.$refs.tree.getCheckedKeys();
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
              url: this.$util.prodBaseUrl + "/system/role",
              data: this.ruleForm,
              method: "post",
            });
          } else {
            res = await axios({
              url: this.$util.prodBaseUrl + "/system/role",
              data: this.ruleForm,
              method: "put",
            });
          }
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.getRoleList();
          }
          this.resetForm(formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.tree.setCheckedNodes([]);
      this.dialogVisible = false;
    },

    async getIdTree(id, row) {
      let res = await axios({
        url: this.$util.prodBaseUrl + "/system/menu/roleMenuTreeselect/" + id,
        data: this.ruleForm,
        method: "get",
      });

      if (res.data.code === 200) {
        this.keys = res.data.checkedKeys;
        row.menuIds = res.data.checkedKeys;
        this.ruleForm = { ...row };
      }
    },
    /**
     * @函数功能: 删除角色
     * @param {*} userId
     * @出口参数:
     * @函数备注:
     */
    roleDel(userId) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await axios({
            url: this.$util.prodBaseUrl + "/system/role/" + userId,
            method: "delete",
          });
          this.getRoleList();
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
  },
};
</script>
