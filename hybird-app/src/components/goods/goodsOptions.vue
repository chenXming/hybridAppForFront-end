<template>
<!-- z-index-2 是表示在商品列表上面优先展示 在style.scss 中展示 -->
    <div class="goods-options z-index-2">
        <!-- 一级筛选项 -->
        <ul class="goods-options-list">
            <li class="goods-options-list-item" v-for="(item,index) in optionsDatas" :key="index">
                <a class="goods-options-list-item-content" @click="onOptionsItemClick(item,index)">
                    <span class="goods-options-list-item-content-name" 
                    :class="{'goods-options-list-item-content-name-active':slectOption.Id === item.Id}"
                    >{{item.name}}</span>
                    <!--  -->
                     <span class="goods-options-list-item-content-caret caret" v-if="item.subs.length > 0"></span>
                </a>
            </li>
        </ul>
        <!-- 子选项内容 -->
        <div class="options-sub-content" v-show="isShowSubContent">
            <ul class="options-sub-content-list">
                <li class="options-sub-content-list-item" v-for="(item,index) in slectOption.subs" :key="index">
                    <a class="options-sub-content-list-item-content" @click="onSubItemClick(item,index)">
                         <!--  -->
                        <span class="options-sub-content-list-item-content-name"
                       :class="{'ptions-sub-content-list-item-content-name-active':slectOption.Id === item.Id}"
                        >{{item.name}}</span>
                        <img class="options-sub-content-list-item-content-select" src="@img/options-select.svg"
                        v-show="slectOption.Id === item.Id">
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name:"goods-option",
        data() {
            return {
                //筛选项 数据源
                optionsDatas: [
                    {
                        Id:"1",// 默认展示的子选项的Id 与名字
                        name:"默认",
                        subs:[
                            { 
                                Id:'1',
                                name:'默认'
                            },
                            {
                                Id:"1-2",
                                name:"价格由高到低"
                            },
                            {
                                Id:"1-3",
                                name:"销量由高到低"
                            }
                        ]
                    },
                    {
                        Id:'2',
                        name:'有货优先',
                        subs: [],
                    },
                    {
                        Id:'3',
                        name:'直营优先',
                        subs: [],
                    },
                ],
                //选中的筛选项
                slectOption: {},
                // 标记子选项的展开状态
                isShowSubContent: false,
            }
        },
        methods : {
            // 一级选项点击事件
            // 1.子选项 展开状态则关闭
            // 2.筛选项项 包含子选项，并且当前Item 处于选中状态下（item.id === selecOption.id），展开子选项视图
            // 3.设置选中项 为用户点击的Item
            onOptionsItemClick (item,index) {
                if(this.isShowSubContent)
                {
                    this.isShowSubContent = false;
                    return;
                }

                if(item.subs.length > 0&& this.slectOption.Id === item.Id){
                    this.isShowSubContent = true;
                }
                this.slectOption = item;
            },
            // 子选项点击事件
            onSubItemClick(item,index){
                this.slectOption = item;
                this.optionsDatas.forEach(options => {
                    options.subs.forEach(subOptions => {
                        if(subOptions.Id == this.slectOption.Id){
                            options.Id = subOptions.Id;
                            options.name = subOptions.name;
                        }
                    })
                })

                this.isShowSubContent = false;
            }
        },
        //初始化后设置选中项
        created(){
            this.slectOption = this.optionsDatas[0]
        }
    }
</script>

<style lang="scss" scoped>
@import '@css/style.scss';

.goods-options {
    width: 100%;
    border-bottom: 1px solid $lineColor;
 // 一级选项的CSS
    &-list {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: px2rem(46);
        background-color: white;

        &-item {
            flex-grow: 1;//让item 均分list的空间
            &-content { // 内容
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;

                &-name { // 名称
                   font-size: $infoSize;
                   margin-right: $marginSize;

                   &-active {
                       color: $mainColor;

                   }
                }
            }
        }
    }
    // 子选项的CSS
    .options-sub-content {
        position: absolute; //脱离文档流
        width: 100%;
        // 给一个最大高度，超过最大高度就可以滚动
        max-height: px2rem(180);
        overflow: hidden;
        overflow-y: auto;
        background-color: white;

        &-list {

            &-item {

                &-content {
                    display: flex;
                    align-items: center;
                    border-top: 1px solid $lineColor;
                    padding: $marginSize;
                    height: px2rem(44);
                    box-sizing: border-box;

                    &-name {
                        font-size: $infoSize;
                        display: inline-block;
                        flex-grow: 1;

                        &-active {
                            color: $mainColor;
                        }
                    }

                    &-select {//选中图片
                       width: px2rem(18);
                       height: px2rem(18);
                    }
                }
            }
        }
    }

}

</style>