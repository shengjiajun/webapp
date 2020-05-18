<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab :tabs="tabs" :seller="tabs"></tab>
    </div>
  </div>
</template>

<script>

import Tab from 'components/tab/tab'
import VHeader from 'components/header/header'
import { getSeller } from 'api/index'
import Seller from 'components/seller/seller'
import Ratings from 'components/ratings/ratings'
import Goods from 'components/goods/goods'
export default {
  name: 'App',
  data () {
    return {
      seller: { }
    }
  },
  computed: {
    tabs () {
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
  created () {
    this._getSeller()
  },
  methods: {
    _getSeller () {
      getSeller().then((seller) => {
        this.seller = seller
      })
    }
  },
  components: {
    VHeader,
    Tab
  }
}
</script>

<style lang="stylus" scoped>
  #app
    .tab-wrapper
      position: fixed
      top: 136px
      left: 0
      right: 0
      bottom: 0
</style>
