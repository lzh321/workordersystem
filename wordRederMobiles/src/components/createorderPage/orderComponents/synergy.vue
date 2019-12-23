<template>
  <!-- 协同 -->
  <div class="sunergy">
    <div class="info">
      <h2>协同作业</h2>
    </div>
    <ul>
      <li>
        <div class="assign">
          <div>
            <label for>
              <span>指派给</span>：
            </label>
            <span>大大</span>
          </div>
          <div>
            <label for>
              <span>紧急程度</span>：
            </label>
            <span>一般</span>
          </div>
        </div>
        <div class="status">
          <div>
            <label for>
              <span>状态</span>：
            </label>
            <span>待受理</span>
          </div>
          <div>
            <label for>
              <span>编号</span>：
            </label>
            <span>PL20190818001-3</span>
          </div>
        </div>
        <div class="synergyContent">
          <label for>
            <span>协同内容</span>：
          </label>
          <span>哈哈哈哈哈哈哈奥哈哈哈或或或或或或或或或或或或或或或或或或或或或或或或或或哈哈哈哈哈</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.sunergy{
  /* padding: 0 15px; */
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
.sunergy ul li>div{
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 14px;
  color: #666666;
}
.sunergy ul li>div div:nth-child(1){
  flex: .7;
  display: flex;
  align-items: center;
}
.sunergy ul li>div div:nth-child(2){
  flex: 1;
  display: flex;
  align-items: center;
}
label{
  display: flex;
  /* align-items: center; */
  color: #999999
}
.sunergy label span{
  display: inline-block;
  width: 60px;
  text-align-last: justify;
}
</style>