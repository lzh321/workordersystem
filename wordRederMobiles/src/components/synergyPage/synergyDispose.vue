<template>
  <!-- 协同处理 -->
  <div class="synergyDispose">
    <div class="synergyId">
      <label for>编&emsp;&emsp;&emsp;&nbsp;号：</label>
      <span>PL20190818001-3</span>
    </div>
    <div class="synergyContent">
      <label for>协&nbsp;&nbsp;同&nbsp;&nbsp;内&nbsp;&nbsp;容：</label>
      <span>此处显示协同协作业,内容此处显示,协同协作内容此处,显示协同协</span>
    </div>
    <div class="creator">
      <div>
        <label for>创&nbsp;&nbsp;&nbsp;建&nbsp;&nbsp;&nbsp;人：</label>
        <span>陈蔚然</span>
      </div>
      <div>
        <label for>创&nbsp;&nbsp;建&nbsp;&nbsp;时&nbsp;&nbsp;间：</label>
        <span>2019-10-21 14:36:21</span>
      </div>
    </div>
    <div class="acceptor">
      <div>
        <label for>受&nbsp;&nbsp;&nbsp;理&nbsp;&nbsp;&nbsp;人：</label>
        <span>傅仪</span>
      </div>
      <div>
        <label for>受&nbsp;&nbsp;理&nbsp;&nbsp;时&nbsp;&nbsp;间：</label>
        <span>2019-10-21 14:36:21</span>
      </div>
    </div>
    <div class="urgency">
      <label for>紧&nbsp;&nbsp;急&nbsp;&nbsp;程&nbsp;&nbsp;度：</label>
      <span>一般</span>
    </div>
    <div class="ResultCode">
      <label for>处&nbsp;&nbsp;理&nbsp;&nbsp;结&nbsp;&nbsp;果：</label>
      <span>此处显示协同协作业处理结果，此处显示协同协作业处理结果此处，显</span>
    </div>
    <div class="result">
     <label for="">处&nbsp;&nbsp;理&nbsp;&nbsp;结&nbsp;&nbsp;果：</label>
     <textarea name="" id="" cols="30" rows="5" placeholder="请输入/非必填项"></textarea>
    </div>
    <div v-if="synergyStatus == 1" class="Accepted btn">
      <van-button round type="info" size="large">受理</van-button>
    </div>
    <div v-if="synergyStatus == 2" class="finish btn">
      <van-button round type="info" size="large">完成</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "synergyDispose",
  data() {
    return {
      synergyStatus: 1
    };
  }
};
</script>

<style scoped>
.synergyDispose {
}
.synergyDispose > div {
  padding: 10px;
}
.synergyDispose div {
  display: flex;
  font-size: 14px;
}
.synergyDispose div label {
  width: 95px;
  text-align-last: justify;
}
.creator {
  display: flex;
  flex-direction: column;
}
.creator div:nth-child(2) {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.acceptor {
  display: flex;
  flex-direction: column;
}

.acceptor div:nth-child(2) {
  display: flex;
  align-items: center;
  margin-top: 20px;
}
.btn {
  width: 200px;
  margin: auto;
}
.result{
  flex-direction: column;
}
.result label{
  display: flex;
  justify-content: center;
}
.result label::before{
  content: '*';
  color: red;
  display: inline-block;
}
.result textarea{
  flex: 1;
  border: 1px solid #EEEE;
}
</style>