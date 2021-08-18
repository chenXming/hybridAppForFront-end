<template>
    <div class="home">
        <div class="home-content">  
            <!-- swiperData.map(item => item.icon) 直接返回它的图片icon -->
            <my-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
            <!-- 活动组件 -->
            <activity>
                <div class="activity-520">
                    <img v-for="(item,index) in activityDatas" :key="index" :src="item.icon" alt="">
                </div>
            </activity>
            <!-- 模块 -->
            <mode-options></mode-options>
        </div>
    </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue';
import Activity from '@c/currency/Activity.vue';
import ModeOPtions from '@c/currency/ModeOptions.vue';

    export default {
        name:'home',
        components: {
            'my-swiper': MySwiper,
            'activity': Activity,
            'mode-options':ModeOPtions
        },
        data() {
            return {
                swiperData: [],
                swiperHeight: '184px',
                activityDatas: [],
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
                 /*
                this.axios.get('/swiper')
                .then(data => {
                    console.log(data);
                    this.swiperData = data.list;
                }).catch(error => {
                    console.log(error);
                    alert(error.message);
                });
                 //获取活动数据
                this.axios.get('/activitys')
                .then(data => {
                    console.log(data);
                    this.activityDatas = data.list;
                }).catch(error => {
                    console.log(error);
                    alert(error.message);
                })*/
                
               // axios 同时发送多个并行请求
               this.axios.all([
                   this.axios.get('/swiper'),
                   this.axios.get('/activitys')
               ]).then(this.axios.spread((swiperData,activityDatas)=>{// 使用 spread进行区分
                   this.swiperData = swiperData.list;
                   this.activityDatas = activityDatas.list;
               }));
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss'; // 引入样式

.home{
    width: 100%;
    height: 100%;
    background-color: $bgColor;
    &-content {
        height: 100%;
         .activity-520{
             margin-top: px2rem(-8);
             border-top-left-radius: px2rem(8);
             border-top-right-radius: px2rem(8);
             img {
                 width: 33.33%;
                 display: inline-block;
             }
        }
    }
   
}
</style>