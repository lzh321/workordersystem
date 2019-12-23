<template>
  <div class="orderLog">
    <div class="info">
      <h2>工单处理日志</h2>
    </div>
    <div class="logContent">
      <div class="logTime">
        <span>10-28</span>
        <span>14:12:45</span>
      </div>
      <ul>
        <li>
          <label for=""><span>操作人</span>：</label>
          <span>大大</span>
        </li>
        <li>
          <label for=""><span>操作</span>：</label>
          <span>驳回</span>
        </li>
        <li>
          <label for=""><span>驳回说明</span>：</label>
          <span>大落到登录登录冻刀DAUOA领导老爱大佬递嗲嗲抖抖傲刀豆哈哈哈哈哈</span>
        </li>
        <li>
          <label for=""><span>备注</span>：</label>
          <span>哈哈哈哈哈啊哈哈哈哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈啊哈哈啊哈哈哈哈</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
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