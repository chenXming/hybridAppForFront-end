<template>
    <div class="home">
        <my-swiper :swiperImgs="swiperData" :height="swiperHieght"></my-swiper>
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
                swiperData: [
                    require('@img/swiper-1.jpg'),
                    require('@img/swiper-2.jpg'),
                    require('@img/swiper-3.jpg'),
                    require('@img/swiper-4.jpg'),
                    require('@img/swiper-5.jpg'),
                ],
                swiperHieght: '184px',
            }
        },
        //程序入口
        created(){ 
            console.log('created');
            this.initData();
        },
        methods: {
            // 获取请求数据
            initData(){
                 //引用全局变量
                this.axios.get('/swiper')
                .then(data => {
                    console.log(data);
                    //this.swiperData = data.list;
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
    font-size: px2rem(32);
}
</style>