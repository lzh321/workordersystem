<template>
<!-- 回访记录详情 -->
  <div class="returnVisit">
    <form action="">
      <div class="info">
        <h2>回访记录</h2>
      </div>
      <div>
        <label for=""><span class="problem">问题是否已解决</span>：</label>
        <span>{{orderInfo.isFinish == 0 ? '已解决' : orderInfo.isFinish == 1 ? '未解决' : ''}}</span>
      </div>
      <div>
        <label for=""><span>满意度情况</span>：</label>
        <span>{{orderInfo.satisfiedState == 0 ? '满意' : orderInfo.satisfiedState == 1 ? '基本满意' : orderInfo.satisfiedState == 2 ? '不满意' : ''}}</span>
      </div>
      <div>
        <label for=""><span>意见/建议</span>：</label>
        <textarea cols="30" :value="orderInfo.adviseContent" rows="10" disabled></textarea>
      </div>
      
    </form>
  </div>
</template>

<script>
export default {
  name: 'returnVisit',
  props: ["orderInfo"],
  data() {
    return {
      
    }
  },
  components:{
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
  /* border-bottom: 1px solid #F0F0F0;  */
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
  font-size: 16px;
  color: #999999;
}

label {
  font-size: 14px;
  display: flex;
  align-items: center;
}
/* label::before{
  content: '*';
  color: red;
  display: inline-block;
  margin-right: 3px;
} */
label .problem{
  width: 115px;
}
form  label span {
  width: 115px;
  font-size: 16px;
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
  color: #666666;
  font-size: 15px;
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

</style>