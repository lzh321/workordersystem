<template>
  <div class="addRole">
    <form class="layui-form layui-form-pane" action>
      <div class="info">
        <span>基础信息</span>
        <span>为必填项</span>
      </div>

      <div class="layui-form-item">
        <label class="layui-form-label">角色名称</label>
        <div class="layui-input-block">
          <input
            type="text"
            name="menuName"
            lay-verify="required"
            placeholder="请输入菜单名称"
            autocomplete="off"
            class="layui-input"
          />
        </div>
      </div>
      
      <div class="layui-form-item" style="text-align:center">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="addRole">确认</button>
          <button type="reset" class="layui-btn layui-btn-primary">重置</button>
          <button @click="cancel" type="reset" class="layui-btn layui-btn-primary">取消</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "addRole",
  data() {
    return {};
  },
  methods:{
    cancel(){
      this.$router.push('/menuManagement?type=menuManagement')
    }
  },
  mounted() {
    //Demo
    var _this = this
    layui.use("form", function() {
      var form = layui.form;
      form.render();
      //监听提交
      form.on("submit(addRole)", function(data) {
        var roleId = sessionStorage.getItem('roleId') ? sessionStorage.getItem('roleId') : ''
        data.field.userId = _this.$store.state.userId
        if(roleId === null || roleId === '' || roleId === undefined){
          _this.$axios.post('/api/addMenuInfo',data.field).then(res=>{
            console.log(res)
            if(res.data.retCode == '000000'){
              layer.msg(res.data.retMsg,{icon: 1})
            }else{
              layer.msg(res.data.retMsg,{icon: 2})
            }
          })
        }else{

        }
        return false;
      });
    });
  },
  beforeDestroy(){
    sessionStorage.removeItem('roleId')
  }
};
</script>

<style scoped>
.addRole{
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