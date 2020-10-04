<template>
  <div class="home-swiper">
      <swiper>
          <swiper-item v-for="item in cbanner" :key="item.id">
              <a>
                <img :src="item.image" alt="">
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
    components: {
        Swiper,
        SwiperItem
    }
}
</script>

<style>

</style>