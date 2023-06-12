<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-19 11:00:57
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-21 15:07:13
 * @FilePath: \vue - v2.0\src\views\components\treeList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>

    <el-tree
      class="filter-tree"
      :data="treeData"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      @node-click="
        (val) => {
          $emit('nodeClick', val);
        }
      "
      ref="tree"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  props: {
    treeData: {
      type: Array,
      default: [],
    },
    defaultProps: {
      type: Object,
      default: () => {
        return {
          children: "children",
          label: "label",
        };
      },
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },

  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
  },

  data() {
    return {
      filterText: "",
    };
  },
};
</script>
