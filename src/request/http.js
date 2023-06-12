/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-04-18 10:26:55
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-06-09 15:35:04
 * @FilePath: \vue\src\views\request\http.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from "axios";
import store from "../store"

import { Notification, MessageBox, Message } from 'element-ui'


// 请求超时时间 
axios.defaults.timeout = 1000000000;

let http = { util: {} };







// http.util.prodBaseUrl = "http://192.168.1.108:7001"; //本地测试

http.util.prodBaseUrl = "http://140.249.204.169:7001"; //正式环/境

http.util.prodDhBaseUrl = "https://140.249.211.40:7443"; //大华




// // 设置 post 请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
/** 
 * get方法，对应get请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
http.get = function (url, params) {
    console.log(url)

    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
http.post = function (url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}















// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = `Bearer ${store.state.accessToken}`;
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    })


let errorCode = {
    '401': '认证失败，无法访问系统资源',
    '403': '当前操作没有权限',
    '404': '访问资源不存在',
    'default': '系统未知错误，请反馈给管理员'
};

// 响应拦截器
axios.interceptors.response.use(res => {

    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;

    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    // // 二进制数据则直接返回
    // if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
    //     return res.data
    // }

    if (code === 401) {
        console.log(55555555)
        MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', { confirmButtonText: '重新登录', cancelButtonText: '取消', type: 'warning' }).then(() => {
            location.href = '/';

        }).catch(() => {
        });
        return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
        Message({ message: msg, type: 'error' })
        return Promise.reject(new Error(msg))
    } else if (code === 601) {
        Message({ message: msg, type: 'warning' })
        return Promise.reject('error')
    } else if (code !== 200) {
        Notification.error({ title: msg })
        return Promise.reject('error')
    } else {
        return res
    }
},
    error => {
        console.log('err' + error)
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        Message({ message: message, type: 'error', duration: 5 * 1000 })
        return Promise.reject(error)
    }
)







// // 响应拦截器
// axios.interceptors.response.use(
//     response => {
//         if (response.status === 200) {
//             return Promise.resolve(response);
//         } else {
//             return Promise.reject(response);
//         }
//     },
//     error => {
//         if (error.response.status) {
//             switch (error.response.status) {
//                 // 401: 未登录                
//                 // 未登录则跳转登录页面，并携带当前页面的路径                
//                 // 在登录成功后返回当前页面，这一步需要在登录页操作。                
//                 case 401:
//                     router.replace({
//                         path: '/login',
//                         query: { redirect: router.currentRoute.fullPath }
//                     });
//                     break;
//                 // 403 token过期                
//                 // 登录过期对用户进行提示                
//                 // 清除本地token和清空vuex中token对象                
//                 // 跳转登录页面                
//                 case 403:
//                     Toast({
//                         message: '登录过期，请重新登录',
//                         duration: 1000,
//                         forbidClick: true
//                     });
//                     // 清除token                    
//                     localStorage.removeItem('token');
//                     store.commit('loginSuccess', null);
//                     // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
//                     setTimeout(() => {
//                         router.replace({
//                             path: '/login',
//                             query: {
//                                 redirect: router.currentRoute.fullPath
//                             }
//                         });
//                     }, 1000);
//                     break;
//                 // 404请求不存在                
//                 case 404:
//                     Toast({
//                         message: '网络请求不存在',
//                         duration: 1500,
//                         forbidClick: true
//                     });
//                     break;
//                 // 其他错误，直接抛出错误提示                
//                 default:
//                     Toast({
//                         message: error.response.data.message,
//                         duration: 1500,
//                         forbidClick: true
//                     });
//             }
//             return Promise.reject(error.response);
//         }
//     }
// );


export default axios;

export {
    http,
}