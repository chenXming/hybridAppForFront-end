//进行 axios 配置
// 引入
import axios from 'axios';


// 设置 axios 请求的baseUrl
axios.defaults.baseURL = 'http://api.imooc.hybrid.lgdsunday.club/';

/**
 * 拦截请求，在请求发送之前都会 回调这个方法，在这里添加token
 * config :是在进行请求时候的配置对象
 */
axios.interceptors.request.use(config => {
    if(config.params){
        config.params.token = '926a8660-ffcf-11eb-8a5b-5d1411faa480';
    }else{
        config.params = {
            token:'926a8660-ffcf-11eb-8a5b-5d1411faa480'
        }
    }
    return config;//需要 return 回去
});

/*
*设置 axios 的拦截器 interceptor 响应处理
* 所有使用axios 的请求响应 都会优先回调到拦截器中 
*/
axios.interceptors.response.use((response) => {

    // 统一出路数据，请求正确走这个回调
    if(response.data.state == 0){
        return response.data.data;
    }else{
        return Promise.reject(response.data);//进入 catch error 回调
    }
},(error) => {
    // 处理错误响应
    return Promise.reject(error);
});

// 绑定 vue 原型中，组件可以直接：this.$http 访问到axios 在Vue2中可以使用这种方式
// Vue.prototype.$http = axios;
// Vue 3中在main.js中引入全局引入














