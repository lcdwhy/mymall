<template>
  <div class="home-recommend">
      <div v-for=" item in recommend" :key="item.title" class="recommend-item">
          <a :href="item.link">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        recommend: {
            type: Array,
            default() {
                return []
            }
        }
    }
}
</script>

<style scoped>
.home-recommend{
    display: flex;
    padding: 10px 0 15px;
    border-bottom: 8px solid #eee;
    text-align: center;
}
.recommend-item{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
}
.home-recommend img{
    height: 65px;
    width: 65px;
    margin-bottom: 10px;
}
</style>