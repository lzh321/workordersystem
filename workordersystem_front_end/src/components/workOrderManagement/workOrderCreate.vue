<template>
  <div class="workOrderCreate">
    <div class="customerInfo">
      <h2>客户信息</h2>
      <div class="customerInfo_content">
        <div><label for="">银行名称</label><input type="text"></div>
        <div><label for="">网点名称</label><input type="text"></div>
        <div><label for="">联系人</label><input type="text"></div>
        <div><label for="">网点地址</label><input type="text"></div>
        <div><label for="">联系电话</label><input type="text"></div>
        <div><label for="">合同ID</label><input type="text"></div>
      </div>
    </div>
    <div class="faultMessage">
      <h2>故障信息</h2>
      <div></div>
    </div>
    <div>
      <button>发单</button>
      <button>关单</button>
      <button>取消</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'workOrderCreate'
}
</script>

<style scoped>
.workOrderCreate{
  padding: 20px 15px 0;
}
h2{
   font-size: 13px;
  font-weight: 600;
}
.customerInfo{}
.customerInfo_content{
  /* display: flex; */
  /* flex-wrap: wrap; */
}
.customerInfo_content div{
  width: 48%;
}
.faultMessage{}
button{
border: none;
  border-radius: 2px;
  width: 70px;
  height: 30px;
  color: #444;
  font-size: 13px;
  margin: 0 10px;
}
button:nth-child(1) {
  background: #fff;
  border: 1px solid #eee;
  color: #fff;
  background: #0079fe;
}
</style>