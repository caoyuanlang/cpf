<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-16 14:31:53
 * @LastEditors: caoyuanling a2607954957@foxmail.com
 * @LastEditTime: 2023-06-13 14:31:52
 * @FilePath: \vue - v2.0\src\views\components\comTableList.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <!-- 多条件搜索部分 -->
    <div class="searchs" v-if="searchShow">
      <slot name="searchs"></slot>
      <el-button type="primary" icon="el-icon-search" @click="$emit('search')"
        >搜索</el-button
      >
      <el-button icon="el-icon-refresh-left" @click="$emit('reset')"
        >重置</el-button
      >
    </div>
    <!-- table部分 -->
    <div>
      <div class="buttons">
        <slot name="button"></slot>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :highlight-current-row="single"
        row-key="id"
        @current-change="
          (Row, oldRow) => {
            $emit('currentChange', Row, oldRow);
          }
        "
      >
        <el-table-column
          v-for="(item, index) in columnObj.columnData"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :show-overflow-tooltip="item.showOverflow"
          :align="item.align"
        >
          <template slot-scope="scope">
            <expand-dom
              v-if="item.render"
              :render="item.render"
              :row="scope.row"
              :index="scope.$index"
              :column="item"
            ></expand-dom>
            <span v-else>{{ scope.row[item.prop] || "" }}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block" v-if="paginationShow" style="float: right">
        <el-pagination
          @size-change="
            (val) => {
              $emit('handleSizeChange', val);
            }
          "
          @current-change="
            (val) => {
              $emit('handleCurrentChange', val);
            }
          "
          :page-sizes="pageSizes"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, context) => {
        const params = {
          row: context.props.row,
          index: context.props.index,
        };
        if (context.props.column) params.column = context.props.column;
        return context.props.render(h, params);
      },
    },
  },
  props: {
    searchShow: {
      type: Boolean,
      default: false,
    },
    single: {
      type: Boolean,
      default: false,
    },
    paginationShow: {
      type: Boolean,
      default: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    columnObj: {
      type: Object,
      required: true,
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 50, 100];
      },
    },
    total: {
      type: Number,
      default: 1000,
    },
  },
  mounted() {},
};
</script>

<style scoped>
.searchs {
  display: flex;
  gap: 10px;
}
.buttons {
  display: flex;
  justify-content: left;
  gap: 10px;
}
</style>
