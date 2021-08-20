//  Vue3 不在支持过滤器 凑，使用计算属性代替
// https://vue3js.cn/docs/zh/guide/migration/filters.html#_2-x-%E8%AF%AD%E6%B3%95
import { createApp } from 'vue';
import App from '../../App.vue';

export default {
    filtersPriceValue(value){
        if(value == ''|| !value){
            return '';
        }
        // 把文本转换为 float
        let result = parseFloat(value);
        // 如果文本为 Integer ,当前文本没有小数
        if(Number.isInteger(result)){
            return result;
        }else {
            return result.toFixed(2);
        }
    },

    // 时间格式过滤器
    filterTimer(value){
        if(!value){
            return '';
        }
        // 判断当前是否是时间格式
        if(value.indexOf(":") === -1){
            return value;
        }

        let result = '';
        // 转换为 Array arr[0]  小时， arr[1] 分钟数...
        const arr = value.split(":");
        // parseInt 字符串 ---》数字
        if(parseInt(arr[0]) < 10){
            result = '0' + arr[0];
        }else {
            result = arr[0];
        }
         // parseInt 字符串 ---》数字
        if(parseInt(arr[1]) < 10){
            result =  result + ':0' + arr[1];
        }else {
            result = result + ":" + arr[1];
        }

        // parseInt 字符串 ---》数字
        if(parseInt(arr[2]) < 10){
            result =  result + ':0' + arr[2];
        }else {
            result = result + ":" + arr[2];
        }
        return result;

    }
}











