<template>
  <div id="app">
    <v-header :seller="seller"/>
    <header-detail :seller="seller"/>
  </div>
</template>

<script>
  import VHeader from './components/v-header'
  import HeaderDetail from './components/header-detail'
  import {getSeller} from './api'

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
      HeaderDetail
    }
  }
</script>
