import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@js/filters.js'
import  '@js/htmlFontSize.js';//引入rem动态计算函数
// 如果不想改变路径后,使用webpack 别名的形式来做路径（vue.config.js）
import axios from 'axios'
import VueAxios from 'vue-axios'// Vue3 使用 axios 需要配合 vue-axios 一起使用
import  '@js/axios.config.js'; // 全局引入请求类


const app = createApp(App);
// 注册全局过滤器（格式化）  有问题 待解决
// app.config.globalProperties.$filters = {
//     filtersPriceValue(value){
//         if(value == ''|| !value) return '';
//         // 把文本转换为 float
//         let result = parseFloat(value);
//         // 如果文本为 Integer ,当前文本没有小数
//         if(Number.isInteger(result)){
//             return result;
//         }else {
//             return result.toFixed(2);
//         }
//     }
// }


/**
 * 使用：this.axios.get(api).then...
 */
// 全局引入组件
createApp(App).use(store).use(router).use(VueAxios, axios).mount('#app')

