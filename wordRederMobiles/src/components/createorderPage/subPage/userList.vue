<template>
  <div class="userList">
    <ul>
      <li v-for="item in userList" :key="item.userId" @click="seleUser(item)">
        <img src="" alt="">
        <span>{{item.userName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
  name: 'userList',
  data() {
    return {
      userList:[],
      orderInfoId: '',
    }
  },
  methods:{
    seleUser(data){
      console.log(data)
      sessionStorage.setItem("userList",JSON.stringify(data))
      this.$router.go(-1)
    }
  },
  created(){
    var data ={
      userId: this.$store.state.userId,
      currentPage: 1,
      everyCount: 100
    }
    this.axios.post("/api/getUserList",data).then(res=>{
      console.log(res)
      if(res.data.retCode == '000000'){
        this.userList = res.data.body.userList
      }
    })
  }

}
</script>

<style scoped>
div{
  padding: 0 15px;
}
ul li{
  padding: 10px 0;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333333;
}
ul li img{
  width: 14px;
  height: 14px;
  border: 1px solid red;
  margin-right: 5px;
}
</style>