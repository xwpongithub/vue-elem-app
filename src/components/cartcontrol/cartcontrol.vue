<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseOutCart($event)">
        <i class="inner icon-remove-circle-outline"></i>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" :class="{disabled:totalCount>=15}" @click.stop.prevent="addToCart($event)">
      <i class="inner icon-add-circle"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    import Vue from 'vue';
    import {hasTouch} from '../../common/js/utils';

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
      methods: {
        addToCart(e) {
          if (!hasTouch && e._constructed) {
            return;
          }
          if (!this.food.count) {
            // 一个字段不存在时，要先调用set方法以便让vue能跟踪到对象的变化
            Vue.set(this.food, 'count', 1);
          } else if (this.totalCount >= 15) {
            this.$toast('每次只能购买15份', {
              horizontalPosition: 'center',
              verticalPosition: 'bottom'
            });
            return;
          } else {
            this.food.count++;
          }
          let target = e.target;
          let tagName = target.tagName.toLowerCase();
          if (tagName === 'i') {
            target = target.parentNode;
          }
          this.$emit('addToCart', target);
        },
        decreaseOutCart(e) {
          if (!hasTouch && e._constructed) {
            return;
          }
          if (this.food.count) {
            this.food.count--;
          }
        }
      },
      computed: {
        totalCount() {
          let count = 0;
          this.selectFoods.forEach((food) => {
            count += food.count;
          });
          return count;
        }
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  // enter -> enter-active -> leave-active -> leave
  .cart-control
    font-size:0
    .cart-decrease,.cart-count,.cart-add
      display:inline-block
    .cart-decrease,.cart-add
      padding:6px // 增大点击区域
      .inner
        line-height:24px
        font-size:24px
        color:rgb(0,160,220)
    .cart-decrease
      opacity:1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-to
        opacity:0
        transform: translate3d(24px, 0, 0)
        .inner
          transform:rotate(180deg)
    .cart-add
      .disabled
        color:#80858a
    .cart-count
      vertical-align:top
      width:12px
      padding-top:6px
      line-height: 24px
      text-align:center
      font-size:10px
      color:rgb(147,153,159)
</style>
