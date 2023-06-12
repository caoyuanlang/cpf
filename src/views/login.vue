<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-17 09:51:58
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-08 15:02:41
 * @FilePath: \vue\src\views\login.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="ipark-login">
    <span class="title">
      <img
        src="@/assets/dh-bg/title.png"
        style="vertical-align: middle"
        width="28px"
        alt=""
      /> 中国工商银行</span
    ><span class="title">
      <img
        src="@/assets/dh-bg/gong.png"
        style="vertical-align: middle"
        width="28px"
        alt=""
      /> 住房公积金</span
    >
    <div class="login-box">
      <div class="login-submit">
        <div class="user">
          <div>
            <span>请输入用户名</span>
            <el-input
              class="input"
              v-model="username"
              placeholder="请输入账号"
            ></el-input>
          </div>
          <div>
            <span>请输入密码</span>
            <el-input
              autocomplete="new-password"
              class="input"
              placeholder="请输入密码"
              v-model="passWord"
              show-password
            ></el-input>
          </div>
          <div>
            <span>请输入验证码</span>
            <el-input
              class="input"
              v-model="checkCode"
              placeholder="请输入验证码"
            ></el-input>
            <div
              @click="code"
              style="
                font-size: 28px;
                line-height: 56px;
                color: aqua;
                cursor: pointer;
              "
              class="captcha"
            >
              <img height="99%" width="99%" :src="radomCode" alt="" />
            </div>
          </div>
        </div>
        <div>
          <div class="button" @click="login">登录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/request/http";
// 全屏插件
import screenfull from "screenfull";
export default {
  name: "ipark-login",

  data() {
    return {
      username: "",
      passWord: "",
      checkCode: "",
      radomCode: "",
      uuid: "",
    };
  },

  mounted() {
    this.code();
  },
  methods: {
    async login() {
      // let res = await this.$http.post(
      //   this.$util.prodBaseUrl + "/api/users/login",
      //   {
      //     username: this.username,
      //     passWord: this.passWord,
      //     code: this.checkCode,
      //   }
      // );
      let data = {
        code: this.checkCode,
        uuid: this.uuid,
        username: this.username,
        password: this.passWord,
      };
      console.log(data);
      let res = await axios({
        url: this.$util.prodBaseUrl + "/login",
        headers: {
          isToken: false,
        },
        method: "post",
        data: data,
      });
      if (res.data.code === 200) {
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

        this.$router.push({ name: "pf" });
        this.$message.success("登录成功！");

        sessionStorage.userTime = new Date();

        this.$store.commit("setAccessToken", res.data.token);
      } else {
        this.$message.warning(res.data.msg);
      }
    },
    async code() {
      // let res = await this.$http.get(this.$util.prodBaseUrl+"/api/users/setCode")
      // this.radomCode = res;

      let res = await axios({
        url: this.$util.prodBaseUrl + "/captchaImage",
        headers: {
          isToken: false,
        },
        method: "get",
        timeout: 20000,
      });
      if (res.status === 200) {
        this.radomCode = "data:image/gif;base64," + res.data.img;
        this.uuid = res.data.uuid;
      } else {
        this.$message.warning(res.data.msg);
      }
    },
  },
};
</script>

<style scoped>
.ipark-login {
  height: 100%;
  width: 100%;
  background: url(../assets/login/青岛市分行2199智慧信贷系统.png) no-repeat
      center 30px / 864px 64px,
    url(../assets/login/Canvas.png) no-repeat center center / cover;
}

/* 登录框 */
.login-box {
  width: 930px;
  height: 500px;
  background: url(../assets/login/组\ 33.png) no-repeat center center / cover;
  position: absolute;
  top: 40px;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}

.login-submit {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user {
  height: 55%;
  width: 771px;
  margin-top: 79px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  user-select: none;
}

.user span {
  color: #fff;
  font-size: 24px;
  font-weight: 900;
  font-family: "AlibabaPuHuiTiH";
  width: 50%;
}

.user > div {
  display: flex;
  justify-content: left;
  align-items: center;
  border-bottom: 3px solid transparent;
  border-image: url(../assets/login/路径\ 47.png) 10%;
  padding-bottom: 5px;
  height: 63px;
}

.user > div > :nth-child(1) {
  flex-basis: 30%;
}

.user input {
  /* background-color: transparent; */
}

.button {
  width: 240px;
  height: 80px;
  background: url(../assets/login/login.png) no-repeat center top / cover;
  font-size: 40px;
  color: #fff;
  line-height: 70px;
}

.button:hover {
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0 2px 4px #4609ff;
}

.captcha {
  width: 170px;
  height: 56px;
  background: url(../assets/login/login.png) no-repeat center top / cover;
  margin-right: 50px;
}

.input {
  width: 200px;
}
.input >>> input {
  background-color: transparent !important;
  border: none;
  color: #fff;
  font-weight: 200;
  font-size: 20px;
}

.title {
  color: #fff;
  font-weight: 400;
  font-size: 28px;
  margin-top: 20PX;
}

.title:first-child {
  float: left;
  margin-left: 20px;
}
.title:nth-child(2) {
  float: right;
  margin-right: 20px;
}
</style>
