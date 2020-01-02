import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{
    userId: localStorage.getItem("userId") ? localStorage.getItem("userId") : '',
    url: location.host.split(":")[0] == 'localhost' ? 'http://192.168.1.245/' : ''
  },
  mutations:{
    // 修改token，并将token存到sessionStorage
    changeLogin (state, user){
      state.userId = user.userId;
      localStorage.setItem('userId', user.userId)
    }
  }
})

export default store