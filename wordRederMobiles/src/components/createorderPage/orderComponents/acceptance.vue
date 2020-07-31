<template>
  <div class="acceptance">
    <form action id="sendOrderData">
      <div class="remakeInfo">
        <label for>
          <span>备注</span>：
        </label>
        <textarea name="remark" cols="30" rows="10"></textarea>
      </div>
    </form>
    <orderLog></orderLog>
  </div>
</template>

<script>
import orderLog from "./orderLog";
export default {
  name: "acceptance",
  props: ["orderStatus"],
  data() {
    return {
      orderInfoId: sessionStorage.getItem("orderInfoId"),
      isDisabled:false
    };
  },
  components: {
    orderLog
  },
  methods: {
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
            this.$router.push("/wordOrder?type=wordOrder");
          }, 3000);
        } else {
          setTimeout(() => {
            this.isDisabled = false
          }, 2000);
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      });
    },
    accept() {
      this.isDisabled = true
      this.resData(2);
    },
    reassignment() {
      this.$router.push("/kuantanState?handleState=10");
    },
    kuantan() {
      // this.resData(8);
      this.$router.push("/kuantanState?handleState=8");
    }
  }
};
</script>

<style scoped>
form {
  padding: 0 15px;
}
.acceptance .remakeInfo {
  display: flex;
  align-items: baseline;
  flex-direction: column;
  color: #666666;
  font-size: 16px;
}
textarea {
  width: 100%;
  margin-top: 10px;
  background: #ffffff;
  border: 1px solid #f3f3f3;
  color: #666666;
  font-size: 15px;
  padding: 5px;
}
.remakeInfo label span{
  font-size: 16px;
}
.remakeInfo label::before {
  content: "";
}
</style>