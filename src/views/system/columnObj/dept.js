/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-22 11:26:38
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-02 17:07:43
 * @FilePath: \vue - v2.0\src\views\system\columnObj\user.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function(that)  {


    return [
        { prop: "deptName", label: "部门名称" },
        { prop: "orderNum", label: "排序" },
        { prop: "status", label: "状态",render:(h, { row, index, column }) =>{
            return [<span>{row.status === '0' ? "正常" : "停用"}</span>]

        }},
        { prop: "createTime", label: "创建时间" },
        {
            label: "操作",
            prop: "action",
            render: (h, { row, index, column }) => [
                h(
                    "el-button",
                    {
                        style: {
                            padding: "0 8px",
                            fontSize: "12px",
                            borderRight: "none",
                        },
                        on: {
                            click() {
                                that.Edit = true;
                                that.dialogVisible = true;
                                that.ruleForm = { ...row }
                                that.input = row.deptName
                            },
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
                            borderRight: "none",
                        },
                        on: {
                            click() {
                                that.deptDel(row.deptId)
                            },
                        },
                    },
                    "删除"
                ),
            ],
        },
    ]




}