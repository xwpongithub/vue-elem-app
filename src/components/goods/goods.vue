<template>
  <div class="goods">
    <!--左侧菜单-->
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item menu-item-hook" :key="'menu-'+index" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!--左侧菜单 End-->

    <!--右侧内容区-->
    <div class="foods-wrapper">
      <div class="fixed-title" ref="fixedTitle" v-show="fixedTitleShow">
        <h1 class="title food-title-list-hook">{{fixedTitleText}}</h1>
      </div>
      <div class="wrapper-content" ref="foodsWrapper">
        <ul>
          <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="'foods-'+index">
            <h1 class="title food-title-list-hook">{{item.name}}</h1>
            <ul>

            <li @click="selectFood(food,$event)" class="food-item border-1px" v-for="food in item.foods">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>

                <price :price="food.price" :oldPrice="food.oldPrice"/>

                <!-- CartControl Start-->
                <div class="cart-control-wrapper">
                  <cart-control :select-foods="selectFoods" @addToCart="handleAddToCart" :food="food"/>
                </div>
                <!-- CartControl End -->

              </div>
            </li>

          </ul>
          </li>
        </ul>
      </div>
    </div>
    <!--右侧内容区 End-->

    <!-- 购物车 -->
    <shopping-cart ref="shopcart" :select-foods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"/>
    <!-- 购物车 End -->

    <!-- 产品详情 -->
    <food @addToCart="handleAddToCart" :food="selectedFood" :select-foods="selectFoods" ref="foodDetail"/>
    <!-- 产品详情 End -->
  </div>
</template>
<script type="text/ecmascript-6">
    import axios from 'axios';
    import BScroll from 'better-scroll';
    import ShoppingCart from '../shoppingcart/shoppingcart';
    import CartControl from '../cartcontrol/cartcontrol';
    import Food from '../food/food';
    import Price from '../price/price';

    const SUCCESS_STATUS = 0;

    export default {
      props: {
        seller: {
            type: Object
        }
      },
      data() {
        return {
          goods: [],
          listHeight: [],
          titleListHeight: [],
          scrollY: 0,
          fixedTitleText: '',
          fixedTitleShow: false,
          currentTitleIndex: 0,
          selectedFood: {}
        };
      },
      computed: {
        currentIndex() {
          for (let i = 0; i < this.listHeight.length; i++) {
            let height1 = this.listHeight[i];
            let height2 = this.listHeight[i + 1];
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                return i;
            }
          }
          return 0;
        },
        selectFoods() {
          let foods = [];
          this.goods.forEach((good) => {
            good.foods.forEach((food) => {
              if (food.count > 0) {
                foods.push(food);
              }
            });
          });
          return foods;
        }
      },
      watch: {
        currentIndex(index) {
          let menuList = this.$refs.menuWrapper.getElementsByClassName('menu-item-hook');
          let el = menuList[index];
          this.menuWrapper.scrollToElement(el);
        }
      },
      created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
        axios.get('/api/goods').then((response) => {
          if (response.data.status === SUCCESS_STATUS) {
            this.goods = response.data.goods;
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            });
          }
        });
      },
      methods: {
        selectMenu(index, e) {
          // bscroll派发的事件这个值为true
          if (!e._constructed) {
            return;
          }
          let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
          let el = foodList[index];
          this.foodsWrapper.scrollToElement(el);
        },
        selectFood(food, e) {
          if (!e._constructed) {
            return;
          }
          this.selectedFood = food;
          this.$refs.foodDetail.showDetailPanel();
        },
        _initScroll() {
          let firstWrapper = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')[this.currentTitleIndex];
          this.fixedTitleText = firstWrapper.querySelector('h1.title').innerText;
          this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
            click: true
          });
          this.foodsWrapper = new BScroll(this.$refs.foodsWrapper, {
            click: true,
            probeType: 3
          });
          this.foodsWrapper.on('scroll', (pos) => {
            this.scrollY = Math.abs(Math.round(pos.y));
            if (pos.y >= 0) {
              this.fixedTitleShow = false;
            } else {
              this.fixedTitleShow = true;
            }
            let fixedTitleHeight = this.$refs.fixedTitle.offsetHeight;
            this.fixedTitleHeight = fixedTitleHeight;
            this.currentTitleIndex = this._getFixedListTitleIndex();
            let currentFoodsWrapper = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')[this.currentTitleIndex];
            this.fixedTitleText = currentFoodsWrapper.querySelector('h1.title').innerText;
          });
        },
        _calculateHeight() {
            let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for (let i = 0; i < foodList.length; i++) {
              let item = foodList[i];
              height += item.clientHeight;
              this.listHeight.push(height);
            }
            let foodTitleList = this.$refs.foodsWrapper.getElementsByClassName('food-title-list-hook');
            for (let i = 0; i < foodTitleList.length; i++) {
              this.titleListHeight.push(foodTitleList[i].offsetTop);
            }
        },
        _getFixedListTitleIndex() {
          for (let i = 0; i < this.titleListHeight.length; i++) {
            let height1 = this.titleListHeight[i];
            let height2 = this.titleListHeight[i + 1];
            // let height1 = this.titleListHeight[i] - this.fixedTitleHeight; // 待加入动画fixedTitle的上移动画处理
            // let height2 = this.titleListHeight[i + 1] - this.fixedTitleHeight;
            if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                return i;
            }
          }
          return 0;
        },
        _drop(el) {
          // 让动画晚一点执行，避免出现卡顿,体验优化，异步执行下落动画
          this.$nextTick(() => {
            setTimeout(() => {
              this.$refs.shopcart.drop(el);
            }, 20);
          });
        },
        handleAddToCart(el) {
          this._drop(el);
        }
      },
      components: {
        'shopping-cart': ShoppingCart,
        'cart-control': CartControl,
        'food': Food,
        'price': Price
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';

 .goods
   position: absolute
   overflow:hidden
   display:flex
   top: 174px
   bottom:49px
   width:100%
   .menu-wrapper
     flex:0 0 80px //等分 缩放情况 占位空间
     width:80px  //兼容android浏览器，不加width在andorid下会有问题
     background-color: #f3f5f7
     .menu-item
       display:table //垂直居中，适合垂直列表布局
       height:54px
       width:56px
       padding:0 12px  //display:table时使水平居中
       line-height:14px
       &.current
         position:relative
         z-index:10;
         margin-top:-1px;
         background-color: #fff
         font-weight:700
         .text
           border-none()
       &:last-child
         .text
           border-none()
       .icon
         display:inline-block
         vertical-align:top
         margin-right:2px
         width:12px
         height:12px
         background-size:12px 12px
         background-repeat:no-repeat
         &.decrease
           bg-image('decrease_3')
         &.discount
           bg-image('discount_3')
         &.guarantee
           bg-image('guarantee_3')
         &.invoice
           bg-image('invoice_3')
         &.special
           bg-image('special_3')
       .text
         display:table-cell
         vertical-align:middle //display:table时的技巧，这样设置可以垂直居中
         border-1px(rgba(7,17,27,.1))
         width:56px
         font-size:12px
   .foods-wrapper
     position: relative
     flex:1
     .wrapper-content
       position: absolute
       top:0
       left:0
       width:100%
       height:100%
     .fixed-title
       position:absolute
       width:100%
       z-index:20
       .title
         padding-left:14px
         height:26px
         line-height:26px
         border-left:2px solid #d9dde1
         font-size:12px
         color:rgb(147,153,159)
         background-color: #f3f5f7
     .title
       padding-left:14px
       height:26px
       line-height:26px
       border-left:2px solid #d9dde1
       font-size:12px
       color:rgb(147,153,159)
       background-color: #f3f5f7
     .food-item
       display:flex
       margin:18px
       border-1px(rgba(7,17,27,.1))
       &:last-child
         border-none()
         margin-bottom:0
       .icon
         flex:0 0 57px
         margin-right:10px
       .content
         flex:1
         .name
           margin:2px 0 8px 0
           line-height:14px
           font-size:14px
           color:rgb(7,17,27)
         .desc,.extra
           line-height:10px
           font-size:10px
           color:rgb(147,153,159)
         .desc
           margin-bottom:8px
           line-height:14px
         .extra
           line-height:10px
           .count
             margin-right:12px
         .cart-control-wrapper
           position: absolute
           right:0
           bottom:2px
</style>
