<template>
  <div id="detail">
    <detail-nav-bar @navInfo="navItemInfo" ref="nav"></detail-nav-bar>
    <scroll class="scroll-content" ref="warpper" :probeType="3" :pullUpLoad="true" @scroll="contentScroll" >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" class="goods-info"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <good-list  :goods="recommendInfo" ref="goodlist"></good-list>
    </scroll>
    <detail-bottom-bar class="bottom-bar" @addToCart="addCart"></detail-bottom-bar>
    <back-top @click.native="ClickBackTop" v-show="isShowScroll"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './DetailNavBar'
import DetailSwiper from './DetailSwiper'
import DetailBaseInfo from './DetailBaseInfo'
import DetailShopInfo from './DetailShopInfo'
import DetailGoodsInfo from './DetailGoodsInfo'
import DetailParamInfo from './DetailParamInfo'
import DetailCommentInfo from './DetailCommentInfo'
import DetailBottomBar from './DetailBottomBar'


import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'
import GoodList from 'components/content/goods/GoodList'

import {debounce} from 'common/utils'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      isShowScroll: false,
      recommendInfo: [],
      navThemeTopY:[],
      getThemeTopY: null
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodList,
    Scroll,
    BackTop
  },
  async created() {
    
    this.iid = this.$route.params.iid

    const res = await getDetail(this.iid)
    const red = await getRecommend()
    console.log(red)
    const data = res.result
    console.log(data)
    //轮播图数据
    this.topImages= data.itemInfo.topImages

    //商品信息
    this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

    //店铺信息
    this.shop = new Shop(data.shopInfo)

    //商品详细信息
    this.detailInfo = data.detailInfo

    //参数信息
    this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

    //评论信息
    if(data.rate.cRate !== 0) {
      this.commentInfo = data.rate.list[0]
    }

    //推荐商品信息
    this.recommendInfo = red.data.list

    //封装 取navbar（商品， 参数， 评论， 推荐）上对应每个主题的高度 的函数
    this.getThemeTopY = debounce(() => {
      this.navThemeTopY = []
      this.navThemeTopY.push(0)
      console.log(this.$refs.params.$el.offsetTop)
      this.navThemeTopY.push(this.$refs.params.$el.offsetTop)
      this.navThemeTopY.push(this.$refs.comment.$el.offsetTop)
      this.navThemeTopY.push(this.$refs.goodlist.$el.offsetTop)
      
    }, 500)
  },
  mounted() {
    //刷新，重新计算scroll的高度
    const refresh = debounce(this.$refs.warpper.refresh,200)
    this.$bus.$on('detailRefresh', () => {
      refresh()
      this.getThemeTopY()
    })
  },
  methods: {
    //控制显示或隐藏回滚按钮
    contentScroll(Option) {
      this.isShowScroll = Option.y < -500?true:false

      let length = this.navThemeTopY.length
      const NavTopY = -Option.y
      for(let i = 0; i < length; i++){
        if( this.$refs.nav.currentIndex !== i &&(i < length-1 && NavTopY >= this.navThemeTopY[i] && NavTopY < this.navThemeTopY[i+1]) || ( i === length-1 && NavTopY >= this.navThemeTopY[i] )){
            this.$refs.nav.currentIndex = i
        }
      }
    },
    //回到顶部
    ClickBackTop() {
      this.$refs.warpper.scrollTo(0,0,500)
    },
    //点击跳转到对应（商品，参数，评论，推荐）信息展示
    navItemInfo(index) {
      this.$refs.warpper.scrollTo(0, -this.navThemeTopY[index], 500)
    },
    //添加商品进入购物车
    addCart() {
      const obj = {
        iid: this.iid,
        desc: this.goods.desc,
        price: this.goods.lowNowPrice,
        title: this.goods.title,
        img: this.topImages[0]
      };

      this.$store.commit('addGoodList', obj)
    }
  }
}
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 10;
    background: #fff;
    height: 100vh;
  }
  .scroll-content{
    height: calc(100% - 93px);
    overflow: hidden;
  }
  .goods-info{
    padding: 5px;
  }
  .bottom-bar{
    height: 49px;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

    z-index: 1000;
  }
</style>