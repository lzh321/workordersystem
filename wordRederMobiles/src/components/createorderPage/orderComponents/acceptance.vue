<template>
  <div class="acceptance">
    <form action="">
      <div class="remakeInfo">
        <label for=""><span>备注</span>：</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
    </form>
    <orderLog></orderLog>
    <div class="actionBtn">
      <ul>
        <li @click="accept">
          <img src="../../../assets/Images/operation_To-accept-the.png" alt />
          <span>受理</span>
        </li>
        <li @click="reject">
          <img src="../../../assets/Images/operation_To-send.png" alt />
          <span>驳回</span>
        </li>
        <li @click="kuantan">
          <img src="../../../assets/Images/operation_kuantan.png" alt />
          <span>关单</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import orderLog from './orderLog'
export default {
  name: 'acceptance',
  data() {
    return {
      orderInfoId: sessionStorage.getItem("orderInfoId")
    }
  },
  components:{
    orderLog
  },
  methods:{
    resData(handleState) {
      var createData = this.$("#sendOrderData").serializeObject();
      createData.userId = this.$store.state.userId;
      createData.orderInfoId = this.orderInfoId;
      createData.handleState = handleState;
      console.log(createData);
      this.axios.post("/api/handleOrderInfo", createData).then(res => {
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/wordOrder");
          }, 3000);
        } else {
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    },
    accept() {
      this.resData(2);
    },
    reject() {
      this.$router.push('/kuantanState?handleState=9')
    },
    kuantan() {
      // this.resData(8);
      this.$router.push('/kuantanState?handleState=8')
    }
  }
}
</script>

<style scoped>
form{
  padding: 0 15px;
}
.acceptance .remakeInfo{
  display: flex;
  align-items: baseline;
  flex-direction: column;
  color: #666666;
  font-size: 14px;
}
textarea{
  width: 100%;
  margin-top: 10px;
}
</style>