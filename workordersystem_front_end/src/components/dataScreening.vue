<template>
  <div class="data_screening">
    <div class="data_screening_top">
      <h2>数据筛选</h2>
    </div>
    <div class="data_screening_search">
      <div class="search_input" v-show="workOrderManagement">
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
      </div>
      <div class="search_input" v-show="staffManagement">
        <p>
          <label for="">输入查询：</label>
          <input type="text" value="" placeholder="">
        </p>
        <p>
          <label for="">员工职务：</label>
            <select name="" >
              <option value="">请选择</option>
              <option value="0">java工程师</option>
              <option value="1">前端工程师</option>
              <option value="2">php工程师</option>
              <option value="3">测试工程师</option>
            </select>
        </p>
        <p>
          <label for="">所属部门：</label>
          <select name="" id="">
            <option value="">全部</option>
            <option value="">测试</option>
            <option value="">开发</option>
          </select>
        </p>
      </div>
      <div class="search_input" v-show="EnterpriseNetwork">
        <p>
          <label for="">银行名称：</label>
          <select name="" id="">
            <option value="">全部</option>
            <option value="">php开发工程师</option>
            <option value="">前端开发工程师</option>
            <option value="">java开发工程师</option>

          </select>
        </p>
        <p>
          <label for="">网点名称：</label>
          <input type="text">
        </p>
      </div>
      <div class="search_input" v-show="messageModule">
        <p v-show="messagePushList">
          <label for="">接收手机</label>
          <input type="text">
        </p>
        <p>
          <label for="">模板编号</label>
          <input type="text">
        </p>
        <p>
          <label for="">模板名称：</label>
          <input type="text">
        </p>
      </div>
      <p class="layui-btn-container">
        <button class="layui-btn layui-btn-normal layui-btn-sm"><i class="layui-icon">&#xe615;</i>查询</button>
        <button class="layui-btn layui-btn-primary layui-btn-sm"><i class="layui-icon">&#xe669;</i>重置</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dataScreening',
  props: ['type'],
  data() {
    return {
      staffManagement: '',
      workOrderManagement: '',
      EnterpriseNetwork: '',
      businessEnterprise: '',
      messageModule: '',
      messagePushList: '',
    }
  },
  created(){
    console.log(this.type)
    if(this.type == 'staffManagement' || this.type == 'businessEnterprise'){
      this.staffManagement = this.type
    }
    if(this.type == 'workOrderManagement'){
      this.workOrderManagement = this.type
    }
    if(this.type == 'EnterpriseNetwork'){
      this.EnterpriseNetwork = this.type
    }
    if(this.type == 'messageModule'){
      this.messageModule = this.type
    }
    if(this.type == 'messagePushList'){
      this.messagePushList = this.type
      this.messageModule = true
    }
  }
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

.data_screening_search{
  display: flex;
  align-items: center;
  padding: 0 0 0 30px;
}
.search_input{
  display: flex;
  align-items: center;
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
  margin-bottom: 0;
}
/* .data_screening_search p button{
  border: none;
  border-radius: 2px;
  width: 70px;
  height: 30px;
  background: #0079FE;
  color: #fff;
  font-size: 13px;
  margin: 0 10px;
} */
/* .data_screening_search p button:nth-child(2){
  background: #fff;
  border: 1px solid #eee;
  color: #444;
} */
</style>