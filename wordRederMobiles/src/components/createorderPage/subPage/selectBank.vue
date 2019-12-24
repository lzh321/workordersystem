<template>
  <div class="selectBank">
    <ul>
      <li v-for="item in bankList" :key="item.customerId" @click="selectBank(item)">
        <img src="" alt="">
        <span>{{item.customerName}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
  name: 'selectBank',
  data() {
    return {
      bankList:[],
      orderInfoId: '',
    }
  },
  methods:{
    selectBank(data){
      console.log(data)
      sessionStorage.setItem("bankList",JSON.stringify(data))
      this.$router.go(-1);
    }
  },
  created(){
    this.axios.post("/api/getCustomerNameList",{userId: this.$store.state.userId}).then(res=>{
      console.log(res)
      if(res.data.retCode == '000000'){
        this.bankList = res.data.body.customerNameList
      }
    })
  }
}
</script>

<style scoped>
.selectBank{
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