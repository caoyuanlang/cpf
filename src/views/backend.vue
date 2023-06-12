<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-11 10:28:15
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-12 11:16:42
 * @FilePath: \vue - v2.0\src\views\backend.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <el-container>
      <el-aside
        width="200px"
        style="background-color: #243964; overflow-x: hidden; height: 100vh"
      >
        <img
          src="@/assets/dh-bg/title.png"
          style="vertical-align: middle;margin-top:10px;margin-right: 30px;"
          width="28px"
        />
        <el-menu :default-openeds="expand">
          <!-- <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>系统管理</template
            >
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="navigation('user')"
                >用户管理</el-menu-item
              >
              <el-menu-item index="1-2" @click="navigation('role')"
                >角色管理</el-menu-item
              >
              <el-menu-item index="1-3" @click="navigation('dept')"
                >部门管理</el-menu-item
              >
              <el-menu-item index="1-4" @click="navigation('dept')"
                >菜单管理</el-menu-item
              >
            </el-menu-item-group>
            <el-submenu index="1-3">
              <template slot="title">日志管理</template>
              <el-menu-item index="1-3-1" @click="navigation('operlog')"
                >操作日志</el-menu-item
              >
              <el-menu-item index="1-3-2" @click="navigation('logininfor')"
                >登录日志</el-menu-item
              >
            </el-submenu>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i>系统监控</template
            >
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="navigation('online')"
                >在线用户</el-menu-item
              >
              <el-menu-item index="2-2" @click="navigation('users')"
                >用户统计</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-menu"></i>设备管理</template
            >
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="navigation('device')"
                >设备管理</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu> -->

          <el-submenu
            :index="item.name"
            v-for="(item, index) in menuList"
            :key="index"
          >
            <template slot="title"
              ><i :class="item.meta.icon"></i>{{ item.meta.title }}</template
            >

            <el-menu-item
              @click="
                navigation(node.path), full(node.path), (expand = [item.name])
              "
              :index="node.name"
              v-for="node in item.children?.filter(
                (i) => !i.children && !(i.path === 'menu')
              )"
              :key="node.name"
              >{{ node.meta.title }}</el-menu-item
            >
            <el-submenu
              :index="node.name"
              v-for="node in item.children?.filter((i) => i.children)"
              :key="node.name"
            >
              <template slot="title">{{ node.meta.title }}</template>
              <el-menu-item
                @click="
                  navigation(elem.path), (expand = [item.name, node.name])
                "
                :index="elem.name"
                v-for="elem in node.children"
                :key="elem.name"
                >{{ elem.meta.title }}</el-menu-item
              >
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: left; font-size: 12px">
          <!-- <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
          <!-- <span style="cu" @click="navigation('pf')">BI大屏</span> -->
        </el-header>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 全屏插件
import screenfull from "screenfull";
export default {
  data() {
    return {
      menuList: [],
      expand: [],
    };
  },
  mounted() {
    this.getRouters();
  },
  methods: {
    navigation(name) {
      this.$router.push({ name });
    },
    /**
     * @函数功能:获取菜单
     * @出口参数:
     * @函数备注:
     */
    async getRouters() {
      let res = await this.$http.get(this.$util.prodBaseUrl + "/getRouters");
      this.menuList = res.data;
    },
    /**
     * @函数功能: 页面全屏
     * @出口参数:
     * @函数备注:
     */
    full(path) {
      // 如果不是大屏路径就不执行全屏
      if (path != "pf") return;

      //全屏方法
      if (!screenfull.isEnabled) {
        // 如果不支持进入全屏，发出不支持提示
        this.$message({
          message: "您的浏览器版本过低不支持全屏显示！",
          type: "warning",
        });
        return false;
      }
      if (screenfull.isEnabled) {
        screenfull.request();
      }
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #243964;
  color: #ffffff;
  line-height: 60px;
}

.el-aside {
  color: #ffffff;
}
>>> .el-submenu .el-menu-item,
>>> .el-submenu__title {
  padding: inherit;
}
>>> .el-menu {
  background-color: #243964;
  border-right: none;
}
>>> .el-submenu__title,
>>> .el-submenu__title i,
>>> .el-menu-item {
  color: #ffffff;
}
</style>
