<template>
  <div id="app">
    <main-tabbar  ></main-tabbar>
    <keep-alive exclude="Detail">
      <router-view v-if="isRouterAlive"></router-view>
    </keep-alive>
  </div>
</template>
<script>
import MainTabbar from 'components/content/mainTabbar/MainTabbar'
export default {
  data(){
    return {
      isRouterAlive:true
    }
  },
  provide(){
    return {
      reload: this.reload
    }
  },
  components: {
    MainTabbar
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style scoped>
  @import 'assets/css/base.css';  
</style>
