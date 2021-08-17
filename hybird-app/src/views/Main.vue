<template>
<!-- 在 vue这种单页面程序中 ，只存在一个页面（App.vue），其他的都是组件 -->
    <div>
        <tool-bar></tool-bar>
    </div>
</template>

<script>
import ToolBar from '@c/ToolBar.vue';

    export default {
        name: 'main',
        components: {
            ToolBar,
        },
        data() {
            return {

            }
        },
    }
</script>

<style lang="scss" scoped>

</style>