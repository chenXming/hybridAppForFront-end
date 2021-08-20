<template>
    <div class="seconds">
        <!-- 上面 -->
        <div class="seconds-warp">
            <p class="seconds-warp-title">京东秒杀</p>
            <!-- 倒计时组件 -->
            <count-down :endHours="18"></count-down>
        </div>
        <!-- 下面内容 -->
        <div class="seconds-content">
            <div class="seconds-content-item" v-for="(item ,index) in dataSources" :key="index">
                <img :src="item.icon" alt="" class="seconds-content-item-img">
                <p class="seconds-content-item-price">￥{{filterPrice(item.price)}}</p>
                <p class="seconds-content-item-old-price">{{filterPrice(item.oldPrice)}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import filter from '@js/filters.js';
import CountDown from '@c/seconds/CountDown.vue';

    export default {
        name: "seconds",
        data() {
            return {

            }
        },
        components: {
            CountDown,
        },
         props: {
            dataSources: {
                type: Array,
                required: true,
                default: function(){
                    return [];
                }
            }
        },
        methods: {
            filterPrice (value){
               return filter.filtersPriceValue(value);
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss'; // 引入样式

.seconds {
    background-color: white;
    border-radius: $radiusSize;
    margin: $marginSize;

    &-warp {
        display: flex;
        padding: $marginSize;

        &-title {
            font-size: px2rem(16);
            display: inline-block;
        }
    }

    &-content{
        padding: $marginSize 0;
        display: flex;
        overflow: hidden;
        overflow-x: scroll;// x-轴 进行滚动

        &-item{
            padding: 0 px2rem(12);
            text-align: center;

            &-img {
                width: px2rem(66);
                height: px2rem(66);
            }

            &-price {
                color: $mainColor;
                font-size: px2rem(14);
                margin-top: px2rem(4);

            }

            &-old-price {
                color:$hintColor;
                font-size: $infoSize;
                margin-top: px2rem(6);
                text-decoration: line-through;// 横穿线

            }
        }

    }
}
</style>