<template>
    <div class="shopping">
        <navigation-bar :pageName="'购物车'" :isShowBack="false"></navigation-bar>
    </div>
</template>

<script>
import NavigationBar from './currency/NavigationBar.vue'


    export default {
  components: { NavigationBar },
        name:'shopping',
        data() {
            return {
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss'; // 引入样式

.shopping{
    width: 100%;
    height: 100%;

}
</style>