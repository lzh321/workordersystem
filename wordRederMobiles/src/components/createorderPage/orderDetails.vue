<template>
  <div class="orderDetails">
    <customerInfo :orderInfo="orderInfo"></customerInfo>
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
  beforeDestroy(){
    sessionStorage.clear()
  }
}
</script>

<style>

.actionBtn {
  padding: 0;
  margin-top: 20px;
}
.actionBtn ul {
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #f0f0f0;
}
.actionBtn ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.actionBtn ul li img {
  width: 21px;
  height: 21px;
}
.actionBtn ul li:nth-child(1) {
  color: #7CA6F7;
  font-size:14px; 
}
.actionBtn ul li:nth-child(2) {
  color: #F8A32C;
  font-size:14px; 
}
.actionBtn ul li:nth-child(3) {
  color: #999999;
  font-size:14px; 
}

</style>