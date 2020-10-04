<template>
  <div class="tab-control">
      <div v-for="(item ,index) in titles" :key="item" @click="clickItem(index)" class="tab-item">
          <span :class="{active: currentIndex == index}">{{item}}</span>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            currentIndex: 0,
        }
    },
    props: {
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    computed: {
    },
    methods: {
        clickItem(index){
            this.currentIndex = index
        }
    }
}
</script>

<style>
.tab-control{
    display: flex;
    text-align: center;
    line-height: 40px;
}
.tab-control div{
    flex: 1;
    font-size: 15px;
    height: 40px;
    
}
.tab-item{
    margin: 15px;
}
.active{
    border-bottom:1px solid #ff5777 ;
    color: #ff5777;
}
</style>