<template>
    <div class="home">
        <navigation-bar  :isShowBack="false">
            <!-- 左侧插槽 具名插槽的使用-->
            <template v-slot:nav-left>
                <img src="@img/more-white.svg" alt="">
            </template>

             <!-- 中间位置插槽 具名插槽的使用-->
            <template v-slot:nav-center>
                <!-- <p style="font-size: 30px">中间插槽</p> -->
                <search :bgColor="'#ffffff'" 
                :hintColor="'#999999'"
                :icon="require('@img/search.svg')"
                ></search>
            </template>

             <!-- 右侧位置插槽 具名插槽的使用-->
            <template v-slot:nav-right>
                <img src="@img/message-white.svg" alt="">
            </template>
        </navigation-bar>

        <div class="home-content">  
            <!-- swiperData.map(item => item.icon) 直接返回它的图片icon -->
            <my-swiper :swiperImgs="swiperData.map(item => item.icon)" :height="swiperHeight"></my-swiper>
            <!-- 活动组件 -->
            <activity>
                <div class="activity-520">
                    <img v-for="(item,index) in activityDatas" :key="index" :src="item.icon" alt="">
                </div>
            </activity>
            <!-- 功能模块 -->
            <mode-options></mode-options>
            <!-- 秒杀组件 -->
            <seconds :dataSources="secondsDatas"></seconds>
            <!-- 拼购节 -->
            <activity>
                <div class="activity-pin-gou-jie">
                    <img src="@img/pinGouJie.gif" alt="">
                </div>
            </activity>
            <!-- 商品列表 -->
            <goods></goods>
        </div>
    </div>
</template>

<script>
import MySwiper from '@c/swiper/MySwiper.vue';
import Activity from '@c/currency/Activity.vue';
import ModeOPtions from '@c/currency/ModeOptions.vue';
import Seconds from '@c/seconds/seconds.vue';
import Goods from '@c/goods/Goods.vue';
import { computed, getCurrentInstance, onMounted ,ref} from 'vue'
import NavigationBar from './currency/NavigationBar.vue';
import Search from './currency/Search.vue';

    export default {
        name:'home',
        components: {
            'my-swiper': MySwiper,
            'activity': Activity,
            'mode-options':ModeOPtions,
            'seconds':Seconds,
            Goods,
                NavigationBar,
                Search,
        },
        data() {
            return {
                swiperData: [],
                swiperHeight: '184px',
                activityDatas: [],
                secondsDatas: [],
            }
        },
        setup() {
             const internalInstance = getCurrentInstance()
             const filters = internalInstance.appContext.config.globalProperties.$filters;
             console.log('internalInstance.appContext.config.globalProperties',internalInstance.appContext.config.globalProperties);
             console.log('filters----->',filters);
             onMounted(()=>{
                 console.log("setUp 内 onMounted 调用了");
             });
             let current = ref(0);
             const testCompunted = computed( () => {
                 console.log('调用了 current 计算属性',current.value);
                 let newValue = current.value*2;
                 return ref(newValue);
             });

             return {
                 current,
                 testCompunted,
             }
        },
        mounted (){
           console.log('挂载了');
           console.log(this.$filters);
          // this.makeRequestData();
          this.initData();  
          this.current++;
          console.log("testCompunted.value",this.testCompunted.value);
          console.log("testCompunted",this.testCompunted);
        //   console.log("activity",this.$refs.activity.style);
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
                   this.axios.get('/activitys'),
                   this.axios.get('/seconds'),
               ]).then(this.axios.spread((swiperData,activityDatas,secondsData)=>{// 使用 spread进行区分
                   this.swiperData = swiperData.list;
                   this.activityDatas = activityDatas.list;
                   this.secondsDatas = secondsData.list;
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
    // 垂直方向 滚动
    overflow: hidden;
    overflow-y: scroll;


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

        .activity-pin-gou-jie {
            background-color: white;
            margin-top: $marginSize;

            img {
                width: 100%;
            }
        }
    }
   
}
</style>