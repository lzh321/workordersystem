<template>
  <div class="orderDetails">
    <customerInfo :orderInfo="orderInfo" :orderStatus="orderStatus" ></customerInfo>
    <!-- 待派单 -->
    <sendOrders :orderStatus="orderStatus" v-if="orderStatus == 1"></sendOrders> 
    <!-- 待受理 -->
    <acceptance :orderStatus="orderStatus" v-if="orderStatus == 2"></acceptance>
    <!-- 待处理 -->
    <dispose :orderStatus="orderStatus" :orderInfo="orderInfo"  v-if="orderStatus == 3 || orderStatus == 4 || orderStatus == 5 || orderStatus == 9 || orderStatus == 10"></dispose>
    <!-- 待回访 -->
    <returnVisit :orderInfo="orderInfo" :orderStatus="orderStatus"  v-if="orderStatus == 7"></returnVisit>
    <!-- 已关单 -->
    <kuantan :orderInfo="orderInfo"  v-if="orderStatus == 8"></kuantan>
  </div>
</template>

<script>
import customerInfo from './orderComponents/customerInfo'
import sendOrders from './orderComponents/sendOrders'
import acceptance from './orderComponents/acceptance'
import dispose from './orderComponents/dispose'
import returnVisit from './orderComponents/returnVisit'
import kuantan from './orderComponents/kuantan'
export default {
  name: 'orderDetails',
  data() {
    return {
      orderStatus: '',
      orderInfoId: '',
      orderInfo: {}
    }
  },
  components:{
    customerInfo,
    sendOrders,
    acceptance,
    dispose,
    returnVisit,
    kuantan
  },
  methods:{
    getOrderInfo(){
      var data = {
        userId: this.$store.state.userId,
        orderInfoId: this.orderInfoId
      }
      this.axios.post("/api/getOrderInfo",data).then(res=>{
        console.log(res)
        if(res.data.retCode == '000000'){
          this.orderInfo = res.data.body
        }
      })
      
    }
  },
  created(){
    this.orderStatus = this.$route.query.orderStatus
    this.orderInfoId = sessionStorage.getItem("orderInfoId")
    this.getOrderInfo()
    
  },
  // beforeDestroy(){
  //   sessionStorage.clear()
  // }
}
</script>

<style>
.orderDetails{
  background: #FFFFFF;
}
.actionBtn {
  padding: 0;
  
  position: fixed;
  width: 100%;
  bottom: 0;
  z-index: 9999;
}
.perch{
  padding: 10px 0;
  margin-top: 20px;
  height: 50px;
}
.actionBtn ul {
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #f0f0f0;
}
.actionBtn ul li button {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  background: #f0f0f0;
}
.actionBtn ul li button img {
  width: 21px;
  height: 21px;
}
.actionBtn ul li:nth-child(1) button{
  color: #7CA6F7;
  font-size:14px; 
}
.actionBtn ul li:nth-child(2) button{
  color: #F8A32C;
  font-size:14px; 
}
.actionBtn ul li:nth-child(3) button{
  color: #999999;
  font-size:14px; 
}

textarea {
  width: 100%;
  margin-top: 10px;
  background: #FFFFFF;
  border: 1px solid #F3F3F3;
  color: #666666;
  font-size: 13px;
  padding: 5px;
}
span{
  font-size: 13px;
}
.remakeInfo label::before{
  content: ''
}
form>div>input[type="text"]{
  border: none !important;
}
</style>