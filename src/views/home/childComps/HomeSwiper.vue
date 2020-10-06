<template>
  <div class="home-swiper">
      <swiper>
          <swiper-item v-for="item in cbanner" :key="item.id">
              <a>
                <img :src="item.image" alt="" @load="SwiperImgLoad">
              </a>
          </swiper-item>
      </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper'
export default {
    props:{
        cbanner: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            onceLoad: true
        }
    },
    components: {
        Swiper,
        SwiperItem
    },
    methods: {
        SwiperImgLoad() {
            if(this.onceLoad){
                this.$emit('SwiperLoad')
                this.onceLoad = false
            }
        }
    }
}
</script>

<style>

</style>