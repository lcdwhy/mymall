<template>
  <div class="tabbar-item" @click="itemClick">
      <div class="item-icon" v-if="!isActive"><slot name="item-icon"></slot></div>
      <div class="item-icon-active" v-else><slot name="item-icon-active"></slot></div>
      <div class="item-text" :class="{active:isActive}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
    inject: ["reload"],
    props:{
        path: {
            type: String,
        },
        activeStyle: {
            type: String,
            default: 'coral'
        }
    },
    methods: {
        itemClick() {
            if(this.$route.path == this.path){
                this.reload();
            }else{
                this.$router.push(this.path)
            }
        }
    },
    computed: {
        isActive() {
            return this.$route.path == this.path
        }
    }
}
</script>

<style scoped>
   .tabbar-item{
       flex: 1;
       display: flex;
       flex-direction: column;
       align-items: center;
       font-size: 14px;
   }
   .item-icon img, .item-icon-active img{
       width: 24px;
       height: 24px;
   }
   .item-text{
       text-align: center;
   }
   .active{
       color:#ff5777
   }
</style>