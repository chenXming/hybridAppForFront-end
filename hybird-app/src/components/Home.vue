<template>
<!-- scroll 监听页面的滑动，调用方法 onScrollChange -->
    <div class="home" @scroll="onScrollChange">
        <navigation-bar  :isShowBack="false" :navBarStyle="navBarStyle">
            <!-- 左侧插槽 具名插槽的使用-->
            <template v-slot:nav-left>
                <img :src="navBarCurrentSlotStyle.leftIcon" alt="" class="nav-icon">
            </template>

             <!-- 中间位置插槽 具名插槽的使用-->
            <template v-slot:nav-center>
                <!-- <p style="font-size: 30px">中间插槽</p> -->
                <search :bgColor="navBarCurrentSlotStyle.search.bgColor" 
                :hintColor="navBarCurrentSlotStyle.search.hintColor"
                :icon="navBarCurrentSlotStyle.search.icon"
                ></search>
            </template>

             <!-- 右侧位置插槽 具名插槽的使用-->
            <template v-slot:nav-right>
                <img :src="navBarCurrentSlotStyle.rightIcon" alt="" class="nav-icon">
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
                // navBar 插槽样式数据，页面未开始滑动，以及滑动到锚点后的插槽样式数据
                navBarSlotStyle : {
                    // 默认样式
                    normal: {
                        leftIcon: require('@img/more-white.svg'),
                        // 中间插槽
                        search: {
                            bgColor: "#ffffff",
                            hintColor:'#999999',
                            icon: require('@img/search.svg')
                        },
                        rightIcon: require('@img/message-white.svg')
                    },
                    // 高亮样式
                    heighlight: {
                        leftIcon: require('@img/more.svg'),
                        // 中间插槽
                        search: {
                            bgColor: "#d7d7d7",
                            hintColor:'#ffffff',
                            icon: require('@img/search-white.svg')
                        },
                        rightIcon: require('@img/message.svg')
                    },
                },
                //navBar当前使用的插槽样式
                navBarCurrentSlotStyle: {},
                //navBar 整体定制样式
                navBarStyle: {
                    position: 'fixed',
                    backgroundColor: ''
                },

                // 记录页面的滚动值
                scrollTopValue:-1,
                // 锚点值, 滚动超过多少时候变化
                ANCHOR_SCROLL_TOP: 160

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
            this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;// 初始化nav插槽默认样式
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
            },
            // 监听页面滑动，监听当前页面滚动距离
            //  计算navBar 背景颜色的透明度
            // 当前距离/ 锚点值 = 透明度 opacity
            // 当 opacity >= 1 当前navBar 插槽样式变成 高亮
            // opacity < 1，当前navBar 插槽为默认样式
             onScrollChange($event) {
                 //获取滚动距离
                this.scrollTopValue = $event.target.scrollTop;
                // 计算navBar 背景颜色 透明度
                let opacity = this.scrollTopValue / this.ANCHOR_SCROLL_TOP;
                // 插槽样式
                if(opacity >= 1){
                    this.navBarCurrentSlotStyle = this.navBarSlotStyle.heighlight;
                }else{
                    this.navBarCurrentSlotStyle = this.navBarSlotStyle.normal;
                }
                // 根据透明比例 设置Nabbar 颜色
                this.navBarStyle.backgroundColor = 'rgba(255,255,255,'+opacity+')';

             },
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
   
   .nav-icon {
       width: px2rem(26);
       height: 100%;
   }
}
</style>