<template>
  <div class="orderDetails">
    <customerInfo></customerInfo>
    <sendOrders :orderStatus="orderStatus" v-if="orderStatus == 2"></sendOrders>
    <acceptance :orderStatus="orderStatus" v-if="orderStatus == 3"></acceptance>
    <dispose :orderStatus="orderStatus"  v-if="orderStatus == 4"></dispose>
    <returnVisit :orderStatus="orderStatus"  v-if="orderStatus == 5"></returnVisit>
    <kuantan :orderStatus="orderStatus"  v-if="orderStatus == 6"></kuantan>
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
      orderStatus: ''
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
  created(){
    this.orderStatus = this.$route.query.orderStatus
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