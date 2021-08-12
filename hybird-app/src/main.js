import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import  '@js/htmlFontSize.js';//引入rem动态计算函数
// 如果不想改变路径后,使用webpack 别名的形式来做路径（vue.config.js）

createApp(App).use(store).use(router).mount('#app')
