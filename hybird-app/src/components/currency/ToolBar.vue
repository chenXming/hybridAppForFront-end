<template>
    <div class="tool-bar">
        <div class="tool-bar-item" @click="onChangeFragment(item,index)"
         v-for="(item,index) in toolBarData" :key="index">
            <img class="tool-bar-item-img" :src="[index === selecItemIndex? item.hIocn: item.nIocn]" alt="" />
            <!-- 添加字体高亮类，后面是展示条件 -->
            <p class="tool-bar-item-name" :class="{'tool-bar-item-name-h' : index === selecItemIndex}">{{item.name}}</p>
        </div>
    </div>
</template>

<script>
// 他自己在页面的位置 应该又外部调用的业务来确定
    export default {
        data() {
            return {// vue\react\angular MVVM 又数据驱动视图
                toolBarData: [
                    {//默认图片
                        nIocn:require('@img/home-n.svg'),
                        hIocn:require('@img/home-h.svg'),
                        name: "首页",
                        //展示组件名称
                        commponentsName:'home'
                    },
                    {
                        //默认图片
                        nIocn:require('@img/shopping-n.svg'),
                        hIocn:require('@img/shopping-h.svg'),
                        name: "购物车",
                        //展示组件名称
                        commponentsName:'shopping'
                    },
                    {
                        //默认图片
                        nIocn:require('@img/my-n.svg'),
                        hIocn:require('@img/my-h.svg'),
                        name: "我的",
                        //展示组件名称
                        commponentsName:'my'
                    },
                   
                ],
                selecItemIndex: 0,
            }
        },
        methods: {
            onChangeFragment(item,index){
                this.selecItemIndex = index;
                this.$emit("onchangeFragment",item.commponentsName);//向父组件传递参数
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss'; // 引入样式
    .tool-bar {
        width: 100%;
        height: px2rem(46);
        display: flex;
        justify-content: space-around;
        background-color: white;
        box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
        border-top: 1px solid $lineColor;//这里定义的变量在 scss文件中

        &-item {// & 表示：.tool-bar
            text-align: center;
            padding: px2rem(4) px2rem(12);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &-img {// &:表示.tool-bar-item
                width: px2rem(22);
                height: px2rem(22);
            }

            &-name {
                font-size: $infoSize;
                margin-top: px2rem(4);

                &-h {
                    color: $mainColor;
                }
            }
        }

    }

</style>