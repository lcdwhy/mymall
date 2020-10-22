<template>
  <div class="goods-item" @click="ClickItem">
      <img :src="showImage" alt="" @load="imgLoad">
      <div class="goods-info">
          <p>{{goodsItem.title}}</p>
          <span class="price">{{goodsItem.price}}</span>
          <span class="cfav">{{goodsItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        goodsItem: {
            type: Object,
            default() {
                return {}
            }
        }
    },
    computed: {
        showImage() {
            return this.goodsItem.image || this.goodsItem.show.img
        }
    },
    methods: {
        imgLoad() {
             
            if(this.$route.path.indexOf("/home") != -1){
                this.$bus.$emit("refreshClick")
            }
            if(this.$route.path.indexOf('/detail') !== -1){
                this.$bus.$emit("detailRefresh")
            } 
            
        },
        ClickItem() {
            this.$router.push('/detail/' + this.goodsItem.iid)
        }
    }
}
</script>

<style scoped>
    .goods-item{
        display: flex;
        flex-direction: column;
        width: 47%;
    }
    .goods-item img{
        width: 100%;
        border-radius: 5px;
        margin-bottom: 5px;
    }
    .goods-info{
        font-size:12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
    }
    .goods-info p{
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 3px;
    }
    .goods-info .price{
        color: var(--color-high-text);
        margin-right: 20px;
    }
    .goods-info .cfav::before{
        content: '⭐';
        position: relative;
        top: -1px;
        left: -15px;
        width: 15px;
        height: 15px;
        
    }
</style>