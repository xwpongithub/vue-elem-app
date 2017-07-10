<template>
  <div class="shopping-cart">
    <div class="content" @click="toggleList">

      <div class="content-left">
         <div class="logo-wrapper">

           <div class="logo" :class="{highlight:totalCount>0}">
              <i class="icon-shopping-cart" :class="{highlight:totalCount>0}"></i>
           </div>

           <div class="num" v-show="totalCount>0">
             {{totalCount}}
           </div>

         </div>

         <div class="price" :class="{highlight:totalCount>0}">¥{{totalPrice}}</div>

         <div class="desc">另需配送费¥{{deliveryPrice}}元</div>

      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>

    </div>

    <!--小球-->
    <div class="ball-container">
      <ul>
        <li v-for="(ball,index) in balls" :key="index">
          <transition :css="false" name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
            <div class="ball" v-show="ball.show">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </li>
      </ul>
    </div>
    <!--小球 End-->

    <!--购物车弹出面板-->
    <transition name="fold">
    <div class="shopping-cart-list" v-show="listShow">
       <div class="list-header">
         <h1 class="title">购物车</h1>
         <span class="empty" @click="empty">清空</span>
       </div>
       <div class="list-content" ref="listContent">
         <ul>
           <li class="food border-1px" v-for="(food,index) in selectFoods">
             <span class="name">{{food.name}}</span>
             <div class="price"><span>¥{{food.price*food.count}}</span></div>
             <div class="cart-control-wrapper">
                <cart-control :select-foods="selectFoods" :food="food"/>
             </div>
           </li>
         </ul>
       </div>
    </div>
    </transition>
    <!--购物车弹出面板 End-->

  </div>
</template>
<script type="text/ecmascript-6">
    import CartControl from '../cartcontrol/cartcontrol';
    import BScroll from 'better-scroll';

    export default {
      props: {
        selectFoods: {
          type: Array,
          default() {
            return [];
          }
        },
        deliveryPrice: {
          type: Number,
          default: 0
        },
        minPrice: {
          type: Number,
          default: 0
        }
      },
      data() {
        return {
          balls: [
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            },
            {
              show: false
            }
          ],
          dropBalls: [],
          fold: true
        };
      },
      computed: {
        totalPrice() {
          let total = 0;
          this.selectFoods.forEach((food) => {
            total += food.price * food.count;
          });
          return total;
        },
        totalCount() {
          let count = 0;
          this.selectFoods.forEach((food) => {
            count += food.count;
          });
          return count;
        },
        payDesc() {
          if (this.totalPrice === 0) {
            return `¥${this.minPrice}元起送`;
          } else if (this.totalPrice < this.minPrice) {
            let diffPrice = this.minPrice - this.totalPrice;
            return `还差¥${diffPrice}元起送`;
          } else {
            return '去结算';
          }
        },
        payClass() {
          if (this.totalPrice < this.minPrice || this.totalPrice === 0) {
            return 'not-enough';
          } else {
            return 'enough';
          }
        },
        listShow() {
          if (!this.totalCount) {
            this.fold = true;
            return false;
          }
          let show = !this.fold;
          if (show) {
            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.listContent, {
                  click: true
                });
              } else {
                this.scroll.refresh();
              }
            });
          }
          return show;
        }
      },
      methods: {
        empty() {
          this.selectFoods.forEach((food) => {
            food.count = 0;
          });
        },
        toggleList() {
          if (!this.totalCount) {
            return;
          }
          this.fold = !this.fold;
        },
        drop(el) {
          // 拿到第一个还未开始动画的小球令其开始进行下落动画
          for (let i = 0; i < this.balls.length; i++) {
            let ball = this.balls[i];
            if (!ball.show) {
              ball.show = true;
              ball.el = el;
              this.dropBalls.push(ball);
              return;
            }
          }
        },
        beforeDrop(el) {
          // 要把所有设置为true的小球都找出来做动画，因为可能用户会连续点击
          let count = this.balls.length;
          while (count--) {
            let ball = this.balls[count];
            if (ball.show) {
              let rect = ball.el.getBoundingClientRect();
              // 减去小球本身已经已经定义的css偏移量
              let x = rect.left - 32;
              let y = -(window.innerHeight - rect.top - 22);
              el.style.display = '';
              // 外层元素完成纵向动画，内层元素完成横向动画
              el.style.webkitTransform = `translate3d(0,${y}px,0)`;
              el.style.transform = `translate3d(0,${y}px,0)`;
              let inner = el.querySelector('.inner-hook');
              inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
              inner.style.transform = `translate3d(${x}px,0,0)`;
            }
          }
        },
        dropping(el, done) {
          /* eslint-disable no-unused-vars */
          let rf = el.offsetHeight;
          this.$nextTick(() => {
            el.style.webkitTransform = 'translate3d(0,0,0)';
            el.style.transform = 'translate3d(0,0,0)';
            let inner = el.querySelector('.inner-hook');
            inner.style.webkitTransform = 'translate3d(0,0,0)';
            inner.style.transform = 'translate3d(0,0,0)';
            el.addEventListener('transitionend', () => {
              done();
            });
          });
        },
        afterDrop(el) {
          // 每完成一个小球的动画就把这个小球的状态重置
          let ball = this.dropBalls.shift();
          if (ball) {
            el.style.display = 'none';
            ball.show = false;
          }
        }
      },
      components: {
        'cart-control': CartControl
      }
    };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .shopping-cart
    position:fixed
    left:0
    bottom:0
    width:100%
    z-index:50
    height:49px;
    .content
      display:flex
      background-color: #141d27
      font-size:0
      color:rgba(255,255,255,.4)
      .content-left
        flex:1
        .logo-wrapper,.price,.desc
          display:inline-block
        .logo-wrapper
          position: relative
          vertical-align:top
          top:-10px
          margin:0 6px
          padding:6px
          width: 56px;
          height: 56px
          box-sizing:border-box
          border-radius:50%
          background-color: #141d27
          .logo
            width:100%
            height:100%
            border-radius:50%
            background-color:#2b343c
            text-align:center
            &.highlight
              background-color: rgb(0,160,220)
            .icon-shopping-cart
              line-height:44px
              font-size:24px
              color:#80858a
              &.highlight
                color:#fff
          .num
            position: absolute
            top:0
            right:0
            width:24px
            height:16px
            line-height:16px
            text-align:center
            border-radius:16px
            font-size:9px
            font-weight:700
            color:#fff
            background-color: rgb(240,20,20)
            box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
        .price
          vertical-align:top
          //用line-height+margin-top实现垂直居中
          margin-top:13px
          line-height:24px
          box-sizing:border-box
          padding-right:12px
          border-right:1px solid rgba(255,255,255,.1)
          font-size:16px
          font-weight:700
          &.highlight
            color:#fff
        .desc
          margin:13px 0 0 12px
          vertical-align:top
          line-height:24px
          font-size:10px
      .content-right
        flex:0 0 105px
        width:105px
        .pay
          height: 49px
          line-height:49px
          text-align:center
          font-size:12px
          font-weight:700
          background-color: #2b333b
          &.not-enough
            background-color: #2b333b
          &.enough
            background-color: #00b43c
            color:#fff
    .ball-container
      .ball
        position: absolute
        left: 32px
        bottom: 22px
        z-index: 50
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopping-cart-list
      position: absolute
      top:0
      left:0
      width:100%
      z-index:-1
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-to
        transform: translate3d(0, 0, 0)
      .list-header
        height:40px
        line-height:40px
        padding:0 18px
        background-color:#f3f5f7
        border-bottom:1px solid rgba(7,17,27,.1)
        .title
          float:left
          font-size:14px
          color:rgb(7,17,27)
        .empty
          float:right
          font-size:12px
          color:rgb(0,160,220)
      .list-content
        overflow:hidden
        padding:0 18px
        max-height:217px
        background-color: #fff
        .food
          position: relative
          padding:12px 0
          box-sizing:border-box
          border-1px(rgba(7,17,27,.1))
          .name
            line-height:24px
            font-size:14px
            color:rgb(7,17,27)
          .price
            position:absolute
            right:90px
            bottom:12px
            line-height:24px
            font-size:14px
            font-weight:700
            color:rgb(240,20,20)
          .cart-control-wrapper
            position:absolute
            right:0
            bottom:7px
</style>
