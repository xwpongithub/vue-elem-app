<template>
  <div class="split-title">
    <div class="line"></div>
    <div class="text">{{title}}</div>
    <div class="line"></div>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
      props: {
        title: String
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .split-title
    display:flex
    margin:28px auto 24px auto
    width:80%
    .line
      position: relative
      flex:1
      top:-6px
      border-bottom:1px solid rgba(255,255,255,.2)
    .text
      padding:0 12px
      font-size:14px
      font-weight:700
</style>
