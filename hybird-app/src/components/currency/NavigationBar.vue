<template>
<!-- 导航栏组件 -->
<!-- 注释：1. 有默认的展示效果，左边图标、中间名称、右边是空白内容
2. 能通关过插槽来配置具体的展示样式，左中右，三个插槽，父组件可以通过插槽来定制样式
3. 可以接受一个父组件的样式 以在父组件中指定它的样式 -->
<!-- z-index-max:类名 最上层进行展示 -->
<!-- navBarStyle 父组件传入样式  -->
    <div class="nav-bar z-index-max" :style="navBarStyle"
    :class="{'bottom-line' : pageName}">
        <div class="left" @click="$emit('onLeftClick')">
            <!-- 默认状态下 -->
            <img src="@img/back.svg" alt="" v-if="isShowBack">
            <!-- 具名插槽 -->
            <slot name="nav-left"></slot>
        </div>
        <div class="center">
            <!-- 默认状态下 -->
            <span class="page-title" v-if="pageName">{{pageName}}</span>
              <!-- 具名插槽 -->
            <slot name="nav-center"></slot>
        </div>
        <div class="right">
            <!-- 默认状态下 空白内容-->
             <!-- 具名插槽 -->
            <slot name="nav-right"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name:"navBar",
        props: {
            // 页面名称
            pageName: {
                type: String,
                default: ""
            },
            //是否展示后退
            isShowBack: {
                type: Boolean,
                default:true,
            },
            // navBar的默认样式 是一个对象 Object,从父组件传入
            navBarStyle : {
                type: Object,
                default: function () {
                    return  {
                        backgroundColor : 'white'// 默认背景颜色
                    }
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.nav-bar{
    width: 100%;
    height: px2rem(44);
    line-height: px2rem(44);
    display: flex;
    justify-content: space-between;

    .left , .right{
        display: flex;
        height: 100%;
        width: px2rem(26);
        padding: 0 px2rem(8);

        img {
            width: 100%;
            align-self: center;//居中
        }
    }

    .center {
        height:  100%;
        display: flex;
        flex-grow: 1;
        .page-title {
            color: black;
            font-size: $titleSize;
            align-self: center;//居中
            margin: 0 auto;//居中显示
        }
    }
}
.bottom-line {
    border-bottom: 1px solid $lineColor;
}
</style>