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
            console.log("S")
            this.currentIndex = index
            this.$emit('tabClick', index)
        }
    }
}
</script>

<style>
.tab-control{
    display: flex;
    text-align: center;
    line-height: 25px;
    background: #fff;
}
.tab-control div{
    flex: 1;
    font-size: 15px;
    height: 25px;
    
}
.tab-item{
    margin: 10px;
    /* padding: 15px; */
}
.active{
    border-bottom:1px solid #ff5777 ;
    color: #ff5777;
}
</style>