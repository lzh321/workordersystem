<template>
  <div class="orderLog">
    <div class="info">
      <h2>工单处理日志</h2>
    </div>
    <div class="logContent" v-for="(item,index) in orderLog" :key="index">
      <ul>
        <li>
          <label for=""><span>操作人</span>：</label>
          <span>{{item.handleUserName}}</span>
        </li>
        <li>
          <label for=""><span>操作</span>：</label>
          <span>{{item.handleStateName}}</span>
        </li>
        <li>
          <label for=""><span>操作时间</span>：</label>
          <span>{{item.operationTime}}</span>
        </li>
        <li>
          <label for=""><span>备注</span>：</label>
          <span>{{item.remarkDetail}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderLog',
  data() {
    return {
      orderLog: [],
      seleOrderInfoId: ''
    }
  },
  methods:{
    getorderLog(){
      var data = {
        userId: this.$store.state.userId,
        seleOrderInfoId: this.seleOrderInfoId
      }
      this.axios.post("/api/getRemarListByOrderInfoId",data).then(res=>{
        console.log(res)
        if(res.data.retCode == '000000'){
          this.orderLog = res.data.body.remarList
        }
      })
    }
  },
  created(){
    this.seleOrderInfoId = sessionStorage.getItem('orderInfoId')
    this.getorderLog()
  }
};
</script>

<style scoped>
.orderLog{
  padding: 0 15px;
  margin-top: 15px;
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
  color: #333333;
}
.logContent{
  display: flex;
  margin: 10px 0 5px;
}
.logTime{
  text-align: center;
  margin-right: 5px;
  color: #627783;
}
.logTime span:nth-child(1){
  font-size: 19px;
}
.logTime span:nth-child(2){
  font-size: 13px;
}
ul li {
  display: flex;
  font-size: 14px;
  color: #666666;
  padding: 0 0 5px;
}
label{
  display: flex;
}
label span{
  display: inline-block;
  width: 70px;
  text-align-last: justify;
  color: #999999
}
</style>