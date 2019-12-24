<template>
<div class="State">
  <form action="" id="formData">
    <div>
      <label for>
        <span>{{title}}</span>：
      </label>
      <textarea name="content" id cols="30" rows="10"></textarea>
    </div>
    <div class="btn">
      <a type="button" @click="confirm" class="confirm layui-btn">确定</a>
    </div>
  </form>
</div>
  
</template>

<script>
export default {
  name: "state",
  data() {
    return {
      title: "",
      handleState: '',
      orderInfoId: sessionStorage.getItem("orderInfoId"),
      orderInfo: {}
    };
  },
  methods: {
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
      
    },
    resData(handleState) {
      var formData = this.$("#formData").serializeObject();
      formData.userId = this.$store.state.userId;
      formData.orderInfoId = this.orderInfoId;
      formData.handleState = parseInt(handleState);
      console.log(this.orderInfo)
      if(this.orderInfo.appoinmentTime) {
        formData.isAppoint = 1
      }else{
        formData.isAppoint = 0
      }
      console.log(formData);
      this.axios.post("/api/handleOrderInfo", formData).then(res => {
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
    confirm(){
      this.resData(this.handleState)
    }
  },
  created() {
    if (this.handleState == 8) {
      this.title = "关单说明";
    }
    if(this.handleState == 9 || this.handleState == 13){
      this.title = "驳回说明"
    }
    this.getOrderInfo()
  },
  activated() {
    this.handleState = this.$route.query.handleState
    if (this.handleState == 8) {
      this.title = "关单说明";
    }
    if(this.handleState == 9 || this.handleState == 13){
      this.title = "驳回说明"
    }
  }
};
</script>

<style scoped>
div {
  padding: 0 15px;
}
label {
  font-size: 14px;
  display: flex;
  align-items: center;
}
label::before {
  content: "*";
  color: red;
  display: inline-block;
  margin-right: 3px;
}
label span {
  width: 60px;
  font-size: 14px;
  color: #666666;
  text-align-last: justify;
}
textarea {
  width: 100%;
  border: 1px solid #f3f3f3;
  margin-top: 10px;
  padding: 5px;
}
.btn{
  text-align: center;
  margin-top: 20px;
}
.confirm{
  /* border: none; */
  width: 100px;
  /* height: 40px; */
  border-radius: 50px;
  text-align: center;
  background: #2F6CFF;
  color: #f3f3f3;
}
</style>