<template>
<!-- 新增设备类型 -->
  <div class="addEquipmentType">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">设备型号</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" autocomplete="off" lay-verify="required" :value="echoContent.modelType ? echoContent.modelType : ''" name="modelType" placeholder="请输入设备类型">
        </div>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">存货名称</label>
        <div class="layui-input-block">
          <input type="text" class="layui-input" autocomplete="off" lay-verify="required" :value="echoContent.modelName ? echoContent.modelName : ''" name="modelName" placeholder="请输入存货名称">
        </div>
      </div>

      <div class="layui-form-item" style="text-align:center">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo">确认</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button type="reset" @click="cancel" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addEquipmentType",
  data() {
    return {
      echoContent:{}
    };
  },
  methods:{
    cancel(){
      this.$router.push('/equipmentType?type=equipmentType')
    },
    setEcho(){
      var data = sessionStorage.getItem("data") ? JSON.parse(sessionStorage.getItem("data")) : {};
      this.echoContent = data
    }
  },
  mounted() {
    //Demo
    var _this = this
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      //监听提交
      form.on("submit(formDemo)", function(data) {
        var modelId = sessionStorage.getItem('modelId') ? sessionStorage.getItem('modelId') : ''
        data.field.userId = _this.$store.state.userId
        if(modelId === null || modelId === '' || modelId === undefined){
          _this.$axios.post('/api/addDeviceModelInfo',data.field).then(res=>{  // 添加设备类型
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1});
              setTimeout(()=>{
                _this.$router.push('/equipmentType?type=equipmentType')
              },2000)
            }else{
              layer.msg(res.data.retMsg,{icon: 2});
            }
            
          })
        }else{
          data.field.modelId = modelId
          _this.$axios.post('/api/alterDeviceModelInfo',data.field).then(res=>{  // 添加设备类型
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1});
              setTimeout(()=>{
                _this.$router.push('/equipmentType?type=equipmentType')
              },2000)
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
    this.setEcho()
  },
  beforeDestroy(){
    
  }
};
</script>

<style scoped>
.addEquipmentType{
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