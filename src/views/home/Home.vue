<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"  class="control twoControl" @tabClick="clickControl" ref="control1" v-show="isControlShow"/>

    <scroll class="content" ref="warpper" :probeType="3" :pullUpLoad="true" @scroll="contentScroll" @pullingUp="pullingUped" >
      <home-swiper :cbanner='banner' @SwiperLoad="SwiperImgLoad"/>
      <home-recommend :recommend='recommend'/>
      <home-feature-view />
      <tab-control :titles="['流行','新款','精选']"  class="control" @tabClick="clickControl" ref="control2" />
      <good-list :goods="showGoods" class="goodsshow"></good-list>
    </scroll>


    <back-top @click.native="ClickBackTop" v-show="isShowScroll"></back-top>
      
    
  </div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper'
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeatureView from './childComps/HomeFeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'

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
      },
      currentType: 'pop',
      isShowScroll: false,
      tabOffsetTop:0,
      isControlShow: false,
      saveY: 0
    }
  },
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    HomeFeatureView,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  },
  computed: {
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //轮播图、分类推荐数据请求
    this.getHomeMultidata()
    
    //流行、新款、精选数据请求
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    const refresh = debounce(this.$refs.warpper.refresh,200)
    this.$bus.$on('refreshClick', () => {
      refresh()
    })
  },
  activated() {
    this.$refs.warpper.scrollTo(0,this.saveY,0)
    this.$refs.warpper.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.warpper.getScrollY()
  },
  methods: {
    /* 
      组件内业务功能
    */
   //切换（流行、新款、精选）
    clickControl(index) {
      switch(index){
        case 0:
          this.currentType = 'pop'
          break;
        case 1:
          this.currentType = 'new'
          break;
        case 2:
          this.currentType = 'sell'
          break;  
      }
      this.$refs.control1.currentIndex = index
      this.$refs.control2.currentIndex = index
    },
    //回到顶部
    ClickBackTop() {
      this.$refs.warpper.scrollTo(0,0,500)
    },

    //控制显示或隐藏回滚按钮
    contentScroll(Option) {
      this.isShowScroll = Option.y < -500?true:false

      this.isControlShow = (-Option.y) > this.tabOffsetTop 
      
    },
    //上拉刷新回调函数
    pullingUped() {
      this.getHomeGoods(this.currentType)
    },
    //监听轮播图图片是否加载完，计算control的高度位置
    SwiperImgLoad() {
      this.tabOffsetTop =  this.$refs.control2.$el.offsetTop
    },
    /*
      网络数据请亲
    */
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
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page+=1
      this.$refs.warpper.finishPullUp()
    })
      
    }
  }

    
}
</script>

<style  scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .nav-bar{
    background:#ff5777;
    color: #fff;
    /* position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 9; */
  }
  .goodsshow{
    margin-bottom: 49px;
  }
  .content{
    height: calc(100% - 49px);
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .twoControl{
    position: relative;
    z-index: 9;
  }
  
 
</style>