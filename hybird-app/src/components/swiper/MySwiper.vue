<template>
    <div class="mySwiper">
<!-- 需要一个swiper，里面是swiperSlider,分页器配置用插槽设置 -->
 <!-- :navigation="{nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'}" //前进后退按钮配置
              :pagination="{ clickable: true }" //分页器配置 指示器自定义指示器的类
              :autoplay="{autoplay: true}" //自动滚动
              observer:true,//修改swiper自己或子元素时，自动初始化swiper
               observeParents:true,//修改swiper的父元素时，自动初始化swiper ,必须添加 否则 网络加载会无法初始化 
              loop //循环模式 -->
       <swiper class="swiper-container"
              :navigation="{nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev'}" 
              :pagination="{ clickable: true, bulletClass:'custom-bullet-class'}"
              :autoplay="{autoplay: true}"
              :observer="{observer: true}"
              :observeParents="{observeParents:true}"
              loop >
           <swiper-slide v-for="(item,index) in swiperImgs" :key="index">
               <!-- 图片的高度 就是 swiper的高度 -->
               <img class="swiper-slide-img" :style="{height:height}" :src="item" alt="" >
           </swiper-slide>
           <!-- 自定义插槽 pagination:插槽名称 -->
           <template v-slot:pagination>
               <div class="swiper-pagination">
               </div>
           </template>
       </swiper>
    </div>
</template>

<script>
// 局部引入方式
// import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y,Autoplay} from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);


    export default {
        name:'mySwiper',
        props: {
            height: {// 父组件指定swiper的高度
                type: String,
                default: 'auto'
            },
            // 数据源
            swiperImgs : {
                type: Array,
                required: true,//必须要传递的
                default: function() {
                    return []
                }
            }
        },
        components: {
            Swiper,
            SwiperSlide
        },
        data() {
            return {
                // swiper 的配置
                swiperOptions: {
                    autoplay: true,
                    // 高度自适应，自动滚动
                    autoHeight: true
                }
            }
        },
    }
</script>

<style lang="scss" >
//scoped 注意这里如果是要自定义样式 还是需要去掉 scoped
@import '@css/style.scss'; // 引入样式
 // 图片的宽度
    .swiper-slide-img {
        width: 100%;
    }

.swiper-pagination{//自定义指示器的样式
   bottom: px2rem(12);
   .custom-bullet-class{  // 需要在上面👆🏻添加这个类名，自定义指示器
       box-sizing: border-box;
       border-radius: 100%;
       height: px2rem(6);
       width: px2rem(6);
       border: px2rem(1) solid #fff;
       margin: 0 px2rem(4);// 中间圆圈大小
       display: inline-block;
       opacity: 1;
   }  
   .swiper-pagination-bullet-active{ //选中后的类名 样式
      background-color: white;
   }
}

// .swiper-container {
//         --swiper-theme-color: #ff6600;
//         --swiper-pagination-color: #00ff33; /* 两种都可以 */
//         --swiper-navigation-color: #00ff33; /* 单独设置按钮颜色 */
//         --swiper-navigation-size: 20px;/* 设置按钮大小 */
// }
</style>