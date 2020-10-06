<template>
  <div ref="srcoll" class="ass">
      <div>
          <slot></slot>
      </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pulldown from '@better-scroll/pull-up'
//注册插件
BScroll.use(Pulldown)
export default {
    props: {
        probeType: {
            type: Number,
            default: 0
        },
        pullUpLoad: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            bs: null
        }
    },
    mounted() {
        this.bs = new BScroll(this.$refs.srcoll, {
            probeType:this.probeType,
            click: true,
            pullUpLoad: this.pullUpLoad
        })

        //监听滑动
        if(this.probeType ==2 || this.probeType ==3){
            this.bs.on('scroll', (Option) => {
            this.$emit("scroll", Option)
        })
        }
        
        //下拉刷新
        if(this.pullUpLoad){
            this.bs.on('pullingUp', (position) => {
            this.$emit('pullingUp')
        })
        }
        
        
    },
    methods: {
        scrollTo(x, y, time){
           this.bs && this.bs.scrollTo(x, y, time)
        },
        refresh() {
            this.bs && this.bs.refresh()
        },
        finishPullUp() {
            this.bs && this.bs.finishPullUp()
        }
    }
}
</script>

<style scoped>
</style>