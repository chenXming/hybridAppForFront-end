<template>
    <div class="my">
        <navigation-bar :pageName="'我的'" :isShowBack="false"></navigation-bar>        
    </div>
</template>

<script>
import NavigationBar from './currency/NavigationBar.vue'

    export default {
        name:'my',
        data() {
           return {

            }
        },
        components: { NavigationBar },
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss'; // 引入样式

.my{
    width: 100%;
    height: 100%;

}
</style>