<template>
  <div class="create">
    <form action>
      <div class="info">
        <h2>客户信息</h2>
        <i>为必填项</i>
      </div>
      <div>
        <label for=""><span>银行名称</span>：</label>
        <input type="text">
        <span>可选</span>
      </div>
      <div>
        <label for=""><span>网点名称</span>：</label>
        <input type="text">
        <span>可选</span>
      </div>
      <div>
        <label for=""><span>网点地址</span>：</label>
        <input type="text">

      </div>
      <div>
        <label for=""><span>联系人</span>：</label>
        <input type="text">
      </div>
      <div>
        <label for=""><span>联系电话</span>：</label>
        <input type="text">

      </div>
      <div>
        <label for=""><span>合同</span>：</label>
        <input type="text">
 
      </div>
      <div>
        <h2>故障信息</h2>
      </div>
      <div>
        <label for=""><span>工单来源</span>：</label>
        <input type="text">
        <span>可选</span>
      </div>
      <div>
        <label for=""><span>工单类型</span>：</label>
        <input type="text">
        <span>可选</span>
      </div>
      <div>
        <label for=""><span>紧急程度</span>：</label>
        <input type="checkbox" name="">紧急
        <input type="checkbox" name="">一般
      </div>
      <div>
        <label for=""><span>保障时间</span>：</label>
        <input type="text">
        <span>可选</span>
      </div>
      <div>
        <label for=""><span>设备型号</span>：</label>
        <input type="text">
        <span>可选</span>
      </div>
      <div>
        <label for=""><span>存货编码</span>：</label>
        <input type="text">
        <span>可选</span>
      </div>
      <div class="problem">
        <label for=""><span>问题描述</span>：</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="affix">
        <label for=""><span>附件</span>：</label>
        <van-uploader :after-read="afterRead" v-model="fileList" multiple />
      </div>
      <div class="">
        <label for=""><span>指派给</span>：</label>
        <input type="text">
        <span>选</span>
      </div>
      <div class="remakeInfo">
        <label for=""><span>备注</span>：</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
    </form>
      <div class="actionBtn">
        <ul>
          <li>
            <img src="../../assets/Images/operation_receipt.png" alt="">
            <span>发单</span>
          </li>
          <router-link tag="li" to="/wordOrder?type=wordOrder">
            <img src="../../assets/Images/operation_cancel.png" alt="">
            <span>取消</span>
          </router-link>
          <li>
            <img src="../../assets/Images/operation_kuantan.png" alt="">
            <span>关单</span>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: "create",
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    }
  }
};
</script>

<style scoped>
.create{
  
}
form{
  padding: 0px 15px;
}
.create div{
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F0F0F0; 
}
h2{
  font-size: 14px;
  font-weight: 600;
}
.create div>span{
  display: flex;
  align-items: center;
  margin-left: 5px;
}
.create div>span::after{
  content: '';
  display: inline-block;
  width: 7px;
  height: 13px;
  background: url('../../assets/Images/choose.png') no-repeat;
  background-size: 100%;
  margin-left: 5px;
}
label{
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
label span{
  width: 60px;
  font-size: 14px;
  color: #666666;
  text-align-last: justify;
}
input[type="text"] {
  flex: 1;
  border: 1px solid #F3F3F3;
  height: 35px;
}

.info{
  justify-content: space-between;
}
.info i{
  display: flex;
  align-items: center;
  font-size: 11px;
  color: #999999;
}
.info i::before{
  content: '*';
  color: red;
  display: inline-block;
}

.create .affix{
  align-items: baseline;
  flex-direction: column;
}
.create .affix div{
  border: none;
}
.create .remakeInfo{
  align-items: baseline;
  flex-direction: column;
}
.create .problem{
  align-items: baseline;
  flex-direction: column;
}
textarea{
  width: 100%;
  margin-top: 10px;
}

.create .actionBtn {
  padding: 0;
  margin-top: 20px; 
}
.actionBtn ul{
  width: 100%;
  padding: 10px 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #F0F0F0;
}
.actionBtn ul li{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.actionBtn ul li img{
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