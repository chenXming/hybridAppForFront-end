<template>
    <div class="count-down">
        <span class="count-down-end-time">{{endHours}}点场</span>
        <span class="count-down-surplus">{{filterTimer(surplus)}}</span>
    </div>
</template>

<script>

import filter from '@js/filters.js'
/**
 * 1. 当前时间跟 活动时间对比，
 * 未到开始时间：展示倒计时，
 * 到了时间：活动进行中，
 * 超过时间 ：活动结束
 */
    export default {
        name:'count-down',
        data() {
            return {
                surplus: '',//状态
                diffSecond: 0,//倒计时秒数
                interval: undefined,
            }
        },
        props: {
            endHours: {
                type: Number,
                required: true,
                default: 0
            }
        },
        methods: {
            // 计算展示内容
            computedSurplusTime(){

                if(this.interval){
                    clearInterval(this.interval);
                }
                const data = new Date();// 获取当前时间
                // 获取当前时间的 小时数
                if(data.getHours() > this.endHours){
                    this.surplus = '活动已结束'
                    return;
                }

                if(data.getHours() == this.endHours){
                    this.surplus = '活动进行中'
                    return;
                }

                 // 获取当前时间的 小时数
                if(data.getHours() < this.endHours){
                    this.surplus = '活动即将开始'
                    //展示倒计时
                    // 获取当前时间 与 活动开始时间的秒数差距
                    // 秒数转换为 对应的 时分秒格式，用计时器进行倒计时
                    // 要减去1   开始 16， 当前 12 差值：3小时59分59秒
                    let diffHours = this.endHours -data.getHours() - 1;
                    // 分钟数
                    let diffMinutes = 60 -data.getMinutes() - 1;
                    // 秒数
                    let diffSeconds = 60-data.getSeconds();
                    //转换为对应秒数
                    this.diffSecond = diffHours* 3600 + diffMinutes * 60 + diffSeconds;
                    // 秒数 -1 
                   this.interval =  setInterval(() => {
                        this.diffSecond -= 1;
                    }, 1000);
                }
            },
            filterTimer(value){
                return filter.filterTimer(value);
            }
        },
        watch : {
            // 监听属性，diffSecond 发生变化 会调用这个方法
            diffSecond(newValue) {
                // 秒数 / 36000 ，向下取整，转化为小时
                const hours = Math.floor(newValue/3600);
                // 秒数/ 60 向下取整向下取整，转化为小时
                // 在对 60取余数，为超过小时的分钟数 61 % 60 = 1
                const minuts = Math.floor(newValue/60) % 60;
                // 当前秒数 对 60 % 得到分钟数
                const seconds = newValue % 60;
                // 拼接
                this.surplus = hours+ ':' + minuts + ':' + seconds;

                // 变为0 时候，修改数据
                if(newValue === 0){
                    this.computedSurplusTime();
                }
            },
            // 监听活动开始时间
            endHours(newValue){
                this.computedSurplusTime();
            }
        },
       created(){
           this.computedSurplusTime();
       }
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss'; // 引入样式

.count-down {
    display: inline-block;
    font-size: $infoSize;
    margin-left: $marginSize;

    span {
        display: inline-block;
        padding: px2rem(2) px2rem(4);
    }

    &-end-time {
        background-color: $mainColor;
        border-radius: px2rem(4);
        border: px2rem(1) solid $mainColor;
        color: white;
    }

    &-surplus {
        background-color: white;
        border-radius: px2rem(4);
        border: px2rem(1) solid $mainColor;
        color: $mainColor;
    }
}



</style>