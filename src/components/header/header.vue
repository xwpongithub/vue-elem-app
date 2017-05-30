<template>
  <header class="header">
     <div class="content-wrapper">

       <div class="avatar">
          <img width="64" height="64" :src="seller.avatar">
       </div>

       <div class="content">
         <div class="title">
           <span class="brand"></span>
           <span class="name">{{seller.name}}</span>
         </div>
         <div class="description">
            {{seller.description}}/{{seller.deliveryTime}}分钟送达
         </div>
         <div v-if="seller.supports" class="support">
           <span class="icon" :class="classMap[seller.supports[0].type]"></span>
           <span class="text">{{seller.supports[0].description}}</span>
         </div>
       </div>

       <div @click="showDetail" v-if="seller.supports" class="support-count">
         <span class="count">{{seller.supports.length}}个</span>
         <i class="icon-keyboard-arrow-right"></i>
       </div>

     </div>
     <!--公告区 Start-->
     <div @click="showDetail" class="bulletin-wrapper">
        <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard-arrow-right"></i>
     </div>
    <!--公告区 End-->

    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

    <!--店铺详情弹出层 Start-->
    <transition name="fade">
     <div class="detail" v-show="detailShow">
       <div class="detail-wrapper clearfix">
         <div class="detail-main">
           <h1 class="name">{{seller.name}}</h1>

           <div class="star-wrapper">
             <star :size="48" :score="seller.score"/>
           </div>

           <split-title title="优惠信息"/>

           <ul v-if="seller.supports" class="supports">
             <li class="support-item" :key="index" v-for="(item,index) in seller.supports">
               <span class="icon" :class="classMap[seller.supports[index].type]"></span>
               <span class="text">{{seller.supports[index].description}}</span>
             </li>
           </ul>

           <split-title title="商家公告"/>

           <div class="bulletin">
             <p class="content">{{seller.bulletin}}</p>
           </div>

         </div>
       </div>
       <div class="detail-close" @click="hideDetail">
         <i class="icon-close"></i>
       </div>
    </div>
    </transition>
    <!--店铺详情弹出层 End-->

  </header>
</template>
<script type="text/ecmascript-6">
    // .sync回来了！ 然而，它现在只是语法糖，扩展到一个prop +监听器对，类似于v-model

    // 警告现在包括组件层次结构跟踪

    // Vue.config.errorHandler现在也处理自定义指令钩子中抛出的错误

    // Vue.config.errorHandler现在也处理在nextTick回调中抛出的错误

    // 新的v-on修饰符：.passive - 使用{passive：true}添加事件侦听器

    // Props验证现在支持类型：Symbol

    // 样式绑定现在支持使用Array为属性提供多个（前缀）值，因此可以进行以下操作:
    // <div :style="{ display: ["-webkit-box", "-ms-flexbox", "flex"] }">

    // 扩展组件构造函数现在也可以用作混合

    // sticky footer:页面内容不够长时，页脚块粘贴在视窗底部，如果内容足够长时，页脚块会被内容向下推送
    import star from '../star/star';
    import SplitTitle from '../splittitle/splittitle';

    export default {
      props: {
        seller: {
            type: Object
        }
      },
      data() {
        return {
          detailShow: false
        };
      },
      created() {
        this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      },
      methods: {
        showDetail() {
          this.detailShow = true;
        },
        hideDetail() {
          this.detailShow = false;
        }
      },
      components: {
        star,
        'split-title': SplitTitle
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin';

  .header
    position: relative
    //如果使用了blur属性，将overflow设为hidden可将溢出的blur去除
    overflow:hidden
    color: #fff
    background: rgba(7, 17, 27, 0.5)
    .content-wrapper
      position: relative
      padding:24px 12px 18px 24px
      font-size:0
      .avatar,.content
        display:inline-block
      .avatar
        vertical-align:top
        img
          border-radius:2px
      .content
        margin-left:16px
        .title
          margin:2px 0 8px 0
          .brand
            display:inline-block
            vertical-align:top
            width:30px
            height:18px
            bg-image('brand')
            background-size:30px 18px
            background-repeat:no-repeat
          .name
            margin-left:6px
            font-size:16px
            line-height:18px
            font-weight:bold
        .description
          margin-bottom:10px
          line-height:12px
          font-size:12px
        .support
          .icon
            display:inline-block
            vertical-align:top
            margin-right:4px
            width:12px
            height:12px
            background-size:12px 12px
            background-repeat:no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            line-height:12px
            font-size:10px
      .support-count
        position:absolute
        right:12px
        bottom:14px
        padding:0 8px
        height:24px
        line-height:24px
        border-radius:14px
        background-color: rgba(0,0,0,.2)
        text-align:center
        .count,.icon-keyboard-arrow-right
          font-size:10px
        .icon-keyboard-arrow-right
          margin-left:2px
          line-height:24px
    .bulletin-wrapper
      position: relative
      overflow:hidden
      background-color: rgba(7,17,27,.2)
      height:28px
      line-height:28px
      padding:0 22px 0 12px
      white-space:nowrap
      text-overflow:ellipsis
      .bulletin-title,.bulletin-text
        vertical-align:top
      .bulletin-title
        display:inline-block
        margin-top:8px
        width:22px
        height:12px
        bg-image('bulletin')
        background-size:22px 12px
        background-repeat:no-repeat
      .bulletin-text
        margin:0 4px
        font-size:10px
      .icon-keyboard-arrow-right
        position: absolute
        font-size:10px
        right:12px
        top:8px
    .background
      position: absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px)
    .detail
      position: fixed
      overflow:auto
      top:0
      left:0
      z-index:100
      width:100%
      height:100%
      background-color:rgba(7,17,27,.8)
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.5s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        background: rgba(7, 17, 27, 0)
      .detail-wrapper
        min-height:100%
        width:100%
        .detail-main
          margin-top:64px
          padding-bottom:64px
          .name
            line-height:16px;
            text-align:center
            font-size:16px
            font-weight:700
          .star-wrapper
            margin-top: 18px
            padding:2px 0
            text-align:center
          .supports
            width:80%
            margin:0 auto
            .support-item
              padding:0 12px
              margin-bottom:12px
              font-size:0
              &:last-child
                margin-bottom:0
              .icon
                display:inline-block
                vertical-align:top
                margin-right:6px
                background-size:16px 16px
                background-repeat:no-repeat
                width:16px
                height:16px
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height:16px
                font-size:12px
          .bulletin
            margin:0 auto
            width:80%
            .content
              padding:0 12px
              line-height:24px
              font-size:12px
      .detail-close
        position: relative
        margin:-64px auto 0 auto
        width:32px
        height:32px
        clear:both
        font-size:32px
</style>
