<template>
  <transition name="move">
    <div v-show="showFlag" class="detail-food" ref="foodWrapper">

    <!--如果food已经存在ratings属性才显示-->
    <div v-if="food.ratings" class="food-content">

          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="back">
              <i class="icon-arrow-lift"></i>
            </div>
          </div>

          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sold-count">月售{{food.sellCount}}</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <price :price="food.price" :oldPrice="food.oldPrice"/>

            <div class="cart-control-wrapper">
              <cart-control @addToCart="addToCart" :select-foods="selectFoods" :food="food"/>
            </div>

            <!--添加一个动画，为了防止display:none时小球动画失效-->
            <transition name="fade">
              <div @click.stop.prevent="addFirstFood" class="buy" v-show="!food.count||food.count===0">加入购物车</div>
            </transition>

          </div>

          <split v-if="food.info"/>

          <div class="info" v-if="food.info">
            <h2 class="title">商品信息</h2>
            <p class="text">
              {{food.info}}
            </p>
          </div>

          <split/>

          <div class="rating">
            <h2 class="title">商品评价</h2>
            <rating-select @refresh="refreshFoodContent" :select-type.sync="selectType" :only-content.sync="onlyContent" :desc="desc" :ratings="food.ratings"/>

            <!--评价列表-->
            <div class="rating-wrapper">
              <ul class="rating-list" v-show="food.ratings && food.ratings.length">
                <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating,index) in food.ratings" class="rating-item border-1px" :key="index">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" width="12" height="12" class="avatar">
                  </div>
                  <div class="time">
                    {{rating.rateTime|formatDate}}
                  </div>
                  <p class="text">
                    <i :class="{'icon-thumb-up':rating.rateType===0,'icon-thumb-down':rating.rateType===1}"></i>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div v-show="food.ratings && !food.ratings.length" class="no-rating">暂无评价</div>
            </div>
            <!--评价列表 End-->

          </div>

    </div>

    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    import BScroll from 'better-scroll';
    import Price from '../price/price';
    import CartControl from '../cartcontrol/cartcontrol';
    import Split from '../split/split';
    import RatingSelect from '../ratingselect/ratingselect';
    import {formatDate} from '../../common/js/utils';

    // const POSITIVE = 0;
    // const NEGATIVE = 1;
    const ALL = 2;

    export default {
      props: {
        selectFoods: {
          type: Array,
          default() {
            return [];
          }
        },
        food: {
          type: Object
        }
      },
      data() {
        return {
          showFlag: false,
          selectType: ALL,
          onlyContent: true,
          desc: {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
        };
      },
      methods: {
        showDetailPanel() {
          this.showFlag = true;
          // 保持初始化状态
          this.selectType = ALL;
          this.onlyContent = false;
          // 只有nextTick后才能保证dom是被渲染的，此时才能对dom进行操作
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.foodWrapper, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        },
        back() {
          this.showFlag = false;
        },
        needShow(type, text) {
          // 要显示内容且没有内容
          if (this.onlyContent && !text) {
            return false;
          }
          if (this.selectType === ALL) {
            return true;
          } else {
            return type === this.selectType;
          }
        },
        addFirstFood(e) {
          if (!e._constructed) {
            return;
          }
          this.$emit('addToCart', e.target);
          Vue.set(this.food, 'count', 1);
        },
        addToCart(target) {
          let tagName = target.tagName.toLowerCase();
          if (tagName === 'i') {
            target = target.parentNode;
          }
          this.$emit('addToCart', target);
        },
        refreshFoodContent() {
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        }
      },
      filters: {
        formatDate(time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      },
      components: {
        'price': Price,
        'cart-control': CartControl,
        'split': Split,
        'rating-select': RatingSelect
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .detail-food
    position: fixed
    left:0
    top:0
    bottom:49px
    z-index:30
    width:100%
    background-color: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    // 黑科技：用padding-top:100%和height:0来防止图片加载后高度抖动
    .food-content
      // 让better-scroll即使高度未超过父元素也有个默认高度拥有缓动效果
      min-height:101%
    .image-header
      position: relative
      width:100%
      height:0
      padding-top:100%
      img
        position:absolute
        left:0
        top:0
        width:100%
        height:100%
      // 叠加在img之上
      .back
        position: absolute
        top:10px
        left:0
        .icon-arrow-lift
          display:block
          // 使点击区域扩大
          padding:15px
          font-size:20px
          color:#fff
    .content
      position: relative
      padding:18px
      .title
        margin-bottom:8px
        line-height:14px
        font-size:14px
        font-weight:700
        color:rgb(7,17,27)
      .detail
        margin-bottom:18px
        line-height:10px
        height:10px
        font-size:0
        .sold-count,.rating
          font-size:10px
          color:rgb(147,153,159)
        .sold-count
          margin-right:12px
      .cart-control-wrapper,.buy
        position: absolute
      .cart-control-wrapper
        right:12px
        bottom:18px
      .buy
        right:18px
        bottom:26px
        z-index:10
        height:24px
        line-height:24px
        padding:0 12px
        box-sizing:border-box
        border-radius:12px
        font-size:10px
        color:#fff
        background-color: rgb(0,160,220)
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
    .info
      padding:18px
      .title
        line-height:14px
        margin-bottom:6px
        font-size:14px
        color:rgb(7,17,27)
      .text
        line-height:24px
        padding:0 8px
        font-size:12px
        color:rgb(77,85,93)
    .rating
      padding-top:18px
      .title
        line-height:14px
        margin-left:18px
        font-size:14px
        color:rgb(7,17,27)
      .rating-wrapper
        padding:0 18px
        .rating-item
          position: relative
          padding:16px 0
          border-1px(rgba(7,17,27,.1))
          .user
            position: absolute
            right:0
            top:16px
            font-size:0
            line-height:12px
            .name
              display:inline-block
              margin-right:6px
              vertical-align:top
              font-size:10px
              color:rgb(147,153,159)
            .avatar
              border-radius:50%
          .time
            margin-bottom:6px
            line-height:12px
            font-size:10px
            color:rgb(147,153,159)
          .text
            line-height:16px
            font-size:12px
            color:rgb(7,17,27)
            .icon-thumb-up,.icon-thumb-down
              margin-right:4px
              line-height:16px
              font-size:12px
            .icon-thumb-up
              color:rgb(0,160,220)
            .icon-thumb-down
              color:rgb(147,153,159)
        .no-rating
          padding:16px 0
          font-size:12px
          color:rgb(147,153,159)
</style>
