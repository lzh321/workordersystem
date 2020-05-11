<template>
<!-- 新增设备类型 -->
  <div class="addCustomer">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">客户名称</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" lay-verify="required" :value="data.customerName" autocomplete="off" name="customerName" placeholder="请输入客户名称">
        </div>
      </div>
      <orgInfo></orgInfo>

      <div class="layui-form-item" style="text-align:center">
        <div class="layui-input-block">
          <button type="button" class="layui-btn" lay-submit lay-filter="addCustomer">确认</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button @click="cancel" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import orgInfo from '@/components/orgInfo'

export default {
  name: "addCustomer",
  data() {
    return {
      data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {}
    };
  },
  components:{
    orgInfo : orgInfo
  },
  methods:{
    cancel(){
      this.$router.push('/CustomerNameList?type=CustomerNameList')
    }
  },
  mounted() {
    //Demo
    var _this = this
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      //监听提交
      form.on("submit(addCustomer)", function(data) {
        var customerId = localStorage.getItem('customerId') ? localStorage.getItem('customerId') : ''
        data.field.userId = _this.$store.state.userId
        var orgId = data.field.orgId.split(",")
        if(orgId[orgId.length-1] == ""){
          console.log(orgId[orgId.length-2])
          data.field.orgId = orgId[orgId.length-2]
        }else{
          data.field.orgId = orgId[orgId.length-1]
        }
        if(customerId === null || customerId === '' || customerId === undefined){
          _this.$axios.post('/api/addCustomerInfo',data.field).then(res=>{  // 添加客户
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1});
              setTimeout(()=>{
                _this.$router.push('/CustomerNameList?type=CustomerNameList')
              },3100)
            }else{
              layer.msg(res.data.retMsg,{icon: 2});
            }
            
          })
        }else{
          data.field.customerId = customerId
          // console.log(data.field)
          _this.$axios.post('/api/alterCustomerInfo',data.field).then(res=>{  
            console.log(res)
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1});
              setTimeout(()=>{
                _this.$router.push('/CustomerNameList?type=CustomerNameList')
              },3000)
            }else{
              layer.msg(res.data.retMsg,{icon: 2});
            }
            
          })
        }
        return false;
      });
      
    });
  },
  created(){
    this.customerName = localStorage.getItem("customerName") ? localStorage.getItem("customerName") : ''
  },

};
</script>

<style scoped>
.addCustomer{
  padding: 15px 15px 0;
}
.layui-btn {
  padding: 0 50px;
}
.layui-form-label {
  display: flex;
  align-items: center;
}
.layui-form-label::before {
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
.info{
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}
.info span{
  display: flex;
  align-items: center;
  font-weight: 600
}
.info span:nth-child(2){
  font-weight: 400;
  color: #c2c2c2;
}
.info span:nth-child(2)::before{
  content: "*";
  font-size: 20px;
  display: inline-block;
  color: red;
  line-height: 30px;
  height: 20px;
}
</style>