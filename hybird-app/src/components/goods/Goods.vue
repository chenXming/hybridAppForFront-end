<template>
 <!-- 瀑布流商品列表的实现
    根部不同高度的图片 撑起 Item 的高度
    计算Item 的位置，排列Item -->
    <!-- ref 为方便获取Dom item 的元素 -->
    <div class="goods goods-waterfall" :style="{height:goodsViewHeight}">
                <!-- 绑定 Item 的高度 位置样式 -->
        <div class="goods-item goods-waterfall-item" :ref="setGoodsItemRef"
         v-for="(item,index) in dataSources" :key="index" :style="goodsItemStyle[index]">
            <!-- 绑定样式 获取的图片高度 -->
            <img  class="goods-item-img" :src="item.img" alt="" :style="imgStyles[index]">
            <!-- 描述 -->
            <div class="goods-item-desc">
                <p class="goods-item-desc-name">
                    <!-- 是否是直营 跟 库存 -->
                    <!-- 这里的样式 在 style.scss编辑 -->
                      <span class="text-line-2">{{item.name}}</span>
                    </p>
                <div class="goods-item-desc-data">
                    <p class="goods-item-desc-data-price">￥{{item.price}}</p>
                    <p class="goods-item-desc-data-volume">销量：{{item.volume}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {onMounted,ref} from 'vue';


    export default {
        name:'goods',
        data() {
            return {
                dataSources: [],
                MAXImageHeight: 230,
                MINImageHeight: 170,
                ITEM_MARGIN_SIZE:8,
                imgStyles:[],
                goodsItemStyle: [],
                goodsViewHeight: 0,//goods 组件的高度
                goodsItems:[],//获取所有Item Dom元素

          }
        },
        props: {

        },
        methods: {
            // Vue3 获取所有 Item Dom元素
            setGoodsItemRef(el){
                this.goodsItems.push(el);
            },
           initData(){
               this.axios.get('/goods').then((response) =>{
                   console.log(response.list);
                   this.dataSources = response.list;
                   this.initImgeStyle();
                   // 调用 创建瀑布流的方法，等到所有Dom 创建完成后 调用
                   this.$nextTick(() => {
                       this.initWaterfall();//创建瀑布流
                   })
               }).catch(error => {
                   console.log('error-->',error);
               })
           },
           // 返回
           imgHeight(){
              // Math.random()// 从 0 -1 随机数 * [高度区间] + 最低图片高度
             let result = Math.floor(Math.random() * (this.MAXImageHeight - this.MINImageHeight) + this.MINImageHeight);
             return result;
           },
           // 根据高度生成 图片数据
           initImgeStyle(){
               this.dataSources.forEach(item => {
                  let imgHeight =  this.imgHeight() + 'px';
                  this.imgStyles.push({
                      height:imgHeight
                  })
               })
           },

           // 瀑布流 布局
           // 获取所有 item 元素，便利Item 元素，得到每个item的高度，+ margin 高度
           // 创建 leftHeightTotal，rightHeightTotal 表示 左右两个 模块 距离顶部的高度
           // 通过对比高度 确定 Item 的位置
           // leftHeightTotal <= rightHeightTotal Item 在左边. Item 左边为0，顶部边为 leftHeightTotal
           // 否则 item 在右边，右边为0，上面为 rightHeightTotal
           // 保存 Item 样式，配置到Item上
           // item 配置完成后，对比左右两侧高度，最大高度为 goods组件高度
           initWaterfall(){
               // 获取所有Item 元素
            //    let $goodsItems = ref.goodsItem; Vue2 获取Dom元素
            let $goodsItems = this.goodsItems;
               console.log('goodsItems---->',$goodsItems);
               if(!$goodsItems) return;
               let  leftHeightTotal = 0;
                let  rightHeightTotal = 0;

               $goodsItems.forEach(($el,index) => {
                   // 创建 item 样式
                   let goodsItemStyle = {};
                //遍历Item 元素，得到每个item的高度，+ margin 高度
                   let elHeight = $el.clientHeight + this.ITEM_MARGIN_SIZE;

                   if(leftHeightTotal <= rightHeightTotal){
                       goodsItemStyle = {
                           left:'0px',
                           top:leftHeightTotal + 'px'
                       };

                       // 更新高度
                       leftHeightTotal += elHeight;
                   }else{
                       goodsItemStyle = {
                           right:'0px',
                           top:rightHeightTotal + 'px'
                       };

                       // 更新高度
                       rightHeightTotal += elHeight;
                   }
                //    保存 Item 样式，配置到Item上
                   this.goodsItemStyle.push(goodsItemStyle);
               });
               //item 配置完成后，对比左右两侧高度，最大高度为 goods组件高度
               this.goodsViewHeight = leftHeightTotal>rightHeightTotal?leftHeightTotal:rightHeightTotal + 'px';

           }
        },
        created(){
            this.initData();
        },
        // setup(props,context){
        //     console.log('setUp-----');
        //     onMounted(()=>{
        //         let $goodsItems = ref.goodsItem;
        //         console.log('-----',$goodsItems);
        //     })

        // },
        // mounted(){
        //     console.log('mounted');
        //     let $goodsItems = ref.goodsItem;
        // }
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss'; // 引入样式
.goods {
    background-color: $bgColor;

    &-item {
        background-color: white;
        padding: $marginSize;
        box-sizing: border-box;

        &-desc {
            width: 100%;

            &-name {
                font-size: $infoSize;
                line-height: px2rem(18);
            }

            &-data {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: $marginSize;

                &-price {
                    font-size: $titleSize;
                    color: $mainColor;
                    font-weight: 500;
                }

                &-volume {
                    font-size: $infoSize;
                    color: $hintColor;
                }
            }
        }
    }
}
// 瀑布流 样式
.goods-waterfall {
    position: relative;
    margin: $marginSize;
    display: flex;
    // flex-wrap: wrap;
    // flex-direction: row;
    // align-items: center;
    // justify-content: space-around;

    &-item {
        position: absolute;
        width:49%;
        border-radius: $radiusSize;

      .goods-item-img{
          width: 100%;// 高度 在上面 style 里面进行绑定
      }
    }
}
</style>