import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodList:[]
  },
  mutations: {
    addGoodList(state, payload) {
      let oldProduct = state.goodList.find(item => item.iid === payload.iid)

      if(oldProduct){
        oldProduct.count +=1
      }else{
        payload.count = 1
        state.goodList.push(payload)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
