<template>
  <div class="goods-list">
      <goods-item v-for="item in goods" :key="item.iid" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsItem from './GoodsItem'

export default {
    props: {
        goods: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {
        GoodsItem
    }
}
</script>

<style>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
</style>