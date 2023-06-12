/*
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-05-17 15:46:24
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-05-29 10:29:31
 * @FilePath: \vue - v2.0\src\mixins\viewMixins.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default {
    data() {
        return {
            dhToken: "",
        }
    },
    created() {
        let that = this;
        // 定时每1min刷新token，如果时间间隔为半小时，停止刷新token  备注：大华接口的token
        if (!sessionStorage.lastHttpRequestTime) {
            sessionStorage.lastHttpRequestTime = +new Date()
        }
        let tokenInterval = setInterval(() => {
            if (+new Date() - sessionStorage.lastHttpRequestTime > 30 * 60 * 1000) {
                clearInterval(tokenInterval)
                refreshToken()

            }
        }, 60000)

        console.log(this)
        refreshToken();

        function refreshToken() {
            that.$http.get(that.$util.prodBaseUrl + "/api/token/getToken").then((res) => {
                that.dhToken = res.data
            })
        }
    },

    mounted() {

    },
    methods: {


    }
}