<template>
<!-- 在 vue这种单页面程序中 ，只存在一个页面（App.vue），其他的都是组件 -->
    <div class="main"> 
        <!-- Vue 中的动态组件，is 表示当前展示的组件 -->
         <!-- 动态组件 -->
        <component :is="currentComponent"></component>
        <tool-bar @onchangeFragment="onchangeFragment"></tool-bar>
    </div>
</template>

<script>
//异步组件的引入方式
import { defineAsyncComponent } from 'vue';
import ToolBar from '@c/currency/ToolBar.vue';

    export default {
        name: 'main',
        components: {
            ToolBar,
            // 异步组件的引入方式，使用异步组件：只有在需要去展示这个组件的时候，才会去渲染组件 。这个是vue3引入异步组件的方式
            'home': defineAsyncComponent(() => import('@c/Home.vue')),   //() => import('@c/Home.vue'), vue2 引入异步组件的方式
            'shopping': defineAsyncComponent(() => import('@c/Shopping.vue')),
            'my': defineAsyncComponent(() => import('@c/My.vue')),
            // 'home': Home,
            // 'shopping': Shopping,
            // 'my': My
        },
        data() {
            return {
                currentComponent:'home',
            }
        },
        methods: {
            onchangeFragment(componentName){
                // 传入的 componentName 必须跟  components: 组件名称相同
                this.currentComponent = componentName;
            }
        }
    }
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>