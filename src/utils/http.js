//导入vue
import Vue from "vue";
//导入axios
import axios from "axios";
//导入toast组件
import { Toast } from "vant";
//配置基础域名
// axios.defaults.baseURL = "http://localhost:3000/api";
// console.log(process.env.NODE_ENV);
//process.env.NODE_ENV:development | production
//环境判断
if (process.env.NODE_ENV === "development") {  //开发环境
    axios.defaults.baseURL = "/api";
} else {
    axios.defaults.baseURL = "http://localhost:3000/api";
}


//配置请求拦截器
axios.interceptors.request.use(config => {
    //全局配置自定义请求头
    //从本地存储中读取登录凭证信息
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    //通过自定义请求头将登录凭证token发送给数据接口
    config.headers.authorization = userInfo.token;
    return config;
})

//配置响应拦截器
axios.interceptors.response.use(response => {
    if (response.data.code === 403) {
        //提示
        Toast(response.data.msg);
        //重定向
        location.href = "/login";
    }
    return response.data;
})

//将axios挂载在vue原型对象上
Vue.prototype.$http = axios;

export default axios;