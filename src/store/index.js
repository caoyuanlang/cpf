/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-17 09:47:30
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-29 09:56:53
 * @FilePath: \vue\src\store\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken:'',
  },
  getters: {},
  mutations: {
    setAccessToken(state,payload) {
      state.accessToken=payload;
    },
    addattribute(state,payload) {
      Vue.set(state,payload.content.key,payload.content.value);
    }
  },
  actions: {},
  modules: {},
  plugins: [createPersistedState({
    reducer(val)  {
      return {
          // 只储存state中的token
          accessToken: val.accessToken
      }
  }
  })]
});
