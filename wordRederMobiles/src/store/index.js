import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    userId: sessionStorage.getItem('userId') ? sessionStorage.getItem('userId') : ''
  },
  mutations:{
    // 修改token，并将token存到sessionStorage
    changeLogin (state, user){
      state.userId = user.userId;
      sessionStorage.setItem('userId', user.userId)
    }
  }
})

export default store