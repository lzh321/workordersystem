<template>
<!-- 回访记录 -->
  <div class="returnVisit">
    <orderInfo :orderInfo="orderInfo"></orderInfo>
    <form action="" id="formData">
      <div class="info">
        <h2>回访记录</h2>
      </div>
      <div>
        <label for=""><span class="problem">问题是否已解决</span>：</label>
        <input type="radio" name="isFinish" value="0">已解决
        <input type="radio" name="isFinish" value="1">未解决
      </div>
      <div>
        <label for=""><span>满意度情况</span>：</label>
        <input type="radio" name="satisfiedState" value="0">满意
        <input type="radio" name="satisfiedState" value="1">基本满意
        <input type="radio" name="satisfiedState" value="2">不满意
      </div>
      <div>
        <label for=""><span>意见/建议</span>：</label>
        <textarea name="adviseContent" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="remakeInfo">
        <label for=""><span>备注</span>：</label>
        <textarea name="remark" id="" cols="30" rows="10"></textarea>
      </div>
    </form>
    <orderLog></orderLog>
    <div class="perch"></div>
     <div class="actionBtn">
      <ul>
        <li >
          <button @click="rejeck" :disabled="isDisabled">
            <img src="../../../assets/Images/operation_rejected.png" alt />
            <span>驳回</span>
          </button>
          
        </li>
        <li>
          <button @click="kuantan" :disabled="isDisabled">
            <img src="../../../assets/Images/operation_kuantan.png" alt />
          <span>关单</span>
          </button>
          
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>
import orderInfo from './orderInfo'
import orderLog from './orderLog'
export default {
  name: 'returnVisit',
  props:["orderInfo"],
  data() {
    return {
      orderInfoId: sessionStorage.getItem("orderInfoId"),
      isDisabled:false
    }
  },
  methods:{
    kuantan(){
      var createData = this.$("#formData").serializeObject();
      this.orderInfo.userId = this.$store.state.userId
      this.orderInfo.isFinish = createData.isFinish
      this.orderInfo.adviseContent = createData.adviseContent
      this.orderInfo.remark = createData.remark
      this.orderInfo.satisfiedState = createData.satisfiedState
      this.orderInfo.orderInfoId = this.orderInfoId
      console.log(this.orderInfo)
        this.isDisabled = true
      this.axios.post("/api/closeOrderInfo",this.orderInfo).then(res=>{
        console.log(res);
        if (res.data.retCode == "000000") {
          layer.msg(res.data.retMsg, { icon: 1 });
          sessionStorage.clear();
          setTimeout(() => {
            this.$router.push("/wordOrder");
          }, 3000);
        } else {
          setTimeout(() => {
            this.isDisabled = false
          }, 2000);
          layer.msg(res.data.retMsg, { icon: 2 });
        }
      })
    },
    rejeck(){
      this.$router.push('/kuantanState?handleState=13')
    }
  },
  components:{
    orderInfo,
    orderLog
  }
}
</script>

<style scoped>

form{
  padding: 0 15px;
}
.fault{
  display: flex;
  align-items: center;
}
form div{

  padding: 10px 0;
  border-bottom: 1px solid #F0F0F0; 
}
form div:nth-child(2){
display: flex;
}
form>div:nth-child(3){
  display: flex;
}

form div > span {
  display: flex;
  align-items: center;
  margin-left: 8px;
  font-size: 13px;
}
form div>span::after{
  content: '';
  display: inline-block;
  width: 7px;
  height: 13px;
  background: url('../../../assets/Images/choose.png') no-repeat;
  background-size: 100%;
  margin-left: 5px;
}

label {
  font-size: 14px;
  display: flex;
  align-items: center;
}
label::before{
  content: '*';
  color: red;
  display: inline-block;
  margin-right: 3px;
}
label .problem{
  width: 100px;
}
form  label span {
  width: 100px;
  font-size: 14px;
  color: #666666;
  text-align-last: justify;
}
input[type="text"] {
  flex: 1;
  border: 1px solid #f3f3f3;
  height: 35px;
}
textarea {
  width: 100%;
  margin-top: 10px;
  background: #FFFFFF;
}
.info {
  justify-content: space-between;
}
.info h2::before{
  content: "|";
  font-size: 14px;
  color: #333333;
  margin-right: 2px;
}
h2{
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
}
.remakeInfo{
  align-items: baseline;
  flex-direction: column;
}
.actionBtn{
  position: fixed;
  width: 100%;
  bottom: 0;
}
.actionBtn ul li:nth-child(1) button{
  color: #F8A32C;
  font-size:14px; 
}

.actionBtn ul li:nth-child(2) button{
  color: #999999;
  font-size:14px; 
}
.remakeInfo label::before{
  content: ''
}
input[type="radio"]{
  margin: 2px 2px 0 8px;
}
.perch{
  height: 50px;
}
</style>