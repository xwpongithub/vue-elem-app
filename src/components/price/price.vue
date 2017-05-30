<template>
  <div class="price">
    <span class="now">¥{{price}}</span><span class="old" v-if="oldPrice">¥{{oldPrice}}</span>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      props: {
        price: {
          type: Number,
          default: 0
        },
        oldPrice: {
          // oldPrice没有时后台传回的数据为""，所以要加一个String类型
          type: [Number, String],
          default: 0
        }
      }
    };
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .price
    font-weight:700
    line-height:24px
    padding: 8px 0
    .now
      margin-right:8px
      font-size:14px
      color:rgb(240,20,20)
    .old
      text-decoration:line-through
      font-size:10px
      color:rgb(147,153,159)
</style>
