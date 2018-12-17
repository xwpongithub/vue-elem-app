<template>
  <div id="app" @touchmove.prevent>
    <v-header :seller="seller" ref="header"/>
    <div class="tab-wrapper" ref="content">
      <tab :tabs="tabs"/>
    </div>
  </div>
</template>

<script>
  import VHeader from './components/v-header'
  import Tab from './components/tab'
  import {getSeller} from './api'
  import Goods from './components/goods'
  import Ratings from './components/ratings'
  import Seller from './components/seller'

  export default {
    name: 'app',
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this._getSeller()
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.content.style.top = this.$refs.header.$el.offsetHeight + 'px'
      })
    },
    computed: {
      tabs() {
        return [
          {
            label: '商品',
            component: Goods,
            data: {
              seller: this.seller
            }
          },
          {
            label: '评论',
            component: Ratings,
            data: {
              seller: this.seller
            }
          },
          {
            label: '商家',
            component: Seller,
            data: {
              seller: this.seller
            }
          }
        ]
      }
    },
    methods: {
      _getSeller() {
        getSeller({
          id: this.seller.id
        }).then((seller) => {
          this.seller = Object.assign({}, this.seller, seller)
        })
      }
    },
    components: {
      VHeader,
      Tab
    }
  }
</script>

<style lang="stylus">
  #app
    .tab-wrapper
      position: absolute
      overflow:hidden
      left: 0
      right: 0
      bottom: 0
</style>
