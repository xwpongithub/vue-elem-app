<template>
  <div class="rating-select">
    <div class="rating-type border-1px">
      <span @click="select(2,$event)" class="block positive" :class="{active:selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span @click="select(0,$event)" class="block positive" :class="{active:selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span @click="select(1,$event)" class="block negative" :class="{active:selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div @click="toggleContent" class="switch" :class="{on:onlyContent}">
        <span class="icon-check-circle"></span>
        <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL = 2;

    export default {
      props: {
        ratings: {
          type: Array,
          default() {
            return [];
          }
        },
        selectType: {
          type: Number,
          default: ALL
        },
        onlyContent: {
          type: Boolean,
          default: false
        },
        desc: {
          type: Object,
          default() {
            return {
              all: '全部',
              positive: '满意',
              negative: '不满意'
            };
          }
        }
      },
      computed: {
        positives() {
          return this.ratings.filter((rating) => {
            return rating.rateType === POSITIVE;
          });
        },
        negatives() {
          return this.ratings.filter((rating) => {
            return rating.rateType === NEGATIVE;
          });
        }
      },
      methods: {
        select(type, e) {
          if (!e._constructed) {
            return;
          }
          this.$emit('update:selectType', type);
          this.$emit('refresh');
        },
        toggleContent(e) {
          if (!e._constructed) {
            return;
          }
          this.$emit('update:onlyContent', !this.onlyContent);
          this.$emit('refresh');
        }
      }
    };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";

  .rating-select
    .rating-type
      padding:18px 0
      margin:0 18px
      border-1px(rgba(7,17,27,.1))
      font-size:0
      .block
        display:inline-block
        line-height:16px
        padding:8px 12px
        margin-right:8px
        border-radius:1px
        font-size:12px
        color:rgb(77,85,93)
        &.active
          color:#fff
        .count
          margin-left:2px
          font-size:8px
        &.positive
          background-color: rgba(0,160,220,.2)
          &.active
            background-color: rgb(0,160,220)
        &.negative
          background-color: rgba(77,85,93,.2)
          &.active
            background-color: rgb(77,85,93)
    .switch
      padding:12px 18px
      line-height:24px
      border-bottom:1px solid rgba(7,17,27,.1)
      color:rgb(147,153,159)
      font-size:0
      &.on
        .icon-check-circle
          color:#00c850
      .icon-check-circle,.text
        display:inline-block
        vertical-align:top
      .icon-check-circle
        margin-right:4px
        font-size:24px
      .text
        font-size:12px
</style>
