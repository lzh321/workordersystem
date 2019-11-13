<template>
  <div class="data_screening">
    <div class="data_screening_top">
      <h2>数据筛选</h2>
      <span>高级搜索</span>
    </div>
    <div class="data_screening_search">
      <p>
        <label for="">工单编号：</label>
        <input type="text" value="" placeholder="">
      </p>
      <p>
        <label for="">工单状态：</label>
        <select name="" id="">
          <option value="">全部</option>
          <option value="">待发单</option>
          <option value="">待派单</option>
          <option value="">待受理</option>
          <option value="">处理中</option>
          <option value="">待回访</option>
          <option value="">已关单</option>
        </select>
      </p>
      <p>
        <label for="">创建时间：</label>
        <input type="text">
      </p>
      <p>
        <button>查询</button>
        <button>重置</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.data_screening_top{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 20px;
}
.data_screening_top h2{
  font-size: 13px;
  font-weight: 600;
}
.data_screening_top span{
  color: #445eee;
  font-size: 13px;
}
.data_screening_search{
  display: flex;
  align-items: center;
  padding: 0 0 0 30px;
}
.data_screening_search p{
  margin-right: 20px;
}
.data_screening_search p label{
  font-size: 13px;
}
.data_screening_search p input{
  border: 1px solid #ccc;
  border-radius: 2px;
  width: 240px;
  height: 30px;
  padding-left: 5px; 
  color: #444;
}
.data_screening_search p select{
  width: 240px;
  height: 30px;
  border: 1px solid #ccc;
  padding-left: 5px; 
  border-radius: 2px;
}
.data_screening_search p button{
  border: none;
  border-radius: 2px;
  width: 70px;
    height: 30px;
  background: #0079FE;
  color: #fff;
  font-size: 13px;
  margin: 0 10px;
}
.data_screening_search p button:nth-child(2){
  background: #fff;
  border: 1px solid #eee;
  color: #ccc;
}
</style>