<template>
  <div class="home">
    <p class="test">测试 fontSize的大小</p>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {

  }
}
</script>

 <style lang="scss" scoped>
// scoped 的作用是 当前样式只对当前组件起作用
@import '@css/style.scss';
.test {
  font-size: px2rem(16);
}
 </style>
