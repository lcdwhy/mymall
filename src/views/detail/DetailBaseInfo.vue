<template>
  <div class="detail-base-info" v-if="Object.keys(goods).length !== 0 ">
      <!-- 商品简介 -->
      <div class="goods-title">
          {{goods.title}}
      </div>
      <!-- 商品价钱信息 -->
      <div class="goods-price">
          <span class="n-price">{{goods.newPrice}}</span>
          <span class="o-price">{{goods.oldPrice}}</span>
          <span class="discount" v-if="goods.discount">{{goods.discount}}</span>
      </div>
      <!-- 其它信息 -->
      <div class="other-info">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.services.length-1].name}}</span>
      </div>
      <!-- 服务信息 -->
      <div class="info-services">
          <span class="info-services-item" v-for="index in goods.services.length-1" :key="index">
              <img :src="goods.services[index-1].icon" alt="">
              <span>{{goods.services[index-1].name}}</span>
          </span>
          
      </div>
  </div>
</template>

<script>
export default {
    props: {
        goods: {
            type: Object,
            default() {
                return {}
            }
        }
    }
}
</script>

<style scoped>
    .detail-base-info{
        margin-top: 30px;
        
        padding: 0  20px 8px;
        color: #999;
        border-bottom: 5px solid #f2f5f8;
    }
    .goods-title{
        color: #222;
    }
    .goods-price{
        margin-top: 15px;
        
    }
    .goods-price .n-price{
        font-size: 24px;
        color: var(--color-high-text);
    }
    .goods-price .o-price{
        font-size: 13px;
        margin-left: 15px;
        text-decoration: line-through;
        
    }
    .goods-price .discount{
        background: #f34c62;
        color: #fff;
        border-radius: 5px;
        margin-left: 10px;
    }
    .other-info{
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
    }
    .info-services{
        margin-top: 15px;
        font-size: 12px;
        display: flex;
        justify-content: space-between;
    }
    .info-services-item img{
        width: 15px;
        height: 15px;
    }
</style>