/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-22 11:26:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-07 09:36:37
 * @FilePath: \vue - v2.0\src\views\system\columnObj\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";

let fun = (that) =>{
    return [
        { prop: "userId", label: "用户编号" },
        { prop: "userName", label: "用户名称" },
        { prop: "nickName", label: "用户昵称" },
        { prop: "dept.deptName", label: "部门" },
        { prop: "phonenumber", label: "手机号", width: "150" },
        {
            prop: "status", label: "状态", render: (h, { row, index, column }) => {
                return [<span>{row.status === '0' ? "正常" : "停用"}</span>]
            }
        },
        { prop: "createTime", label: "创建时间", width: "150" },
        {
            label: "操作",
            prop: "action",
            width: "120",
            show: false,
            render: (h, { row, index, column }) => {
                if (row.userId === 1) return '';
                return [
                    h(
                        "el-button",
                        {
                            style: {
                                padding: "0 8px",
                                fontSize: "12px",
                            },
                            on: {
                                click() {
                                    that.dialogVisible = true;
                                    that.$nextTick(async () => {
                                        that.ruleForm = { ...row }
                                        that.input = row.dept.deptName;

                                        let res = await axios.get(that.$util.prodBaseUrl + "/system/user/" + row.userId);
                                        that.ruleForm.roleIds = res.data.roleIds;
                                    })

                                    that.Edit = true;
                                }
                            },
                        },
                        "修改"
                    ),
                    h(
                        "el-button",
                        {
                            style: {
                                padding: "0 8px",
                                fontSize: "12px",
                            },
                            on: {
                                click() {
                                    that.userDel(row.userId);
                                },
                            },
                        },
                        "删除"
                    ),
                ]
            },
        },
    ]
}

console.log(fun)

export default fun

