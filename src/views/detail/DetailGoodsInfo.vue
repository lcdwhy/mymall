<template>
  <div class="detail-goods-info" v-if="Object.keys(detailInfo).length !== 0">
      <div class="info-desc clera-fix">
          <div class="start">
          </div>
          <div class="desc">{{detailInfo.desc}}</div>
          <div class="end"></div>
      </div>
      <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
      <div class="info-list">
          <img v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" :src="item"  @load="imgLoad" alt="">
      </div>
  </div>
</template>

<script>
export default {
    props: {
        detailInfo: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    data() {
        return {
            counter: 0,
            imagesLength: 0
        }
    },
    methods: {
        imgLoad() {
            if(++this.counter === this.imagesLength){
                this.$bus.$emit('detailRefresh')
            }
            
        }
    },
    watch: {
        detailInfo(){
            this.imagesLength = this.detailInfo.detailImage[0].list.length
        }
    }
}
</script>

<style scoped>
    .info-list img{
        width: 350px;
        height: 350px;
    }
    .desc{
        margin-bottom: 20px;
    }
    .info-key{
        font-size: 16px;
        margin-bottom: 10px;

    }
</style>