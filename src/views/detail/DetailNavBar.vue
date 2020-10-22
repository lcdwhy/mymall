<template>
  <div class="detail-nav-bar">
      <nav-bar>
          <div slot="left" class="detailImg" @click="clickImg">
              <img src="~assets/img/common/back.svg" alt="">
          </div>
          <div slot="center" class="title">
              <div  
              v-for="(item, index) in titles" 
              :key="index"
              class="title-item"
              :class="{actived: index == currentIndex}"
              @click="clickTitle(index)">
                  {{item}}
              </div>
          </div>
      </nav-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'
export default {
    components: {
        NavBar
    },
    data() {
        return {
            titles: ['商品', '参数', '评论', '推荐'],
            currentIndex: 0
        }
    },
    methods: {
        clickTitle(index) {
            this.currentIndex = index
            this.$emit("navInfo", index)
        },
        clickImg() {
            this.$router.back()
        }
    }
}
</script>

<style scoped>
    .title{
        display: flex;
        font-size: 14px;
    }
    .title-item{
        flex: 1
    }
    .actived{
        color: var(--color-high-text);
    }
    .detailImg{
        margin-top: 8px;
    }
</style>