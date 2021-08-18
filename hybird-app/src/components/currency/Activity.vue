<template>
<!-- 活动组件 提供空间存放活动内容，不决定内容-->
    <div class="activity">
        <!-- 插槽展示活动内容 -->
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name:'activity',
        data() {
            return {
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss'; // 引入样式
.activity {
    // 设置最大高度
    max-height: px2rem(160);
    position: relative;
    z-index: 2;// 主要是为了在上面进行展示
}
</style>