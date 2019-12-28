<template>
  <div class="customerInfo">
    <form action>
      <div class="orderId">
        <h2>{{orderInfoId}}</h2>
      </div>
      <div class="info">
        <h2>客户信息</h2>
      </div>
      <div>
        <label for>
          <span>客户名称</span>：
        </label>
        <span>{{orderInfo.customerName}}</span>
      </div>
      <div>
        <label for>
          <span>设备投放点</span>：
        </label>

        <span>{{orderInfo.networName}}</span>
      </div>
      <div>
        <label for>
          <span>投放点地址</span>：
        </label>
        <span>{{orderInfo.networAddress}}</span>
      </div>
      <div>
        <label for>
          <span>联系人</span>：
        </label>
        <span>{{orderInfo.contactName}}</span>
      </div>
      <div>
        <label for>
          <span>联系电话</span>：
        </label>
        <span>{{orderInfo.contactPhone}}</span>
      </div>
      <div>
        <label for>
          <span>合同</span>：
        </label>
        <span>{{orderInfo.agreenmentId}}</span>
      </div>
      <div class="info">
        <h2>故障信息</h2>
      </div>
      <div>
        <label for>
          <span>工单来源</span>：
        </label>

        <span>{{orderInfo.orderSource == 0 ? '电话' : orderInfo.orderSource == 1 ? '微信' : '其他' }}</span>
      </div>
      <div>
        <label for>
          <span>工单类型</span>：
        </label>

        <span>{{orderInfo.orderType == 0 ? '设备报障' : orderInfo.orderType == 1 ? '差错账' : orderInfo.orderType == 2 ? '钞空/存满' : orderInfo.orderType == 3 ? '吞卡' : orderInfo.orderType == 4 ? '通讯中断' : orderInfo.orderType == 5 ? '卡钞' : orderInfo.orderType == 6 ? 'PM' : orderInfo.orderType == 7 ? '软硬件升级' : orderInfo.orderType == 8 ? '咨询' : orderInfo.orderType == 9 ? '设备确认' : orderInfo.orderType == 10 ? '其他' : ''}}</span>
      </div>
      <div>
        <label for>
          <span>紧急程度</span>：
        </label>
        <span>{{orderInfo.orderUrgency == 0 ? '一般' : orderInfo.orderUrgency == 1 ? '紧急' : ''}}</span>
      </div>
      <div>
        <label for>
          <span>报障时间</span>：
        </label>

        <span>{{orderInfo.reportTime}}</span>
      </div>
      <div>
        <label for>
          <span>设备型号</span>：
        </label>

        <span>{{orderInfo.modelType}}</span>
      </div>
      <div>
        <label for>
          <span>存货编码</span>：
        </label>
        <span>{{orderInfo.deviceNumber}}</span>
      </div>
      <div class="problem">
        <label for>
          <span>问题描述</span>：
        </label>
        <textarea name id cols="30" :value="orderInfo.problemDescription" rows="10" disabled></textarea>
      </div>
      <div class="affix">
        <label for>
          <span>附件</span>：
        </label>
        <div class="orderPhoto">

        </div>
      </div>
      <div v-if="orderStatus == 1 ? true : false">
        <label for>
          <span>派单人</span>：
        </label>

        <span>{{orderInfo.singlePerson}}</span>
      </div>
      <div v-if="orderStatus == 2 ? true : false">
        <label for>
          <span>受理人</span>：
        </label>

        <span>{{orderInfo.userName}}</span>
      </div>
    </form>
    
  </div>
</template>

<script>
export default {
  name: "customerInfo",
  props:["orderInfo","orderStatus"],
  data() {
    return {
      fileList: [],
      orderInfoId:sessionStorage.getItem("orderInfoId"),
      img: ''
    };
  },
  methods: {
    send(){
      if(this.orderInfo.orderPhoto){
        this.$(".orderPhoto").html('<img style="width:100px;height:100px" src=" http://192.168.1.245/' +
          this.orderInfo.orderPhoto.split(",")[0] +
          '" alt />')
      }
    }
  },
  mounted(){
    this.send()
  },
  created(){
    this.send()
  },
  updated() {
    this.send()
  },
};
</script>

<style scoped>

form {
  padding: 0px 15px;
}
form div {
  display: flex;
  align-items: center;
  padding: 5px 0;
}
.orderId{
  padding: 20px 0 10px;
  
}
.orderId h2{
font-size: 18px;
}
form div > span {
  display: flex;
  align-items: center;
  margin-left: 5px;
  color: #999999;
  font-size: 16px;
}

label {
  font-size: 14px;
  display: flex;
  align-items: center;
}

label span {
  width: 80px;
  font-size: 16px;
  color: #666666;
  text-align-last: justify;
}
input[type="text"] {
  flex: 1;
  border: 1px solid #f3f3f3;
  height: 35px;
}

.info {
  justify-content: space-between;
  font-size: 16px;
}
.info h2::before{
  content: "|";
  font-size: 16px;
  color: #333333;
  margin-right: 2px;
}
h2{
  font-size: 16px;
  font-weight: 600;
  display: flex;
  align-items: center;
}

.affix {
  align-items: baseline;
  flex-direction: column;
}
.affix div {
  border: none;
}
.remakeInfo {
  align-items: baseline;
  flex-direction: column;
}
.problem {
  align-items: baseline;
  flex-direction: column;
}
textarea {
  width: 100%;
  margin-top: 10px;
  background: #FFFFFF;
  border: 1px solid #F3F3F3;
  color: #666666;
  font-size: 15px;
  padding: 5px;
}


</style>