<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-16 14:52:44
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-29 10:55:40
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
      <el-button slot="button" @click="(dialogVisible = true), (Edit = false)"
        >添加</el-button
      >
    </comTableList>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="ruleForm.deptName"></el-input>
        </el-form-item>
        <el-form-item label="显示顺序" prop="orderNum">
          <el-input v-model="ruleForm.orderNum"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="leader">
          <el-input v-model="ruleForm.leader"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" prop="parentId">
          <el-input
            v-model="input"
            @focus="treeShow = true"
            placeholder="请输入内容"
          ></el-input>
          <el-tree
            :data="treeData"
            v-if="treeShow"
            :props="defaultProps"
            ref="tree"
            @node-click="
              (data) => {
                ruleForm.parentId = data.id;
                input = data.label;
              }
            "
          ></el-tree>
          <!-- :default-checked-keys="keys"
            @check-change="getCheckedKeys" -->
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
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import comTableList from "../components/comTableList.vue";
import columnData from "./columnObj/dept";

export default {
  components: {
    comTableList,
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      Edit: false,
      treeShow: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
      input: "",
      columnObj: {
        columnData: columnData(this),
      },
      treeData: [],
      ruleForm: {
        deptName: "",
        parentId: "",
        status: "0",
        orderNum: undefined,
        leader: undefined,
        phone: undefined,
        email: undefined,
      },
      rules: {
        parentId: [
          { required: true, message: "上级部门不能为空", trigger: "change" },
        ],
        deptName: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
        ],
        orderNum: [
          { required: true, message: "显示排序不能为空", trigger: "blur" },
        ],
        email: [
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
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
    //  获取部门列表
    this.getDeptList();

    // 获取菜单树
    this.deptTree();
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
     * @函数功能: 获取部门列表
     * @出口参数:
     * @函数备注:
     */
    async getDeptList() {
      let res = await axios({
        url: this.$util.prodBaseUrl + "/system/dept/list",
        method: "get",
      });
      if (res.data.code === 200) {
        this.tableData = res.data.data;
      }
    },

    /**
     * @函数功能: 添加部门
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
              url: this.$util.prodBaseUrl + "/system/dept",
              data: this.ruleForm,
              method: "post",
            });
          } else {
            res = await axios({
              url: this.$util.prodBaseUrl + "/system/dept",
              data: this.ruleForm,
              method: "PUT",
            });
          }
          if (res.data.code === 200) {
            this.$message.success(res.data.msg);
            this.getDeptList();
          }
          this.resetForm(formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * @函数功能: 刷新table
     * @param {*} formName
     * @出口参数:
     * @函数备注:
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
      this.input = "";
      this.treeShow = false;
    },

    /**
     * @函数功能: 删除部门
     * @param {*} deptId
     * @出口参数:
     * @函数备注:
     */
    deptDel(deptId) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await axios({
            url: this.$util.prodBaseUrl + "/system/dept/" + deptId,
            method: "delete",
          });
          this.getDeptList();

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
