<template>
    <div class="goods-list-page">
        <navigation-bar @onLeftClick="onLeftClick" :pageName="'商品列表'">
        </navigation-bar>
        <div class="goods-list-page-content">
            <goods-options></goods-options>
        </div>
    </div>
</template>

<script>

import NavigationBar from '../components/currency/NavigationBar.vue'
import GoodsOptions from '../components/goods/goodsOptions.vue';

    export default {
        name:'',
        components: {
            NavigationBar,
            GoodsOptions,
            
        },
        methods: {
            // 后退按钮
            onLeftClick(){
                this.$router.go(-1);//返回上一页，后退
            }
        }
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss';
.goods-list-page  {
    width: 100%;
    height: 100%;
    background-color: $bgColor;
    display: flex;
    flex-direction: column;

    &-content{
        height: 100%;
        display: flex;
        flex-direction: column;

    }
}

</style>