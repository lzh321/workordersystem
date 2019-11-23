<template>
  <div class="workOrderCreate">
    <div class="customerInfo">
      <h2>客户信息</h2>
      <div class="customerInfo_content information">
        <div><label for="">银行名称</label>
        <select name="" id="">
          <option value="">民生银行</option>
        </select>
        </div>
        <div><label for="">网点名称</label>
        <select name="" id="">
          <option value="">车公庙支行</option>
        </select>
        </div>
        <div><label for="">联系人</label><input type="text"></div>
        <div><label for="">网点地址</label><input type="text"></div>
        <div><label for="">联系电话</label><input type="text"></div>
        <div><label for="">合同ID</label><input type="text"></div>
      </div>
    </div>
    <div class="faultMessage">
      <h2>故障信息</h2>
      <div class="faultMessage_content information">
        <div><label for="">工单来源</label>
        <select name="" id="">
          <option value=""></option>
        </select>
        </div>
        <div><label for=""> 工单类型</label>
        <select name="" id="">
          <option value=""></option>
        </select>
        </div>
        <div><label for="">紧急程度</label>
        <select name="" id="">
          <option value=""></option>
        </select>
        </div>
        <div><label for="">报障时间</label><p><input name="reported_barrier_time" type="text"><i></i></p></div>
        <div><label for="">设备型号</label>
        <select name="" id="">
          <option value=""></option>
        </select></div>
        <div><label for="">存货编码</label><input type="text"></div>
      </div>
      <div class="problem_description">
        <label for="">问题描述</label>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
      <div class="attachment">
        <label for="">附件</label>
        <div>
          <files-upload></files-upload>
          <div>支持格式 .png .jpg .jpeg。单个图片不超过2MB</div>
        </div>
      </div>
    </div>
    <div>
      <button>发单</button>
      <button>关单</button>
      <button>取消</button>
    </div>
  </div>
</template>

<script>
import filesUpload from '../filesUpload'
export default {
  name: 'workOrderCreate',
  data() {
    return {
      
    }
  },
  components: {
    filesUpload
  }
}
</script>

<style scoped>
.workOrderCreate{
  padding: 20px 15px 0;
}
h2{
   font-size: 17px;
  font-weight: 600;
}
.customerInfo{}
.information{
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;
}
.information div{
  width: 33%;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}
.information div label{
  margin-right: 10px;
  font-size: 15px;
}
.information div input{
  height: 30px;
  width: 50%;
  padding-left:5px; 
  position: relative;
}
.information div p{
  width: 50%;
  position: relative;
}
.information div p input{
  width: 100%;
}
.information div p i{
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 1px solid red;
  position: absolute;
  right: 5px;
  top: 5px;
}
.information div select{
  height: 30px;
  width: 50%
}
.faultMessage{}

.problem_description{
  display: flex;
  margin-bottom: 15px;
}
.problem_description label{
  margin-right: 15px;
}
.problem_description textarea{
  width: 82.6%;
  padding: 5px;
}

.attachment{
  display: flex;
  margin-bottom: 15px;
}
.attachment label{
  width: 56px;
  text-align: right;
  margin-right: 15px;
}







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