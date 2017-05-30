<template>
  <div id="app">
     <v-header :seller="seller"/>
     <div class="tabs">
       <ul class="tabs-content border-1px">
         <router-link tag="li" to="/goods" class="tab-item">
           <a>商品</a>
         </router-link>
         <router-link tag="li" to="/ratings" class="tab-item">
           <a>评论</a>
         </router-link>
         <router-link tag="li" to="/seller" class="tab-item">
           <a>商家</a>
         </router-link>
       </ul>
     </div>
     <keep-alive>
      <router-view v-cloak :seller="seller"/>
     </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header';
import axios from 'axios';
import {queryParse} from './common/js/utils';

const SUCCESS_STATUS = 0;

export default {
  name: 'app',
  data() {
    return {
        seller: {
          id: (() => {
            let queryParam = queryParse();
            return queryParam.id;
          })()
        }
    };
  },
  created() {
    axios.get('/api/seller?id=' + this.seller.id).then((response) => {
      if (response.data.status === SUCCESS_STATUS) {
          this.seller = Object.assign({}, response.data.seller, {id: this.seller.id});
      }
    });
  },
  components: {
    'v-header': header
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import './common/stylus/mixin.styl';
  #app
    height:100%
    .tabs-content
      display:flex
      width:100%
      height:40px
      line-height:40px
      border-1px(rgba(7,17,27,.1))
      .tab-item
        flex:1
        text-align:center
        & > a
          display:block
          font-size:14px
          color:rgb(77,85,93)
        &.active a
          color:rgb(240,20,20)
</style>
