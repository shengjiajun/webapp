<template>
  <div class="tab">
    <cube-tab-bar
      :useTransition=false
      :showSlider=true
      v-model="selectedLabel"
      :data="tabs"
      ref="tabBar"
      class="border-bottom-1px"
    >
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide
        :loop=false
        :auto-play=false
        :show-dots=false
        :initial-index="index"
        :options="slideOptions"
        @scroll="onScroll"
        ref="slide"
        @change="onChange"
      >
        <cube-slide-item v-for="(tab, index) in tabs" :key=index>
          <component ref="component" :is="tab.component" :data="tab.data"></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
import Seller from 'components/seller/seller'
import Ratings from 'components/ratings/ratings'
import Goods from 'components/goods/goods'
export default {
  name: 'tab',
  props: {
    tabs: {
      type: Array,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      index: 0,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    selectedLabel: {
      get () {
        return this.tabs[this.index].label
      },
      set (newVal) {
        console.log('hello world')
        this.index = this.tabs.findIndex((array) => {
          return array.label === newVal
        })
      }
    }
  },

  mounted () {
    this.onChange(this.index)
  },
  methods: {
    clickHandler (label) {
      // if you clicked home tab, then print 'Home'
      console.log(label)
    },
    changeHandler (label) {
      // if you clicked different tab, this methods can be emitted
    },
    onChange (current) {
      this.index = current
      const instance = this.$refs.component[current]
      if (instance && instance.fetch) {
        instance.fetch()
      }
    },
    onScroll (pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const slideWidth = this.$refs.slide.slide.scrollerWidth
      const transform = -pos.x / slideWidth * tabBarWidth
      this.$refs.tabBar.setSliderTransform(transform)
    }
  },
  components: {
    Seller,
    Ratings,
    Goods
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"

  .tab
    display: flex
    flex-direction: column
    height: 100%
    >>> .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex: 1
      overflow: hidden
    >>> .cube-slide-group
      white-space normal
</style>
