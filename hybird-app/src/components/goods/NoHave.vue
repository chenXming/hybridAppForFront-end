<template>
<!-- 缺货标签 -->
    <span class="goods-item-name-nohave">缺货</span>
</template>

<script>
    export default {
        name:"goods-item-name-nohave"
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.goods-item-name-nohave{
    padding: 0 px2rem(4);
    font-size: $minInfoSize;
    color: white;
    background-color: #999;
    border-radius: px2rem(2);
    margin-left: px2rem(2);
}
</style>