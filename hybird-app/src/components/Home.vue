<template>
    <div class="home">
        <my-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
    </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue';

    export default {
        name:'home',
        components: {
            'my-swiper': MySwiper,
        },
        data() {
            return {
                swiperData: [],
                swiperHeight: '184px',
            }
        },
        mounted (){
           console.log('挂载了');
          // this.makeRequestData();
          this.initData();  
        },
        created (){
            console.log('created');
        },
        unmounted (){
            console.log('unmounted');
        },
        activated (){ // 后续使用 store 控制页面的缓存，或者想其他办法
            console.log('activated,缓存页面后重新进入了');
        },
        deactivated (){
          console.log('deactivated,缓存页面退出了');
        },
        methods: {
            // 获取请求数据
            initData(){
                 //引用全局变量
                this.axios.get('/swiper')
                .then(data => {
                    console.log(data);
                    this.swiperData = data.list;
                }).catch(error => {
                    console.log(error);
                    alert(error.message);
                })
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss'; // 引入样式

.home{
    width: 100%;
    height: 100%;
}
</style>