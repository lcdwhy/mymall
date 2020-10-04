<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <home-swiper :cbanner='banner'/>
    <home-recommend :recommend='recommend'/>
    <home-feature-view />
    <tab-control :titles="['流行','新款','精选']"  class="control"/>
    
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeatureView from './childComps/HomeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'

import {getHomeMultidata, getHomeGoods} from 'network/home.js'

export default {
  name: 'Home',
  data(){
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page:0, list: []},
        'sell': {page:0, list: []}
      }
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeatureView,
    TabControl
  },
  created() {
    //轮播图、分类推荐数据请求
    this.getHomeMultidata()
    
    //流行、新款、精选数据请求
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

    console.log(this.$data)
  
  },
  methods: {
    //轮播图、分类推荐数据请求
    getHomeMultidata() {
      getHomeMultidata().then( res => {
        let {banner, recommend} = res.data;
        this.banner = banner.list;
        this.recommend = recommend.list;
      })
    },

    //流行、新款、精选数据请求
    getHomeGoods(type) {
      let page = this.goods[type].page + 1
      getHomeGoods(type, page).then( res => {
      console.log(res)
    })
    }
  }

    
}
</script>

<style  scoped>
  #home{
    padding-top: 44px;
  }
  .nav-bar{
    background:#ff5777;
    color: #fff;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;
  }
  .control{
    position: sticky;
    top: 44px;
  }
</style>